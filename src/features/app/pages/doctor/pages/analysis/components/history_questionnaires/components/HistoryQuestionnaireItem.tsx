import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { HistoryQuestionnaire, PatientHistory } from 'types/history/PatientHistory_Types'
import { responsiveSize, screenHeight } from '@utils/layout/Screen_Size';
import LinearGradient from 'react-native-linear-gradient';
import images from '@assets/images';
import { MaterialIcons } from '@expo/vector-icons';
import { FormatISOToStringDate, formatRelativeTime } from '@utils/date/DateFormatting';

interface HistoryQuestinnaireItemProps {
    questionnaire: HistoryQuestionnaire;
    patientHistory: PatientHistory;
    selectQuestionnaire: (questionnaire: HistoryQuestionnaire, patientHistory: PatientHistory) => void
}

const HistoryQuestionnaireItem = ({ questionnaire, patientHistory, selectQuestionnaire }: HistoryQuestinnaireItemProps) => {
    const iconSize = responsiveSize * 0.09;
    const stateSize = responsiveSize * 0.3;

    const answeredGradient = ['#24404d', '#4195a6'];
    const notansweredGradient = ['#4a232f', '#ad5376'];
    const pendingGradient = ['#244d37', '#415aa6'];

    const iconGradient = questionnaire.pending ? pendingGradient : questionnaire.answered ? answeredGradient : notansweredGradient;
    const message = questionnaire.pending ? 'Pendente para hoje' : questionnaire.answered ? 'Respondido ' : 'Não Respondido';
    const messageColor = questionnaire.pending ? '#415aa6' : questionnaire.answered ? '#4195a6' : '#ad5376';

    return (
        <View style={{ height: screenHeight * 0.2, width: '100%' }}>
            <TouchableOpacity onPress={() => selectQuestionnaire(questionnaire, patientHistory)} style={{ flex: 1, flexDirection: 'row', paddingVertical: '6%' }}>
                <View style={{ width: '0%', height: '100%', justifyContent: 'center' }}>
                    <LinearGradient colors={iconGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0.2, y: 1 }} style={{ width: stateSize * 1.4, left: -stateSize / 1.3, height: stateSize, padding: '5%', borderRadius: stateSize, zIndex: 2, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <View style={{ width: iconSize, height: iconSize, right: '14%', }}>
                            <MaterialIcons name="assignment" size={iconSize} color="#e1f0f5" />
                        </View>
                    </LinearGradient>
                </View>
                <View style={{ width: '100%', flex: 1, paddingLeft: '8%', }}>
                    <View style={{ width: '100%', minHeight: '63%', backgroundColor: '#7eb2bf', justifyContent: 'space-between', paddingLeft: '15%', paddingRight: '4%', alignItems: 'center', flexDirection: 'row' }}>
                        <View style={{ flex: 1, maxWidth: '87%', }}>
                            <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#e1f0f5', maxWidth: '100%', }}>{questionnaire.currentQuestionnaire.name}</Text>
                            <View style={{ width: '84%' }}>
                                <Text style={{ color: '#e9f2f5' }} numberOfLines={1} ellipsizeMode="tail">Paciente {patientHistory?.patientName}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, backgroundColor: '#f2f8fa', borderBottomWidth: 2, paddingLeft: '15%', paddingRight: '3%', alignItems: 'center', flexDirection: 'row', borderBottomColor: '#809ca6' }}>
                        <View style={{ height: '100%', justifyContent: 'center', }}>
                            <Text style={{ fontSize: 16, fontWeight: '600', color: messageColor }}>{message} {!questionnaire.pending && formatRelativeTime(questionnaire.updatedAt)}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default HistoryQuestionnaireItem

const styles = StyleSheet.create({})