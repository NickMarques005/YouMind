import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { NotificationData, UseNotifications } from '../../contexts/NotificationsContext';
import { screenHeight, screenWidth } from '../screen_size/Screen_Size';
import { AppStackTypes } from '../../routes/MainRouter';
import { UseAuth } from '../../contexts/AuthContext';
import { ConvertISODate } from '../../functions/dates/ConvertDate';
import ModalNotification from './ModalNotification';
import { UseForm } from '../../contexts/FormContext';
import HandleNotification from './HandleNotification';

export interface RequestInitializeTreatmentData {
    url: string;
    method: string;
    data: {
        email_1: string;
        email_2: string;
    }
}

function Notifications() {
    const { authData } = UseAuth();
    const { formData } = UseForm();
    const { notifications, removeNotification } = UseNotifications();
    const [filteredNotifications, setFilteredNotifications] = useState(notifications);
    const [notificationModal, setNotificationModal] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState<any | null>(null);
    const navigation = useNavigation<AppStackTypes>();
    const [notificationLoading, setNotificationLoading] = useState(false);

    const [notificationHeights, setNotificationHeights] = useState(
        notifications ? notifications.map(() => ({
            height: new Animated.Value(100),
            opacity: new Animated.Value(1)
        })) : []
    );

    const updateNotificationHeights = useCallback(() => {
        setNotificationHeights(notifications.map(() => ({ height: new Animated.Value(100), opacity: new Animated.Value(1) })));
    }, [notifications]);

    useEffect(() => {
        updateNotificationHeights();
    }, [notifications, updateNotificationHeights]);

    const removeNotificationItemAnimation = (index: number) => {

        console.log(notificationHeights);
        Animated.sequence([
            Animated.timing(notificationHeights[index].opacity, {
                toValue: 0,
                duration: 250,
                useNativeDriver: false,
                easing: Easing.bezier(0.4, 0.6, 0.1, 0.9),
            }),
            Animated.timing(notificationHeights[index].height, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false,
                easing: Easing.bezier(0.4, 0.6, 0.1, 0.9),
            })
        ]).start(() => {
            handleRemoveNotification(notifications[index]);
        });
    };

    // TYPE NOTIFICATIONS
    const [requestData, setRequestData] = useState<RequestInitializeTreatmentData | undefined>(undefined);

    const typeNotificationFunction = (notification: NotificationData, type_function: string) => {
        if (notification.data?.notify_function === "solicitation") {

            switch (type_function) {
                case 'decline':
                    console.log("decline function...");
                    handleRemoveNotification(notification);
                    handleCloseSpecificNotification();
                    break;
                case 'accept':
                    const url_treatment = 'initializeTreatment';
                    const requestData: RequestInitializeTreatmentData = {
                        url: url_treatment,
                        method: 'POST',
                        data: {
                            email_1: formData.email,
                            email_2: notification.data?.sender.email
                        },

                    }
                    console.log(requestData);
                    if (requestData) {
                        handleRemoveNotification(notification);
                        handleCloseSpecificNotification();
                        setRequestData(requestData);
                        setNotificationLoading(true);
                    }

                    break;
                default:
                    break;
            }
        }
    }

    const [typeNotifications, setTypeNotifications] = useState([
        { typeName: "Todos", isOn: true, type: 'all' },
        { typeName: "Tratamento", isOn: false, type: 'treatment' },
        { typeName: "Chat", isOn: false, type: 'chat' },
        { typeName: "Atualizações", isOn: false, type: 'update' }
    ]);

    const [currentType, setCurrentType] = useState<string | undefined>(undefined);

    //HANDLE FUNCTIONS

    const handleNotificationPress = (notification: NotificationData) => {
        setSelectedNotification(notification);
        setNotificationModal(true);
    }

    const handleCloseSpecificNotification = () => {
        setSelectedNotification(undefined);
        setNotificationModal(!notificationModal);
    }

    const handleCloseNotifications = () => {
        console.log("NOTIFICATIONS");
        navigation.navigate('mainPage');
    }

    const handleFilterButton = (index: any) => {
        // Atualize o estado isOn do botão clicado e os outros botões
        const updatedTypeNotifications = typeNotifications.map((item, i) => ({
            ...item,
            isOn: i === index,
        }));

        setCurrentType(typeNotifications[index].type);
        // Atualize o estado com as novas configurações dos botões
        setTypeNotifications(updatedTypeNotifications);
    };

    const filterNotification = (index: any) => {
        handleFilterButton(index);
    }

    const handleRemoveNotification = (notification: any) => {
        removeNotification(notification);
    }

    const handleLoadingResponse = () => {
        console.log("Set Loading Response");
        setNotificationLoading(false);
    }

    const back_icon = authData.type == 'patient' ? require('../../assets/init/back/default_back_patient_type.png') : require('../../assets/init/back/default_back_doctor_type.png');


    useEffect(() => {
        const updatedNotifications = notifications.filter((notification) => {
            if (typeNotifications[0].isOn) {
                // Se "Todos" está selecionado, todas as notificações são exibidas
                return true;
            } else {
                // Verifica se a notificação possui o tipo selecionado
                return notification.data?.notify_type === currentType;
            }
        })

        setFilteredNotifications(updatedNotifications);
    }, [typeNotifications, notifications]);

    return (
        <View style={notificationsStyle.notifications_mainView}>

            <LinearGradient
                colors={['transparent', 'rgba(207, 195, 230, 0.5)', 'rgba(178, 124, 196, 0.4)']}
                start={{ x: 0, y: 0.3 }}
                end={{ x: 0, y: 1 }}
                style={notificationsStyle.notificationsHeader_view}>

                <View style={{ width: '100%', alignItems: 'flex-end', }}>
                    <TouchableOpacity style={notificationsStyle.notificationsClose_button} onPress={() => handleCloseNotifications()}>
                        <Image
                            style={notificationsStyle.notificationsClose_img}
                            source={require('../../assets/init/back/default_back_type1.png')}
                        />
                    </TouchableOpacity>
                    <View style={notificationsStyle.notificationsTitle_view}>
                        <Text style={notificationsStyle.notificationsTitle_text}>Notificações</Text>
                    </View>
                </View>

                <View style={notificationsStyle.typeNotifications_view}>
                    {
                        typeNotifications.map((item, index) => (
                            <LinearGradient
                                colors={[`${item.isOn ? '#2b425e' : 'transparent'}`, `${item.isOn ? '#651e69' : 'transparent'}`, `${item.isOn ? "#9853b8" : 'transparent'}`,]}
                                start={{ x: 0.1, y: 0 }}
                                end={{ x: 0.8, y: 0.8 }}
                                key={index}
                                style={notificationsStyle.typeNotificationsTemplate_view}>
                                <TouchableOpacity
                                    style={notificationsStyle.typeNotificationsTemplate_button}
                                    onPress={() => filterNotification(index)}
                                >
                                    <Text style={{ color: item.isOn ? 'white' : '#1c1b30' }}>{item.typeName}</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        ))
                    }
                </View>

            </LinearGradient>
            <View style={notificationsStyle.notificationMessageList_view}>
                {
                    notifications.length != 0 ?
                        <FlatList
                            style={notificationsStyle.notificationsMessage_list}
                            data={filteredNotifications}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <Animated.View style={[notificationsStyle.notificationMessage_view, {
                                    height: notificationHeights[index] ? notificationHeights[index].height : 100, opacity: notificationHeights[index] ? notificationHeights[index].opacity : 1
                                }]}>
                                    <TouchableOpacity onPress={() => handleNotificationPress(item)} style={{}}>
                                        <View style={notificationsStyle.notificationMessageContainer_view}>
                                            <View style={notificationsStyle.notificationMessageIcon_view}>
                                                <Image
                                                    style={notificationsStyle.notificationMessageIcon_image}
                                                    source={require('../../assets/init/notifications/youMind_notification.png')}
                                                />
                                            </View>
                                            <View style={notificationsStyle.notificationMessageContent_view}>
                                                {
                                                    notifications ?
                                                        <>
                                                            <View style={{}}>
                                                                <Text numberOfLines={1} ellipsizeMode='tail' style={[notificationsStyle.notificationMessage_titleText, { color: `${authData.type === "patient" ? "#5f2b6e" : "#2b516e"}` }]}>{item.title}</Text>
                                                                <Text numberOfLines={1} ellipsizeMode='tail' style={[notificationsStyle.notificationMessage_bodyText, { color: `${authData.type === "patient" ? '#9a72ab' : "#72a8ab"}` }]}>{item.body}</Text>
                                                            </View>
                                                            <View style={{}}>
                                                                <Text style={{ fontSize: 13, color: authData.type === 'patient' ? `#a192ad` : "#929dad" }}>{ConvertISODate(item.date)}</Text>
                                                            </View>
                                                        </>
                                                        : ""
                                                }
                                            </View>
                                            <View style={notificationsStyle.notificationRemoveIcon_view}>
                                                <TouchableOpacity style={notificationsStyle.notificationRemoveIcon_button} onPress={() => {
                                                    if (index >= 0 && index < notifications.length) {
                                                        removeNotificationItemAnimation(index);
                                                    }
                                                }}>
                                                    <Image
                                                        style={notificationsStyle.notificationRemoveIcon_image}
                                                        source={back_icon}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </Animated.View>
                            )}

                        />
                        :
                        <View style={notificationsStyle.noNotifications_mainView}>
                            <View style={notificationsStyle.noNotificationsContent_view}>
                                <View style={notificationsStyle.noNotificationsIcon_view}>
                                    <Image
                                        style={notificationsStyle.noNotificationsIcon_img}
                                        source={require('../../assets/init/notifications/youMind_noNotifications.png')}
                                    />
                                </View>
                                <View style={notificationsStyle.noNotificationsInfo_view}>
                                    <Text style={notificationsStyle.noNotificationsTitle_text}>
                                        Sua caixa de entrada está tranquila...
                                    </Text>
                                    <Text style={notificationsStyle.noNotificationsSubtitle_text}>
                                        Notificações serão enviadas para alertá-lo sobre o progresso do tratamento e atualizações importantes.
                                    </Text>
                                </View>
                            </View>
                        </View>
                }
            </View>
            {
                notificationLoading ?
                    <HandleNotification requestData={requestData} handleLoading={() => handleLoadingResponse()} />
                    : ""
            }
            <ModalNotification visible={notificationModal} onClose={handleCloseSpecificNotification} notificationData={selectedNotification} handleTypeFunction={typeNotificationFunction} />
        </View >
    )
}

const notificationsStyle = StyleSheet.create({
    notifications_mainView: {
        width: screenWidth,
        minHeight: screenHeight,
        display: 'flex',
        flexDirection: 'column',
    },
    notificationsHeader_view: {
        paddingHorizontal: 35,
        paddingVertical: 35,
        width: '100%',
        gap: 25,
        zIndex: 3,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    notificationsTitle_view: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',

    },
    notificationsTitle_text: {
        fontSize: 22,
        color: '#3f3059'
    },
    notificationsClose_button: {

    },
    notificationsClose_img: {
        right: -10,
        width: 40,
        height: 40,
        opacity: 1
    },
    typeNotifications_view: {
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
    typeNotificationsTemplate_view: {
        borderRadius: 10,
    },
    typeNotificationsTemplate_button: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 6,
    },
    notificationMessageList_view: {
        height: '76%',
    },
    notificationsMessage_list: {

    },
    notificationMessage_view: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#abacc4'
    },
    notificationMessageContainer_view: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
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
        width: '12%',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationMessageIcon_image: {
        width: 50,
        height: 50,
    },
    notificationMessageContent_view: {
        width: '70%',
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
        width: 15,
        height: 15,
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
    }
})

export default Notifications;

