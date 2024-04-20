import {
  ActionIcon,
  Box,
  Button,
  Center,
  CloseIcon,
  Flex,
  Image,
  Overlay,
  Stack,
  Text,
  Transition,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";

import { ChevronBackIcon } from "@/core/icons/components/ChevronBack";
import { ChevronForwardIcon } from "@/core/icons/components/ChevronForward";
import { Spacer } from "@/core/Spacer";

import classNames from "../styles/style.module.css";

export const isBrowser = typeof window !== "undefined";

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
  const [isOff, setIsOff] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [opened, { open, close }] = useDisclosure();
  const [step, setStep] = useState(1);
  const theme = useMantineTheme();
  /**
   * 以下の条件でバナーを表示
   * - このページをブラウザで表示している
   * - アプリをインストールしていない
   * - すでにインストールの処理を行っていない
   * - バナーの非表示フラグが立っていない
   * - PWAのインストール機能にブラウザが対応している
   */
  const isDisplay = useMemo(
    () =>
      getPWADisplayMode() === "browser" &&
      listOfInstalledApps?.length === 0 &&
      !installed &&
      !isOff &&
      isSupported,
    [listOfInstalledApps, installed, isOff, isSupported]
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
              console.log("called");
              // Stash the event so it can be triggered later.
              deferredPrompt = e;
              // Optionally, send analytics event that PWA install promo was shown.
              console.log(`'beforeinstallprompt' event was fired.`);
              setIsSupported(true);
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
          onClick={() => setIsOff(true)}
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
              pt="xl"
              w="100%"
              bottom={0}
              left={0}
              style={{ ...styles, zIndex: 1000 }}
            >
              <UnstyledButton onClick={close}>
                <Center
                  w={48}
                  h={48}
                  p="xs"
                  style={{
                    border: `solid 1px ${theme.colors.gray[8]}`,
                    borderRadius: theme.radius.xl,
                  }}
                >
                  <CloseIcon width={32} height={32} />
                </Center>
                <Text
                  fz="xs"
                  fw="bold"
                  style={{ letterSpacing: 2 }}
                  ta="center"
                  mt={6}
                >
                  閉じる
                </Text>
              </UnstyledButton>
              <Spacer />
              <Box mb={60}>
                <Stack
                  bg="rgb(30 30 30 / 80%)"
                  w="90vw"
                  p="md"
                  align="center"
                  className={classNames.wrapper}
                >
                  <Flex align="center" gap="md">
                    <Center
                      w={40}
                      h={40}
                      bg="white"
                      style={{ borderRadius: theme.radius.xl }}
                    >
                      <Text fw="bold" fz="lg">
                        {step}
                      </Text>
                    </Center>
                    <Text fw="bold" c="white">
                      {step === 1 && <>共有アイコンをタップ</>}
                      {step === 2 && <>「ホーム画面に追加」をタップ</>}
                      {step === 3 && <>「追加」をタップ</>}
                    </Text>
                  </Flex>
                  <Image
                    src="/instruction/step1.png"
                    alt="ステップ１の画像"
                    display={step === 1 ? "block" : "none"}
                  />
                  <Image
                    src="/instruction/step2.png"
                    alt="ステップ2の画像"
                    display={step === 2 ? "block" : "none"}
                  />
                  <Image
                    src="/instruction/step3.png"
                    alt="ステップ3の画像"
                    display={step === 3 ? "block" : "none"}
                  />
                  {/*  */}
                </Stack>
                <Flex justify="space-between" w="100%" px="md" mt="md">
                  {step > 1 ? (
                    <Button
                      size="compact-sm"
                      leftSection={<ChevronBackIcon />}
                      variant="transparent"
                      color="black"
                      onClick={() => setStep(step - 1)}
                    >
                      前へ
                    </Button>
                  ) : (
                    <Box component="span" />
                  )}
                  {step < 3 ? (
                    <Button
                      size="compact-sm"
                      rightSection={<ChevronForwardIcon />}
                      variant="transparent"
                      color="black"
                      onClick={() => setStep(step + 1)}
                    >
                      次へ
                    </Button>
                  ) : (
                    <Button
                      size="compact-sm"
                      variant="transparent"
                      color="black"
                      onClick={() => {
                        setStep(1);
                        close();
                      }}
                    >
                      終了
                    </Button>
                  )}
                </Flex>
              </Box>
            </Stack>
            <Box
              w={16}
              h={16}
              style={{
                borderRadius: 8,
                zIndex: 1000,
                transform: "translateX(-8px) translateY(8px)",
              }}
              bg="#1E1E1E80"
              pos="fixed"
              left="50%"
              bottom={0}
            />
          </>
        )}
      </Transition>
    </>
  );
});
