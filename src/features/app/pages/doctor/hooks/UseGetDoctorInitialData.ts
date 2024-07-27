import { useEffect } from "react"; // ajuste o caminho de acordo com sua estrutura
import { UseNotepadService } from "@hooks/api/UseNotepadService";
import { UseAuth } from "@features/root/providers/AuthenticationProvider";
import { useNotepad } from "@features/app/providers/doctor/NotepadProvider";
import { UseForm } from "@features/app/providers/sub/UserProvider";
import { UsePatientHistoryService } from "@hooks/api/UsePatientHistoryService";
import { usePatientHistory } from "@features/app/providers/doctor/PatientHistoryProvider";
import { useLatestMedication } from "@features/app/providers/doctor/LatestMedicationProvider";
import { useLatestQuestionnaire } from "@features/app/providers/doctor/LatestQuestionnaireProvider";
import { UseTreatment } from "@providers/TreatmentProvider";
import { PatientHistory } from "types/history/PatientHistory_Types";

interface UsePerformProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    HandleConnectionAppError: (value: string) => void;
}

export const useGetNotepad = ({ setLoading, HandleConnectionAppError }: UsePerformProps) => {
    const { performReadNotes } = UseNotepadService(setLoading);
    const { dispatch } = useNotepad();
    const { uid } = UseAuth();
    const { userData } = UseForm();

    const handleGetNotepads = async (stopLoading: boolean) => {
        try {
            const response = await performReadNotes(stopLoading);

            if (response.success && response.data) {
                console.log("Read notes: ", response);
                dispatch({ type: 'SET_NOTES', payload: response.data });
            } else if (response.error) {
                HandleConnectionAppError(response.error);
            }
        } catch (err) {
            const error = err as Error;
            console.log("Error ao buscar notas: ", error);
            HandleConnectionAppError(error.message);
        }
    }

    const getNotepads = (stopLoading: boolean) => {
        if (uid && userData?._id && userData.type === 'doctor') {
            handleGetNotepads(stopLoading);
        }
    }

    return { getNotepads };
}

export const useGetAllPatientHistory = ({ setLoading, HandleConnectionAppError }: UsePerformProps) => {
    const { performGetAllHistory } = UsePatientHistoryService(setLoading);
    const { treatment_state } = UseTreatment();
    const { state, dispatch } = usePatientHistory();
    const { uid } = UseAuth();
    const { userData } = UseForm();

    const handleGetAllHistory = async (stopLoading: boolean) => {
        console.log("Get All Patient History");
        try {
            const response = await performGetAllHistory(stopLoading);

            if (response.success && response.data) {
                console.log("Patient history: ", response.data);

                if (!Array.isArray(response.data)) {
                    console.error("Patient History formato inválido: ", response.data);
                    HandleConnectionAppError("Formato inválido de histórico dos pacientes");
                    return;
                }

                const isValidPatientHistory = response.data.every((patient) => {
                    if (typeof patient !== 'object' || !patient.hasOwnProperty('patientId')) {
                        console.error("Item com formato inválido: ", patient);
                        return false;
                    }

                    return true;
                });

                if (!isValidPatientHistory) {
                    console.error("Formato de histórico inválido");
                    HandleConnectionAppError("Formato de histórico de pacientes inválido. Tente novamente");
                    return;
                }

                const patientHistory: PatientHistory[] = response.data;


                dispatch({ type: 'SET_PATIENT_HISTORY', payload: patientHistory });
            } else if (response.error) {
                HandleConnectionAppError(response.error);
            }
        } catch (err) {
            setLoading(false);
            const error = err as Error;
            console.log("Error ao buscar histórico dos pacientes: ", error);
            HandleConnectionAppError(error.message);
        }
    };

    const getAllPatientHistory = (stopLoading: boolean) => {
        if (uid && userData?._id && userData.type === 'doctor') {
            handleGetAllHistory(stopLoading);
        }
    }

    return { getAllPatientHistory };
}

export const useGetLatestHistory = ({ setLoading, HandleConnectionAppError }: UsePerformProps) => {
    const { performGetLatestHistory } = UsePatientHistoryService(setLoading);
    const { dispatch: dispatchLatestMedication } = useLatestMedication();
    const { dispatch: dispatchLatestQuestionnaire } = useLatestQuestionnaire();
    const { uid } = UseAuth();
    const { userData } = UseForm();

    const handleGetLatestHistory = async (stopLoading: boolean) => {
        console.log("Get Latest History");
        try {
            const response = await performGetLatestHistory(stopLoading);

            if (response.success && response.data) {
                console.log("Latest history: ", response.data);
                const { latestMedications, latestQuestionnaires } = response.data;
                dispatchLatestMedication({ type: 'SET_LATEST_MEDICATIONS', payload: latestMedications });
                dispatchLatestQuestionnaire({ type: 'SET_LATEST_QUESTIONNAIRES', payload: latestQuestionnaires });
            } else if (response.error) {
                HandleConnectionAppError(response.error);
            }
        } catch (err) {
            setLoading(false);
            const error = err as Error;
            console.log("Error ao buscar últimos históricos dos pacientes: ", error);
            HandleConnectionAppError(error.message);
        }
    };

    const getLatestPatientHistory = (stopLoading: boolean) => {
        if (uid && userData?._id && userData.type === 'doctor') {
            handleGetLatestHistory(stopLoading);
        }
    }

    return { getLatestPatientHistory };
}

export const useGetDoctorInitialData = ({ setLoading, HandleConnectionAppError }: UsePerformProps) => {
    const { getNotepads } = useGetNotepad({ setLoading, HandleConnectionAppError });
    const { getAllPatientHistory } = useGetAllPatientHistory({ setLoading, HandleConnectionAppError });
    const { getLatestPatientHistory } = useGetLatestHistory({ setLoading, HandleConnectionAppError });

    const getDoctorInitialData = async (stopLoading?: boolean) => {
        setLoading(true);
        try {
            await getNotepads(stopLoading || false);
            await getAllPatientHistory(stopLoading || false);
            await getLatestPatientHistory(stopLoading || false);
        } catch (error) {
            console.error("Erro ao buscar dados do médico: ", error);
        } finally {
            setLoading(false);
        }
    }

    return { getDoctorInitialData }
}

export const useUpdateTreatmentForDoctor = ({ setLoading, HandleConnectionAppError }: UsePerformProps) => {
    const { getAllPatientHistory } = useGetAllPatientHistory({ setLoading, HandleConnectionAppError });
    const { getLatestPatientHistory } = useGetLatestHistory({ setLoading, HandleConnectionAppError });

    const getUpdateDoctorData = async (stopLoading?: boolean) => {
        setLoading(true);
        try {
            await getAllPatientHistory(stopLoading || false);
            await getLatestPatientHistory(stopLoading || false);
        } catch (error) {
            console.error("Erro ao buscar dados do médico: ", error);
        } finally {
            setLoading(false);
        }
    }

    return { getUpdateDoctorData }
}
