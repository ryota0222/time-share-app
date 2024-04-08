import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import type { FirebaseOptions } from "firebase/app";

// .envファイルで設定した環境変数をfirebaseConfigに入れる
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
