import { Image, Stack, Text, Title } from "@mantine/core";
import Head from "next/head";
import React from "react";

import { Spacer } from "@/core/Spacer";
import { AppButton } from "@/feature/AppButton";

const Custom404 = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>ページが見つかりませんでした</title>
      </Head>
      <Stack w="100%" pt="md" flex={1} style={{ gap: 0 }}>
        <Title order={2} ta="center">
          <Text span inline fw="bold" fz="h2" c="#E57C89">
            404
          </Text>
          <Text span inline fw="bold" ml="md" fz="h2" c="#37464A">
            ページが見つかりませんでした
          </Text>
        </Title>
        <Text fw="bold" ta="center" my={24} style={{ letterSpacing: "6px" }}>
          リアルタイムに計測を行いましょう
        </Text>
        <Spacer />
        <Image
          src="/mv.png"
          alt="トップ画像"
          w="100%"
          h="auto"
          maw={560}
          m="auto"
          mt={40}
        />
        <Spacer />
        <Stack gap={24} align="center" mt={40} pb={40}>
          <AppButton style={{ minWidth: 320 }} href="/">
            トップページに戻る
          </AppButton>
        </Stack>
      </Stack>
    </>
  );
};

export default Custom404;
