import { UseForm } from "@features/app/providers/sub/UserProvider";
import { useQuestionPerformance } from "@features/app/providers/patient/QuestionPerformanceProvider";
import { UseQuestionnaire } from "@features/app/providers/patient/QuestionariesProvider";
import { UsePatientHistoryService } from "@hooks/api/UsePatientHistoryService";
import { UseQuestionnaireService } from "@hooks/api/UseQuestionnaireService";
import { UseMedications } from "@features/app/providers/patient/MedicationProvider";
import { useMedicationPending } from "@features/app/providers/patient/MedicationPendingProvider";
import { UseMedicationService } from "@hooks/api/UseMedicationService";
import { UseMotivationalPhraseService } from "@hooks/api/UseMotivationalPhraseService";
import { useMotivationalPhrase } from "@features/app/providers/patient/MotivationalPhraseProvider";
import { useRedirect } from "@features/app/providers/bridge/RedirectProvider";
import { MedicationPending } from "types/app/patient/health/Medicine_Types";

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
                console.log("Questionarios: confirmed");
                const questionnaires = response.data;
                return questionnaires;
            } else if (response.error) {
                HandleConnectionAppError(response.error);
            }
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
                console.log("Question Performance: confirmed");
                const questionPerformance = response.data;
                return typeof questionPerformance?.performance === 'number' ? questionPerformance?.performance : 0;
            } else if (response.error) {
                HandleConnectionAppError(response.error);
            }
        } catch (err) {
            const error = err as Error;
            console.log("Erro ao buscar desempenho dos questionários: ", err);
            HandleConnectionAppError(error.message);
            return 0;
        }
        return 0;
    };

    const getQuestionnairesData = async (stopLoading: boolean) => {
        if (userData?._id && userData.type === 'patient') {
            const questionnaires = await handleGetQuestionnaires(stopLoading);
            if (questionnaires) {
                dispatch({ type: "ADD_MANY", payload: questionnaires });
            }
            const performance = await handleGetQuestionPerformance(stopLoading);
            handleQuestionPerformance(performance);
        }
    };

    return { getQuestionnairesData };
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
                console.log("Get Medications: confirmed");
                const medications = response.data;
                return medications;
            } else if (response.error) {
                HandleConnectionAppError(response.error);
            }
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
                console.log("Get Medication Pending: confirmed");
                const medicationPending = response.data;
                return medicationPending;
            } else if (response.error) {
                HandleConnectionAppError(response.error);
            }
        } catch (err) {
            const error = err as Error;
            console.log("Erro ao buscar medicamentos pendentes: ", err);
            HandleConnectionAppError(error.message);
        }
    };

    const getMedicationsData = async (stopLoading: boolean) => {
        if (userData?._id && userData.type === 'patient') {
            const medications = await handleGetMedications(stopLoading);
            if (medications) {
                dispatch({ type: "ADD_MULTIPLE_MEDICATIONS", medications: medications });
            }
            const medicationPending = await handleGetMedicationPending(stopLoading);
            if (medicationPending) {
                handleMedicationPending(medicationPending);
            }
        }
    };

    return { getMedicationsData };
}

export const useGetMotivationalPhrases = ({ setLoading, HandleConnectionAppError }: UsePerformProps) => {
    const { performGetAllMotivationalPhrasesFromPatient } = UseMotivationalPhraseService(setLoading);
    const { dispatch: motivationalPhraseDispatch } = useMotivationalPhrase();
    const handleGetAllMotivationalPhrases = async (stopLoading: boolean) => {
        try {
            const response = await performGetAllMotivationalPhrasesFromPatient(stopLoading);
            if (response.success) {
                console.log("Frases Motivacionais: confirmed");
                console.log(response.data);
                return response.data;
            } else if (response.error) {
                HandleConnectionAppError(response.error);
            }
        } catch (err) {
            const error = err as Error;
            console.log("Erro ao buscar frases motivacionais: ", err);
            HandleConnectionAppError(error.message);
        }
        return [];
    }

    const getInitialMotivationalPhraseData = async (stopLoading: boolean) => {
        const phrases = await handleGetAllMotivationalPhrases(stopLoading);
        if (phrases) {
            motivationalPhraseDispatch({ type: 'SET_PHRASES', payload: phrases });
        }
    }

    return { getInitialMotivationalPhraseData }
}

export const useGetPatientInitialData = ({ setLoading, HandleConnectionAppError }: UsePerformProps) => {
    const { getQuestionnairesData } = useGetQuestionnaires({ setLoading, HandleConnectionAppError });
    const { getMedicationsData } = useGetMedications({ setLoading, HandleConnectionAppError });
    const { getInitialMotivationalPhraseData } = useGetMotivationalPhrases({ setLoading, HandleConnectionAppError });
    const { handleEnableRedirects, handleDisableRedirects } = useRedirect();

    const getPatientInitialData = async (stopLoading?: boolean) => {
        try {
            console.log("Loading true");
            handleDisableRedirects();
            await getQuestionnairesData(stopLoading || false);
            await getMedicationsData(stopLoading || false);
            await getInitialMotivationalPhraseData(stopLoading || false);
        } catch (error) {
            console.error("Erro ao buscar dados do paciente: ", error);
        } finally {
            setLoading(false);
            console.log("Loading parado");
            handleEnableRedirects();
        }
    };

    return { getPatientInitialData }
}