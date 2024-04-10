import { Box, Stack, Center, Loader } from "@mantine/core";

import { useBeforeUnloadEffect } from "@/feature/Space/hooks/useBeforeUnloadEffect";
import { useEventsWatcher } from "@/feature/Space/hooks/useEventsWatcher";
import { InformationPanel } from "@/feature/Space/InfomationPanel";
import { SpaceNameArea } from "@/feature/Space/NameArea";
import { TimerController } from "@/feature/Space/TimerController";
import { TimerDisplay } from "@/feature/Space/TimerDisplay";
import { useScreen } from "@/hooks/useScreen";
import { useUsernameRoute } from "@/hooks/useUsernameRoute";
import { useStore } from "@/lib/store";

export default function SpaceDetail() {
  const { isMinimumScreen } = useScreen();
  const space = useStore((state) => state.space);
  const username = useStore((state) => state.username);
  // イベントの監視
  const { events, isStarting } = useEventsWatcher();

  // ユーザー名がなければリダイレクト
  useUsernameRoute();
  // ページを閉じる時にスペースを削除する
  useBeforeUnloadEffect(username, space);
  return (
    <Stack
      w="100%"
      maw={640}
      mx="auto"
      align="center"
      h="100%"
      py={isMinimumScreen ? 40 : 64}
      gap={40}
    >
      <SpaceNameArea space={space} />
      <InformationPanel space={space} />
      {space ? (
        <Box my={40}>
          <TimerDisplay events={events} />
        </Box>
      ) : (
        <Center py="20vh">
          <Loader />
        </Center>
      )}
      <TimerController space={space} isStarting={isStarting} />
    </Stack>
  );
}
