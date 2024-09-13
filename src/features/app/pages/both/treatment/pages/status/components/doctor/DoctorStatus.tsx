import { View, StyleSheet, ScrollView, Text } from 'react-native';
import React from 'react';
import { UserType } from 'types/user/User_Types';
import StatusHeader from '../StatusHeader';
import StatusContent from '../StatusContent';
import { responsiveSize, screenHeight } from '@utils/layout/Screen_Size';
import { TreatmentScreenName } from 'types/navigation/Navigation_Types';
import TreatmentEnded from './components/treatment_ended/TreatmentEnded';
import TreatmentOnGoing from './components/treatment_ongoing/TreatmentOnGoing';
import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import { useDoctorStatusBehavior } from './hooks/useDoctorStatusBehavior';
import useDoctorStatusRendering from './hooks/useDoctorStatusRendering';
import GenericModal from '@components/modals/generic/GenericModal';
import useDoctorStatusSessions from './hooks/useDoctorStatusSessions';
import SessionModalComponent from './components/sessions/SessionModalComponent';

interface DoctorStatusProps {
    userType: UserType;
    navigateToTreatmentScreen: (screenName: TreatmentScreenName) => void;
    currentTreatments?: TreatmentInfoTemplate[];
    endedTreatments?: TreatmentInfoTemplate[];
}

const DoctorStatus = ({
    userType,
    navigateToTreatmentScreen,
    currentTreatments = [],
    endedTreatments = []
}: DoctorStatusProps) => {
    const { userData } = UseForm();
    const backIconSize = responsiveSize * 0.09;
    const { handleDoctorStatusNavigation, currentScreen } = useDoctorStatusRendering();
    const { isModalVisible, handleOpenSessions, currentTreatment, clearTreatmentSessions } = useDoctorStatusSessions();
    const { finalPerformance } = useDoctorStatusBehavior({
        endedTreatments,
        currentTreatments,
        doctorId: userData?._id
    });

    const renderStatusContent = () => {
        switch (currentScreen) {
            case 'main':
                return (
                    <ScrollView nestedScrollEnabled={true} style={{ flex: 1 }}>
                        <View style={styles.container}>
                            <StatusHeader
                                navigateToTreatmentScreen={navigateToTreatmentScreen}
                                backIconSize={backIconSize}
                                userType={userType}
                                finalPerformance={finalPerformance}
                            />
                            <StatusContent
                                userType={userType}
                                handleStatusNavigation={handleDoctorStatusNavigation}
                                doctorEndedTreatments={endedTreatments}
                                doctorCurrentTreatments={currentTreatments}
                            />
                        </View>
                    </ScrollView>
                );
            case 'treatmentEnded':
                return (
                    <TreatmentEnded
                        backIconSize={backIconSize}
                        navigateToStatusScreen={handleDoctorStatusNavigation}
                        endedTreatments={endedTreatments}
                        handleOpenSessions={handleOpenSessions}
                    />
                );
            case 'treatmentOnGoing':
                return (
                    <TreatmentOnGoing
                        backIconSize={backIconSize}
                        navigateToStatusScreen={handleDoctorStatusNavigation}
                        currentTreatments={currentTreatments}
                        userType={userType}
                        handleOpenSessions={handleOpenSessions}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <>
            {
                renderStatusContent()
            }
            {
                isModalVisible &&
                <GenericModal
                    isVisible={isModalVisible}
                    onClose={clearTreatmentSessions}
                    userType={userType}
                >
                    <SessionModalComponent
                        closeModal={clearTreatmentSessions}
                        userType={userType}
                        currentTreatment={currentTreatment}
                    />
                </GenericModal>
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: screenHeight * 0.9,
        padding: 20,
    },
});

export default DoctorStatus;