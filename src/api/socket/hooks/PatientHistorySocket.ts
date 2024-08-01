import { useCallback } from 'react';
import { LatestQuestionnaire, PatientHistory, SocketLatestMedication, SocketLatestQuestionnaire, SocketPatientHistory } from 'types/history/PatientHistory_Types';
import { usePatientHistory } from '@features/app/providers/doctor/PatientHistoryProvider';
import { useLatestQuestionnaire } from '@features/app/providers/doctor/LatestQuestionnaireProvider';
import { useLatestMedication } from '@features/app/providers/doctor/LatestMedicationProvider';

const UsePatientHistorySocket = () => {
    const { dispatch: dispatchHistory } = usePatientHistory();
    const { state: latestQuestionnaireState, dispatch: dispatchQuestionnaire } = useLatestQuestionnaire();
    const { state: latestMedicationState, dispatch: dispatchMedication } = useLatestMedication();

    const handleUpdatePatientHistory = useCallback((data: SocketPatientHistory) => {
        console.log("UPDATE HISTORY! ", data);
        dispatchHistory({ type: 'UPDATE_PATIENT_HISTORY', payload: data.history });
    }, [dispatchHistory]);

    const handleUpdateLatestQuestionnaire = useCallback((data: SocketLatestQuestionnaire) => {
        console.log("UPDATE LATEST QUESTIONNAIRE! ", data);
        const { latestQuestionnaire } = data;
        const actionType = latestQuestionnaireState.latestQuestionnaire.some(item => item._id === latestQuestionnaire._id)
        ? 'UPDATE_LATEST_QUESTIONNAIRE'
        : 'ADD_LATEST_QUESTIONNAIRE';
        dispatchQuestionnaire({ type: actionType, payload: latestQuestionnaire });
    }, [dispatchQuestionnaire]);

    const handleDeleteLatestQuestionnaire = useCallback((data: SocketLatestQuestionnaire) => {
        console.log("DELETE LATEST QUESTIONNAIRE! ", data);
        
        dispatchQuestionnaire({ type: 'DELETE_LATEST_QUESTIONNAIRE', payload: data.latestQuestionnaire._id });
    }, [dispatchQuestionnaire]);

    const handleUpdateLatestMedication = useCallback((data: SocketLatestMedication) => {
        console.log("UPDATE LATEST MEDICATION! ", data);
        const { latestMedication } = data;
        const actionType = latestMedicationState.latestMedication.some(item => item._id === latestMedication._id)
        ? 'UPDATE_LATEST_MEDICATION'
        : 'ADD_LATEST_MEDICATION';
        console.log(actionType);
        dispatchMedication({ type: actionType, payload: latestMedication });
        console.log("Dispatch Update Latest Medication executado!");
    }, [dispatchMedication]);

    const handleDeleteLatestMedication = useCallback((data: SocketLatestMedication) => {
        console.log("DELETE LATEST MEDICATION! ", data);
        dispatchMedication({ type: 'DELETE_LATEST_MEDICATION', payload: data.latestMedication._id });
    }, [dispatchMedication]);

    return {
        handleUpdatePatientHistory,
        handleUpdateLatestQuestionnaire,
        handleDeleteLatestQuestionnaire,
        handleUpdateLatestMedication,
        handleDeleteLatestMedication
    };
};

export default UsePatientHistorySocket;