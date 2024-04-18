import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PatientAnalysis } from '../../../../../providers/AnalysisProvider';
import { UseAuth } from '../../../../../providers/AuthenticationProvider';
import { screenWidth, screenHeight } from '../../../../../utils/layout/Screen_Size';

interface CardPatientAnalysisProps {
    patient_analysis: PatientAnalysis;
}

const CardPatientAnalysis: React.FC<CardPatientAnalysisProps> = ({ patient_analysis }) => {
    const { authData } = UseAuth();
    const userIcon = authData.type === 'patient' ? require("../../../../../assets/app_doctor/chat/doctor_icon_chat.png") : require("../../../../../assets/app_doctor/chat/user_icon_chat.png");

    return (
        <View style={{ width: screenWidth * 0.85, height: screenHeight * 0.5, borderRadius: 35, elevation: 15, backgroundColor: 'white' }}>
            <LinearGradient colors={['#cae1eb', '#edf5f4', '#f2fcfc']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.3, y: 1 }} style={{ width: '100%', height: '100%', padding: 25, display: 'flex', justifyContent: 'space-between' }}>
                <View style={{ position: 'absolute', right: 10, top: -20, zIndex: 3, width: screenWidth * 0.18, height: screenWidth * 0.18, backgroundColor: '#547e8c', borderRadius: 50, overflow: 'hidden', elevation: 5 }}>
                    <Image source={!patient_analysis.photo ? userIcon : { uri: patient_analysis.photo }} style={{ width: '100%', height: '100%' }} />
                </View>

                <View style={{ width: '80%' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2c4652' }}>{patient_analysis.name}</Text>
                    <Text style={{ fontSize: 16, color: '#54707d' }}>{patient_analysis.email}</Text>
                </View>

                <View style={{ width: '100%', height: '50%', display: 'flex', gap: 10, }}>
                    <View style={{ width: '100%', borderBottomWidth: 0.5, borderBottomColor: '#a6bdbd', paddingBottom: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{}}>
                            <Text style={{ fontSize: 16, color: '#1d3540' }}>Estado atual: {patient_analysis.current_health_state * 100}%</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, }}>
                            <Text style={{ color: '#395663' }}>
                                Muito Bom!
                            </Text>
                            <Image style={{ width: 30, height: 30, }} source={require('../../../../../assets/app_doctor/analysis/happy_75_icon.png')} />
                        </View>

                    </View>

                    <View style={{paddingVertical: 5,}}>
                        <Text style={{ fontSize: 16, color: '#1d3540' }}>Desempenho</Text>
                    </View>
                    <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <LinearGradient colors={['#cae1eb', '#3d7c8f', '#27505c']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0.3, y: 1 }} style={{ padding: 25, alignItems: 'center', width: '49%', borderRadius: 10,}}>
                            <Image style={{ position: 'absolute', left: 10, top: 10, width: 30, height: 30 }} source={require('../../../../../assets/app_doctor/analysis/questionaire_analysis_icon.png')} />
                            <Text style={{fontSize: 16, color: 'white', fontWeight: 'bold'}}>
                                {`${patient_analysis ? patient_analysis.questionaires.current_questionaires : "0"}/ ${patient_analysis ? patient_analysis.questionaires.total_questionaires : 0}`}
                            </Text>
                            <Text style={{fontSize: 14, color: 'white', fontWeight: 'bold'}}>
                                respondidos
                            </Text>
                        </LinearGradient>
                        <LinearGradient colors={['#cae1eb', '#3d7c8f', '#27505c']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0.3, y: 1 }} style={{ padding: 25, alignItems: 'center', width: '49%', borderRadius: 10,}}>
                            <Image style={{ position: 'absolute', width: 30, left: 10, top: 10, height: 30, }} source={require('../../../../../assets/app_doctor/analysis/medicine_analysis_icon.png')} />
                            <Text style={{fontSize: 16, color: 'white', fontWeight: 'bold'}}>
                                {`${patient_analysis ? patient_analysis.medicines.current_medicines : 0}/ ${patient_analysis ? patient_analysis.medicines.total_medicines : 0}`}
                            </Text>
                            <Text style={{fontSize: 14, color: 'white', fontWeight: 'bold'}}>
                                consumidos
                            </Text>
                        </LinearGradient>
                    </View>
                </View>

                <LinearGradient colors={['#487985', '#2c696e', '#1c3f42']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }} style={{ width: '100%', borderRadius: 50, }}>
                    <TouchableOpacity style={{ paddingVertical: 20, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#f5f7f7' }}>VERIFICAR</Text>
                    </TouchableOpacity>
                </LinearGradient>

            </LinearGradient>
        </View>
    );
};

export default CardPatientAnalysis;
