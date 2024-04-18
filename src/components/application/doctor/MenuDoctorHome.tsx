import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AppStackTypes } from '../../../navigation/stacks/MainStack';
import { useNavigation } from '@react-navigation/native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import CountNotifications from '../../notifications/components/CountNotifications';

//retorna as dimensões do dispositivo 
import { screenHeight, screenWidth } from '../../../utils/layout/Screen_Size';
import { UseForm } from '../../../providers/UserProvider';
import { UseNotifications } from '../../../providers/NotificationProvider';
import { UseAuth } from '../../../providers/AuthenticationProvider';
import { UseMenu } from '../../../providers/MenuProvider';

const Doctor_Home = () => {
    const navigation = useNavigation<AppStackTypes>();
    const { formData } = UseForm();
    const { authData } = UseAuth();
    const [patientsProgress, setPatientsProgress] = useState(84);
    const [missMedicines, setMissMedicines] = useState(2);

    const {handleMenuOptionPress} = UseMenu();

    const handleStackNotifications = () => {
        navigation.navigate('notifications');
    }


    return (
        <ScrollView>
            <LinearGradient colors={['#f7fbfc', '#bee1e6']} style={styleHomeDoctor.screen_Home}>
                <View style={{ height: 'auto', width: '100%' }}>
                    <ImageBackground
                        source={require('../../../assets/app_doctor/home/doctor_home_title.png')}
                        style={styleHomeDoctor.backgroundImage_HomeTitle}
                    >
                        <View style={styleHomeDoctor.title_View}>

                            <Text style={styleHomeDoctor.title_Text}>{`Bem-vindo,\n${authData.type == 'patient' ? "" : "Dr. "}${formData && formData.name ? (formData.name).split(' ')[0] : "Usuário"}!`}</Text>
                            <TouchableOpacity onPress={() => handleStackNotifications()} style={styleHomeDoctor.notify_Button}>
                                <Image
                                    source={require('../../../assets/icon_notification.png')}
                                    style={styleHomeDoctor.icon_Notification}
                                />
                                <CountNotifications />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                    <View style={{ width: '100%', display: 'flex', gap: 20, paddingHorizontal: 25, top: - screenHeight * 0.12, overflow: 'hidden' }}>
                        <View style={{ width: '100%', minHeight: screenHeight * 0.25, backgroundColor: '#a9c4cf', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly', borderRadius: 20, shadowColor: 'black', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.2, shadowRadius: 3.84, elevation: 5, overflow: 'hidden' }}>
                            <ImageBackground style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%', opacity: 0.8, }} source={require('../../../assets/app_doctor/home/bg_home_1.png')}>

                                <View style={{ width: '70%', padding: 20, display: 'flex', gap: 10, justifyContent: 'space-between' }}>
                                    <View style={{}}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#063340' }}>Pronto para mudar a vida de seus pacientes?</Text>
                                    </View>
                                    <Text style={{ fontSize: 14, color: '#0b3440' }}>
                                        Procure pelos seus pacientes e faça a diferença em seus tratamentos.
                                    </Text>
                                    <LinearGradient colors={['#35a5c4', '#186a73',]}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 0, y: 1 }} style={{ width: '80%', alignItems: 'center', borderRadius: 40, }}>
                                        <TouchableOpacity onPress={() => handleMenuOptionPress("treatmentScreen")} style={{ paddingVertical: 15, paddingHorizontal: 20, width: '100%', alignItems: 'center', borderRadius: 40, }}>
                                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Procurar</Text>
                                        </TouchableOpacity>
                                    </LinearGradient>
                                </View>
                                <View style={{ position: 'absolute', height: '100%', width: '40%', right: -20, bottom: '-10%', alignItems: 'center' }}>
                                    <Image style={{ width: screenWidth * 0.4, height: screenWidth * 0.4, }} source={require('../../../assets/app_doctor/home/search_people_icon.png')} />
                                </View>
                            </ImageBackground>
                        </View>

                        <View style={{ width: '100%', minHeight: screenHeight * 0.5, backgroundColor: '#a9c4cf', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly', borderRadius: 20, shadowColor: 'black', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.2, shadowRadius: 3.84, elevation: 5, overflow: 'hidden' }}>
                            <ImageBackground style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%', opacity: 0.8, justifyContent: 'flex-end' }} source={require('../../../assets/app_doctor/home/bg_home_2.png')}>
                                <View style={{ width: '100%', alignItems: 'flex-end', display: 'flex', gap: 10, }}>
                                    <View style={{ width: '100%', padding: 20, display: 'flex', gap: 25, justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                        <View style={{ width: '100%', }}>
                                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#063340', textAlign: 'right' }}>
                                                Fique de olho no desempenho dos tratamentos
                                            </Text>
                                        </View>
                                        <View style={{ width: '60%', display: 'flex', gap: 10, alignItems: 'center' }}>
                                            <View style={{}}>
                                                <Text style={{ textAlign: 'center', fontSize: 14, color: '#2c454a' }}>Média do progresso de seus pacientes baseado nos questionários</Text>
                                            </View>
                                            <View style={{width: '100%', alignItems: 'center', display: 'flex', gap: 18,}}>
                                                <AnimatedCircularProgress
                                                    size={130}
                                                    width={30}
                                                    rotation={0}
                                                    fill={patientsProgress}
                                                    tintColor="#2aa2b8"
                                                    onAnimationComplete={() => []}
                                                    backgroundColor="#9bbac2"
                                                >
                                                    {(fill) => (
                                                        <Text style={{ fontWeight: '900', fontSize: 24, color: '#559ecf' }}>{`${Math.round(fill)}%`}</Text>
                                                    )}
                                                </AnimatedCircularProgress>

                                                <LinearGradient colors={['#62c5e3', '#135470']} style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 14, width: screenWidth * 0.4, borderRadius: 20, }}>
                                                    <TouchableOpacity onPress={() => handleMenuOptionPress("analysisScreen")} style={{ width: '100%', alignItems: 'center' }}>
                                                        <Text style={{ fontSize: 15, color: 'white' }}>Visualizar</Text>
                                                    </TouchableOpacity>
                                                </LinearGradient>
                                            </View>

                                        </View>

                                    </View>
                                    <View style={{ position: 'absolute', height: '100%', width: '40%', left: 0, bottom: '-20%', alignItems: 'center' }}>
                                        <Image style={{ width: screenWidth * 0.5, height: screenWidth * 0.5, }} source={require('../../../assets/app_doctor/home/treatment_care_icon.png')} />
                                    </View>
                                    <View style={{ width: '100%', height: screenHeight * 0.15 }}>
                                        <LinearGradient colors={['transparent', 'rgba(130, 178, 181, 0.8)', 'rgba(70, 126, 130, 0.8)']} style={{ width: '100%', height: '100%', paddingHorizontal: 20, gap: 15, }}>
                                            <View style={{ width: '100%', alignItems: 'center', }}>
                                                <Text style={{ textAlign: 'center', color: '#21464a', fontWeight: '500' }}>{`Nesta semana houve o total de ${missMedicines} medicamentos não tomados! `}</Text>

                                            </View>
                                            <View style={{ width: '100%', alignItems: 'center' }}>
                                                <LinearGradient colors={['rgba(138, 173, 184, 0.3)', '#1f565c']} style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 14, width: '100%', borderRadius: 20, }}>
                                                    <TouchableOpacity onPress={() => handleMenuOptionPress("analysisScreen")} style={{ width: '100%', alignItems: 'center' }}>
                                                        <Text style={{ fontSize: 15, color: 'white' }}>Verificar</Text>
                                                    </TouchableOpacity>
                                                </LinearGradient>
                                            </View>
                                        </LinearGradient>
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>

                        <View style={{ width: '100%', minHeight: screenHeight * 0.3, backgroundColor: '#a9c4cf', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly', borderRadius: 20, shadowColor: 'black', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.2, shadowRadius: 3.84, elevation: 5, overflow: 'hidden' }}>
                            <ImageBackground style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%', opacity: 0.8 }} source={require('../../../assets/app_doctor/home/bg_home_3.png')}>
                                <View style={{ width: '70%', padding: 20, display: 'flex', gap: 10, justifyContent: 'space-between' }}>
                                    <View style={{}}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#063340' }}>
                                            Precisa anotar o progresso do tratamento?
                                        </Text>
                                    </View>
                                    <Text style={{ fontSize: 14, color: '#0b3440' }}>
                                        Adicione observações em relação ao progresso dos pacientes. Isso pode ser a chave para um impacto ainda mais positivo na jornada de cura!
                                    </Text>
                                    <LinearGradient colors={['#35a5c4', '#186a73',]}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 0, y: 1 }} style={{ width: '100%', alignItems: 'center', borderRadius: 40, }}>
                                        <TouchableOpacity onPress={() => handleMenuOptionPress("notepadScreen")} style={{ paddingVertical: 15, paddingHorizontal: 20, display: 'flex', flexDirection: 'row', gap: 10, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                            <Image style={{ height: screenWidth * 0.05, width: screenWidth * 0.05 }} source={require('../../../assets/app_doctor/home/notes_icon.png')} />
                                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Vamos Anotar!</Text>
                                        </TouchableOpacity>
                                    </LinearGradient>
                                </View>
                                <View style={{ position: 'absolute', height: '100%', width: '40%', right: -10, bottom: '-15%', alignItems: 'center' }}>
                                    <Image style={{ width: screenWidth * 0.4, height: screenWidth * 0.6, }} source={require('../../../assets/app_doctor/home/notepad_illustration.png')} />
                                </View>
                            </ImageBackground>
                        </View>

                        <View style={{}}>

                        </View>
                    </View>
                </View>
            </LinearGradient>


        </ScrollView>

    );
};

const styleHomeDoctor = StyleSheet.create({
    screen_Home: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    view_Menu: {
        height: screenHeight * 0.14
    },
    backgroundImage_HomeTitle: {
        width: screenWidth,
        height: screenHeight * 0.45,
        display: 'flex',
        zIndex: 2,
    },
    title_View: {
        width: screenWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: screenHeight * 0.06,
        paddingHorizontal: screenWidth * 0.07,
    },
    title_Text: {
        fontSize: 28,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: 'white',
        top: 20,

    },
    notify_Button: {
        paddingTop: screenHeight * 0.02
    },
    icon_Notification: {
        width: 37,
        height: 37,
    },
});

export default Doctor_Home;