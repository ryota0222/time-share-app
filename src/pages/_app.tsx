import "@/styles/globals.css";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { Container, createTheme, MantineProvider, Stack } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import { Footer } from "@/feature/Footer";
import { Header } from "@/feature/Header";
import { ReviewModalProvider } from "@/feature/ReviewModal/components";
import { notoSansJP } from "@/styles/font";

import type { AppProps } from "next/app";

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <ReviewModalProvider>
        <Stack gap={0} mih="100dvh">
          <Header />
          <Container
            component="main"
            className={notoSansJP.className}
            flex={1}
            fluid
            w="100%"
            display="flex"
            style={{ flexDirection: "column" }}
          >
            <Component {...pageProps} />
          </Container>
          <Footer />
        </Stack>
      </ReviewModalProvider>
    </MantineProvider>
  );
}
