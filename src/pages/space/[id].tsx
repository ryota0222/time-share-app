import {
  Box,
  Flex,
  Stack,
  Text,
  Avatar,
  Title,
  useMantineTheme,
  Tooltip,
  UnstyledButton,
  Center,
  Image,
} from "@mantine/core";
import Head from "next/head";
import BoringAvatar from "boring-avatars";

import { APP_NAME } from "@/constants/meta";
import { Fragment, useCallback, useEffect, useRef } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useStore } from "@/lib/store";
import { AddIcon } from "@/core/icons";
import { dsegFont } from "@/styles/font";
import { ExitIcon } from "@/core/icons/components/Exit";
import { PlayIcon } from "@/core/icons/components/Play";
import { RefreshIcon } from "@/core/icons/components/Refresh";
import { useReviewModalContext } from "@/feature/ReviewModal/components";
import { useScreen } from "@/hooks/useScreen";
import { useCopyToClipboard } from "react-use";
import { showSuccessNotification } from "@/feature/Notification";

const MAX_NAME_LENGTH = 20;

export default function SpaceDetail() {
  const { isMinimumScreen } = useScreen();
  const router = useRouter();
  const [value, setValue] = useLocalStorage({
    key: "user_name",
    defaultValue: "",
  });
  const [state, copyToClipboard] = useCopyToClipboard();
  const theme = useMantineTheme();
  const space = useStore((state) => state.space);
  const reviewModalContext = useReviewModalContext();
  useEffect(() => {
    // todo: スペースがない場合はトップページに戻る
    if (!space?.name) {
      showSuccessNotification({
        title: "スペースが見つかりません",
        message: "トップページに戻ります",
      });
      router.push("/");
    }
  }, []);
  useEffect(() => {
    if (state.value) {
      showSuccessNotification({
        title: "スペース名をコピーしました",
        message: "招待したいユーザーにスペース名を共有してください",
      });
    }
  }, [state]);
  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
      </Head>
      <Stack
        w="100%"
        maw={640}
        mx="auto"
        align="center"
        h="100%"
        py={isMinimumScreen ? 40 : 64}
        gap={40}
      >
        <Flex align="center" gap="md">
          <Title fz="h2">{space?.name}</Title>
          <Flex align="center">
            {space?.members.map((member, idx) => (
              <Fragment key={member}>
                <Tooltip
                  label={member}
                  withArrow
                  events={{ hover: true, focus: true, touch: true }}
                >
                  <Flex
                    ml={idx !== 0 ? -16 : 0}
                    style={{
                      border: `solid 1px ${theme.colors.gray[3]}`,
                      borderRadius: 25,
                    }}
                  >
                    <BoringAvatar
                      size={48}
                      name={member}
                      variant="beam"
                      colors={[
                        "#0A0310",
                        "#49007E",
                        "#FF005B",
                        "#FF7D10",
                        "#FFB238",
                      ]}
                    />
                  </Flex>
                </Tooltip>
              </Fragment>
            ))}
            <Box ml={-16}>
              <Tooltip
                label="招待"
                withArrow
                events={{ hover: true, focus: true, touch: true }}
              >
                <UnstyledButton
                  onClick={() => {
                    copyToClipboard(space?.name || "");
                  }}
                >
                  <Center
                    bg="gray.0"
                    style={{
                      border: `solid 1px ${theme.colors.gray[3]}`,
                      borderRadius: 25,
                    }}
                    w={50}
                    h={50}
                  >
                    <AddIcon color="#4DABF7" />
                  </Center>
                </UnstyledButton>
              </Tooltip>
            </Box>
          </Flex>
        </Flex>
        <Stack
          w="100%"
          p={24}
          bg="gray.0"
          align="center"
          style={{ borderRadius: theme.radius.lg }}
        >
          <Image src="/light-bulb.png" w={32} h={32} alt="アイコン" />
          <Text w="100%" c="gray.6">
            ※このスペースはゲスト用の一時スペースです。
            タブを閉じるとスペースは消去され、参加中のユーザーもスペースから外れます。
          </Text>
        </Stack>
        <Box pos="relative" my={40}>
          <Text className={dsegFont.className} fz={64} c="#00000016">
            88 : 88
          </Text>
          <Text
            className={dsegFont.className}
            fz={64}
            c="#000000"
            pos="absolute"
            top={0}
            left={0}
          >
            00 : 00
          </Text>
        </Box>
        <Flex justify="center" gap={isMinimumScreen ? 40 : 72}>
          <Tooltip
            withArrow
            label="スペースを離れる"
            events={{ hover: true, focus: true, touch: true }}
          >
            <UnstyledButton>
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
          <UnstyledButton>
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
              <PlayIcon color={theme.colors.gray[7]} />
            </Center>
          </UnstyledButton>
          <Tooltip
            withArrow
            label="リセット"
            events={{ hover: true, focus: true, touch: true }}
          >
            <UnstyledButton>
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
      </Stack>
    </>
  );
}
