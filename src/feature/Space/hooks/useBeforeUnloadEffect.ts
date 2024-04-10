import { useEffect } from "react";

import { Space } from "@/lib/store";

import { useTimerOperation } from "./useTimerOperation";

type UseBeforeUnloadEffect = (username: string, space: Space | null) => void;

export const useBeforeUnloadEffect: UseBeforeUnloadEffect = (
  username,
  space
) => {
  const timerOperation = useTimerOperation(username, space);
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (space?.owner === username) {
        timerOperation.deleteSpace();
      } else {
        timerOperation.leaveSpace();
      }
    };

    // beforeunloadイベントにイベントリスナーを追加
    window.addEventListener("beforeunload", handleBeforeUnload);

    // コンポーネントのクリーンアップ時にイベントリスナーを解除
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
};
