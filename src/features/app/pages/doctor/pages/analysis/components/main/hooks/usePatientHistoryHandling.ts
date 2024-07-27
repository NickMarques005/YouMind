import { useEffect, useState } from 'react';
import { PatientHistory } from 'types/history/PatientHistory_Types';
import { usePatientHistory } from '@features/app/providers/doctor/PatientHistoryProvider';

export const usePatientHistoryHandling = () => {
    const { state } = usePatientHistory();
    const [patientsUnderAnalysis, setPatientsUnderAnalysis] = useState<PatientHistory[] | undefined>(undefined);

    useEffect(() => {
        if(state.patientHistory.length !== 0)
        {
            setPatientsUnderAnalysis(state.patientHistory);
        }
        else {
            setPatientsUnderAnalysis(undefined);
        }
    }, [state]);

    return { patientsUnderAnalysis, state };
};