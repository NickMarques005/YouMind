import { SetStateAction, useEffect, useState } from 'react';
import { NotificationData, TypeNotification } from 'types/notification/Notification_Types';

interface UseNotificationsFilterProps {
    typeNotificationsInitial: TypeNotification[];
    notifications: NotificationData[];
    setLoading: React.Dispatch<SetStateAction<boolean>>;
    loading: boolean;
}

export const UseNotificationFilter = ({ typeNotificationsInitial, notifications, setLoading, loading }: UseNotificationsFilterProps) => {
    const [typeNotifications, setTypeNotifications] = useState(typeNotificationsInitial);
    const [filteredNotifications, setFilteredNotifications] = useState<NotificationData[] | undefined>(undefined);
    const [currentType, setCurrentType] = useState<string | undefined>('all');

    const handleFilterNotifications = (index: number) => {
        const updatedTypeNotifications = typeNotifications.map((item, i) => ({
            ...item,
            isOn: i === index,
        }));

        setCurrentType(typeNotifications[index].type);
        setTypeNotifications(updatedTypeNotifications);
    };

    useEffect(() => {
        const updatedNotifications = notifications.filter(notification => {
            if (currentType === 'all') {
                return notification;
            } else {
                return notification.data?.notify_type === currentType;
            }
        });
        setFilteredNotifications(updatedNotifications);
        if (loading) {
            setLoading(false);
        }
    }, [currentType, notifications, setLoading]);

    return { typeNotifications, currentType, filteredNotifications, handleFilterNotifications };
};