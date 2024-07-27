import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { UserData } from 'types/user/User_Types';
import { UseTreatment } from '@providers/TreatmentProvider';
import Header from '../both/Header';
import { screenHeight } from '@utils/layout/Screen_Size';
import Content from './Content';
import { UseHandleActiveChat } from '../../../chat/hooks/UseHandleActiveChat';
import { UseSearchHandling } from '../../hooks/UseSearchHandling';
import SearchUsers from '../search/SearchUsers';

interface DoctorTreatmentProps {
    userType?: string;
    userData?: UserData;
}

const DoctorTreatment = ({ userType, userData }: DoctorTreatmentProps) => {
    
    const { treatment_state } = UseTreatment();
    const { HandleActiveChat }= UseHandleActiveChat();
    const { modalSearch, handleModalSearch } = UseSearchHandling();
    
    console.log(treatment_state.treatments);

    return (
        <View style={styles.screenTreatment}>
            <Header handleSearch={handleModalSearch} userType={userType} userData={userData} />
            <Content handleActiveChat={HandleActiveChat} treatment_state={treatment_state} userData={userData}  />
            <SearchUsers visible={modalSearch} onClose={handleModalSearch} userData={userData} userType={userType} />
        </View>
    )
}

const styles = StyleSheet.create({
    screenTreatment: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingTop: screenHeight * 0.11,
        alignItems: 'center',
        width: '100%',
    },
});

export default DoctorTreatment;