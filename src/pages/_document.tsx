import { ColorSchemeScript } from "@mantine/core";
import { Html, Head, Main, NextScript } from "next/document";

import { APP_DESCRIPTION } from "@/constants/meta";

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <ColorSchemeScript defaultColorScheme="light" />
        <meta name="description" content={APP_DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
