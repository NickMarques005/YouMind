import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { SetStateAction, useEffect } from 'react'
import Animated, { useSharedValue, useAnimatedStyle, withDelay, withSpring, runOnJS, withTiming } from 'react-native-reanimated';
import images from '@assets/images';
import { NotificationData } from 'types/notification/Notification_Types';
import { UseLoading } from '@hooks/loading/UseLoading';
import { UseNotifications } from '@features/app/reducers/NotificationReducer';
import { UseNotificationConfig } from '../hooks/UseNotificationConfig';
import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';
import { MessageIcon } from '@components/modals/message/types/type_message_modal';
import { formatRelativeTime } from '@utils/date/DateFormatting';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { responsiveSize, screenWidth } from '@utils/layout/Screen_Size';
import { UseNotificationIcon } from '../hooks/UseNotificationIcon';
import { useNotificationAnimations } from '../hooks/UseNotificationAnimations';

interface NotificationsListProps {
    filteredNotifications: NotificationData[];
    userType: string;
    handleNotificationPress: (
        notification: NotificationData,
        removeNotification?: () => void
    ) => void;
    groupNotificationsBySender: (notifications: NotificationData[]) => NotificationData[];
}

interface NotificationItemProps {
    item: NotificationData;
    index: number;
    userType: string;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    HandleResponseAppSuccess: (message: string, messageType: MessageIcon) => void;
    HandleResponseAppError: (value: string) => void;
    handleNotificationPress: (
        notification: NotificationData,
        removeNotification?: () => void
    ) => void;
}

const NotificationList = ({ filteredNotifications, userType, handleNotificationPress, groupNotificationsBySender }: NotificationsListProps) => {
    const groupedNotifications = groupNotificationsBySender(filteredNotifications);
    const { loading, setLoading } = UseLoading();
    const { HandleResponseAppError, HandleResponseAppSuccess } = UseGlobalResponse();

    return (
        <FlatList
            style={styles.notificationsMessage_list}
            data={groupedNotifications}
            keyExtractor={(item, index) => item._id ? item._id.toString() : `group-${index}`}
            renderItem={({ item, index }) => (
                <NotificationItem
                    item={item as NotificationData}
                    index={index}
                    userType={userType}
                    setLoading={setLoading}
                    HandleResponseAppError={HandleResponseAppError}
                    HandleResponseAppSuccess={HandleResponseAppSuccess}
                    handleNotificationPress={handleNotificationPress}
                />
            )}
        />
    );
};

const NotificationItem = ({ item, index, userType, setLoading, HandleResponseAppError, HandleResponseAppSuccess, handleNotificationPress }: NotificationItemProps) => {
    const { handleRemove } = UseNotificationConfig({ setLoading, HandleResponseAppError, HandleResponseAppSuccess });
    const { translateX, translateY, opacity, height, animatedStyles, notificationAnimateIn, notificationAnimateOut } = useNotificationAnimations({ index, screenWidth: screenWidth, removeNotification: () => handleRemove(item._id) })
    const { handleNotificationIcon } = UseNotificationIcon();

    const swipeGesture = Gesture.Pan()
        .onUpdate((event) => {
            translateX.value = Math.max(event.translationX, 0);
        })
        .onEnd(() => {
            if (translateX.value > screenWidth * 0.5) {
                runOnJS(notificationAnimateOut)();
            } else {
                translateX.value = withSpring(0, { stiffness: 90, damping: 20 });
            }
        });


    useEffect(() => {
        notificationAnimateIn();
    }, []);

    return (
        <GestureHandlerRootView style={styles.container}>
            <GestureDetector gesture={swipeGesture}>
                <Animated.View style={[styles.notificationMessage_view, animatedStyles]}>
                    <TouchableOpacity onPress={() => handleNotificationPress(item, notificationAnimateOut)}>
                        <View style={styles.notificationMessageContainer_view}>
                            <View style={[styles.notificationMessageIcon_view, { borderColor: userType === 'patient' ? '#ba7ce6' : '#7cb3e6' }]}>
                                <Image
                                    style={styles.notificationMessageIcon_image}
                                    source={handleNotificationIcon(item)}
                                />
                            </View>
                            <View style={styles.notificationMessageContent_view}>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.notificationMessage_titleText, { color: `${userType === "patient" ? "#5f2b6e" : "#2b516e"}` }]}>{item.title}</Text>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.notificationMessage_bodyText, { color: `${userType === "patient" ? '#9a72ab' : "#72a8ab"}` }]}>{item.body}</Text>
                                <Text style={{ fontSize: 13, color: userType === 'patient' ? `#a192ad` : "#929dad" }}>{
                                    item.savePushDate ? formatRelativeTime(item.savePushDate) :
                                        item.data?.updatedAt ? formatRelativeTime(item.data.updatedAt) : ""
                                }</Text>
                            </View>
                            {
                                item.data?.group?.count &&
                                <View style={[styles.countView, { backgroundColor: userType === 'patient' ? '#754299' : '#428b99' }]}>
                                    <Text style={styles.countText}>{item.data.group.count}</Text>
                                </View>
                            }
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </GestureDetector>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
    notificationsMessage_list: {
    },
    notificationMessage_view: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#abacc4',
        justifyContent: 'center',
    },
    notificationMessageContainer_view: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 18,
        gap: 15,

    },
    notificationMessage_titleText: {
        fontSize: 16,
        fontWeight: 'bold',

    },
    notificationMessage_bodyText: {
        fontSize: 14,
    },
    notificationMessageIcon_view: {
        width: 60,
        borderRadius: 60,
        borderWidth: 1,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    notificationMessageIcon_image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    notificationMessageContent_view: {
        flex: 1,
        height: 70,
        justifyContent: 'center',
    },
    notificationRemoveIcon_view: {
        width: '10%',
        height: 70,
        justifyContent: 'center',
    },
    notificationRemoveIcon_button: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 20,
    },
    notificationRemoveIcon_image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    noNotifications_mainView: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    noNotificationsContent_view: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 25,
        top: -50
    },
    noNotificationsIcon_view: {
        display: 'flex',
        borderRadius: 5,
        overflow: 'hidden',
    },
    noNotificationsIcon_img: {
        width: 150,
        height: 150
    },
    noNotificationsInfo_view: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        width: '70%'
    },
    noNotificationsTitle_text: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1c1e40',
        textAlign: 'center',
    },
    noNotificationsSubtitle_text: {
        fontSize: 16,
        textAlign: 'center',
        width: 250,
        color: '#86879c'
    },
    countView: {
        borderRadius: 50,
        height: 40,
        width: 40,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    countText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',

    }
})

export default NotificationList;