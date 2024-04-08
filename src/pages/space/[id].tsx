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
} from "@mantine/core";
import Head from "next/head";
import BoringAvatar from "boring-avatars";

import { APP_NAME } from "@/constants/meta";
import { useForm } from "@mantine/form";
import { Spacer } from "@/core/Spacer";
import { AppButton } from "@/feature/AppButton";
import { Fragment, useCallback, useEffect, useRef } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useStore } from "@/lib/store";
import { AddIcon } from "@/core/icons";

const MAX_NAME_LENGTH = 20;

export default function SpaceDetail() {
  const [value, setValue] = useLocalStorage({
    key: "user_name",
    defaultValue: "",
  });
  const theme = useMantineTheme();
  const space = useStore((state) => state.space);
  console.log(space);
  useEffect(() => {
    // todo: スペースがない場合はトップページに戻る
  }, []);
  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
      </Head>
      <Stack w="100%" maw={640} mx="auto" align="center" h="100%" py={64}>
        <Flex align="center" gap="md">
          <Title fz="h2">{space?.name}</Title>
          <Flex align="center">
            {space?.members.map((member, idx) => (
              <Fragment key={member}>
                <Tooltip label={member} withArrow>
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
              <Tooltip label="招待" withArrow>
                <UnstyledButton>
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
      </Stack>
    </>
  );
}
