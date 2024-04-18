import {
  Box,
  Center,
  CloseButton,
  Flex,
  Modal,
  Stack,
  Text,
  Title,
  Tooltip,
  UnstyledButton,
  noop,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { memo } from "react";

import { ExitIcon } from "@/core/icons/components/Exit";
import { PauseIcon } from "@/core/icons/components/Pause";
import { PlayIcon } from "@/core/icons/components/Play";
import { RefreshIcon } from "@/core/icons/components/Refresh";
import { AppButton } from "@/feature/AppButton";
import { useScreen } from "@/hooks/useScreen";
import { Space, useStore } from "@/lib/store";

import { useTimerOperation } from "../../hooks/useTimerOperation";

interface Props {
  space: Space | null;
  isStarting: boolean;
}

export const TimerController = memo<Props>(({ space, isStarting }) => {
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure();
  const { isMinimumScreen } = useScreen();
  const username = useStore((state) => state.username);
  const timerOperation = useTimerOperation(username, space);
  return (
    <>
      <Flex justify="center" gap={isMinimumScreen ? 40 : 72}>
        <Tooltip
          withArrow
          multiline
          label={
            isStarting ? (
              <Text fz="sm" ta="center">
                計測の停止中のみ
                <br />
                利用できます
              </Text>
            ) : (
              "スペースを離れる"
            )
          }
          events={{ hover: true, focus: true, touch: true }}
        >
          <UnstyledButton
            onClick={space && !isStarting ? open : noop}
            opacity={space ? 1 : 0.5}
          >
            <Center
              w={72}
              h={72}
              style={{
                borderRadius: 36,
                "&:hover": {
                  backgroundColor: theme.colors.gray[1],
                },
              }}
            >
              <ExitIcon color={theme.colors.red[6]} />
            </Center>
          </UnstyledButton>
        </Tooltip>
        <UnstyledButton
          opacity={space ? 1 : 0.5}
          onClick={
            isStarting ? timerOperation.stopTime : timerOperation.startTime
          }
        >
          <Center
            w={72}
            h={72}
            bg="gray.2"
            style={{
              borderRadius: 36,
              "&:hover": {
                backgroundColor: theme.colors.gray[3],
              },
            }}
          >
            {isStarting ? (
              <PauseIcon color={theme.colors.gray[7]} />
            ) : (
              <PlayIcon color={theme.colors.gray[7]} />
            )}
          </Center>
        </UnstyledButton>
        <Tooltip
          withArrow
          label={
            isStarting ? (
              <Text fz="sm" ta="center">
                計測の停止中のみ
                <br />
                利用できます
              </Text>
            ) : (
              "リセット"
            )
          }
          events={{ hover: true, focus: true, touch: true }}
        >
          <UnstyledButton
            opacity={space ? 1 : 0.5}
            onClick={space && !isStarting ? timerOperation.resetTime : noop}
          >
            <Center
              w={72}
              h={72}
              style={{
                borderRadius: 36,
                "&:hover": {
                  backgroundColor: theme.colors.gray[1],
                },
              }}
            >
              <RefreshIcon color={theme.colors.gray[7]} />
            </Center>
          </UnstyledButton>
        </Tooltip>
      </Flex>
      <Modal
        opened={opened}
        onClose={close}
        radius="lg"
        centered
        withCloseButton={false}
        size="min(640px, 90vw)"
        overlayProps={{ bg: "#00000040" }}
        styles={{
          body: {
            padding: 0,
            position: "relative",
          },
        }}
      >
        <Box pos="absolute" right={16} top={16}>
          <CloseButton onClick={close} />
        </Box>
        <Title size="h4" order={2} ta="center" py={40}>
          スペースを離れてよろしいですか？
        </Title>
        <Box mx="lg">
          <Text c="gray.6" ta="center" fz="md">
            {space?.owner === username
              ? "スペースを離れると、スペースは消去され、参加中のユーザーもスペースから外れます。"
              : "あなたがスペースを離れると、スペースに参加中のユーザーにお知らせします。"}
          </Text>
          <Stack
            w="min(320px, 80%)"
            mx="auto"
            my={isMinimumScreen ? 40 : 64}
            gap={isMinimumScreen ? "md" : "xl"}
          >
            <AppButton
              onClick={
                space?.owner === username
                  ? timerOperation.deleteSpace
                  : timerOperation.leaveSpace
              }
              style={{
                background: theme.colors.red[6],
                color: "white",
                width: "100%",
              }}
            >
              はい、スペースを離れます
            </AppButton>
            <AppButton onClick={close} style={{ width: "100%" }}>
              戻る
            </AppButton>
          </Stack>
        </Box>
      </Modal>
    </>
  );
});
