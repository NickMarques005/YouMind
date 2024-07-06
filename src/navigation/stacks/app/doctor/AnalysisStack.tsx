import React from 'react';
import { Stack } from '@navigation/Stack';
import MainAnalysis from '@features/app/pages/doctor/pages/analysis/components/main/MainAnalysis';
import CurrentPatientAnalysis from '@features/app/pages/doctor/pages/analysis/components/current_patient/CurrentPatientAnalysis';
import HistoryQuestionnaires from '@features/app/pages/doctor/pages/analysis/components/history_questionnaires/HistoryQuestionnaires';
import HistoryMedications from '@features/app/pages/doctor/pages/analysis/components/history_medications/HistoryMedications';
import CurrentQuestionnaire from '@features/app/pages/doctor/pages/analysis/components/current_questionnaire/CurrentQuestionnaire';
import CurrentMedication from '@features/app/pages/doctor/pages/analysis/components/current_medication/CurrentMedication';

const AnalysisStack = () => {

    return (
        <>
            {
                <Stack.Navigator initialRouteName='main_analysis' screenOptions={{ headerShown: false, animation: 'fade' }}>
                    <Stack.Screen name="main_analysis" component={MainAnalysis} />
                    <Stack.Screen name="current_patient" component={CurrentPatientAnalysis}/>
                    <Stack.Screen name="history_patient_questionnaires" component={HistoryQuestionnaires}/>
                    <Stack.Screen name="history_patient_medications" component={HistoryMedications}/>
                    <Stack.Screen name="current_questionnaire" component={CurrentQuestionnaire}/>
                    <Stack.Screen name="current_medication" component={CurrentMedication}/>
                </Stack.Navigator>
            }
        </>
    );
};

export default AnalysisStack;