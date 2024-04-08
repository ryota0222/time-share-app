import { Box, Stack, Text, TextInput, Title } from "@mantine/core";
import Head from "next/head";

import { APP_NAME } from "@/constants/meta";
import { useForm } from "@mantine/form";
import { Spacer } from "@/core/Spacer";
import { AppButton } from "@/feature/AppButton";
import { useCallback, useEffect } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useStore } from "@/lib/store";
import { notifications } from "@mantine/notifications";

const MAX_NAME_LENGTH = 25;

export default function CreateSpace() {
  const router = useRouter();
  const space = useStore((state) => state.space);
  const setSpace = useStore((state) => state.setSpace);
  const [value] = useLocalStorage({
    key: "user_name",
    defaultValue: "",
  });
  const form = useForm({
    initialValues: {
      space_name: value.length ? `${value}のスペース` : "",
    },
    validate: {
      space_name: (value) => {
        if (!value) {
          return "スペース名を入力してください";
        }
        if (value.length > MAX_NAME_LENGTH) {
          return `スペース名は${MAX_NAME_LENGTH}文字以内で入力してください`;
        }
        return null;
      },
    },
  });
  const joinSpace = useCallback(() => {
    console.log("join space");
    // todo
    router.push(`/space/${form.values.space_name}`);
  }, [router, form]);
  const handleButtonClick = useCallback(
    async (callback: () => void) => {
      const result = await form.validate();
      if (!result.hasErrors) {
        callback();
      }
    },
    [form]
  );
  useEffect(() => {
    console.log(value);
    if (value.length) {
      form.setFieldValue("space_name", `${value}のスペース`);
    }
  }, [value]);
  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
      </Head>
      <Stack w="100%" maw={400} mx="auto" align="center" h="100%">
        <Title fz="h2" my={64}>
          一時スペースの作成
        </Title>
        <TextInput
          w="100%"
          size="lg"
          required
          withAsterisk={false}
          maxLength={MAX_NAME_LENGTH}
          styles={{
            label: { fontWeight: "bold", fontSize: "1rem", marginBottom: 6 },
          }}
          label="スペース名を入力してください"
          {...form.getInputProps("space_name")}
        />
        <Text ta="right" c="gray.6" fz="sm" w="100%">
          {form.values.space_name.length}/{MAX_NAME_LENGTH}
        </Text>
      </Stack>
      <Spacer />
      <Stack maw={320} w="100%" mx="auto" gap={24} mb={80}>
        <AppButton onClick={() => handleButtonClick(joinSpace)}>次へ</AppButton>
      </Stack>
    </>
  );
}