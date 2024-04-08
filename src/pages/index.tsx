import { Box, Flex, Image, Stack, Text, Title } from "@mantine/core";
import Head from "next/head";

import { APP_NAME } from "@/constants/meta";
import { AppButton } from "@/feature/AppButton";

export default function Top() {
  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
      </Head>
      <Box w="100%" pt="md">
        <Flex align="center" justify="center" gap="md">
          <Image src="/logo_icon.png" alt="ロゴ" w={80} h={80} />
          <Title>{APP_NAME}</Title>
        </Flex>
        <Text fw="bold" ta="center" my={24} style={{ letterSpacing: "6px" }}>
          リアルタイムに計測を行いましょう
        </Text>
        <Image
          src="/mv.png"
          alt="トップ画像"
          w="100%"
          h="auto"
          maw={560}
          mt={40}
          style={{ margin: "auto" }}
        />
        <Stack gap={24} align="center" mt={40}>
          <AppButton style={{ minWidth: 320 }} href="/user_name">
            ゲストではじめる
          </AppButton>
          <Text fz="sm" c="gray.6">
            アカウント登録は開発中です
          </Text>
        </Stack>
      </Box>
    </>
  );
}
