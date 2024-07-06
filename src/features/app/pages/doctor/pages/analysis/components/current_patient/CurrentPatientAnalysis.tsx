import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { responsiveSize, screenHeight } from '@utils/layout/Screen_Size'
import { UseLoading } from '@hooks/loading/UseLoading'
import { CurrentPatientItem, PatientHistory } from 'types/history/PatientHistory_Types';
import { usePatientHistory } from '@features/app/providers/doctor/PatientHistoryProvider';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AnalysisStackNavigation } from 'types/navigation/Navigation_Types';
import { UseCurrentPatient } from './hooks/UseCurrentPatient';
import { UseAnalysisNavigation } from '../../hooks/useAnalysisNavigation';
import LinearGradient from 'react-native-linear-gradient';
import images from '@assets/images';
import { MaterialIcons } from '@expo/vector-icons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import useOverallPerformanceMessage from '@hooks/analysis/useOverallPerformanceMessage';
import { useCurrentPatientBehavior } from './hooks/useCurrentPatientBehavior';
import CurrentPatientHeader from './components/CurrentPatientHeader';
import PatientPerformanceDetails from './components/PatientPerformanceDetails';
import PatientActions from './components/PatientActions';

export interface CurrentPatientParams {
    currenPatient?: PatientHistory;
}

export default function CurrentPatientAnalysis() {
    const { state } = usePatientHistory();
    const { navigateToAnalysisScreen } = UseAnalysisNavigation();
    const route = useRoute<RouteProp<AnalysisStackNavigation, 'current_patient'> & { params?: CurrentPatientParams }>();
    const currentPatientParams = route.params?.params;
    const { currentPatient } = UseCurrentPatient({ params: currentPatientParams });

    const iconSize = responsiveSize * 0.085;
    const backIcon = images.generic_images.back.arrow_back_doctor;
    const currentPatiendQuestionnaires = images.app_doctor_images.analysis.current_patient_questonnaires;
    const currentPatientMedications = images.app_doctor_images.analysis.current_patient_medications;
    const backButtonSize = responsiveSize * 0.1;
    const overallPerformanceSize = responsiveSize * 0.2;

    if (!currentPatient) {
        navigateToAnalysisScreen('main_analysis');
    }

    const filterCurrentPatient = (history: PatientHistory[], currentPatient: string) => {
        const patientHistory = history.find(history => history.patientId === currentPatient);
        return patientHistory;
    }

    const [patientToAnalyze, setPatientToAnalyze] = useState<PatientHistory | undefined>();

    useEffect(() => {
        if (currentPatient) {
            const patientHistory = filterCurrentPatient(state.patientHistory, currentPatient);
            setPatientToAnalyze(patientHistory);
        }
    }, [currentPatient, state.patientHistory]);

    if (!currentPatient) {
        navigateToAnalysisScreen('main_analysis');
        return null;
    }

    const overallPerformanceMessage = useOverallPerformanceMessage(patientToAnalyze?.overallPerformance);
    const { navigateToCurrentPatientMedications, navigateToCurrentPatientQuestionnaires } = useCurrentPatientBehavior();

    return (
        <View style={{ flex: 1, height: screenHeight * 0.9, }}>
            <CurrentPatientHeader patientAvatar={patientToAnalyze?.patientAvatar} patientName={patientToAnalyze?.patientName} />
            <View style={{ flex: 1, }}>
                <View style={{ width: '100%', height: '10%', backgroundColor: '#cae1e6', justifyContent: 'center', paddingHorizontal: '3%', }}>
                    <TouchableOpacity onPress={() => navigateToAnalysisScreen('main_analysis')} style={{ height: backButtonSize, width: backButtonSize, padding: '1%' }}>
                        <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={backIcon} />
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', flex: 1, padding: '4%', }}>
                    <PatientPerformanceDetails
                        medicationPerformance={patientToAnalyze?.medicationPerformance}
                        questionnairePerformance={patientToAnalyze?.questionnairePerformance}
                        overallPerformance={patientToAnalyze?.overallPerformance}
                        overallPerformanceMessage={overallPerformanceMessage}
                    />
                    {
                        <PatientActions
                            patientToAnalyze={patientToAnalyze}
                            navigateToCurrentPatientMedications={navigateToCurrentPatientMedications}
                            navigateToCurrentPatientQuestionnaires={navigateToCurrentPatientQuestionnaires}
                        />}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})