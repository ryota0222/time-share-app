import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { memo, useState } from "react";

import { ChevronBackIcon } from "@/core/icons/components/ChevronBack";
import { ChevronForwardIcon } from "@/core/icons/components/ChevronForward";
import { Spacer } from "@/core/Spacer";

import classNames from "../styles/style.module.css";

interface Props {
  close: () => void;
}

export const ChromeInstruction = memo<Props>(({ close }) => {
  const theme = useMantineTheme();
  const [step, setStep] = useState(1);
  return (
    <>
      <Box
        w={16}
        h={16}
        style={{
          borderRadius: 8,
          zIndex: 1000,
          transform: "translateX(-8px) translateY(-8px)",
        }}
        bg="rgb(30 30 30 / 80%)"
        pos="fixed"
        left="50%"
        top={0}
      />
      <Box mb={60}>
        <Stack
          bg="rgb(30 30 30 / 80%)"
          w="90vw"
          p="md"
          align="center"
          className={classNames.chromeWrapper}
          onClick={(e) => e.stopPropagation()}
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
            src="/instruction/chrome-step1.png"
            alt="ステップ１の画像"
            display={step === 1 ? "block" : "none"}
          />
          <Image
            src="/instruction/chrome-step2.png"
            alt="ステップ2の画像"
            display={step === 2 ? "block" : "none"}
          />
          <Image
            src="/instruction/step3.png"
            alt="ステップ3の画像"
            display={step === 3 ? "block" : "none"}
          />
          <Text c="white">Chromeの場合</Text>
        </Stack>
        <Flex justify="space-between" w="100%" px="md" mt="md">
          {step > 1 ? (
            <Button
              size="compact-sm"
              leftSection={<ChevronBackIcon />}
              variant="transparent"
              color="black"
              onClick={(e) => {
                e.stopPropagation();
                setStep(step - 1);
              }}
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
              onClick={(e) => {
                e.stopPropagation();
                setStep(step + 1);
              }}
            >
              次へ
            </Button>
          ) : (
            <Button
              size="compact-sm"
              variant="transparent"
              color="black"
              onClick={(e) => {
                e.stopPropagation();
                setStep(1);
                close();
              }}
            >
              終了
            </Button>
          )}
        </Flex>
      </Box>
      <Spacer />
    </>
  );
});
