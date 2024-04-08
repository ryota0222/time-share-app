import { AlertIcon } from "@/core/icons/components/Alert";
import { InfoIcon } from "@/core/icons/components/Info";
import { notifications } from "@mantine/notifications";

interface NotificationProps {
  title: string;
  message: string;
}

export const showSuccessNotification = (props: NotificationProps) => {
  notifications.show({
    title: props.title,
    message: props.message,
    autoClose: 5000,
    radius: "lg",
    withBorder: true,
    icon: <InfoIcon width={18} height={18} color="white" />,
  });
};

export const showErrorNotification = (props: NotificationProps) => {
  notifications.show({
    title: props.title,
    message: props.message,
    autoClose: 5000,
    radius: "lg",
    withBorder: true,
    icon: <AlertIcon width={20} height={20} color="#FA5252" />,
  });
};
