import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import images from '@assets/images';
import { PatientHistory } from 'types/history/PatientHistory_Types';

interface PatientActionsProps {
    patientToAnalyze?: PatientHistory;
    navigateToCurrentPatientMedications: (patient?: PatientHistory) => void;
    navigateToCurrentPatientQuestionnaires: (patient?: PatientHistory) => void;
}

const PatientActions: React.FC<PatientActionsProps> = ({
    patientToAnalyze,
    navigateToCurrentPatientMedications,
    navigateToCurrentPatientQuestionnaires
}) => {
    const currentPatiendQuestionnaires = images.app_doctor_images.analysis.current_patient_questonnaires;
    const currentPatientMedications = images.app_doctor_images.analysis.current_patient_medications;

    return (
        <View style={{ flex: 1, gap: 10 }}>
            <LinearGradient colors={['#4195a6', '#bad9e0']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }} style={{ width: '100%', flex: 1, borderRadius: 20 }}>
                <TouchableOpacity onPress={() => navigateToCurrentPatientMedications(patientToAnalyze)} style={{ width: '100%', height: '100%', flexDirection: 'row' }}>
                    <View style={{ flex: 1, paddingHorizontal: '5%', paddingVertical: '3%' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2f3a40' }}>Ver Medicamentos</Text>
                        {
                            patientToAnalyze ?
                                <>
                                    <Text>{`Total de ${patientToAnalyze.medicationHistory.total} ${patientToAnalyze.medicationHistory.total === 1 ? 'alerta' : 'alertas'}`}</Text>
                                    <Text style={{ fontWeight: '500' }}>{`Possui ${patientToAnalyze.medicationHistory.taken} ${patientToAnalyze.medicationHistory.taken === 1 ? 'tomado' : 'tomados'}`}</Text>
                                </>
                                :
                                <Text style={{ fontWeight: '500' }}>{"Nenhum dado encontrado"}</Text>
                        }

                    </View>

                    <View style={{ width: '20%', height: '100%' }}>
                        <Image style={{ width: '120%', height: '120%', resizeMode: 'contain' }} source={currentPatientMedications} />
                    </View>
                </TouchableOpacity>
            </LinearGradient>

            <LinearGradient colors={['#4195a6', '#bad9e0']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }} style={{ width: '100%', flex: 1, borderRadius: 20 }}>
                <TouchableOpacity onPress={() => navigateToCurrentPatientQuestionnaires(patientToAnalyze)} style={{ width: '100%', height: '100%', flexDirection: 'row' }}>
                    <View style={{ flex: 1, paddingHorizontal: '5%', paddingVertical: '3%' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2f3a40' }}>Ver Questionários</Text>
                        {
                            patientToAnalyze ?
                                <>
                                    <Text>{`Total de ${patientToAnalyze.questionnaireHistory.total} ${patientToAnalyze.questionnaireHistory.total === 1 ? 'recebido' : 'recebidos'}`}</Text>
                                    <Text style={{ fontWeight: '500' }}>{`Possui ${patientToAnalyze.questionnaireHistory.answered} ${patientToAnalyze.questionnaireHistory.answered === 1 ? 'respondido' : 'respondidos'}`}</Text>
                                </>
                                :
                                <Text style={{ fontWeight: '500' }}>{"Nenhum dado encontrado"}</Text>

                        }


                    </View>
                    <View style={{ width: '20%', height: '100%' }}>
                        <Image style={{ width: '120%', height: '120%', resizeMode: 'contain' }} source={currentPatiendQuestionnaires} />
                    </View>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
};

export default PatientActions;