import React from 'react';
import { Image, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { screenHeight } from '@utils/layout/Screen_Size';

interface CurrentPatientHeaderProps {
    patientAvatar?: string;
    patientName?: string;
}

const CurrentPatientHeader: React.FC<CurrentPatientHeaderProps> = ({ patientAvatar, patientName }) => (
    <View style={{ height: screenHeight * 0.25, width: '100%', backgroundColor: '#2b4e63' }}>
        {patientAvatar &&
            <Image
                style={{ position: 'absolute', width: '45%', height: screenHeight * 0.25, resizeMode: 'cover' }}
                source={{ uri: patientAvatar }} />
        }
        <LinearGradient colors={['#4195a6', 'transparent']}
            start={{ x: 0.36, y: 0 }}
            end={{ x: 0, y: 0 }} style={{ width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'flex-end' }}>
            <View style={{ width: '62%', height: '100%', paddingVertical: '5%', paddingRight: '6%', justifyContent: 'center' }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', color: '#dfe7f5', marginBottom: '3%' }}>
                    {`Análise de \n${patientName}`}
                </Text>
                <Text style={{ fontSize: 16, fontWeight: '500', textAlign: 'center', color: '#c5d2e8' }}>
                    Verifique o desempenho de seu paciente
                </Text>
            </View>
        </LinearGradient>
    </View>
);

export default CurrentPatientHeader;