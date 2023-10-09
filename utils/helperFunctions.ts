
import { notifications } from "@mantine/notifications";

export function notify(message: string, status: boolean) {
    notifications.show({
        title: status ? 'Success' : 'Failed',
        message,
        autoClose: 5000,
        color: status ? 'green' : 'red',
    });
}