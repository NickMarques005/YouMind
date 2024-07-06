import { useEffect, useState } from 'react';
import { usePatientHistory } from '@features/app/providers/doctor/PatientHistoryProvider';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AnalysisStackNavigation } from 'types/navigation/Navigation_Types';
import { CurrentPatientItem, PatientHistory } from 'types/history/PatientHistory_Types';
import useOverallPerformanceMessage from '@hooks/analysis/useOverallPerformanceMessage';
import { UseAnalysisNavigation } from '../../../hooks/useAnalysisNavigation';
import { UseCurrentPatient } from './UseCurrentPatient';

export interface CurrentPatientParams {
    currenPatient?: PatientHistory;
}

export const useCurrentPatientAnalysis = () => {
    const { state } = usePatientHistory();
    const { navigateToAnalysisScreen } = UseAnalysisNavigation();
    const route = useRoute<RouteProp<AnalysisStackNavigation, 'current_patient'> & { params?: CurrentPatientParams }>();
    const currentPatientParams = route.params?.params;
    const { currentPatient } = UseCurrentPatient({ params: currentPatientParams });

    const [patientToAnalyze, setPatientToAnalyze] = useState<PatientHistory | undefined>();

    useEffect(() => {
        if (currentPatient) {
            const patientHistory = state.patientHistory.find(history => history.patientId === currentPatient);
            setPatientToAnalyze(patientHistory);
        }
    }, [currentPatient, state.patientHistory]);

    useEffect(() => {
        if (!currentPatient) {
            navigateToAnalysisScreen('main_analysis');
        }
    }, [currentPatient, navigateToAnalysisScreen]);

    const overallPerformanceMessage = useOverallPerformanceMessage(patientToAnalyze?.overallPerformance);

    return {
        currentPatient,
        patientToAnalyze,
        overallPerformanceMessage,
        navigateToAnalysisScreen,
    };
}