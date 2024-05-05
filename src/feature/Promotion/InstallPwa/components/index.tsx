import {
  ActionIcon,
  Button,
  CloseIcon,
  Flex,
  Overlay,
  Stack,
  Text,
  Transition,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";

import { ChromeInstruction } from "./ChromeInstruction";
import { SafariInstruction } from "./SafariInstruction";

export const isBrowser = typeof window !== "undefined";

const isIOSChromeBrowser = () => {
  const ua = window.navigator.userAgent.toLowerCase();
  // iOSデバイスかどうかのチェック
  if (ua.indexOf("iphone") !== -1 || ua.indexOf("ipad") !== -1) {
    // Safariかどうかのチェック
    if (ua.indexOf("chrome") !== -1 || ua.indexOf("crios") !== -1) {
      return true;
    }
  }
  return false;
};

/**
 * PWAの表示モードの取得
 * - twa(Trusted Web Activity)
 * - standalone
 * - browser
 * @returns {twa | standalone | browser | null}
 */
export const getPWADisplayMode = () => {
  if (isBrowser) {
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;
    if (document.referrer.startsWith("android-app://")) {
      return "twa";
    } else if ((navigator as any).standalone || isStandalone) {
      return "standalone";
    }
    return "browser";
  }
  return null;
};

export const PromotionInstallPwaBanner = memo(() => {
  let deferredPrompt: Event | null = null;
  const [listOfInstalledApps, setListOfInstalledApps] = useState<Array<{
    platform: string;
    id: string;
    url: string;
    version: string;
  }> | null>(null);
  const [installed, setInstalled] = useState(false);
  const [show, setShow] = useState(false);
  const [opened, { open, close }] = useDisclosure();
  /**
   * 以下の条件でバナーを表示
   * - このページをブラウザで表示している
   * - アプリをインストールしていない
   * - すでにインストールの処理を行っていない
   * - バナーの非表示フラグが立っていない
   */
  const isDisplay = useMemo(
    () =>
      getPWADisplayMode() === "browser" &&
      listOfInstalledApps?.length === 0 &&
      !installed &&
      !show,
    [listOfInstalledApps, installed, show]
  );
  useEffect(() => {
    void (async (): Promise<void> => {
      try {
        const list = await (navigator as any).getInstalledRelatedApps();
        if (typeof list === "object") {
          setListOfInstalledApps(list);
          if (list.length === 0) {
            // イベントの登録
            // - beforeinstallpromptイベント
            window.addEventListener("beforeinstallprompt", (e) => {
              // Prevent the mini-infobar from appearing on mobile
              e.preventDefault();
              deferredPrompt = e;
              // Stash the event so it can be triggered later.
              // Optionally, send analytics event that PWA install promo was shown.
            });
            // - appinstalledイベント
            window.addEventListener("appinstalled", () => {
              setInstalled(true);
              // Clear the deferredPrompt so it can be garbage collected
              deferredPrompt = null;
              // Optionally, send analytics event to indicate successful install
              console.log("PWA was installed");
            });
          }
        }
      } catch (err) {
        console.error(err);
        setListOfInstalledApps([]);
      }
    })();
  }, []);
  // モーダルインストールダイアログの表示
  const showModalInstallDialog = useCallback(async () => {
    if (deferredPrompt !== null) {
      // Show the install prompt
      (deferredPrompt as any).prompt();
      // Wait for the user to respond to the prompt
      const { outcome } = await (deferredPrompt as any).userChoice;
      // Optionally, send analytics event with outcome of user choice
      console.log(`User response to the install prompt: ${outcome}`);
      // We've used the prompt, and can't use it again, throw it away
      deferredPrompt = null;
    } else {
      open();
    }
  }, [deferredPrompt]);
  return (
    <>
      <Flex
        w="100%"
        h={isDisplay ? 40 : 0}
        opacity={isDisplay ? 1 : 0}
        bg="#33333380"
        align="center"
        aria-hidden={!isDisplay}
        px="sm"
        gap="xs"
        style={{ transition: "all 0.3s" }}
      >
        <Text span inline c="white" fz="sm" flex={1}>
          ホーム画面にインストールできます
        </Text>
        <Button
          size="compact-sm"
          radius="xl"
          fz="xs"
          w={90}
          tabIndex={isDisplay ? 0 : -1}
          onClick={showModalInstallDialog}
          className="text-white bg-blue-500 py-2 px-3 rounded-full text-xs"
        >
          インストール
        </Button>
        <ActionIcon
          variant="light"
          aria-label="閉じる"
          tabIndex={isDisplay ? 0 : -1}
          color="white"
          radius="xl"
          onClick={() => setShow(true)}
        >
          <CloseIcon width={12} height={12} />
        </ActionIcon>
      </Flex>
      <Transition
        mounted={opened}
        transition="fade"
        duration={400}
        timingFunction="ease"
      >
        {(styles) => (
          <>
            <Overlay
              color="#FFF"
              backgroundOpacity={0.5}
              blur={6}
              pos="fixed"
              top={0}
              left={0}
              style={styles}
            ></Overlay>
            <Stack
              align="center"
              justify="center"
              pos="fixed"
              h="100dvh"
              pt={isIOSChromeBrowser() ? 80 : "xl"}
              w="100%"
              bottom={0}
              left={0}
              style={{ ...styles, zIndex: 1000 }}
              onClick={close}
            >
              {isIOSChromeBrowser() ? (
                <ChromeInstruction close={close} />
              ) : (
                <SafariInstruction close={close} />
              )}
            </Stack>
          </>
        )}
      </Transition>
    </>
  );
});
