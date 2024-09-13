import { UseAuth } from "@features/root/providers/AuthenticationProvider";
import { UseNotificationService } from "@hooks/api/UseNotificationService";
import { UseNotifications } from "../../reducers/NotificationReducer";
import { UseTreatmentService } from "@hooks/api/UseTreatmentService";
import { UseTreatment } from "@features/app/providers/sub/TreatmentProvider";
import { UserData } from "types/user/User_Types";
import { useNotice } from "../../providers/sub/NoticeProvider";
import { UseTreatmentEnded } from "@features/app/providers/sub/TreatmentEndedProvider";

interface UseGetInitialDataProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    HandleConnectionAppError: (value: string) => void;
}

export const UseGetNotifications = ({ setLoading, HandleConnectionAppError }: UseGetInitialDataProps) => {
    const { performGetNotifications } = UseNotificationService(setLoading);
    const { dispatch } = UseNotifications();
    const { uid } = UseAuth();

    const handleGetNotifications = async () => {
        try {
            const stopLoading = false;
            const response = await performGetNotifications(stopLoading);
            if (response.success) {
                console.log("Get notifications: ", response);
                return response.data;
            } else if (response.error) {
                HandleConnectionAppError(response.error);
            }
        } catch (err) {
            const error = err as Error;
            console.log("Erro ao buscar notificações: ", error);
            HandleConnectionAppError(error.message);
        }
    };

    const getNotificationsData = async (userId?: string) => {
        if (uid && userId) {
            const notifications = await handleGetNotifications();
            if (notifications) {
                dispatch({ type: 'SET_NOTIFICATIONS', payload: notifications });
            }
        }
    };

    return { getNotificationsData };
}

export const UseGetTreatments = ({ setLoading, HandleConnectionAppError }: UseGetInitialDataProps) => {
    const { performGetTreatment, performWelcomeTreatment } = UseTreatmentService(setLoading);
    const { setTreatments } = UseTreatment();
    const { setEndedTreatments } = UseTreatmentEnded();
    const { handleSelectedNotice } = useNotice();
    const { uid } = UseAuth();

    const handleWelcomeNotice = async (userData: UserData) => {
        try {
            const stopLoading = false;
            const response = await performWelcomeTreatment(userData.type as string, stopLoading);
            if (response.success) {
                console.log("Welcome Treatment Notice: ", response);
                return response.data;
            } else if (response.error) {
                console.log(response.error);
            }
        } catch (err) {
            const error = err as Error;
            console.log("Erro ao buscar welcome notice: ", error);
            HandleConnectionAppError(error.message);
        }
    };

    const handleGetTreatments = async (userData: UserData) => {
        try {
            console.log("Handle Get Treatments");
            const stopLoading = false;
            const response = await performGetTreatment(userData.type as string, stopLoading);
            if (response.success) {
                console.log("Tratamentos: ", response.data);
                return response.data;
            } else if (response.error) {
                HandleConnectionAppError(response.error);
            }
        } catch (err) {
            const error = err as Error;
            console.log("Erro ao buscar tratamentos: ", error);
            HandleConnectionAppError(error.message);
        }
        return null;
    };

    const getTreatmentsData = async (userData: UserData) => {
        if (uid && userData) {
            const treatments = await handleGetTreatments(userData);
            if (treatments) {
                const activeTreatments = treatments.filter(treatment => treatment.treatmentStatus === 'active');
                const completedTreatments = treatments.filter(treatment => treatment.treatmentStatus === 'completed');

                if (activeTreatments.length > 0) {
                    setTreatments(activeTreatments);
                }
                
                if (completedTreatments.length > 0) {
                    setEndedTreatments(completedTreatments);
                }
            }

            const notice = await handleWelcomeNotice(userData);
            if (notice) {
                handleSelectedNotice(notice);
            }
        }
    };

    return { getTreatmentsData };
}