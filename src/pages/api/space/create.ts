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
      const docRef = db.collection("space").doc();
      const insertData = {
        name: space,
        owner: username,
        members: [username],
        created_at: new Date(),
        deleted_at: null,
        events: [],
      };
      docRef.set(insertData);
      // insertDataを返す
      return res.status(200).json(insertData);
    } else {
      return res.status(409).json({ message: "space already exists" });
    }
  }
  return res.status(405);
}
