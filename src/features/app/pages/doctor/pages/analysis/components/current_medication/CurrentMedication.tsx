import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import images from '@assets/images';
import { RouteProp, useRoute } from '@react-navigation/native';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import { UseAnalysisNavigation } from '../../hooks/useAnalysisNavigation';
import { UseNavigateOnSuccess } from '@hooks/navigation/UseNavigateSuccess';
import { AnalysisStackNavigation } from 'types/navigation/Navigation_Types';
import { HistoryMedication, PatientHistory } from 'types/history/PatientHistory_Types';
import { UseCurrentMedication } from './hooks/useCurrentMedication';
import { responsiveSize, screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { useMedicationIcon } from '@hooks/medications/UseMedicationIcon';
import { FormatISOToStringDate } from '@utils/date/DateFormatting';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useCurrentMedicationBehavior } from './hooks/useCurrentMedicationBehavior';

interface CurrentMedicationParams {
    patientHistory: PatientHistory;
    medication: HistoryMedication;
    latest?: boolean;
}

const CurrentMedication = () => {
    const { navigateToAnalysisScreen } = UseAnalysisNavigation();
    const { analysisNavigateOnSuccess } = UseNavigateOnSuccess();
    const { userData } = UseForm();
    const route = useRoute<RouteProp<AnalysisStackNavigation, 'current_questionnaire'> & { params?: CurrentMedicationParams }>();
    const currentMedicationParams = route.params?.params;
    if (!currentMedicationParams) {
        console.log("No current medications.. ", currentMedicationParams);
        navigateToAnalysisScreen('main_analysis');
        return;
    }
    const { medication, patientHistory, latest } = UseCurrentMedication({ params: currentMedicationParams });
    const backIcon = images.generic_images.back.arrow_back_white;
    const current_medication_illustration = images.app_patient_images.health.medicines.current_medications_illustration;
    const { mainIcon } = useMedicationIcon(medication.currentMedication.type, userData?.type);
    const iconSize = responsiveSize * 0.25;

    const { handleAnalysisNavigation } = useCurrentMedicationBehavior();

    return (
        <View style={styles.currentQuestionContainer}>
            <View style={styles.header}>
                <ImageBackground source={current_medication_illustration}
                    style={{ width: '110%', height: '110%', position: 'absolute', right: '-16%', bottom: '5%', opacity: 0.5 }}
                    resizeMode="contain" />
                <View style={{ width: '100%', height: '30%', justifyContent: 'space-between', }}>
                    <TouchableOpacity onPress={() => handleAnalysisNavigation(patientHistory, latest)} style={{ height: '100%', width: 50, padding: '2%' }}>
                        <Image source={backIcon} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', flex: 1, paddingVertical: '5%' }}>
                    <View style={{}}>
                        <Text style={styles.headerTitle}>{`Medicamento Tomado`}</Text>
                    </View>
                    <View style={{ width: '55%', flex: 1 }}>
                        <Text style={styles.headerSubTitle}>{patientHistory?.patientName}</Text>
                    </View>
                </View>
            </View>
            <ScrollView style={{ flex: 1, }}>
                <View style={{ paddingHorizontal: '7%', paddingTop: '15%', paddingBottom: '10%' }}>
                    <View style={{ width: '100%', height: '100%', backgroundColor: '#fcfeff', borderRadius: 15, }}>
                        <View style={{ width: '100%', alignItems: 'center', height: '18%' }}>
                            <View style={{ width: iconSize, height: iconSize, padding: '6%', backgroundColor: '#447985', borderRadius: iconSize, elevation: 8, top: '-50%' }}>
                                <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={mainIcon} />
                            </View>
                        </View>
                        <View style={{ minHeight: screenHeight * 0.4 }}>
                            <View style={{ width: '100%', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#839ba3', paddingBottom: '3%' }}>
                                <Text style={{ fontSize: 16, fontWeight: '600', textAlign: 'center', color: '#245f73' }}>
                                    {medication.currentMedication.name}
                                </Text>
                            </View>
                            <View style={{ flex: 1, paddingHorizontal: '10%', justifyContent: 'space-between', paddingTop: '6%' }}>
                                <View style={{ marginBottom: '4%', width: '100%', flex: 1, }}>
                                    <Text style={styles.medicationDetailsTitle}>Quantidade</Text>
                                    <Text style={styles.medicationDetailsText}>{`${medication.currentMedication.dosage}${medication.currentMedication.type === 'Líquido' ? 'ml' : 'mg'}`}</Text>
                                </View>
                                <View style={{ marginBottom: '4%', width: '100%', flex: 1, }}>
                                    <Text style={styles.medicationDetailsTitle}>Programação</Text>
                                    <View style={{ flexDirection: 'row', gap: 5, flexWrap: 'wrap' }}>

                                        {
                                            medication.currentMedication.schedules?.map((schedule, index) => (
                                                <View key={index} style={{ padding: '2%', borderRadius: 5, backgroundColor: '#518994' }}>
                                                    <Text style={{ fontSize: 15, color: 'white' }} key={index}>{schedule}</Text>
                                                </View>

                                            ))}
                                    </View>
                                </View>
                                <View style={{ marginBottom: '4%', width: '100%', flex: 1, }}>
                                    <Text style={styles.medicationDetailsTitle}>Frequência</Text>
                                    <View></View>
                                    <Text style={styles.medicationDetailsText}>{`A cada ${medication.currentMedication.frequency} dia(s)`}</Text>
                                </View>

                                <View style={{ gap: 5, width: '100%', flex: 1, }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ fontWeight: '500', color: '#246a78' }}>{`Iniciado no dia ${FormatISOToStringDate(medication.currentMedication.start)}`}</Text>
                                        <MaterialIcons name="play-circle-outline" size={25} color="#246a78" />
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ fontWeight: '500', color: '#246a78' }}>{`Usar até o dia ${FormatISOToStringDate(medication.currentMedication.expiresAt)}`}</Text>
                                        <MaterialIcons name="hourglass-empty" size={25} color="#246a78" />
                                    </View>
                                </View>

                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default CurrentMedication;

const styles = StyleSheet.create({
    currentQuestionContainer: {
        width: screenWidth,
        minHeight: screenHeight * 0.9,
        backgroundColor: '#bfded3',
    },
    header: {
        width: '100%',
        height: screenHeight * 0.26,
        padding: '5%',
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor: '#246a78',
        elevation: 5,
        overflow: 'hidden'
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#e1e8f2',
    },
    headerSubTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#d3e3e2',
        textAlign: 'left'
    },
    medicationDetailsTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#214a4f',
        marginBottom: '3%',
    },
    medicationDetailsText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#5d7c87'
    }

})