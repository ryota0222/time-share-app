import {
  Box,
  CloseButton,
  Flex,
  Image,
  Modal,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";

import { APP_NAME } from "@/constants/meta";

interface ReviewModalContextInterface {
  opened: boolean;
  open: () => void;
  close: () => void;
}

const ReviewModalContext = createContext<ReviewModalContextInterface | null>(
  null
);

export const ReviewModalProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [opened, { open, close }] = useDisclosure();
  const theme = useMantineTheme();
  const value = useMemo(() => ({ opened, open, close }), [opened, open, close]);
  // ツイッター共有用URLの取得
  const twitterShareUrl = useMemo(() => {
    const baseUrl = "https://twitter.com/intent/tweet?";
    const text = ["text", process.env.NEXT_PUBLIC_APP_NAME as string];
    const hashtags = ["hashtags", process.env.NEXT_PUBLIC_APP_NAME as string];
    const shareUrl = [
      "url",
      `${process.env.NEXT_PUBLIC_APP_URL}?utm_source=twitter`,
    ];
    const query = new URLSearchParams([text, hashtags, shareUrl]).toString();
    return `${baseUrl}${query}`;
  }, []);
  // Facebook共有用URLの取得
  const facebookShareUrl = useMemo(() => {
    const baseUrl = "https://www.facebook.com/sharer/sharer.php?";
    const shareUrl = [
      "u",
      `${process.env.NEXT_PUBLIC_APP_URL}?utm_source=facebook`,
    ];
    const query = new URLSearchParams([shareUrl]).toString();
    return `${baseUrl}${query}`;
  }, []);
  // LINE共有用URLの取得
  const lineShareUrl = useMemo(() => {
    const baseUrl = "https://social-plugins.line.me/lineit/share?";
    const shareUrl = [
      "url",
      `${process.env.NEXT_PUBLIC_APP_URL}?utm_source=line`,
    ];
    const query = new URLSearchParams([shareUrl]).toString();
    return `${baseUrl}${query}`;
  }, []);
  return (
    <ReviewModalContext.Provider value={value}>
      {children}
      <Modal
        opened={opened}
        onClose={close}
        radius="lg"
        centered
        withCloseButton={false}
        size="min(640px, 90vw)"
        overlayProps={{ bg: "#00000040" }}
        styles={{
          body: {
            padding: 0,
            position: "relative",
          },
        }}
      >
        <Box pos="absolute" right={16} top={16}>
          <CloseButton onClick={close} />
        </Box>
        <Title size="h4" order={2} ta="center" py={40}>
          {APP_NAME}はいかがでしたか？
        </Title>
        <Box mx="lg" pos="relative" pb={72}>
          <Box
            w="100%"
            p="lg"
            pb={110}
            bg="#FFF9F0"
            style={{ borderRadius: 200 }}
          >
            <Text c="#8B7D57" ta="center" fw="normal">
              もしよければ、拡散にご協力ください！
            </Text>
            <Flex mt={20} justify="center" gap={40}>
              <Link
                href={lineShareUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Box
                  style={{
                    border: `solid 4px white`,
                    borderRadius: theme.radius.xl,
                  }}
                >
                  <Image src="/line_logo.png" alt="LINEで拡散" w={40} h={40} />
                </Box>
              </Link>
              <Link
                href={twitterShareUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Box
                  style={{
                    border: `solid 4px white`,
                    borderRadius: theme.radius.xl,
                  }}
                >
                  <Image src="/x_logo.svg" alt="Xで拡散" w={40} h={40} />
                </Box>
              </Link>
              <Link
                href={facebookShareUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Box
                  style={{
                    border: `solid 4px white`,
                    borderRadius: theme.radius.xl,
                  }}
                >
                  <Image
                    src="/facebook_logo.svg"
                    alt="Facebookで拡散"
                    w={40}
                    h={40}
                  />
                </Box>
              </Link>
            </Flex>
          </Box>
          <Image
            role="presentation"
            src="/review-image.png"
            alt="画像"
            w="70%"
            h="auto"
            maw={440}
            m="auto"
            pos="absolute"
            bottom={0}
            left="50%"
            style={{ transform: "translate(-50%)" }}
          />
        </Box>
      </Modal>
    </ReviewModalContext.Provider>
  );
};

export const useReviewModalContext = () => useContext(ReviewModalContext);
