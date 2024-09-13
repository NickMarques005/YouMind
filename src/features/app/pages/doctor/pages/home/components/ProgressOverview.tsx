import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import React, { useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveSize, screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import images from '@assets/images';
import { DoctorScreenName } from 'types/navigation/Navigation_Types';
import { usePatientHistory } from '@features/app/providers/doctor/PatientHistoryProvider';
import { usePatientProgress } from '@features/app/providers/doctor/PatientProgressProvider';
import { UseTreatment } from '@features/app/providers/sub/TreatmentProvider';
import { calculateAllPerformances, calculateCurrentTreatmentsPerformances } from '@utils/treatment/HandlingPerformance';

interface ProgressOverviewProps {
    patientsProgress: number;
    missMedicines: number;
    navigateTo: (screenName: DoctorScreenName) => void;
}

const ProgressOverview = ({ navigateTo, }: ProgressOverviewProps) => {
    const { treatment_state } = UseTreatment();
    const { state } = usePatientHistory();
    const { setPatientsProgress, setMissMedications, missMedications, patientsProgress } = usePatientProgress();
    const homeBg2 = images.app_doctor_images.home.bg_home_content_2;
    const treatmentCareIcon = images.app_doctor_images.home.treatment_care_icon;
    const progressSize = responsiveSize * 0.35;

    useEffect(() => {
        if(state.patientHistory.length === 0)
        {
            setPatientsProgress(0);
            setMissMedications(0);
            return;
        }

        const averagePerformance = calculateCurrentTreatmentsPerformances(treatment_state.treatments);
        console.log(averagePerformance);
        setPatientsProgress(averagePerformance);

        const totalMissMedications = state.patientHistory.reduce((sum, patient) => sum + patient.lastWeekTaken, 0);
        setMissMedications(totalMissMedications);
        
    }, [state.patientHistory, treatment_state.treatments]);

    return (
        <View style={{ width: '100%', minHeight: screenHeight * 0.5, backgroundColor: '#a9c4cf', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly', shadowColor: 'black', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.2, shadowRadius: 3.84, elevation: 5, overflow: 'hidden' }}>
            <ImageBackground style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%', opacity: 0.8, justifyContent: 'flex-end' }} source={homeBg2}>
                <View style={{ width: '100%', alignItems: 'flex-end', display: 'flex', gap: 10, }}>
                    <View style={{ width: '100%', padding: 20, display: 'flex', gap: 25, justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <View style={{ width: '100%', }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#063340', textAlign: 'right' }}>
                                Fique de olho no desempenho dos tratamentos
                            </Text>
                        </View>
                        <View style={{ width: '60%', display: 'flex', gap: 10, alignItems: 'center' }}>
                            <View style={{}}>
                                <Text style={{ textAlign: 'center', fontSize: 15, color: '#2c454a' }}>Média do progresso de seus pacientes</Text>
                            </View>
                            <View style={{ width: '100%', alignItems: 'center', display: 'flex', gap: 18, }}>
                                <AnimatedCircularProgress
                                    size={progressSize}
                                    width={30}
                                    rotation={0}
                                    fill={patientsProgress}
                                    tintColor="#2aa2b8"
                                    onAnimationComplete={() => []}
                                    backgroundColor="rgba(155, 186, 194, 0.4)"
                                >
                                    {(fill) => (
                                        <Text style={{ fontWeight: '900', fontSize: 24, color: '#559ecf' }}>{`${Math.round(fill)}%`}</Text>
                                    )}
                                </AnimatedCircularProgress>
                                <LinearGradient colors={['#62c5e3', '#135470']} style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 14, width: screenWidth * 0.4, borderRadius: 20, }}>
                                    <TouchableOpacity onPress={() => navigateTo('Análises')} style={{ width: '100%', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 15, color: 'white' }}>Visualizar</Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                        </View>
                    </View>
                    <View style={{ width: '100%', height: screenHeight * 0.15 }}>
                        <LinearGradient colors={['transparent', 'rgba(130, 178, 181, 0.8)', 'rgba(70, 126, 130, 0.8)']} style={{ width: '100%', height: '100%', paddingHorizontal: 20, gap: 15, }}>
                            <View style={{ width: '100%', alignItems: 'center', }}>
                                <Text style={{ width: '80%', textAlign: 'center', color: '#21464a', fontWeight: '600' }}>{`Nos últimos sete dias houve o total de ${missMedications} medicamentos não tomados! `}</Text>
                            </View>
                            <View style={{ width: '100%', alignItems: 'center' }}>
                                <LinearGradient colors={['rgba(138, 173, 184, 0.3)', '#1f565c']} style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 14, width: '100%', borderRadius: 20, }}>
                                    <TouchableOpacity onPress={() => navigateTo('Análises')} style={{ width: '100%', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 15, color: 'white' }}>Verificar</Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                        </LinearGradient>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

export default ProgressOverview