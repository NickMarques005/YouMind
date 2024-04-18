import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { screenHeight, screenWidth } from '../../../../utils/layout/Screen_Size';
import { LinearGradient } from 'expo-linear-gradient';
import ChatTemplateUser from '../ChatTemplateUser';
import { Treatment, UseTreatment } from '../../../../providers/TreatmentProvider';
import { UseAuth } from '../../../../providers/AuthenticationProvider';
import { UseHandleActiveChat } from '../../../../hooks/chat/UseHandleActiveChat';

interface PatientTreatmentRunningProps {
    handleChat: (other_members: Treatment) => void
}

function PatientTreatmentRunning() {
    const { treatment_state } = UseTreatment();
    const { authData } = UseAuth();

    const HandleActiveChat = UseHandleActiveChat();

    return (
        <View style={{ display: 'flex', gap: 20, height: screenHeight * 0.92, width: '100%', paddingTop: 70, alignItems: 'center' }}>
            <LinearGradient colors={[`#783169`, '#a465ab', `#d8e2f0`]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 0.7 }} style={{ height: '100%', width: '100%', alignItems: 'center', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, paddingTop: 55, paddingBottom: 20, }}>

                <View style={{ width: '100%', height: '15%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 24, textTransform: 'uppercase', textAlign: 'center' }}>Seu Tratamento</Text>
                </View>
                <Image style={{ width: screenWidth * 0.8, height: screenWidth * 0.8 }} source={require('../../../../assets/app_patient/chat/illustration_treatment.png')} />

                <View style={{ width: '100%', paddingHorizontal: 15, height: screenHeight * 0.2, justifyContent: 'center' }}>
                    {treatment_state.treatments.map((user) => (
                        <ChatTemplateUser key={user.email} user={user} authData={authData} handleChat={HandleActiveChat}/>
                    ))}
                </View>
            </LinearGradient>
        </View>
    )
}

export default PatientTreatmentRunning;