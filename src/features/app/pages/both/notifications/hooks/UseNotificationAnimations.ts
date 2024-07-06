import { UseNotifications } from '@features/app/reducers/NotificationReducer';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { Animated } from 'react-native';
import { NotificationData } from 'types/notification/Notification_Types';

interface NotificationAnimationState {
    height: Animated.Value;
    opacity: Animated.Value;
}

export const UseNotificationAnimation = (filterNotifications: NotificationData[]) => {

    const notificationAnimations: NotificationAnimationState[] = useMemo(() => {
        return filterNotifications.map(() => ({
            height: new Animated.Value(100),
            opacity: new Animated.Value(1),
        }));
    }, [filterNotifications]);

    const updateNotificationAnimations = useCallback(() => {
        return filterNotifications.map(() => ({
            height: new Animated.Value(100),
            opacity: new Animated.Value(1),
        }));
    }, [filterNotifications]);

    const animateOut = (index: number) => new Promise<void>((resolve) => {
        Animated.parallel([
            Animated.timing(notificationAnimations[index].height, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false
            }),
            Animated.timing(notificationAnimations[index].opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false
            })
        ]).start(() => resolve());
    });

    return { notificationAnimations, updateNotificationAnimations, animateOut };
};