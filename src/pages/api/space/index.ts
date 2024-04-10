import admin from "firebase-admin";
import { cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

import { serviceAccount } from "@/lib/firebase-admin";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //　初期化する
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: cert(serviceAccount),
    });
  }
  const db = getFirestore();
  if (req.method === "PUT") {
    const { username, space, eventType } = req.body;
    const doc = await db
      .collection("space")
      .where("name", "==", space)
      .where("deleted_at", "==", null)
      .get();
    if (doc.empty) {
      return res.status(404).json({ message: "space not found" });
    } else {
      const spaceData = doc.docs[0].data();
      // メンバーでない場合はエラー
      const members = spaceData.members;
      if (!members.includes(username)) {
        return res.status(409).json({ message: "user not found" });
      }
      const events = spaceData.events;
      // eventsの先頭に追加
      events.unshift({
        type: eventType,
        timestamp: new Date(),
        user: username,
      });
      await db.collection("space").doc(doc.docs[0].id).update({
        events,
      });
      return res.status(200).json(spaceData);
    }
  } else if (req.method === "DELETE") {
    const { username, space } = req.query;
    const doc = await db
      .collection("space")
      .where("name", "==", space)
      .where("deleted_at", "==", null)
      .get();
    if (doc.empty) {
      return res.status(404).json({ message: "space not found" });
    } else {
      const spaceData = doc.docs[0].data();
      const events = spaceData.events;
      // memberがownerでない場合はエラー
      if (spaceData.owner !== username) {
        return res.status(409).json({ message: "user is not owner" });
      }
      // eventsの先頭に追加
      events.unshift({
        type: "space_delete",
        timestamp: new Date(),
        user: username,
      });
      await db.collection("space").doc(doc.docs[0].id).update({
        deleted_at: new Date(),
        events,
      });
      return res.status(200).json(spaceData);
    }
  }
  return res.status(405);
}
