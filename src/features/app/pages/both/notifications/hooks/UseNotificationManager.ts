import { UseNotificationService } from '@hooks/api/UseNotificationService';
import { useCallback, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { NotificationData } from 'types/notification/Notification_Types';
import { UseNotifications } from '@features/app/reducers/NotificationReducer';
import { UseNotificationConfig } from './UseNotificationConfig';
import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';
import { UseTreatmentService } from '@hooks/api/UseTreatmentService';
import { UserData } from 'types/user/User_Types';
import { UseChat } from '@providers/ChatProvider';
import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types';
import { UseChatNavigation } from '../../treatment/pages/chat/hooks/UseChatNavigation';
import { DoctorScreenName, DoctorTabNavigatorParamList, PatientScreenName, TreatmentScreenName } from 'types/navigation/Navigation_Types';
import { UseTreatmentNavigation } from '../../treatment/hooks/UseTreatmentNavigation';
import { useTabNavigation } from '@features/app/hooks/UseTabNavigator';
import { HealthPage, UseHealthPage } from '@features/app/providers/patient/HealthProvider';

export interface SelectedNotification {
    removeNotification?: () => void;
    notification: NotificationData;
}

export interface UseNotificationManager {
    setDeleteNotificationLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setModalLoading: React.Dispatch<React.SetStateAction<boolean>>;
    userType: string | undefined;
    userData?: UserData;
}

export interface HandlePageDirectionParams {
    tab: DoctorScreenName | PatientScreenName,
    sender?: TreatmentInfoTemplate, 
    healthPage?: HealthPage,
}

export const UseNotificationManager = ({ setModalLoading, setDeleteNotificationLoading, userType, userData }: UseNotificationManager) => {
    const { HandleResponseAppError, HandleResponseAppSuccess } = UseGlobalResponse();
    const { handleDeleteNotification, handleRemove } = UseNotificationConfig({ setLoading: setDeleteNotificationLoading, HandleResponseAppError, HandleResponseAppSuccess });
    const { performInitializeTreatment } = UseTreatmentService(setModalLoading);
    const [selectedNotification, setSelectedNotification] = useState<SelectedNotification | null>(null);
    const { handleRedirectChat } = UseChat();
    const { navigateToDoctorScreen, navigateToPatientScreen } = useTabNavigation();
    let handleCurrentHealthPage: (page: HealthPage) => void;
    
    if(userData?.type === 'patient')
    {
        const healthPage = UseHealthPage();
        handleCurrentHealthPage = healthPage.handleCurrentHealthPage;
    }
    
    const handlePageRedirection = ({tab, sender, healthPage}: HandlePageDirectionParams) => {
        if (sender) {
            handleRedirectChat(sender);
        }
        if (userData?.type === 'doctor') {
            navigateToDoctorScreen(tab as DoctorScreenName);
        }
        else {
            if(healthPage)
            {
                handleCurrentHealthPage(healthPage);
            }
            navigateToPatientScreen(tab as PatientScreenName);
        }
    }

    const handleNotificationPress = useCallback(async (
        notification: NotificationData,
        removeNotification?: () => void
    ) => {
        const notificationData = notification.data;

        if (!notificationData?.show_modal) {
            if (notificationData?.redirect_params) {
                console.log("REDIRECT_PARAMS!");
                const redirectParams = notificationData?.redirect_params;
                switch (redirectParams.menu_option) {
                    case "Tratamento":
                        console.log("TREATMENT SCREEN REDIRECT!");
                        const senderParams = notificationData.sender_params;
                        
                        if ( senderParams && senderParams.name && senderParams.email && senderParams.id) {
                            const screen = redirectParams.screen;
                            const menuOption = redirectParams.menu_option;
                            const sender: TreatmentInfoTemplate = {
                                _id: senderParams.id,
                                name: senderParams.name,
                                email: senderParams.email,
                                avatar: senderParams.avatar
                            }
                            console.log("Current Chat: ", sender);
                            if (screen === 'chat_treatment') {
                                console.log("Chat with user");
                                handlePageRedirection({tab: menuOption, sender});
                            }
                            else {
                                handlePageRedirection({tab: menuOption});
                            }

                        }
                        break;
                    case "Saúde":
                        console.log("HEALTH SCREEN REDIRECT!");
                            const screen = redirectParams.screen;
                            const menuOption = redirectParams.menu_option;
                            const healthPage = redirectParams.page as HealthPage;
                            
                            handlePageRedirection({tab: menuOption, healthPage })
                            console.log(notification);
                        break;
                    case "Bluetooth":
                        break;
                    case "Análises":
                        break;
                    default:
                        console.log("Default -> No Screen Change");
                        break;
                }

                if (removeNotification) {
                    if (notification.group) {
                        const groupNotifications = notification.group;
                        handleRemove(groupNotifications._ids);
                        return;
                    }
                    else {
                        handleRemove(notification._id);
                        return;
                    }
                }
            }
            return;
        }
        setSelectedNotification({ notification, removeNotification });
    }, []);

    const handleNotificationAccept = useCallback(async (notification: NotificationData, removeNotification?: () => void) => {
        const notificationData = notification.data ? notification.data : undefined;

        if (notificationData === undefined) {
            console.log("Houve um erro notificação não definida");
            return;
        }

        switch (notificationData.notify_function) {
            case "solicitation":
                console.log(notification);
                console.log("Type Function Solicitation");
                if (notificationData.sender_params?.email && userData && userType) {
                    try {
                        const response = await performInitializeTreatment({ email_1: userData.email, email_2: notificationData.sender_params?.email }, userType);
                        if (response.success) {
                            console.log(response);
                            if (removeNotification) {
                                removeNotification();
                            }
                        }

                        if (response.error) {
                            HandleResponseAppError(response.error);
                        }
                    }
                    catch (err) {
                        const error = err as Error;
                        console.log(error);
                        HandleResponseAppError(error.message);
                    }
                }
                break;
            case "message_alert":
                console.log("Type Function Message Alert");
                break;
            default:
                console.log("Erro na seleção de notify_function da notificação");
                break;
        }
    }, [setModalLoading, userData]);

    const groupNotificationsBySender = (notifications: NotificationData[]) => {
        const groupedNotifications: NotificationData[] = [];
        const notificationMap: { [senderId: string]: NotificationData } = {};

        notifications.forEach(notification => {
            const notifyType = notification.data?.notify_type;

            if (notifyType === 'chat') {
                const senderId = notification.data?.sender_params?.id;
                
                if (senderId) {
                    if (!notificationMap[senderId]) {

                        notificationMap[senderId] = {
                            ...notification,
                            group: {
                                _ids: [notification._id],
                                count: 1
                            }
                        };
                    }
                    else {

                        const existingGroup = notificationMap[senderId].group;

                        if (existingGroup && existingGroup.count) {
                            const updatedGroup = {
                                ...existingGroup,
                                _ids: [...existingGroup._ids, notification._id],
                                count: existingGroup.count + 1
                            };

                            if (new Date(notification.updatedAt) > new Date(notificationMap[senderId].updatedAt)) {
                                notificationMap[senderId] = {
                                    ...notification,
                                    group: updatedGroup
                                };
                            } else {
                                // Apenas atualiza os IDs do grupo, mantém a notificação mais antiga.
                                notificationMap[senderId] = {
                                    ...notificationMap[senderId],
                                    group: updatedGroup
                                };
                            }
                        }

                    }
                }

            } else {

                groupedNotifications.push(notification);
            }
        });

        groupedNotifications.push(...Object.values(notificationMap));

        return groupedNotifications;
    };

    const handleClearSelectedNotification = () => {
        setSelectedNotification(null);
    };

    return {
        selectedNotification,
        setSelectedNotification,
        handleClearSelectedNotification,
        handleNotificationAccept,
        handleNotificationPress,
        groupNotificationsBySender
    };
};