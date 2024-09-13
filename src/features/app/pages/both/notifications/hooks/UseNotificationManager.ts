import { useCallback, useState } from 'react';
import { NotificationData } from 'types/notification/Notification_Types';
import { UseNotificationConfig } from './UseNotificationConfig';
import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';
import { UseTreatmentService } from '@hooks/api/UseTreatmentService';
import { UserData } from 'types/user/User_Types';
import { DoctorScreenName, PatientScreenName } from 'types/navigation/Navigation_Types';
import { HealthPage, UseHealthPage } from '@features/app/providers/patient/HealthProvider';
import { useTabNavigation } from '@features/app/hooks/navigation/UseTabNavigator';
import { UseSolicitationService } from '@hooks/api/UseSolicitationService';
import { ChatUser } from 'types/chat/Chat_Types';
import { UseChat } from '@features/app/providers/bridge/ChatProvider';

export interface SelectedNotification {
    removeNotification?: () => void;
    notification: NotificationData;
}

export interface UseNotificationManager {
    setDeleteNotificationLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setDeclineLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setModalLoading: React.Dispatch<React.SetStateAction<boolean>>;
    userType: string | undefined;
    userData?: UserData;
}

export interface HandlePageDirectionParams {
    tab: DoctorScreenName | PatientScreenName,
    sender?: ChatUser,
    healthPage?: HealthPage,
}

export const UseNotificationManager = ({ 
    setModalLoading, 
    setDeleteNotificationLoading, 
    userType, 
    setDeclineLoading,
    userData }: UseNotificationManager) => {
    
    const { HandleResponseAppError, HandleResponseAppSuccess } = UseGlobalResponse();
    const { handleRemove } = UseNotificationConfig({ setLoading: setDeleteNotificationLoading, HandleResponseAppError, HandleResponseAppSuccess });
    const { performInitializeTreatment } = UseTreatmentService(setModalLoading);
    const { performDeclineSolicitation } = UseSolicitationService(setDeclineLoading);
    const [selectedNotification, setSelectedNotification] = useState<SelectedNotification | null>(null);
    const { handleActivateCurrentChat } = UseChat();
    const { navigateToDoctorScreen, navigateToPatientScreen } = useTabNavigation();
    let handleCurrentHealthPage: (page: HealthPage) => void;

    if (userData?.type === 'patient') {
        const healthPage = UseHealthPage();
        handleCurrentHealthPage = healthPage.handleCurrentHealthPage;
    }

    const handlePageRedirection = ({ tab, sender, healthPage }: HandlePageDirectionParams) => {
        if (sender) {
            console.log("HANDLE REDIRECT CHAT!!");
            handleActivateCurrentChat(sender);
        }
        if (userData?.type === 'doctor') {
            navigateToDoctorScreen(tab as DoctorScreenName);
        }
        else {
            if (healthPage) {
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

                        if (senderParams && senderParams.name &&
                            senderParams.email && senderParams._id) {
                            const screen = redirectParams.screen;
                            const menuOption = redirectParams.menu_option;
                            const sender: ChatUser = {
                                _id: senderParams._id,
                                name: senderParams.name,
                                email: senderParams.email,
                                avatar: senderParams.avatar,
                                birth: senderParams.birth,
                                gender: senderParams.gender,
                                uid: senderParams.uid,
                            }
                            console.log("Current Chat: ", sender);
                            if (screen === 'chat_treatment') {
                                console.log("Chat with user");
                                handlePageRedirection({ tab: menuOption, sender });
                            }
                            else {
                                handlePageRedirection({ tab: menuOption });
                            }

                        }
                        break;
                    case "Saúde":
                        console.log("HEALTH SCREEN REDIRECT!");
                        const screen = redirectParams.screen;
                        const menuOption = redirectParams.menu_option;
                        const healthPage = redirectParams.page as HealthPage;

                        handlePageRedirection({ tab: menuOption, healthPage })
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
                    if (notificationData.group) {
                        const groupNotifications = notificationData.group;
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
                if (notificationData.solicitation_params?.email && userData && userType) {
                    try {
                        const response = await performInitializeTreatment({ email_1: userData.email, email_2: notificationData.solicitation_params?.email }, userType);
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

    const handleNotificationDecline = useCallback(async (notification: NotificationData, removeNotification?: () => void) => {
        const notificationData = notification.data ? notification.data : undefined;
    
        if (notificationData === undefined) {
            console.log("Erro: notificação não definida");
            return;
        }
    
        switch (notificationData.notify_function) {
            case "solicitation":
                console.log("Tipo de função: Solicitação (Decline)");
                if (notificationData.solicitation_params?.email && userData && userType) {
                    try {
                        const solicitationType = notificationData.solicitation_params?.solicitationType;
                        const solicitationId = notificationData.solicitation_params?.solicitationId;
                        if(!solicitationType || !solicitationId) return HandleResponseAppError("Houve um erro ao recusar solicitação: Parâmetros da solicitação inválidos");

                        const response = await performDeclineSolicitation({ solicitationType, solicitationId });
                        if (response.success) {
                            console.log("Solicitação recusada com sucesso:", response);
                            
                            if (removeNotification) {
                                removeNotification();
                            }
                        } else if (response.error) {
                            HandleResponseAppError(response.error);
                        }
                    } catch (err) {
                        const error = err as Error;
                        console.log("Erro ao recusar a solicitação:", error.message);
                        HandleResponseAppError(error.message);
                    }
                }
                break;
            case "message_alert":
                console.log("Tipo de função: Alerta de mensagem (Decline)");
                break;
            default:
                console.log("Erro na seleção de notify_function da notificação (Decline)");
                break;
        }
    }, [setDeclineLoading, userData]);

    const groupNotificationsBySender = (notifications: NotificationData[]) => {
        const groupedNotifications: NotificationData[] = [];
        const notificationMap: { [senderId: string]: NotificationData } = {};

        notifications.forEach(notification => {
            const notifyType = notification.data?.notify_type;
            const senderId = notification.data?.sender_params?._id;

            if (notifyType === 'chat' && senderId) {
                if (!notificationMap[senderId]) {
                    if (notification.data?.notify_type === undefined) return;

                    notificationMap[senderId] = {
                        ...notification,
                        data: {
                            ...notification.data,
                            group: {
                                _ids: [notification._id],
                                count: 1
                            }
                        }
                    };
                }
                else {

                    const existingGroup = notificationMap[senderId].data?.group;
                    if (existingGroup && existingGroup.count) {
                        const updatedGroup = {
                            ...existingGroup,
                            _ids: [...existingGroup._ids, notification._id],
                            count: existingGroup.count + 1
                        };

                        if (new Date(notification.data?.updatedAt ?? '') > new Date(notificationMap[senderId].data?.updatedAt ?? '')) {

                            if (notificationMap[senderId].data?.notify_type === undefined) return;

                            notificationMap[senderId] = {
                                ...notification,
                                data: {
                                    ...notificationMap[senderId].data,
                                    group: updatedGroup
                                }
                            };
                        } else {
                            if (notificationMap[senderId].data?.notify_type === undefined) return;

                            // Apenas atualiza os IDs do grupo, mantém a notificação mais antiga.
                            notificationMap[senderId] = {
                                ...notificationMap[senderId],
                                data: {
                                    ...notificationMap[senderId].data,
                                    group: updatedGroup
                                }
                            };
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
        handleNotificationDecline,
        handleNotificationPress,
        groupNotificationsBySender
    };
};