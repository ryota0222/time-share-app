import { Container, Flex, Text, useMantineTheme } from "@mantine/core";
import Link from "next/link";
import { memo } from "react";

import { useScreen } from "@/hooks/useScreen";

export const Footer = memo(() => {
  const { isMinimumScreen } = useScreen();
  const theme = useMantineTheme();
  return (
    <Flex component="footer" py="md">
      <Container fluid w="100%">
        <Flex align="center" justify="space-between">
          <Text
            c="gray.6"
            fz="sm"
            style={{ letterSpacing: isMinimumScreen ? undefined : "4px" }}
          >
            v1.0.0-beta
          </Text>
          <Text
            c="gray.6"
            fz="sm"
            style={{ letterSpacing: isMinimumScreen ? undefined : "4px" }}
          >
            ©︎ryotanny
          </Text>
          <Flex>
            <Link href="https://portfolio.site.ryotanny.com">
              <Text
                c="gray.6"
                fz="sm"
                style={{
                  letterSpacing: isMinimumScreen ? undefined : "4px",
                  textDecorationColor: theme.colors.gray[6],
                }}
              >
                portfolio
              </Text>
            </Link>
            <Text
              c="gray.6"
              fz="sm"
              style={{
                letterSpacing: isMinimumScreen ? undefined : "4px",
                textDecoration: "none",
              }}
            >
              ・
            </Text>
            <Link href="https://twitter.com/ryota_des_eng">
              <Text
                c="gray.6"
                fz="sm"
                style={{
                  letterSpacing: isMinimumScreen ? undefined : "4px",
                  textDecorationColor: theme.colors.gray[6],
                }}
              >
                X
              </Text>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
});
