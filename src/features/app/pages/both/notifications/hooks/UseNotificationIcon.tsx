import images from "@assets/images";
import { useIconHandling } from "@hooks/users/UseIconHandling";
import { NotificationData } from "types/notification/Notification_Types";


export const UseNotificationIcon = () => {
    const { handleUserIcon } = useIconHandling();
    const defaultIconNotifications = images.generic_images.notifications.youmind_notifications;

    const handleNotificationIcon = (notification: NotificationData) => {
        const notificationType = notification.data?.notify_type;

        switch (notificationType){
            case 'chat':
                const senderAvatar = notification.data?.sender_params?.avatar;
                const senderType = notification.data?.sender_params?.type;
                return handleUserIcon({
                    userAvatar: senderAvatar,
                    userType: senderType,
                    defaultAppIcon: defaultIconNotifications
                })

            case 'treatment':
                return defaultIconNotifications;
            case 'ble':
                return defaultIconNotifications;
            case 'update':
                return defaultIconNotifications;
            default:
                return defaultIconNotifications
        }
    }


    return { handleNotificationIcon }
}