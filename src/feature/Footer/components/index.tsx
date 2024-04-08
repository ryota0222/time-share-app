import { Container, Flex, Text } from "@mantine/core";
import Link from "next/link";
import { memo } from "react";

import { useScreen } from "@/hooks/useScreen";

export const Footer = memo(() => {
  const { isMinimumScreen } = useScreen();
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
                style={{ letterSpacing: isMinimumScreen ? undefined : "4px" }}
              >
                portfolio
              </Text>
            </Link>
            <Text
              c="gray.6"
              fz="sm"
              style={{ letterSpacing: isMinimumScreen ? undefined : "4px" }}
            >
              ・
            </Text>
            <Link href="https://twitter.com/ryota_des_eng">
              <Text
                c="gray.6"
                fz="sm"
                style={{ letterSpacing: isMinimumScreen ? undefined : "4px" }}
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
