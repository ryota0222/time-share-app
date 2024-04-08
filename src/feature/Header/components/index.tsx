import { Box, Container, Flex, Image, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { memo } from "react";

import { APP_NAME } from "@/constants/meta";
import Link from "next/link";

export const Header = memo(() => {
  const router = useRouter();
  const isTopPage = router.pathname === "/";
  return (
    <Flex component="header" py="md">
      <Container fluid w="100%">
        {!isTopPage && (
          <Link href="/" style={{ textDecoration: "none" }}>
            <Flex align="center">
              <Image src="/logo_icon.png" alt="ロゴ" w={32} h={32} />
              <Title fz={16} c="black">
                {APP_NAME}
              </Title>
            </Flex>
          </Link>
        )}
      </Container>
    </Flex>
  );
});
