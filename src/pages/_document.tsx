import { ColorSchemeScript } from "@mantine/core";
import { Html, Head, Main, NextScript } from "next/document";

import { APP_DESCRIPTION, APP_NAME } from "@/constants/meta";

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <ColorSchemeScript defaultColorScheme="light" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={APP_DESCRIPTION} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:site_name" content={APP_NAME} />
        <link
          rel="icon alternate"
          type="image/png"
          sizes="32x32"
          href="https://time-share.site.ryotanny.com/favicon-32x32.png"
        />
        <link
          rel="icon alternate"
          type="image/png"
          sizes="16x16"
          href="https://time-share.site.ryotanny.com/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://time-share.site.ryotanny.com/apple-touch-icon.png"
        />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
