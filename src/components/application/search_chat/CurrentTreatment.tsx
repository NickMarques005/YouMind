import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    withSpring,
    useAnimatedStyle,
    withTiming,
    runOnJS,
    Easing,

} from 'react-native-reanimated';
import { screenHeight, screenWidth } from '../../screen_size/Screen_Size';
import { LinearGradient } from 'expo-linear-gradient';
import { Treatment, UseTreatment } from '../../../contexts/TreatmentContext';
import HandleNoteResponse from '../../errors/HandleNoteResponse';
import MidLoading from '../../loading/MidLoading';
import { UseAuth } from '../../../contexts/AuthContext';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { UpdateTreatment } from '../../../services/treatment/TreatmentServices';
import HandleSolicitationTreatment from './HandleSolicitationTreatment';
import { FetchData } from '../../../services/fetchUtils/APIUtils';
import USE_ENV from '../../../services/server_url/ServerUrl';

interface CurrentTreatmentProps {
    isVisible: boolean;
    treatment: Treatment;
    onClose: () => void;
}

export interface RequestSolicitation {
    route: string;
    method: string;
    data: object | undefined;
}

const CurrentTreatment: React.FC<CurrentTreatmentProps> = ({ isVisible, treatment, onClose }) => {
    const translateX = useSharedValue(-400);
    const opacity = useSharedValue(0);
    const [solicitation, setSolicitation] = useState(false);
    const [patientsProgress, setPatientsProgress] = useState(90);
    const { authData } = UseAuth();
    const [requestData, setRequestData] = useState<RequestSolicitation | undefined>(undefined);
    const {treatment_state, addTreatment} = UseTreatment();
    const { fullApiServerUrl } = USE_ENV();

    const iconSize = 40;

    const isAnimating = useSharedValue(false);

    useEffect(() => {
        translateX.value = withSpring(isVisible ? 0 : -(screenWidth), { damping: 30 }, (isFinished) => {
            if (!isFinished && !isVisible) {
                translateX.value = -(screenWidth * 0.6);

            }
        });
        opacity.value = withTiming(isVisible ? 1 : 0, { duration: 300, easing: Easing.ease });
    }, [isVisible, translateX]);

    const fadeIn = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    const slideIn = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: withSpring(translateX.value) }],
        };
    });

    const currentTreatmentFinish = () => {
        setSolicitation(false);
        handleCloseCurrentTreatment();
        console.log("FECHA");
    };


    const handleTreatmentSolicitation = (treatment: Treatment) => {
        const route_solicitation = 'deleteTreatment';
        const requestData: RequestSolicitation = {
            route: route_solicitation,
            method: 'POST',
            data: {
                treatmentId: treatment._id,
            }
        }
        console.log(requestData);
        if (requestData) {
            setRequestData(requestData);
            setSolicitation(true);
        }

    }

    const handleCloseCurrentTreatment = () => {

        if (!isAnimating.value) {
            isAnimating.value = true;

            translateX.value = withTiming(-(screenWidth), { duration: 500, easing: Easing.ease }, (isFinished) => {
                if (isFinished) {
                    opacity.value = withTiming(0, { duration: 500, easing: Easing.ease }, (isFinished) => {
                        if (isFinished) {
                            isAnimating.value = false;
                            runOnJS(onClose)();
                        }
                    });
                }
            });
        }
    }

    /*useEffect(() => {
        const fetchDataAndUpdateTreatment = async () => {
            console.log("\nFETCH TREATMENT DATA TEST!!\n");
            try {
                if (!authData || !authData.token || !authData.type) {
                    console.error('Token ou tipo de autenticação ausentes.');
                    return;
                }

                const apiRequestData = {
                    url: 'getTreatment',
                    method: 'POST',
                    data: {
                        type: authData.type
                    }
                };

                const result = await FetchData(apiRequestData, authData.token, fullApiServerUrl);

                if (result.success) {
                    console.log('Dados do tratamento:', result.data);
                    const data = result.data;
                    data.forEach((item: any) => {
                        if (!treatment_state.treatments.some(treatment => treatment.email === item.email)) {
                            addTreatment({
                                _id: item._id,
                                name: item.name,
                                email: item.email,
                            });
                        }
                    });
                } else {
                    console.log('Erro ao buscar dados do tratamento:', result.errors || result.error);
                }
            } catch (err) {
                console.log('Erro inesperado:', err);
            }
        };

        fetchDataAndUpdateTreatment();

    }, []);*/

    return (
        <>
            {
                isVisible ?
                    <Animated.View style={[{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(36, 56, 61, 0.5)', zIndex: 3, height: screenHeight, alignItems: 'center', }, fadeIn]} >
                        <Animated.View style={[{ height: screenHeight * 0.9, width: screenWidth, borderBottomRightRadius: 35, borderBottomLeftRadius: 35, }, slideIn]}>
                            <LinearGradient colors={['#edf4f7', '#c5d4d6',]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0.2, y: 1 }} style={{ height: '100%', justifyContent: 'space-between', }}>
                                {
                                    <View style={{ width: '100%', }}>
                                        <LinearGradient colors={['#3f8a99', '#62aeb3',]}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 0, y: 1 }} style={{ width: '100%', height: '27%', padding: 35, }}>
                                            <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', paddingTop: 14, }}>
                                                <Text style={{ fontSize: 26, fontWeight: 'bold', color: 'white' }}>Tratamento Atual</Text>
                                            </View>

                                            <View style={{ position: 'absolute', right: 15, top: '20%' }}>
                                                <TouchableOpacity onPress={() => handleCloseCurrentTreatment()} style={{}}>
                                                    <Image style={{ height: 50, width: 50 }} source={require("../../../assets/init/back/default_back_white.png")} />
                                                </TouchableOpacity>
                                            </View>
                                        </LinearGradient>
                                        <View style={{ paddingVertical: 40, paddingHorizontal: 30, height: '73%', width: '100%', justifyContent: 'space-between' }}>
                                            <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 20, justifyContent: 'space-between' }}>
                                                <View style={{ maxWidth: '72%' }}>
                                                    <Text style={{ fontSize: 18, fontWeight: '800' }}>{treatment.name}</Text>
                                                    <Text style={{ fontSize: 16, }}>{treatment.email}</Text>
                                                </View>
                                                <View style={{ width: screenWidth * 0.18, height: screenWidth * 0.18, backgroundColor: '#547e8c', borderRadius: 50, overflow: 'hidden', elevation: 5 }}>
                                                    <Image source={require("../../../assets/app_doctor/chat/user_icon_chat.png")} style={{ width: '100%', height: '100%' }} />
                                                </View>
                                            </View>

                                            <View style={{ width: '100%', height: '55%', borderRadius: 20, elevation: 10, backgroundColor: '#62aeb3' }}>
                                                <LinearGradient colors={['#3f8a99', '#62aeb3',]}
                                                    start={{ x: 0, y: 0 }}
                                                    end={{ x: 0, y: 1 }} style={{ width: '100%', height: '100%', borderRadius: 20, }}>
                                                    <View style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row' }}>
                                                        <View style={{ width: '40%', paddingHorizontal: 15, paddingVertical: 22, alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <View style={{ alignItems: 'center', display: 'flex', gap: 5, }}>
                                                                <Text style={{ textAlign: 'center', fontWeight: '600', color: '#cae4eb' }}>Questionários respondidos</Text>
                                                                <Text style={{ fontSize: 12, color: '#dce6e8' }}>36</Text>
                                                            </View>
                                                            <View style={{ alignItems: 'center', display: 'flex', gap: 5, }}>
                                                                <Text style={{ textAlign: 'center', fontWeight: '600', color: '#cae4eb' }}>Medicamentos Tomados</Text>
                                                                <Text style={{ fontSize: 12, color: '#dce6e8' }}>15</Text>
                                                            </View>
                                                            <View style={{ alignItems: 'center', display: 'flex', gap: 5, }}>
                                                                <Text style={{ textAlign: 'center', fontWeight: '600', color: '#cae4eb' }}>Nível de produtividade</Text>
                                                                <Text style={{ fontSize: 12, color: '#dce6e8' }}>Acima da média</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ width: '60%', paddingHorizontal: 15, paddingVertical: 22, alignItems: 'center', justifyContent: 'space-between', display: 'flex', gap: 16, }}>
                                                            <Text style={{ fontSize: 15, color: 'white', fontWeight: '600' }}>Desempenho Individual</Text>
                                                            <AnimatedCircularProgress
                                                                size={120}
                                                                width={25}
                                                                rotation={0}
                                                                fill={patientsProgress}
                                                                tintColor="#c5e7ed"
                                                                onAnimationComplete={() => []}
                                                                backgroundColor="#ccd6d9"
                                                            >
                                                                {(fill) => (
                                                                    <Text style={{ fontWeight: '900', fontSize: 20, color: '#f0f4f7' }}>{`${Math.round(fill)}%`}</Text>
                                                                )}
                                                            </AnimatedCircularProgress>
                                                            <Text style={{ fontSize: 14, color: 'white', }}>Está indo muito bem!</Text>
                                                        </View>
                                                    </View>

                                                </LinearGradient>
                                            </View>
                                            <LinearGradient colors={['#2a5f61', '#407d82', '#52a2ab']}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 0, y: 1 }} style={{ width: '100%', borderRadius: 50, }}>
                                                <TouchableOpacity onPress={() => handleTreatmentSolicitation(treatment)} style={{ paddingVertical: 20, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#f5f7f7' }}>ENCERRAR TRATAMENTO</Text>
                                                </TouchableOpacity>
                                            </LinearGradient>
                                        </View>
                                    </View>
                                }
                                {
                                    solicitation && requestData ?
                                        <HandleSolicitationTreatment requestData={requestData} handleLoading={() => currentTreatmentFinish()} />
                                        : ""
                                }
                            </LinearGradient>
                        </Animated.View>
                    </Animated.View >
                    : ""
            }
        </>
    );
};

export default CurrentTreatment;

