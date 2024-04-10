import { Box, Text } from "@mantine/core";
import { memo, useCallback, useEffect, useState } from "react";

import { Event } from "@/lib/store";
import { dsegFont } from "@/styles/font";

interface Props {
  events: Event[];
}

export const TimerDisplay = memo<Props>(({ events }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    calculateElapsedTime();
    // タイマーが動いているかどうかをチェックして、適宜setIntervalを設定
    if (timerRunning) {
      const intervalId = setInterval(() => {
        calculateElapsedTime();
      }, 1000); // 1秒ごとに経過時間を再計算

      return () => clearInterval(intervalId); // コンポーネントのクリーンアップ
    }
  }, [events, timerRunning]);

  // 過去のイベントも含めた経過時間の計算
  const calculateElapsedTime = useCallback(() => {
    let totalTime = 0;
    let startTime = 0;
    let isTimerRunning = false;
    const reversedEvents = [...events].reverse();

    // イベントを時系列順に処理
    reversedEvents.forEach((event) => {
      const eventTime = new Date(event.createdAt).getTime();
      if (event.type === "start") {
        if (!isTimerRunning) {
          startTime = eventTime;
          isTimerRunning = true;
        }
      } else if (event.type === "stop" && isTimerRunning) {
        totalTime += eventTime - startTime;
        isTimerRunning = false;
      } else if (event.type === "reset") {
        totalTime = 0;
        if (isTimerRunning) {
          startTime = eventTime; // reset後に再スタートする場合はstartTimeをリセット
        }
      }
    });
    if (isTimerRunning) {
      totalTime += new Date().getTime() - startTime;
    }
    setTimerRunning(isTimerRunning);

    // ミリ秒から秒へ変換
    setElapsedTime(Math.floor(totalTime / 1000));
  }, [events]);

  // 経過時間を HH:mm:ss 形式にフォーマット
  const formatTime = useCallback(() => {
    const seconds = elapsedTime ? Math.floor(elapsedTime % 60) : 0;
    const minutes = elapsedTime ? Math.floor(elapsedTime / 60) % 60 : 0;
    const hours = elapsedTime ? Math.floor(elapsedTime / 3600) : 0;
    const label = `${hours.toString().padStart(2, "0")} : ${minutes
      .toString()
      .padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;
    // 先頭が00の場合はHHは表示しない
    return label.startsWith("00 : ") ? label.slice(5) : label;
  }, [elapsedTime]);

  console.log(events);

  return (
    <Box pos="relative">
      <Text className={dsegFont.className} fz={64} c="#00000016">
        {"88 : 88 : 88".slice(0, formatTime().length)}
      </Text>
      <Text
        className={dsegFont.className}
        fz={64}
        c="#000000"
        pos="absolute"
        top={0}
        left={0}
      >
        {formatTime()}
      </Text>
    </Box>
  );
});
