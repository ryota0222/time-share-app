import {
  Flex,
  Loader,
  MantineStyleProp,
  Text,
  UnstyledButton,
} from "@mantine/core";
import Link from "next/link";
import { PropsWithChildren, memo } from "react";

import styles from "./styles.module.css";

interface Props {
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  href?: string;
  style?: MantineStyleProp;
}

export const AppButton = memo<PropsWithChildren<Props>>(
  ({ children, onClick, loading = false, disabled = false, href, style }) => {
    if (href) {
      return (
        <UnstyledButton component={Link} href={href}>
          <Flex
            h={50}
            px={24}
            py="md"
            gap="md"
            align="center"
            justify="center"
            className={styles.wrapper}
            style={{ borderRadius: 99, ...style }}
          >
            {loading && <Loader size="xs" color="gray" />}
            <Text span inline fz="sm" fw="bold">
              {children}
            </Text>
          </Flex>
        </UnstyledButton>
      );
    }
    return (
      <UnstyledButton onClick={onClick} disabled={disabled}>
        <Flex
          h={50}
          px={24}
          py="md"
          gap="md"
          align="center"
          justify="center"
          className={styles.wrapper}
          style={{ borderRadius: 99, ...style }}
        >
          {loading && <Loader size="xs" color="gray" />}
          <Text span inline fz="sm" fw="bold">
            {children}
          </Text>
        </Flex>
      </UnstyledButton>
    );
  }
);
