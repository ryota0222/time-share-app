import {
  Box,
  Center,
  Flex,
  Title,
  Tooltip,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import BoringAvatar from "boring-avatars";
import { Fragment, memo, useEffect } from "react";
import { useCopyToClipboard } from "react-use";

import { AddIcon } from "@/core/icons";
import { showSuccessNotification } from "@/feature/Notification";
import { Space } from "@/lib/store";

import { unescapeSpaceName } from "../../functions/converter";

interface Props {
  space: Space | null;
}

export const SpaceNameArea = memo<Props>(({ space }) => {
  const [state, copyToClipboard] = useCopyToClipboard();
  const theme = useMantineTheme();
  const spaceName = unescapeSpaceName(space?.name || "");

  useEffect(() => {
    if (state.value) {
      showSuccessNotification({
        title: "スペース名をコピーしました",
        message: "招待したいユーザーにスペース名を共有してください",
      });
    }
  }, [state]);

  return (
    <Flex align="center" gap="md">
      <Title fz="h2">{spaceName}</Title>
      {space && (
        <Flex align="center">
          {space?.members.map((member, idx) => (
            <Fragment key={member}>
              <Tooltip
                label={member}
                withArrow
                events={{ hover: true, focus: true, touch: true }}
              >
                <Flex
                  ml={idx !== 0 ? -16 : 0}
                  style={{
                    border: `solid 1px ${theme.colors.gray[3]}`,
                    borderRadius: 25,
                  }}
                >
                  <BoringAvatar
                    size={48}
                    name={member}
                    variant="beam"
                    colors={[
                      "#0A0310",
                      "#49007E",
                      "#FF005B",
                      "#FF7D10",
                      "#FFB238",
                    ]}
                  />
                </Flex>
              </Tooltip>
            </Fragment>
          ))}
          <Box ml={-16}>
            <Tooltip
              label="招待"
              withArrow
              events={{ hover: true, focus: true, touch: true }}
            >
              <UnstyledButton
                onClick={() => {
                  copyToClipboard(space?.name || "");
                }}
              >
                <Center
                  bg="gray.0"
                  style={{
                    border: `solid 1px ${theme.colors.gray[3]}`,
                    borderRadius: 25,
                  }}
                  w={50}
                  h={50}
                >
                  <AddIcon color="#4DABF7" />
                </Center>
              </UnstyledButton>
            </Tooltip>
          </Box>
        </Flex>
      )}
    </Flex>
  );
});
