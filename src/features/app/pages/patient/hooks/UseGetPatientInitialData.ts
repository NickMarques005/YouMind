import { UseForm } from "@features/app/providers/sub/UserProvider";
import { useQuestionPerformance } from "@features/app/providers/patient/QuestionPerformanceProvider";
import { UseQuestionnaire } from "@features/app/providers/patient/QuestionariesProvider";
import { UsePatientHistoryService } from "@hooks/api/UsePatientHistoryService";
import { UseQuestionnaireService } from "@hooks/api/UseQuestionnaireService";
import { UseMedications } from "@features/app/providers/patient/MedicationProvider";
import { useMedicationPending } from "@features/app/providers/patient/MedicationPendingProvider";
import { UseMedicationService } from "@hooks/api/UseMedicationService";

interface UsePerformProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    HandleConnectionAppError: (value: string) => void;
}

export const useGetQuestionnaires = ({ setLoading, HandleConnectionAppError }: UsePerformProps) => {
    const { performGetQuestionnaires } = UseQuestionnaireService(setLoading);
    const { performGetQuestionPerformance } = UsePatientHistoryService(setLoading);
    const { dispatch } = UseQuestionnaire();
    const { handleQuestionPerformance } = useQuestionPerformance();
    const { userData } = UseForm();

    const handleGetQuestionnaires = async (stopLoading: boolean) => {
        try {
            const response = await performGetQuestionnaires(stopLoading);
            if (response.success) {
                console.log("Get questionnaires: ", response);
                const questionnaires = response.data;
                return questionnaires;
            }

            if (response.error) {
                HandleConnectionAppError(response.error);
            }

            return response.success;
        } catch (err) {
            const error = err as Error;
            console.log("Erro ao buscar questionários: ", err);
            HandleConnectionAppError(error.message);
        }
    };

    const handleGetQuestionPerformance = async (stopLoading: boolean) => {
        try {
            const response = await performGetQuestionPerformance(stopLoading);
            if (response.success) {
                console.log("Question Performance: ", response);
                const questionPerformance = response.data;
                return typeof questionPerformance?.performance === 'number' ? questionPerformance?.performance : 0;
            }

            if (response.error) {
                HandleConnectionAppError(response.error);
            }

            return response.success;
        } catch (err) {
            const error = err as Error;
            console.log("Erro ao buscar desempenho dos questionários: ", err);
            HandleConnectionAppError(error.message);
            return 0;
        }
    };

    const getQuestionnairesData = (stopLoading: boolean) => {
        if (userData?._id && userData.type === 'patient') {
            handleGetQuestionnaires(stopLoading).then(questionnaires => {
                if (questionnaires) {
                    dispatch({ type: "ADD_MANY", payload: questionnaires });
                }
            });
            handleGetQuestionPerformance(stopLoading).then(performance => {
                if (performance) {
                    handleQuestionPerformance(performance as number);
                }
            });
        }
    }

    return { getQuestionnairesData }
}

export const useGetMedications = ({ setLoading, HandleConnectionAppError }: UsePerformProps) => {
    const { performGetMedications, performGetMedicationPending } = UseMedicationService(setLoading);
    const { handleMedicationPending } = useMedicationPending();
    const { dispatch } = UseMedications();
    const { userData } = UseForm();

    const handleGetMedications = async (stopLoading: boolean) => {
        try {
            const response = await performGetMedications(stopLoading);
            if (response.success) {
                console.log("Get Medications: ", response);
                const medications = response.data;
                return medications;
            }

            if (response.error) {
                HandleConnectionAppError(response.error);
            }

            return response.success;
        } catch (err) {
            const error = err as Error;
            console.log("Erro ao buscar medicamentos: ", err);
            HandleConnectionAppError(error.message);
        }
    };

    const handleGetMedicationPending = async (stopLoading: boolean) => {
        try {
            const response = await performGetMedicationPending(stopLoading);
            if (response.success) {
                console.log("Get Medication Pending: ", response);
                const medicationPending = response.data;
                return medicationPending;
            }

            if (response.error) {
                HandleConnectionAppError(response.error);
            }
        } catch (err) {
            const error = err as Error;
            console.log("Erro ao buscar medicamentos pendentes: ", err);
            HandleConnectionAppError(error.message);
        }
    };

    const getMedicationsData = (stopLoading: boolean) => {
        if (userData?._id && userData.type === 'patient') {
            handleGetMedications(stopLoading).then(medications => {
                if (medications) {
                    dispatch({ type: "ADD_MULTIPLE_MEDICATIONS", medications: medications });
                }
            });
            handleGetMedicationPending(stopLoading).then(medicationPending => {
                if (medicationPending) {
                    handleMedicationPending(medicationPending);
                }
            })
        }
    }

    return { getMedicationsData };
}

export const useGetPatientInitialData = ({ setLoading, HandleConnectionAppError }: UsePerformProps) => {
    const { getQuestionnairesData } = useGetQuestionnaires({ setLoading, HandleConnectionAppError });
    const { getMedicationsData } = useGetMedications({ setLoading, HandleConnectionAppError });

    const getPatientInitialData = async (stopLoading?: boolean) => {
        setLoading(true);
        try {
            await getQuestionnairesData(stopLoading || false);
            await getMedicationsData(stopLoading || false);
        } catch (error) {
            console.error("Erro ao buscar dados do paciente: ", error);
        } finally {
            setLoading(false);
        }
    }

    return { getPatientInitialData }
}