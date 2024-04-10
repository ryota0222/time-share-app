import { Image, Stack, Text, useMantineTheme } from "@mantine/core";
import { memo } from "react";

import { Space, useStore } from "@/lib/store";

interface Props {
  space: Space | null;
}

export const InformationPanel = memo<Props>(({ space }) => {
  const theme = useMantineTheme();
  const username = useStore((state) => state.username);
  return (
    <Stack
      w="100%"
      p={24}
      bg="gray.0"
      align="center"
      style={{ borderRadius: theme.radius.lg }}
    >
      <Image src="/light-bulb.png" w={32} h={32} alt="アイコン" />
      <Text w="100%" c="gray.6">
        ※このスペースはゲスト用の一時スペースです。
        {space?.owner === username
          ? "タブを閉じるとスペースは消去され、参加中のユーザーもスペースから外れます。"
          : ""}
      </Text>
    </Stack>
  );
});
