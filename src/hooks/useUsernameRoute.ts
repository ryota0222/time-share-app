import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

import { showErrorNotification } from "@/feature/Notification";
import { useStore } from "@/lib/store";

export const useUsernameRoute = () => {
  const isRedirected = useRef(false);
  const router = useRouter();
  const username = useStore((state) => state.username);
  useEffect(() => {
    if (!username.length && !isRedirected.current) {
      isRedirected.current = true; // リダイレクトが実行されたことを記録
      console.log(username);
      router.push("/user_name");
      showErrorNotification({
        title: "ユーザー名が設定されていません",
        message: "スペースの作成を行うためにはユーザー名の設定が必要です",
      });
    }
  }, [username]);
};
