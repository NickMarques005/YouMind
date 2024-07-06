import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { responsiveSize, screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import images from '@assets/images';
import { PatientHistory } from 'types/history/PatientHistory_Types';
import useCurrentHealthStateIcon from '@hooks/analysis/useCurrentHealthStateIcon';

interface CardPatientAnalysisProps {
    patientUnderAnalysis: PatientHistory;
    selectPatientToAnalyze: (patientId: string) => void;
}

const CardPatientAnalysis: React.FC<CardPatientAnalysisProps> = ({ patientUnderAnalysis, selectPatientToAnalyze }) => {

    const questionnaireHistoryIcon = images.app_doctor_images.analysis.icon_questionaire_analysis;
    const medicationHistoryIcon = images.app_doctor_images.analysis.icon_medicine_analysis;
    const patientIcon = images.app_doctor_images.chat.user_icon_chat;
    const avatarSize = responsiveSize * 0.18;
    const performanceIconSize = responsiveSize * 0.08;
    const happyIconSize = responsiveSize * 0.07;

    const healthStateInfo = useCurrentHealthStateIcon(patientUnderAnalysis.overallPerformance);

    return (
        <View style={{ width: screenWidth * 0.85, flex: 1, borderRadius: 35, elevation: 15, backgroundColor: 'white' }}>
            <LinearGradient colors={['#cae1eb', '#edf5f4', '#f2fcfc']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.3, y: 1 }} style={{ width: '100%', height: '100%', padding: '8%', display: 'flex', justifyContent: 'space-between' }}>
                <View style={{ position: 'absolute', right: 10, top: '-7%', zIndex: 3, width: avatarSize, height: avatarSize, backgroundColor: '#547e8c', borderRadius: 50, overflow: 'hidden', elevation: 5 }}>
                    <Image source={!patientUnderAnalysis.patientAvatar ? patientIcon : { uri: patientUnderAnalysis.patientAvatar }} style={{ width: '100%', height: '100%' }} />
                </View>

                <View style={{ width: '80%' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2c4652' }}>{patientUnderAnalysis.patientName}</Text>
                    <Text style={{ fontSize: 16, color: '#54707d' }}>{patientUnderAnalysis.patientEmail}</Text>
                </View>

                <View style={{ width: '100%', height: '50%', display: 'flex', gap: 10, }}>
                    <View style={{ width: '100%', borderBottomWidth: 0.5, borderBottomColor: '#a6bdbd', paddingBottom: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 5, }}>
                        <View style={{}}>
                            <Text style={{ fontSize: 16, color: '#1d3540' }}>Estado atual: </Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 9, flex: 1, justifyContent: 'flex-end' }}>
                            {
                                healthStateInfo &&
                                <>
                                    <Text style={{ color: '#395663', textAlign: 'center', maxWidth: '70%', }}>
                                        {healthStateInfo.text}
                                    </Text>
                                    {
                                        healthStateInfo.icon !== null &&
                                        <Image style={{ width: happyIconSize, height: happyIconSize, }} source={healthStateInfo.icon} />
                                    }
                                </>
                            }
                        </View>
                    </View>

                    <View style={{ paddingVertical: '2%', }}>
                        <Text style={{ fontSize: 16, color: '#1d3540' }}>Desempenho</Text>
                    </View>
                    <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1, }}>
                        <LinearGradient colors={['#cae1eb', '#3d7c8f', '#27505c']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0.3, y: 1 }} style={{ padding: '5%', alignItems: 'center', width: '49%', justifyContent: 'center', borderRadius: 10, }}>
                            <View style={{
                                borderRadius: performanceIconSize, position: 'absolute', left: '2%', top: '-8%', padding: '12%', width: performanceIconSize,
                                height: performanceIconSize, backgroundColor: '#1f3f5c', zIndex: 2
                            }}>
                                <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={questionnaireHistoryIcon} />
                            </View>

                            <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>
                                {
                                    `${patientUnderAnalysis ? patientUnderAnalysis.questionnaireHistory.answered : "0"}/ ${patientUnderAnalysis ? patientUnderAnalysis.questionnaireHistory.total : 0}`
                                }
                            </Text>
                            <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }}>
                                respondidos
                            </Text>
                        </LinearGradient>
                        <LinearGradient colors={['#cae1eb', '#3d7c8f', '#27505c']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0.3, y: 1 }} style={{ alignItems: 'center', width: '49%', borderRadius: 10, justifyContent: 'center' }}>
                            <View style={{
                                borderRadius: performanceIconSize, position: 'absolute', left: '2%', top: '-8%', padding: '12%',
                                width: performanceIconSize, height: performanceIconSize, backgroundColor: '#1f3f5c', zIndex: 2
                            }}>
                                <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={medicationHistoryIcon} />
                            </View>
                            <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>
                                {`${patientUnderAnalysis ? patientUnderAnalysis.medicationHistory.taken : 0}/ ${patientUnderAnalysis ? patientUnderAnalysis.medicationHistory.total : 0}`}
                            </Text>
                            <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }}>
                                consumidos
                            </Text>
                        </LinearGradient>
                    </View>
                </View>

                <LinearGradient colors={['#487985', '#2c696e', '#1c3f42']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }} style={{ width: '100%', borderRadius: 50, height: '20%' }}>
                    <TouchableOpacity onPress={() => selectPatientToAnalyze(patientUnderAnalysis.patientId)} style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#f5f7f7' }}>VERIFICAR</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </LinearGradient>
        </View>
    );
};

export default CardPatientAnalysis;
