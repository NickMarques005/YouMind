import { useCallback } from 'react';
import { PatientHistory } from 'types/history/PatientHistory_Types';
import { usePatientHistory } from '@features/app/providers/doctor/PatientHistoryProvider';

const UsePatientHistorySocket = () => {
    const { dispatch, state } = usePatientHistory();

    const handleUpdatePatientHistory = useCallback((data: PatientHistory) => {
        console.log("UPDATE HISTORY! ", data);
        dispatch({ type: 'UPDATE_PATIENT_HISTORY', payload: data });
    }, []);

    return { handleUpdatePatientHistory };
};

export default UsePatientHistorySocket;