import { UseNotifications } from "@features/app/reducers/NotificationReducer";
import { UseNotificationService } from "@hooks/api/UseNotificationService"
import { UseSolicitationService } from "@hooks/api/UseSolicitationService";
import { MessageIconTypeKey } from "types/icon/Icon_Types";

interface UseNotificationConfigProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    HandleResponseAppError: (value: string) => void;
    HandleResponseAppSuccess?: (message: string, messageType: MessageIconTypeKey) => void;
}

export const UseNotificationConfig = ({ setLoading, HandleResponseAppError, HandleResponseAppSuccess }: UseNotificationConfigProps) => {
    const { dispatch } = UseNotifications();
    const { performDeleteNotification, performDeleteNotifications } = UseNotificationService(setLoading);
    const { performCreateSolicitation, performDeclineSolicitation }= UseSolicitationService(setLoading);

    const removeItem = (notificationId: string) => {
        try {
            dispatch({ type: 'REMOVE_NOTIFICATION', payload: notificationId });
        }
        catch (err) {
            throw err;
        }
    };

    const removeItems = (notificationIds: string[]) => {
        try {
            dispatch({ type: 'REMOVE_NOTIFICATIONS', payload: notificationIds });
        }
        catch (err) {
            throw err;
        }
    }

    const handleDeleteNotification = async (notificationId?: string, onSuccess?: (id: string | string[]) => void, notificationIds?: string[]) => {
        if (notificationIds) {
            try {
                const response = await performDeleteNotifications({ notificationIds });
                if (response.success) {
                    console.log("Notifications removed: ", response);
                }

                if (response.error) {
                    HandleResponseAppError(response.error);
                }
            }
            catch (err) {
                const error = err as Error;
                console.log("Erro ao deletar notificações: ", err);
                HandleResponseAppError(error.message);
            }
            return;
        }

        else if(notificationId)
        {
            try {
                const response = await performDeleteNotification({ notificationId });
                if (response.success) {
                    console.log("Notification removed: ", response);
                }
    
                if (response.error) {
                    HandleResponseAppError(response.error);
                }
            }
            catch (err) {
                const error = err as Error;
                console.log("Erro ao deletar notificação: ", err);
                HandleResponseAppError(error.message);
            }
        }
        else {
            console.log("Notificação não especificada");
        }
    }

    const handleTreatmentSolicitation = async (receiver_id: string, type: string, onSuccess?: () => void) => {
        console.log("Treatment Solicitation!");
        try {
            const response = await performCreateSolicitation({ receiver_id, solicitationType: 'treatment' }, type);
            if (response.success) {
                console.log("Solicitação enviada! ", response);

                if (HandleResponseAppSuccess && response.message) {
                    HandleResponseAppSuccess(response.message, response.type as MessageIconTypeKey);
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

    const handleRemove = async (needToBeRemoved: string | string[]) => {

        try {
            if (typeof needToBeRemoved === 'string') {
                removeItem(needToBeRemoved);
                await handleDeleteNotification(needToBeRemoved);
            }
            else {
                removeItems(needToBeRemoved);
                await handleDeleteNotification(undefined, undefined, needToBeRemoved);
            }
        } catch (err) {
            const error = err as Error;
            console.error("Erro ao remover notificação: ", error);
        }
    };

    return { handleDeleteNotification, handleTreatmentSolicitation, handleRemove }
}