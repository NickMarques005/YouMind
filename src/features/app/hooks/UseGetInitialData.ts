import { useEffect } from "react";
import { UseForm } from "../providers/sub/UserProvider";
import { UseAuth } from "@features/root/providers/AuthenticationProvider";
import { UseNotificationService } from "@hooks/api/UseNotificationService";
import { UseNotifications } from "../reducers/NotificationReducer";
import { UseTreatmentService } from "@hooks/api/UseTreatmentService";
import { UseTreatment } from "@providers/TreatmentProvider";
import { UseQuestionnaireService } from "@hooks/api/UseQuestionnaireService";
import { UseQuestionnaire } from "../providers/patient/QuestionariesProvider";
import { UseMedicationService } from "@hooks/api/UseMedicationService";
import { UseMedications } from "../providers/patient/MedicationProvider";
import { UsePatientHistoryService } from "@hooks/api/UsePatientHistoryService";
import { useQuestionPerformance } from "../providers/patient/QuestionPerformanceProvider";
import { useMedicationPending } from "../providers/patient/MedicationPendingProvider";
import { UserData } from "types/user/User_Types";
import { useNotice } from "../providers/sub/NoticeProvider";

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
                const notifications = response.data;
                return notifications;
            }

            if (response.error) {
                HandleConnectionAppError(response.error);
            }

            return response.success;
        }
        catch (err) {
            const error = err as Error;
            console.log("Erro ao buscar notificações: ", err);
            HandleConnectionAppError(error.message);
        }
    }

    const getNotificationsData = (userId?: string) => {
        if (uid && userId) {
            handleGetNotifications().then(notifications => {
                if (notifications) {
                    dispatch({ type: 'SET_NOTIFICATIONS', payload: notifications });
                }
            });
        }
    }

    return { getNotificationsData };
}

export const UseGetTreatments = ({ setLoading, HandleConnectionAppError }: UseGetInitialDataProps) => {
    const { performGetTreatment, performWelcomeTreatment } = UseTreatmentService(setLoading);
    const { setTreatments } = UseTreatment();
    const { handleSelectedNotice } = useNotice();
    const { uid } = UseAuth();

    const handleWelcomeNotice = async (userData: UserData) => {
        try {

            const stopLoading = false;
            const response = await performWelcomeTreatment(userData.type as string, stopLoading);
            if (response.success) {
                console.log("Welcome Treatment Notice: ", response);
                const welcomeNotice = response.data;
                return welcomeNotice;
            }

            if (response.error) {
                console.log(response.error);
            }
        } catch (err) {
            const error = err as Error;
            console.log("Erro ao buscar welcome notice: ", err);
            HandleConnectionAppError(error.message);
        }
    }

    const handleGetTreatments = async (userData: UserData) => {
        try {
            console.log("Handle Get Treatments");
            const stopLoading = false;
            const response = await performGetTreatment(userData.type as string, stopLoading);
            if (response.success) {
                console.log(response.data);
                const treatments = response.data;
                return treatments;
            }

            if (response.error) {
                HandleConnectionAppError(response.error);
            }
        } catch (err) {
            const error = err as Error;
            console.log(error);
            HandleConnectionAppError(error.message);
        }
    }

    const getTreatmentsData = (userData: UserData) => {
        if (uid && userData) {
            handleGetTreatments(userData).then(treatments => {
                if (treatments) {
                    setTreatments(treatments);
                }
            });
            handleWelcomeNotice(userData).then(notice => {
                if(notice) {
                    handleSelectedNotice(notice);
                }
            })
        }
    }

    return { getTreatmentsData };
}