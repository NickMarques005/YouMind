import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { responsiveSize, screenHeight } from '@utils/layout/Screen_Size'
import { PatientHistory } from 'types/history/PatientHistory_Types';
import images from '@assets/images';
import { UseAnalysisNavigation } from '../../hooks/useAnalysisNavigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AnalysisStackNavigation } from 'types/navigation/Navigation_Types';
import { UseCurrentPatient } from '../current_patient/hooks/UseCurrentPatient';
import { UseNavigateOnSuccess } from '@hooks/navigation/UseNavigateSuccess';
import { UseCurrentPatientMedications } from './hooks/UseCurrentPatientHistory';
import { useHistoryMedicationsHandling } from './hooks/UseHistoryMedicationHandling';
import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';
import { UseLoading } from '@hooks/loading/UseLoading';
import DefaultLoading from '@components/loading/DefaultLoading';
import HistoryMedicationList from './components/HistoryMedicationList';
import NoHistoryMedication from './components/NoHistoryMedication';
import { useHistoryMedicationBehavior } from './hooks/useHistoryMedicationsBehavior';
import { useIconHandling } from '@hooks/users/UseIconHandling';

export interface CurrentPatientParams {
    patientHistory?: PatientHistory;
}


export default function HistoryMedications() {
    const { navigateToAnalysisScreen } = UseAnalysisNavigation();
    const { analysisNavigateOnSuccess } = UseNavigateOnSuccess();
    const { HandleResponseAppError } = UseGlobalResponse();
    const { handleUserIcon } = useIconHandling();
    const { loading, setLoading } = UseLoading(true);
    const nextLoading = UseLoading(false);

    const route = useRoute<RouteProp<AnalysisStackNavigation, 'history_patient_medications'> & { params?: CurrentPatientParams }>();
    const currentPatientParams = route.params?.params;
    const { currentPatientHistory } = UseCurrentPatientMedications({ params: currentPatientParams });

    const backButtonSize = responsiveSize * 0.085;
    const avatarSize = responsiveSize * 0.13;
    const loadingSize = responsiveSize * 0.16;
    const backIcon = images.generic_images.back.arrow_back_white;
    const defaultIcon = images.app_doctor_images.analysis.icon_medicine_analysis;

    const handleBackToCurrentPatient = (currentPatient?: string) => {
        if (!currentPatient) {
            return navigateToAnalysisScreen('main_analysis');
        }
        analysisNavigateOnSuccess('current_patient', { currentPatient });
    }

    const { medications, fetchMedications, hasMore } = useHistoryMedicationsHandling({ setLoading, nextSetLoading: nextLoading.setLoading, HandleResponseAppError, treatmentId: currentPatientHistory?.treatmentId });
    const { selectMedication } = useHistoryMedicationBehavior({ HandleResponseAppError });

    return (
        <View style={{ flex: 1, height: screenHeight * 0.9 }}>
            <View style={{ width: '100%', height: '16%', backgroundColor: '#4195a6', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                <View style={{ height: '60%', justifyContent: 'center', paddingHorizontal: '5%', }}>
                    <TouchableOpacity onPress={() => handleBackToCurrentPatient(currentPatientHistory?.patientId)} style={{ height: backButtonSize, width: backButtonSize, padding: '1%' }}>
                        <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={backIcon} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, height: '100%', justifyContent: 'center', }}>
                    <View style={{ width: '100%', padding: '5%' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{`Medicamentos de ${currentPatientHistory?.patientName}`}</Text>
                    </View>
                </View>
                <View style={{ width: avatarSize, height: avatarSize, marginHorizontal: '5%', borderRadius: avatarSize, borderWidth: 2, overflow: 'hidden', borderColor: '#7eb2bf' }}>
                    <Image style={{ width: '100%', height: '100%', resizeMode: 'contain', }} source={handleUserIcon({ userAvatar: currentPatientHistory?.patientAvatar, userType: 'patient', defaultAppIcon: defaultIcon })} />
                </View>
            </View>
            <View style={{ flex: 1, }}>
                {
                    loading ?
                        <DefaultLoading size={loadingSize} color={'#5294a1'} />
                        :
                        currentPatientHistory && medications.length !== 0 ?
                            <HistoryMedicationList
                                medications={medications}
                                loading={nextLoading.loading}
                                fetchMedications={fetchMedications}
                                treatmentId={currentPatientHistory?.treatmentId}
                                hasMore={hasMore}
                                patientHistory={currentPatientHistory}
                                selectMedication={selectMedication}
                            />
                            :
                            <NoHistoryMedication />
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})