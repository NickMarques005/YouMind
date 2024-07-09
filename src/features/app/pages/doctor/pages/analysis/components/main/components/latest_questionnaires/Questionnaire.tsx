import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { HistoryQuestionnaire, LatestQuestionnaire } from 'types/history/PatientHistory_Types';
import { responsiveSize, screenHeight } from '@utils/layout/Screen_Size';
import images from '@assets/images';
import { MaterialIcons } from '@expo/vector-icons';
import { useIconHandling } from '@hooks/users/UseIconHandling';

interface QuestionnaireProps {
    latestQuestionnaire: LatestQuestionnaire;
    selectLatestQuestionnaire: (questionnaire: HistoryQuestionnaire) => void;
}

const Questionnaire = ({ latestQuestionnaire, selectLatestQuestionnaire }: QuestionnaireProps) => {
    const questionnaireIcon = images.app_patient_images.health.quiz.latest_questionnaire_icon;
    const { handleUserIcon } = useIconHandling();
    const iconSize = responsiveSize * 0.095;
    const questionnaireStateSize = responsiveSize * 0.12;

    return (
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: screenHeight * 0.23,
            padding: '4%',
        }}>
            <TouchableOpacity style={{ width: '100%', height: '100%', overflow: 'hidden', backgroundColor: '#fff', borderRadius: 20, elevation: 4, }} onPress={() => selectLatestQuestionnaire(latestQuestionnaire)}>
                <View style={{ width: '100%', minHeight: '30%', backgroundColor: '#2f5f70', padding: '4%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', }}>
                    <Text style={{ fontSize: 16, fontWeight: '700', color: '#badce3' }}>
                        {latestQuestionnaire.currentQuestionnaire.name}
                    </Text>
                    <View style={{ width: iconSize, height: iconSize, right: '15%', borderRadius: iconSize, borderWidth: 2, overflow: 'hidden', borderColor: '#7eb2bf', backgroundColor: '#8fbfc9' }}>
                        <Image style={{ width: '100%', height: '100%', resizeMode: 'contain', }} source={handleUserIcon({userAvatar: latestQuestionnaire.patientAvatar, userType: 'patient', defaultAppIcon: questionnaireIcon})} />
                    </View>
                </View>

                <View style={{ width: '100%', flex: 1, backgroundColor: latestQuestionnaire.answered ? '#2ca0ab' : '#ab2c57', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '6%' }}>
                    <View style={{}}>
                        {
                            latestQuestionnaire.answered ?
                                <View style={{}}>
                                    <Text style={{ fontSize: 18, fontWeight: '800', color: '#edf2f7' }}>
                                        Questionário respondido!
                                    </Text>
                                    <Text style={{ fontSize: 14, color: '#d3dfeb' }}>{`Paciente ${latestQuestionnaire.patientName ? latestQuestionnaire.patientName : 'Desconhecido'}`}</Text>
                                </View>
                                :
                                <View style={{}}>
                                    <Text style={{ fontSize: 18, fontWeight: '800', color: '#f7e4f2' }}>Questionário não respondido</Text>
                                    <Text style={{ fontSize: 14, color: '#d3dfeb' }}>{`Paciente ${latestQuestionnaire.patientName ? latestQuestionnaire.patientName : 'Desconhecido'}`}</Text>
                                </View>
                        }
                    </View>
                    <View style={{
                        width: questionnaireStateSize, height: questionnaireStateSize, borderRadius: 15, overflow: 'hidden',
                        backgroundColor: latestQuestionnaire.answered ? '#7bc2c9' : '#d485a0',
                        alignItems: 'center', justifyContent: 'center'
                    }}>
                        {
                            latestQuestionnaire.answered ?
                                <MaterialIcons name="check" size={24} color="white" />
                                :
                                <MaterialIcons name="block" size={24} color="white" />
                        }
                    </View>
                </View>
            </TouchableOpacity>

        </View>
    )
}

export default Questionnaire

const styles = StyleSheet.create({})