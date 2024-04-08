import { Box, Stack, Text, TextInput } from "@mantine/core";
import Head from "next/head";
import Avatar from "boring-avatars";

import { APP_NAME } from "@/constants/meta";
import { useForm } from "@mantine/form";
import { Spacer } from "@/core/Spacer";
import { AppButton } from "@/feature/AppButton";
import { useCallback, useRef } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";

const MAX_NAME_LENGTH = 20;

export default function UserName() {
  const router = useRouter();
  const [value, setValue] = useLocalStorage({
    key: "user_name",
    defaultValue: "",
  });
  const form = useForm({
    initialValues: {
      user_name: value,
    },
    validate: {
      user_name: (value) => {
        if (!value) {
          return "名前を入力してください";
        }
        if (value.length > MAX_NAME_LENGTH) {
          return `名前は${MAX_NAME_LENGTH}文字以内で入力してください`;
        }
        return null;
      },
    },
  });
  const joinSpace = useCallback(() => {
    console.log("join space");
    router.push("/space/join");
  }, [router]);
  const createSpace = useCallback(() => {
    console.log("create space");
    router.push("/space/create");
  }, [router]);
  const handleButtonClick = useCallback(
    async (callback: () => void) => {
      const result = await form.validate();
      if (!result.hasErrors) {
        setValue(form.values.user_name);
        callback();
      }
    },
    [form, setValue]
  );
  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
      </Head>
      <Spacer />
      <Stack w="100%" maw={400} mx="auto" align="center" h="100%">
        <Avatar
          size={120}
          name={form.values.user_name}
          variant="beam"
          colors={["#0A0310", "#49007E", "#FF005B", "#FF7D10", "#FFB238"]}
        />
        <TextInput
          w="100%"
          size="lg"
          required
          withAsterisk={false}
          maxLength={MAX_NAME_LENGTH}
          styles={{
            label: { fontWeight: "bold", fontSize: "1rem", marginBottom: 6 },
          }}
          label="名前を入力してください"
          {...form.getInputProps("user_name")}
        />
        <Text ta="right" c="gray.6" fz="sm" w="100%">
          {form.values.user_name.length}/{MAX_NAME_LENGTH}
        </Text>
      </Stack>
      <Spacer />
      <Stack maw={320} w="100%" mx="auto" gap={24} mb={80}>
        <AppButton onClick={() => handleButtonClick(joinSpace)}>
          スペースに参加
        </AppButton>
        <AppButton onClick={() => handleButtonClick(createSpace)}>
          一時スペースを作成
        </AppButton>
      </Stack>
    </>
  );
}
