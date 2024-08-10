import { FormatISOToStringDate } from '@utils/date/DateFormatting';
import React from 'react';
import { View, Text, Image } from 'react-native';
import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import PatientAdditionalData from './PatientAdditionalDataContainer';

interface PatientInfoContainerProps {
    currentTreatment?: TreatmentInfoTemplate;
    userAvatarIconSize: number;
    userIcon: any;
}

const PatientInfoContainer: React.FC<PatientInfoContainerProps> = ({ currentTreatment, userAvatarIconSize, userIcon }) => {
    return (
        <View style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 20, }}>
            <View style={{ backgroundColor: 'rgba(114, 154, 168, 0.16)', borderRadius: 5, padding: '2%', flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                <View style={{ width: userAvatarIconSize, height: userAvatarIconSize, backgroundColor: '#547e8c', borderRadius: userAvatarIconSize, overflow: 'hidden', elevation: 5 }}>
                    <Image source={currentTreatment?.avatar ? { uri: currentTreatment.avatar } : userIcon} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, color: '#173436', fontWeight: '800' }}>Paciente</Text>
                    <Text style={{ fontSize: 17, color: '#3e858a', fontWeight: '600' }}>{currentTreatment?.name}</Text>
                    <Text style={{ fontSize: 15, color: 'rgba(87, 120, 122, 0.9)' }}>{currentTreatment?.email}</Text>
                </View>
            </View>
            <View style={{ backgroundColor: 'rgba(114, 154, 168, 0.16)', padding: '5%', flexDirection: 'column', width: '100%', justifyContent: 'space-between', gap: 20, }}>
                <View style={{ flex: 1, gap: 10, }}>
                    <PatientAdditionalData
                        title="Data de nascimento"
                        data={currentTreatment?.birth}
                        type="birth"
                    />
                    <PatientAdditionalData
                        title="Telefone"
                        data={currentTreatment?.phone}
                        type="phone"
                    />
                    <PatientAdditionalData
                        title="Gênero"
                        data={currentTreatment?.gender}
                        type="gender"
                    />
                </View>
            </View>
        </View>
    );
};

export default PatientInfoContainer;