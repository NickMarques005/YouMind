import { useEffect, useState } from 'react';
import { PatientHistory } from 'types/history/PatientHistory_Types';
import { UseTreatment } from '@providers/TreatmentProvider';
import { usePatientHistory } from '@features/app/providers/doctor/PatientHistoryProvider';

export const usePatientHistoryHandling = () => {
    const { treatment_state } = UseTreatment();
    const { state } = usePatientHistory();
    const [patientsUnderAnalysis, setPatientsUnderAnalysis] = useState<PatientHistory[] | undefined>(undefined);

    useEffect(() => {
        if (state) {
            setPatientsUnderAnalysis(state.patientHistory);
        }
    }, [state]);

    return { patientsUnderAnalysis, state };
};