import { Image, Stack, Text, Title } from "@mantine/core";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";

import { Spacer } from "@/core/Spacer";
import { AppButton } from "@/feature/AppButton";

interface Props {
  statusCode: number;
  title: string;
  description?: string;
}

const CustomError: NextPage<Props> = ({ statusCode, title }): JSX.Element => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Stack w="100%" pt="md" flex={1} style={{ gap: 0 }}>
        <Title order={2} ta="center">
          <Text span inline fw="bold" fz="h2" c="#4E8CC2">
            {statusCode}
          </Text>
          <Text span inline fw="bold" ml="md" fz="h2" c="#37464A">
            {title}
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

CustomError.getInitialProps = async (contextData) => {
  const { res, err } = contextData;
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const title =
    err instanceof Error ? err.message : "予期しないエラーが発生しました";
  return { statusCode, title } as Props;
};

export default CustomError;
