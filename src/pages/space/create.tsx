import { Stack, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

import { Spacer } from "@/core/Spacer";
import { AppButton } from "@/feature/AppButton";
import { showErrorNotification } from "@/feature/Notification";
import { useUsernameRoute } from "@/hooks/useUsernameRoute";
import { useStore } from "@/lib/store";

const MAX_NAME_LENGTH = 25;

export default function CreateSpace() {
  const router = useRouter();
  const setSpace = useStore((state) => state.setSpace);
  const username = useStore((state) => state.username);
  const [pending, setPending] = useState(false);
  const form = useForm({
    initialValues: {
      space_name: username.length ? `${username}のスペース` : "",
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
  const createSpace = useCallback(async () => {
    if (pending) return;
    setPending(true);
    const response = await axios.post("/api/space/create", {
      space: form.values.space_name,
      username,
    });
    if (response.status === 200) {
      setSpace(response.data);
      router.push(`/space/${form.values.space_name}`);
    } else {
      showErrorNotification({
        title: "スペースの作成に失敗しました",
        message: response.data,
      });
    }
    setPending(false);
  }, [router, form, username, setSpace, pending]);
  const handleButtonClick = useCallback(
    async (callback: () => void) => {
      const result = await form.validate();
      if (!result.hasErrors) {
        callback();
      }
    },
    [form]
  );
  useUsernameRoute();
  return (
    <>
      <Stack w="100%" maw={400} mx="auto" align="center" h="100%">
        <Title fz="h2" mt={64} mb="xl">
          一時スペースの作成
        </Title>
        <Text mb="xl">
          スペース名は、計測を共有する相手に教える名前です。わかりやすい名前がおすすめです✨
        </Text>
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
        <AppButton
          loading={pending}
          onClick={() => handleButtonClick(createSpace)}
        >
          次へ
        </AppButton>
      </Stack>
    </>
  );
}
