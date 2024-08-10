import { View, ScrollView } from 'react-native'
import React from 'react'
import { UseForm } from '@features/app/providers/sub/UserProvider'
import LinearGradient from 'react-native-linear-gradient';
import { responsiveSize, screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import images from '@assets/images';
import { UsePatientProgressHandling } from './hooks/UsePatientProgressHandling';
import { RouteProp, useRoute } from '@react-navigation/native';
import { TreatmentStackNavigation } from 'types/navigation/Navigation_Types';
import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types';
import { UseTreatmentNavigation } from '../../hooks/UseTreatmentNavigation';
import { UseCurrentTreatment } from './hooks/UseCurrentTreatment';
import { PatientHistory } from 'types/history/PatientHistory_Types';
import { useTerminateTreatment } from '../main/components/doctor/hooks/UseTerminateTreatment';
import { UseLoading } from '@hooks/loading/UseLoading';
import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';
import CloseTreatmentVerification from './components/CloseTreatmentVerification';
import HeaderSelectedTreatment from './components/HeaderSelectedTreatment';
import PatientInfoContainer from './components/PatientInfoContainer';
import EndTreatmentButton from './components/EndTreatmentButton';
import OverallPatientPerformance from './components/OverallPatientPerformance';

export interface TreatmentSelectedParams {
    currenTreatment?: TreatmentInfoTemplate;
    patientHistory: PatientHistory;
}

const SelectedTreatment = () => {
    const { userData } = UseForm();

    const { navigateToTreatmentScreen } = UseTreatmentNavigation();
    const route = useRoute<RouteProp<TreatmentStackNavigation, 'selected_treatment'> & { params?: TreatmentSelectedParams }>();
    const currentTreatmentParams = route.params?.params;
    const { currentTreatment } = UseCurrentTreatment({ params: currentTreatmentParams });
    const { loading, setLoading } = UseLoading();
    const { HandleResponseAppError, HandleResponseAppSuccess } = UseGlobalResponse();

    const { patientProgress, history, productivityLevel, performanceMessage } = UsePatientProgressHandling(currentTreatment?.uid);
    const backIcon = images.generic_images.back.arrow_back_white;
    const userIcon = images.app_doctor_images.chat.user_icon_chat;
    const userAvatarIconSize = responsiveSize * 0.18;
    const { handleEndTreatment, closeTreatmentVerification, handleCloseTreatmentVerification, clearCloseTreatmentVerification } = useTerminateTreatment({ setLoading, HandleResponseAppError, HandleResponseAppSuccess });

    return (
        <View style={{ display: 'flex', flex: 1, width: screenWidth, height: screenHeight * 0.9, alignItems: 'center', }}>
            <ScrollView style={[{ flex: 1 }]}>
                <LinearGradient colors={['#edf4f7', '#c5d4d6',]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0.2, y: 1 }} style={{ flex: 1, minHeight: screenHeight }}>
                    <HeaderSelectedTreatment
                        loading={loading}
                        backIcon={backIcon}
                        navigateToTreatmentScreen={navigateToTreatmentScreen}
                        screenHeight={screenHeight}
                    />
                    <View style={{ paddingTop: 45, paddingHorizontal: 20, height: '73%', width: '100%', justifyContent: 'space-between', gap: 30 }}>
                        <PatientInfoContainer
                            userAvatarIconSize={userAvatarIconSize}
                            currentTreatment={currentTreatment}
                            userIcon={userIcon}
                        />
                        <OverallPatientPerformance
                            history={history}
                            performanceMessage={performanceMessage}
                            productivityLevel={productivityLevel}
                            patientProgress={patientProgress}
                        />
                        <EndTreatmentButton
                            currentTreatment={currentTreatment}
                            userData={userData}
                            loading={loading}
                            handleCloseTreatmentVerification={handleCloseTreatmentVerification}
                            handleEndTreatment={handleEndTreatment}
                        />
                    </View>
                </LinearGradient>
            </ScrollView>
            {
                userData && closeTreatmentVerification &&
                <CloseTreatmentVerification
                    userData={userData}
                    verificationMessage={closeTreatmentVerification.message || "Deseja confirmar essa ação?"}
                    handleVerificationAccept={closeTreatmentVerification.handleAccept}
                    handleCloseVerification={clearCloseTreatmentVerification}
                    acceptText={closeTreatmentVerification.acceptMessage}
                />
            }
        </View>
    )
}

export default SelectedTreatment;