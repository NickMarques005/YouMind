import { StyleSheet, View } from 'react-native';
import React from 'react';
import Header from '../both/Header';
import { UserData, UserType } from 'types/user/User_Types';
import { UseTreatment } from '@features/app/providers/sub/TreatmentProvider';
import Content from './Content';
import TreatmentRunning from './TreatmentRunning';
import { UseHandleActiveChat } from '../../../chat/hooks/UseHandleActiveChat';
import SearchUsers from '../search/SearchUsers';
import { UseSearchHandling } from '../../hooks/UseSearchHandling';
import useMenuAnimation from '@hooks/animation/UseMenuAnimation';

interface PatientTreatmentProps {
    userType?: string;
    userData?: UserData;
}

const PatientTreatment = ({ userType, userData }: PatientTreatmentProps) => {

    const { treatment_state } = UseTreatment();
    const { HandleActiveChat } = UseHandleActiveChat();
    const { modalSearch, handleModalSearch, handleModalTreatmentMenu, treatmentMenu } = UseSearchHandling();
    const { opacity, translateY, closeMenu } = useMenuAnimation({ isVisible: treatmentMenu, onClose: handleModalTreatmentMenu });

    return (
        <View style={styles.screenTreatment}>
            <Header
                userType={userType}
                userData={userData}
                opacity={opacity}
                translateY={translateY}
                treatmentMenu={treatmentMenu}
                handleTreatmentMenu={handleModalTreatmentMenu}
                closeMenu={closeMenu}
            />
            {
                treatment_state.treatments.length === 0 ?
                    <Content handleSearch={handleModalSearch} />
                    :
                    <TreatmentRunning
                        patientTreatment={treatment_state.treatments[0]}
                        userType={userType}
                        userData={userData}
                        handleActiveChat={HandleActiveChat}
                    />
            }
            {
                modalSearch && <SearchUsers
                    visible={modalSearch}
                    onClose={handleModalSearch}
                    userData={userData} 
                    userType={userType as UserType}
                />
            }
        </View>
    )
}

export default PatientTreatment

const styles = StyleSheet.create({
    screenTreatment: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
});