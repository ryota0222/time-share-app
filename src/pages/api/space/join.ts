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

  if (req.method === "POST") {
    const { username, space } = req.body;
    // deleted_atがnullで同じnameのspaceが存在するか確認
    const doc = await db
      .collection("space")
      .where("name", "==", space)
      .where("deleted_at", "==", null)
      .get();
    if (doc.empty) {
      // 該当のスペースがなければエラー
      return res.status(404).json({ message: "space not found" });
    } else {
      // 該当のスペースがあれば、そのスペースにユーザーを追加
      const spaceData = doc.docs[0].data();
      const members = spaceData.members;
      const events = spaceData.events;
      if (members.includes(username)) {
        // 既にメンバーにいる場合はそのまま返す
        return res.status(200).json(spaceData);
      }
      members.push(username);
      // eventsの先頭に追加
      events.unshift({
        type: "user_join",
        timestamp: new Date(),
        user: username,
      });
      await db.collection("space").doc(doc.docs[0].id).update({
        members,
        events,
      });
      return res.status(200).json(spaceData);
    }
  }
  if (req.method === "DELETE") {
    // オーナーでないメンバーがスペースから退出する
    const { username, space } = req.query;
    // deleted_atがnullで同じnameのspaceが存在するか確認
    const doc = await db
      .collection("space")
      .where("name", "==", space)
      .where("deleted_at", "==", null)
      .get();
    if (doc.empty) {
      // 該当のスペースがなければエラー
      return res.status(404).json({ message: "space not found" });
    } else {
      // 該当のスペースのオーナーが退出しようとした場合はエラー
      const spaceData = doc.docs[0].data();
      const owner = spaceData.owner;
      if (owner === username) {
        return res.status(409).json({ message: "owner cannot leave" });
      }
      const members = spaceData.members;
      const events = spaceData.events;
      if (!members.includes(username)) {
        // メンバーでない場合はエラー
        return res.status(409).json({ message: "user not found" });
      }
      const newMembers = (members as string[]).filter(
        (member) => member !== username
      );
      // eventsの先頭に追加
      events.unshift({
        type: "user_leave",
        timestamp: new Date(),
        user: username,
      });
      await db.collection("space").doc(doc.docs[0].id).update({
        members: newMembers,
        events,
      });
      return res.status(200).json(spaceData);
    }
  }
  return res.status(405);
}
