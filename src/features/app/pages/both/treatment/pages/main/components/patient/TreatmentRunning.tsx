import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TreatmentState } from '@features/app/providers/sub/TreatmentProvider';
import { responsiveSize, screenHeight } from '@utils/layout/Screen_Size';
import TemplateChatUser from '../both/TemplateChatUser';
import { UserData } from 'types/user/User_Types';
import images from '@assets/images';
import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types';
import DoctorInfoContainer from './DoctorInfoContainer';

interface PatientTreatmentRunningProps {
    handleActiveChat: (other_members: TreatmentInfoTemplate) => void;
    userType?: string;
    userData?: UserData;
    patientTreatment: TreatmentInfoTemplate;
}

const TreatmentRunning = ({ handleActiveChat, userType, userData, patientTreatment }: PatientTreatmentRunningProps) => {

    const illustrationImg = images.app_patient_images.treatment.illustration_treatment;
    const treatmentRunningIconSize = responsiveSize * 0.6;
    const treatmentIconSize = responsiveSize * 0.18;

    return (
        <View style={{ display: 'flex', height: screenHeight * 0.9, width: '100%', paddingTop: 70 }}>
            <ScrollView style={{ flex: 1 }}>
                <LinearGradient colors={[`#521e47`, '#ab65a2', `#d8e2f0`]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 0.7 }}
                    style={{
                        minHeight: screenHeight * 0.9,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '13%',
                        paddingBottom: '5%',
                        paddingHorizontal: '5%'
                    }}>
                    <View style={{ width: '100%', paddingVertical: '5%', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 24, textTransform: 'uppercase', textAlign: 'center' }}>Seu Tratamento</Text>
                    </View>
                    <View style={{ width: '100%', flex: 1, paddingBottom: 20, borderBottomWidth: 2, borderColor: 'rgba(171, 149, 167, 0.5)' }}>
                        <View style={{ width: '100%', alignItems: 'center'}}>
                            <Image style={{ width: treatmentRunningIconSize, height: treatmentRunningIconSize }} source={illustrationImg} />
                        </View>

                        <View style={{ flex: 1 }}>
                            <DoctorInfoContainer
                                currentTreatment={patientTreatment}
                                treatmentIconSize={treatmentIconSize}
                            />
                        </View>
                    </View>
                    <View style={{ width: '100%', paddingVertical: '5%', justifyContent: 'center', }}>
                        <TemplateChatUser
                            treatment={patientTreatment}
                            userData={userData}
                            handleActiveChat={handleActiveChat}
                        />
                    </View>
                </LinearGradient>
            </ScrollView>
        </View>
    )
}

export default TreatmentRunning;