import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

import {
  showErrorNotification,
  showSuccessNotification,
} from "@/feature/Notification";
import { db } from "@/lib/firebase";
import { Event, useStore } from "@/lib/store";

type UseEventsWatcher = () => {
  events: Event[];
  isStarting: boolean;
};

export const useEventsWatcher: UseEventsWatcher = () => {
  const router = useRouter();
  const username = useStore((state) => state.username);
  const space = useStore((state) => state.space);
  const setSpace = useStore((state) => state.setSpace);
  const events = useMemo(() => space?.events || [], [space]);

  const isStarting = useMemo(() => {
    if (events.length === 0) return false;
    // typeがstartのイベントのインデックス
    const startIndex = events.findIndex((e) => e.type === "start");
    // typeがstopのイベントのインデックス
    const stopIndex = events.findIndex((e) => e.type === "stop");
    // startのイベントがない場合はfalse
    if (startIndex === -1) return false;
    // stopのイベントがない場合はtrue
    if (stopIndex === -1) return true;
    // startのイベントが最後にある場合はfalse
    if (startIndex > stopIndex) return false;
    // startのイベントがstopのイベントよりも後にある場合はtrue
    return true;
  }, [events]);

  useEffect(() => {
    if (typeof router.query.id !== "string") return;
    //DBリアルタイム更新設定
    const q = query(
      collection(db, "space"),
      where("name", "==", router.query.id),
      where("deleted_at", "==", null)
    );
    const unsub = onSnapshot(q, (querySnapShot) => {
      try {
        const docs = querySnapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (docs?.length) {
          const doc = docs[0] as any;
          const space = {
            id: doc.id,
            name: doc.name,
            createdAt: doc.created_at.toDate(),
            members: doc.members,
            events: doc.events.map((event: any) => ({
              type: event.type,
              createdAt: event.timestamp.toDate(),
              user: event.user,
            })),
            owner: doc.owner,
            deletedAt: doc.deleted_at ? doc.deleted_at.toDate() : null,
          };
          console.log(space);
          setSpace(space);
        } else {
          showErrorNotification({
            title: "スペースが見つかりません",
            message: "スペースが削除された可能性があります",
          });
          router.push("/");
        }
      } catch (err) {
        console.log(err);
      }
    });
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    if (events.length === 0) return;
    const event = events[0];
    switch (event.type) {
      case "start":
        if (event.user !== username) {
          showSuccessNotification({
            title: "お知らせ",
            message: `${event.user}さんが計測を開始しました`,
          });
        }
        return;
      case "stop":
        if (event.user !== username) {
          showSuccessNotification({
            title: "お知らせ",
            message: `${event.user}さんが計測を停止しました`,
          });
        }
        return;
      case "reset":
        if (event.user !== username) {
          showSuccessNotification({
            title: "お知らせ",
            message: `${event.user}さんが計測をリセットしました`,
          });
        }
        return;
      case "space_delete":
        if (event.user !== username) {
          showSuccessNotification({
            title: "お知らせ",
            message: `${event.user}さんがスペースを削除するか、退出しました`,
          });
          router.push("/");
        }
        return;
      case "user_join":
        if (event.user !== username) {
          showSuccessNotification({
            title: "お知らせ",
            message: `${event.user}さんがスペースに参加しました`,
          });
        }
        return;
      case "user_leave":
        if (event.user !== username) {
          showSuccessNotification({
            title: "お知らせ",
            message: `${event.user}さんがスペースから退出しました`,
          });
        }
        return;
      default:
        return;
    }
  }, [events, router, username]);
  return {
    events,
    isStarting,
  };
};
