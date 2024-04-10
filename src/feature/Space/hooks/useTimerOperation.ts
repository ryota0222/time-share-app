import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

import { useReviewModalContext } from "@/feature/ReviewModal/components";
import { Space, useStore } from "@/lib/store";

type UseTimerOperation = (
  username: string,
  space: Space | null
) => {
  startTime: () => void;
  stopTime: () => void;
  resetTime: () => void;
  leaveSpace: () => void;
  deleteSpace: () => void;
};

export const useTimerOperation: UseTimerOperation = (username, space) => {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const setSpace = useStore((state) => state.setSpace);
  const setUsername = useStore((state) => state.setUsername);
  const reviewModalContext = useReviewModalContext();
  const clearStore = useCallback(() => {
    setSpace(null);
    setUsername("");
  }, [setSpace, setUsername]);
  /**
   * スペースを離れる
   */
  const leaveSpace = useCallback(async () => {
    if (pending) return;
    setPending(true);
    try {
      await axios.delete(
        `/api/space/join?space=${space?.name}&username=${username}`
      );
      router.push("/");
      reviewModalContext?.open();
      clearStore();
    } catch (err) {
      console.log(err);
    } finally {
      setPending(false);
    }
  }, [clearStore, pending, reviewModalContext, space, username, router]);
  /**
   * スペースを削除する
   */
  const deleteSpace = useCallback(async () => {
    if (pending) return;
    setPending(true);
    try {
      await axios.delete(
        `/api/space?space=${space?.name}&username=${username}`
      );
      router.push("/");
      reviewModalContext?.open();
      clearStore();
    } catch (err) {
      console.log(err);
    } finally {
      setPending(false);
    }
  }, [clearStore, pending, reviewModalContext, space, username, router]);
  /**
   * タイマーの開始
   */
  const startTime = useCallback(async () => {
    if (pending) return;
    setPending(true);
    try {
      await axios.put("/api/space", {
        space: space?.name,
        username,
        eventType: "start",
      });
    } catch (err) {
      console.log(err);
    } finally {
      setPending(false);
    }
  }, [pending, space, username]);
  /**
   * タイマーの停止
   */
  const stopTime = useCallback(async () => {
    if (pending) return;
    setPending(true);
    try {
      await axios.put("/api/space", {
        space: space?.name,
        username,
        eventType: "stop",
      });
    } catch (err) {
      console.log(err);
    } finally {
      setPending(false);
    }
  }, [pending, space, username]);
  /**
   * タイマーのリセット
   */
  const resetTime = useCallback(async () => {
    if (pending) return;
    setPending(true);
    try {
      await axios.put("/api/space", {
        space: space?.name,
        username,
        eventType: "reset",
      });
    } catch (err) {
      console.log(err);
    } finally {
      setPending(false);
    }
  }, [pending, space, username]);

  return {
    startTime,
    stopTime,
    resetTime,
    leaveSpace,
    deleteSpace,
  };
};
