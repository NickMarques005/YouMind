import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../both/Header'
import { UserData } from 'types/user/User_Types';
import { UseTreatment } from '@providers/TreatmentProvider';
import Content from './Content';
import TreatmentRunning from './TreatmentRunning';
import { UseHandleActiveChat } from '../../../chat/hooks/UseHandleActiveChat';
import { screenHeight } from '@utils/layout/Screen_Size';
import SearchUsers from '../search/SearchUsers';
import { UseSearchHandling } from '../../hooks/UseSearchHandling';

interface PatientTreatmentProps {
    userType?: string;
    userData?: UserData;
}

const PatientTreatment = ({ userType, userData }: PatientTreatmentProps) => {
    
    const { treatment_state } = UseTreatment();
    const { HandleActiveChat } = UseHandleActiveChat();
    const { modalSearch, handleModalSearch } = UseSearchHandling();

    return (
        <View style={styles.screenTreatment}>
            <Header userType={userType} userData={userData} />
            {
                treatment_state.treatments.length === 0 ?
                    <Content handleSearch={handleModalSearch} />
                :
                <TreatmentRunning treatment_state={treatment_state} userType={userType} userData={userData} handleActiveChat={HandleActiveChat} />
            }
            { modalSearch && <SearchUsers visible={modalSearch} onClose={handleModalSearch} userData={userData} userType={userType} />}
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