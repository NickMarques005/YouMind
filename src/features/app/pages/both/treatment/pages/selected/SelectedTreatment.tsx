import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { UseForm } from '@features/app/providers/sub/UserProvider'
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import images from '@assets/images';
import { UsePatientProgressHandling } from './hooks/UsePatientProgressHandling';
import { RouteProp, useRoute } from '@react-navigation/native';
import { TreatmentStackNavigation } from 'types/navigation/Navigation_Types';
import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types';
import { UseTreatmentNavigation } from '../../hooks/UseTreatmentNavigation';
import { UseCurrentTreatment } from './hooks/UseCurrentTreatment';
import { usePatientHistory } from '@features/app/providers/doctor/PatientHistoryProvider';
import { PatientHistory } from 'types/history/PatientHistory_Types';
import { useTerminateTreatment } from '../main/components/doctor/hooks/UseTerminateTreatment';
import { UseLoading } from '@hooks/loading/UseLoading';
import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';
import DefaultLoading from '@components/loading/DefaultLoading';

export interface TreatmentSelectedParams {
    currenTreatment?: TreatmentInfoTemplate;
    patientHistory: PatientHistory;
}

const SelectedTreatment = () => {
    const { userData } = UseForm();

    const { navigateToTreatmentScreen } = UseTreatmentNavigation();
    const route = useRoute<RouteProp<TreatmentStackNavigation, 'selected_treatment'> & { params?: TreatmentSelectedParams }>();
    const currentTreatmentParams = route.params?.params;
    const { currentTreatment } = UseCurrentTreatment({ params: currentTreatmentParams });
    const { loading, setLoading } = UseLoading();
    const { HandleResponseAppError, HandleResponseAppSuccess } = UseGlobalResponse();

    const { patientProgress, history, productivityLevel, performanceMessage } = UsePatientProgressHandling(currentTreatment?.uid);
    const backIcon = images.generic_images.back.arrow_back_white;
    const userIcon = images.app_doctor_images.chat.user_icon_chat;
    const { handleEndTreatment } = useTerminateTreatment({ setLoading, HandleResponseAppError, HandleResponseAppSuccess });

    return (
        <>
            <ScrollView style={[{ flex: 1 }]}>
                <LinearGradient colors={['#edf4f7', '#c5d4d6',]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0.2, y: 1 }} style={{ minHeight: screenHeight * 0.9, justifyContent: 'space-between', }}>
                    {
                        <View style={{ width: '100%', }}>
                            <LinearGradient colors={['#3f8a99', '#62aeb3',]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }} style={{ width: '100%', height: '27%', padding: 35, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, }}>
                                <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', paddingTop: 14, }}>
                                    <Text style={{ fontSize: 26, fontWeight: 'bold', color: 'white' }}>Tratamento Atual</Text>
                                </View>

                                <View style={{ position: 'absolute', left: 15, top: '20%' }}>
                                    <TouchableOpacity disabled={loading} onPress={() => navigateToTreatmentScreen('main_treatment')} style={{opacity: loading ? 0.5 : 1}}>
                                        <Image style={{ height: 35, width: 35 }} source={backIcon} />
                                    </TouchableOpacity>
                                </View>
                            </LinearGradient>
                            <View style={{ paddingVertical: 40, paddingHorizontal: 30, height: '73%', width: '100%', justifyContent: 'space-between' }}>
                                <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 20, justifyContent: 'space-between' }}>
                                    <View style={{ flex: 1 }}>
                                        <View style={{}}>
                                            <Text style={{ fontSize: 20, color: '#173436', fontWeight: '800', }}>Paciente</Text>
                                        </View>
                                        <Text style={{ fontSize: 18, color: '#3e858a' }}>{currentTreatment?.name}</Text>
                                        <Text style={{ fontSize: 14, color: 'rgba(87, 120, 122, 0.7)' }}>{currentTreatment?.email}</Text>
                                    </View>
                                    <View style={{ width: screenWidth * 0.18, height: screenWidth * 0.18, backgroundColor: '#547e8c', borderRadius: 50, overflow: 'hidden', elevation: 5 }}>
                                        <Image source={currentTreatment?.avatar ? { uri: currentTreatment.avatar } : userIcon} style={{ width: '100%', height: '100%' }} />
                                    </View>
                                </View>

                                <View style={{ width: '100%', height: '55%', borderRadius: 20, elevation: 10, backgroundColor: '#62aeb3' }}>
                                    <LinearGradient colors={['#3f8a99', '#62aeb3',]}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 0, y: 1 }} style={{ width: '100%', height: '100%', borderRadius: 10, }}>
                                        <View style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row' }}>
                                            <View style={{ width: '40%', paddingHorizontal: 15, paddingVertical: 22, alignItems: 'center', justifyContent: 'space-between' }}>
                                                <View style={{ alignItems: 'center', display: 'flex', gap: 5, }}>
                                                    <Text style={{ textAlign: 'center', fontWeight: '600', color: '#cae4eb' }}>Questionários respondidos</Text>
                                                    <Text style={{ fontSize: 12, color: '#dce6e8' }}>{history?.questionnaireHistory.answered}</Text>
                                                </View>
                                                <View style={{ alignItems: 'center', display: 'flex', gap: 5, }}>
                                                    <Text style={{ textAlign: 'center', fontWeight: '600', color: '#cae4eb' }}>Medicamentos Tomados</Text>
                                                    <Text style={{ fontSize: 12, color: '#dce6e8' }}>{history?.medicationHistory.taken}</Text>
                                                </View>
                                                <View style={{ alignItems: 'center', display: 'flex', gap: 5, }}>
                                                    <Text style={{ textAlign: 'center', fontWeight: '600', color: '#cae4eb' }}>Nível de produtividade</Text>
                                                    <Text style={{ fontSize: 12, color: '#dce6e8' }}>{productivityLevel}</Text>
                                                </View>
                                            </View>
                                            <View style={{ width: '60%', paddingHorizontal: 15, paddingVertical: 22, alignItems: 'center', justifyContent: 'space-between', display: 'flex', gap: 16, }}>
                                                <Text style={{ fontSize: 15, color: 'white', fontWeight: '600' }}>Desempenho Individual</Text>
                                                <AnimatedCircularProgress
                                                    size={120}
                                                    width={25}
                                                    rotation={0}
                                                    fill={patientProgress}
                                                    tintColor="#c5e7ed"
                                                    onAnimationComplete={() => []}
                                                    backgroundColor="#ccd6d9"
                                                >
                                                    {(fill) => (
                                                        <Text style={{ fontWeight: '900', fontSize: 20, color: '#f0f4f7' }}>{`${Math.round(fill)}%`}</Text>
                                                    )}
                                                </AnimatedCircularProgress>
                                                <Text style={{ fontSize: 14, color: 'white', textAlign: 'center' }}>{performanceMessage}</Text>
                                            </View>
                                        </View>
                                    </LinearGradient>
                                </View>
                                <LinearGradient colors={['#52a2ab', '#407d82', '#2a5f61',]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 0, y: 1 }} style={{ width: '100%', borderRadius: 50, }}>
                                    <TouchableOpacity onPress={() => currentTreatment && userData?.type && handleEndTreatment(currentTreatment._id, userData.type)} style={{ paddingVertical: 20, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                        {
                                            loading ?
                                                <DefaultLoading size={25} color={'white'}/>
                                                :
                                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#f5f7f7' }}>
                                                    ENCERRAR TRATAMENTO
                                                </Text>
                                        }
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                        </View>
                    }
                </LinearGradient>
            </ScrollView>
        </>
    )
}

export default SelectedTreatment;