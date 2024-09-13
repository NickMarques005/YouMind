import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { PatientHistory } from 'types/history/PatientHistory_Types';
import images from '@assets/images';
import { responsiveSize, screenHeight } from '@utils/layout/Screen_Size';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AnalysisStackNavigation } from 'types/navigation/Navigation_Types';
import { UseAnalysisNavigation } from '../../hooks/useAnalysisNavigation';
import { UseNavigateOnSuccess } from '@hooks/navigation/UseNavigateSuccess';
import { UseCurrentPatientQuestionnaires } from './hooks/UseCurrentPatientHistory';
import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';
import { UseLoading } from '@hooks/loading/UseLoading';
import { useHistoryQuestionnairesHandling } from './hooks/UseHistoryQuestionnairesHandling';
import DefaultLoading from '@components/loading/DefaultLoading';
import HistoryQuestionnaireList from './components/HistoryQuestionnaireList';
import NoHistoryQuestionnaire from './components/NoHistoryQuestionnaire';
import { useHistoryQuestionnaireBehavior } from './hooks/useHistoryQuestionnaireBehavior';
import { useIconHandling } from '@hooks/users/UseIconHandling';

export interface CurrentPatientParams {
    currenPatient?: PatientHistory;
}


export default function HistoryQuestionnaires() {
    const { navigateToAnalysisScreen } = UseAnalysisNavigation();
    const { analysisNavigateOnSuccess } = UseNavigateOnSuccess();
    const { HandleResponseAppError } = UseGlobalResponse();
    const { handleUserIcon } = useIconHandling();
    const { loading, setLoading } = UseLoading(true);
    const nextLoading = UseLoading(false);

    const route = useRoute<RouteProp<AnalysisStackNavigation, 'history_patient_questionnaires'> & { params?: CurrentPatientParams }>();
    const currentPatientParams = route.params?.params;
    const { currentPatientHistory } = UseCurrentPatientQuestionnaires({ params: currentPatientParams });

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

    const { questionnaires, fetchQuestionnaires, hasMore } = useHistoryQuestionnairesHandling({ setLoading, nextSetLoading: nextLoading.setLoading, HandleResponseAppError, treatmentId: currentPatientHistory?.treatmentId})
    const { selectQuestionnaire } = useHistoryQuestionnaireBehavior({ HandleResponseAppError });

    return (
        <View style={{ flex: 1, height: screenHeight * 0.9 }}>
            <View style={{ width: '100%', height: '16%', backgroundColor: '#4195a6', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                <View style={{ height: '60%', justifyContent: 'center', paddingHorizontal: '5%', }}>
                    <TouchableOpacity onPress={() => handleBackToCurrentPatient(currentPatientHistory?.patientId)} style={{ height: backButtonSize, width: backButtonSize, padding: '1%' }}>
                        <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={backIcon} />
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, height: '100%', justifyContent: 'center'}}>
                    <View style={{width: '100%', padding: '5%'}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>{`Questionários de ${currentPatientHistory?.patientName}`}</Text>
                    </View>
                </View>
                <View style={{ width: avatarSize, height: avatarSize,borderRadius: avatarSize, marginHorizontal: '5%', borderWidth: 2, overflow: 'hidden', borderColor: '#7eb2bf' }}>
                    <Image style={{ width: '100%', height: '100%', resizeMode: 'contain', }} source={handleUserIcon({ userAvatar: currentPatientHistory?.patientAvatar, userType: 'patient', defaultAppIcon: defaultIcon })} />
                </View>
            </View>
            <View style={{ flex: 1, }}>
                {
                    loading ?
                    <DefaultLoading size={loadingSize} color={'#5294a1'}/>
                    :
                    currentPatientHistory && questionnaires.length !== 0 ?
                    <HistoryQuestionnaireList
                        questionnaires={questionnaires}
                        loading={nextLoading.loading}
                        fetchQuestionnaires={fetchQuestionnaires}
                        hasMore={hasMore}
                        patientHistory={currentPatientHistory}
                        selectQuestionnaire={selectQuestionnaire}
                    />
                    : 
                    <NoHistoryQuestionnaire/>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})