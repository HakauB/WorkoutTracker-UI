import { notification } from "antd";

export type Notification = {
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    title: string;
    message?: string;
}

export const openNotification = (notificationn: Omit<Notification, 'id'>) => {
    notification.open({
        message: notificationn.title,
        description: notificationn.message,
        type: notificationn.type,
    });
}

