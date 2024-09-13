import { responsiveSize, screenHeight } from '@utils/layout/Screen_Size';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import TreatmentSessionList from '../../both/TreatmentSessionList';
import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types';
import { UserType } from 'types/user/User_Types';
import { UseForm } from '@features/app/providers/sub/UserProvider';

interface PatientStatusProps {
    treatment?: TreatmentInfoTemplate;
}

const PatientStatusContent = ({ treatment }: PatientStatusProps) => {
    const { userData } = UseForm();
    const iconInfoSize = responsiveSize * 0.16;

    return (
        <View style={styles.patientContentContainer}>
            <View style={styles.dataContainer}>
                <View style={{ width: '100%', minHeight: screenHeight * 0.1 }}>
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', }}>
                        <View style={{ width: iconInfoSize, height: iconInfoSize, borderRadius: iconInfoSize, backgroundColor: 'white', position: 'absolute', zIndex: 2, justifyContent: 'center', alignItems: 'center' }}>
                            <MaterialIcons name="assignment" size={iconInfoSize * 0.5} color="#a574a6" />
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#a574a6', paddingVertical: 5, borderTopRightRadius: 25, marginLeft: iconInfoSize * 0.7, paddingLeft: iconInfoSize * 0.6, }}>
                            <Text style={styles.dataTitle}>Questionários Respondidos:</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', alignItems: 'center', marginVertical: 18, }}>
                        <Text style={{ fontSize: 22, color: 'white' }}>
                            {
                                treatment?.status?.questionnaires && treatment.status?.questionnaires > 0 ? treatment.status?.questionnaires : 0
                            }
                        </Text>
                    </View>
                </View>
                <View style={{ width: '100%', minHeight: screenHeight * 0.1 }}>
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', }}>
                        <View style={{ width: iconInfoSize, height: iconInfoSize, borderRadius: iconInfoSize, backgroundColor: 'white', position: 'absolute', zIndex: 2, justifyContent: 'center', alignItems: 'center' }}>
                            <MaterialIcons name="local-hospital" size={iconInfoSize * 0.5} color="#a574a6" />
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#a574a6', paddingVertical: 5, borderTopRightRadius: 25, marginLeft: iconInfoSize * 0.7, paddingLeft: iconInfoSize * 0.6, }}>
                            <Text style={styles.dataTitle}>Medicamentos tomados:</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', alignItems: 'center', marginVertical: 18, }}>
                        <Text style={{ fontSize: 22, color: 'white' }}>
                            {
                                treatment?.status?.medications && treatment.status?.medications > 0 ? treatment.status?.medications : 0
                            }
                        </Text>
                    </View>
                </View>
                <View style={{ width: '100%', minHeight: screenHeight * 0.1 }}>
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', }}>
                        <View style={{ width: iconInfoSize, height: iconInfoSize, borderRadius: iconInfoSize, backgroundColor: 'white', position: 'absolute', zIndex: 2, justifyContent: 'center', alignItems: 'center' }}>
                            <MaterialIcons name="watch" size={iconInfoSize * 0.5} color="#a574a6" />
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#a574a6', paddingVertical: 5, borderTopRightRadius: 25, marginLeft: iconInfoSize * 0.7, paddingLeft: iconInfoSize * 0.6, }}>
                            <Text style={styles.dataTitle}>Tempo de uso do T-Watch YouMind:</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', alignItems: 'center', marginVertical: 18, }}>
                        <Text style={{ fontSize: 22, color: 'white', maxWidth: '80%', }}>
                            {
                                treatment?.status?.twatch_time && treatment.status?.twatch_time > 0 ? treatment.status?.questionnaires : `0 horas e 0 minutos`
                            }
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{ height: screenHeight * 0.6, width: '100%', borderRadius: 20, overflow: 'hidden' }}>
                <View style={{ width: '100%', height: '20%', backgroundColor: '#a568b3', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.sessionTitle}>Histórico de Sessões</Text>
                </View>
                <View style={{ flex: 1, backgroundColor: 'rgba(37, 38, 38, 0.4)', paddingHorizontal: 15 }}>
                    <TreatmentSessionList sessions={treatment?.sessions} currentPerformance={treatment?.status?.currentPerformance}  userType={userData?.type as UserType} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    patientContentContainer: {
        marginVertical: screenHeight * 0.02
    },
    dataContainer: {
        marginVertical: screenHeight * 0.05,
    },
    dataTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    sessionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
});

export default PatientStatusContent;