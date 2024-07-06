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

export const UseGetNotepad = ({ setLoading, HandleConnectionAppError }: UsePerformProps) => {
    const { performReadNotes } = UseNotepadService(setLoading);
    const { dispatch } = useNotepad();
    const { uid } = UseAuth();
    const { userData } = UseForm();

    const handleGetNotepads = async () => {
        console.log("Get Notepads");
        try {
            setLoading(true);
            const response = await performReadNotes();
            setLoading(false);

            if (response.success && response.data) {
                console.log("Read notes: ", response);
                dispatch({ type: 'SET_NOTES', payload: response.data });
            } else if (response.error) {
                HandleConnectionAppError(response.error);
            }
        } catch (err) {
            setLoading(false);
            const error = err as Error;
            console.log("Error ao buscar notas: ", error);
            HandleConnectionAppError(error.message);
        }
    }

    useEffect(() => {
        if (uid && userData?._id && userData.type === 'doctor') {
            handleGetNotepads();
        }
    }, [uid, userData?._id]);

    return;
}

export const UseGetPatientHistory = ({ setLoading, HandleConnectionAppError }: UsePerformProps) => {
    const { performGetAllHistory } = UsePatientHistoryService(setLoading);
    const { treatment_state } = UseTreatment();
    const { state, dispatch } = usePatientHistory();
    const { uid } = UseAuth();
    const { userData } = UseForm();

    const handleGetAllHistory = async () => {
        console.log("Get All Patient History");
        try {
            setLoading(true);
            const response = await performGetAllHistory();
            setLoading(false);

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

    useEffect(() => {
        if (uid && userData?._id && userData.type === 'doctor') {
            handleGetAllHistory();
        }
    }, [uid, userData?._id]);

    useEffect(() => {
        if (treatment_state.treatments.length !== 0 && state.patientHistory.length !== 0) {
            const updatedPatients = state.patientHistory.map(patient => {
                const treatment = treatment_state.treatments.find(treatment => treatment.uid === patient.patientId);
                if (treatment) {
                    if (treatment.name !== patient.patientName || treatment.email !== patient.patientEmail || treatment.avatar !== patient.patientAvatar) {
                        return {
                            ...patient,
                            patientName: treatment.name,
                            patientEmail: treatment.email,
                            patientAvatar: treatment.avatar
                        };
                    }
                }
                return patient;
            });

            const filteredPatients = updatedPatients.filter((patient, index) => patient !== state.patientHistory[index]);

            if (filteredPatients.length > 0) {
                dispatch({ type: 'SET_PATIENT_HISTORY', payload: updatedPatients });
            }
        }
    }, [treatment_state, state]);

    return;
}

export const UseGetLatestHistory = ({ setLoading, HandleConnectionAppError }: UsePerformProps) => {
    const { performGetLatestHistory } = UsePatientHistoryService(setLoading);
    const { dispatch: dispatchLatestMedication } = useLatestMedication();
    const { dispatch: dispatchLatestQuestionnaire } = useLatestQuestionnaire();
    const { uid } = UseAuth();
    const { userData } = UseForm();

    const handleGetLatestHistory = async () => {
        console.log("Get Latest History");
        try {
            setLoading(true);
            const response = await performGetLatestHistory();
            setLoading(false);

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

    useEffect(() => {
        if (uid && userData?._id && userData.type === 'doctor') {
            handleGetLatestHistory();
        }
    }, [uid, userData?._id]);

    return;
}
