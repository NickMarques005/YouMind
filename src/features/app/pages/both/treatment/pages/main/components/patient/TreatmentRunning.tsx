import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TreatmentState } from '@providers/TreatmentProvider';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import TemplateChatUser from '../both/TemplateChatUser';
import { UserData } from 'types/user/User_Types';
import images from '@assets/images';
import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types';

interface PatientTreatmentRunningProps {
    handleActiveChat: (other_members: TreatmentInfoTemplate) => void;
    userType?: string;
    userData?: UserData;
    treatment_state: TreatmentState;
}

const TreatmentRunning = ({ handleActiveChat, userType, userData, treatment_state }: PatientTreatmentRunningProps) => {

    const illustrationImg = images.app_patient_images.treatment.illustration_treatment;

    return (
        <View style={{ display: 'flex', gap: 20, height: screenHeight * 0.92, width: '100%', paddingTop: 70, alignItems: 'center' }}>
            <LinearGradient colors={[`#521e47`, '#ab65a2', `#d8e2f0`]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 0.7 }} style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'space-between', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, paddingTop: '15%', paddingBottom: '10%', }}>
                <View style={{ width: '100%', height: '15%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 24, textTransform: 'uppercase', textAlign: 'center' }}>Seu Tratamento</Text>
                </View>
                <View style={{width: '100%', flex: 1, padding: '5%' }}>
                    <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={illustrationImg} />
                </View>
                <View style={{ width: '100%', paddingHorizontal: 15, justifyContent: 'center', }}>
                    {treatment_state.treatments.map((treatment) => (
                        <TemplateChatUser key={treatment._id} treatment={treatment} userData={userData} handleActiveChat={handleActiveChat} />
                    ))}
                </View>
            </LinearGradient>
        </View>
    )
}

export default TreatmentRunning;