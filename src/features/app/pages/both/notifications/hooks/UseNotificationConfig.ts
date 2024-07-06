import { MessageIcon } from "@components/modals/message/types/type_message_modal";
import { UseNotificationService } from "@hooks/api/UseNotificationService"

interface UseNotificationConfigProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    HandleResponseAppError: (value: string) => void;
    HandleResponseAppSuccess?: (message: string, messageType: MessageIcon) => void;
}

export const UseNotificationConfig = ({ setLoading, HandleResponseAppError, HandleResponseAppSuccess }: UseNotificationConfigProps) => {

    const { performDeleteNotification, performDeleteNotifications, performTreatmentSolicitation } = UseNotificationService(setLoading);

    const handleDeleteNotification = async (notificationId: string, onSuccess?: (id: string | string[]) => void, notificationIds?: string[]) => {
        if (notificationIds) {
            try {
                const response = await performDeleteNotifications({ notificationIds });
                if (response.success) {
                    console.log("Notification removed: ", response);
                    const notificationsRemoved = response.data?.notificationIds;
                    if (onSuccess && notificationsRemoved) {
                        onSuccess(notificationsRemoved);
                    }
                }

                if (response.error) {
                    HandleResponseAppError(response.error);
                }
            }
            catch (err) {
                const error = err as Error;
                console.log("Erro ao buscar notificações: ", err);
                HandleResponseAppError(error.message);
            }
            return;
        }


        try {
            const response = await performDeleteNotification({ notificationId });
            if (response.success) {
                console.log("Notification removed: ", response);
                const notificationRemoved = response.data?.notificationId;
                if (onSuccess && notificationRemoved) {
                    onSuccess(notificationRemoved);
                }
            }

            if (response.error) {
                HandleResponseAppError(response.error);
            }
        }
        catch (err) {
            const error = err as Error;
            console.log("Erro ao buscar notificações: ", err);
            HandleResponseAppError(error.message);
        }
    }

    const handleTreatmentSolicitation = async (receiver_email: string, type: string, onSuccess?: () => void) => {
        try {
            const response = await performTreatmentSolicitation({ receiver_email }, type);
            if (response.success) {
                console.log("Solicitação enviada! ", response);

                if (HandleResponseAppSuccess && response.message) {
                    HandleResponseAppSuccess(response.message, response.type as MessageIcon);
                }
                if (onSuccess) {
                    onSuccess();
                }

            }

            if (response.error) {
                HandleResponseAppError(response.error);
            }
        }
        catch (err) {
            const error = err as Error;
            console.log("Erro ao buscar notificações: ", err);
            HandleResponseAppError(error.message);
        }
    }

    return { handleDeleteNotification, handleTreatmentSolicitation }
}