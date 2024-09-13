import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import DefaultLoading from '@components/loading/DefaultLoading'
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size'
import { TreatmentState } from '@features/app/providers/sub/TreatmentProvider'
import LastChatList from './last_chat/LastChatList'
import { UserData } from 'types/user/User_Types'
import OnGoingTreatmentList from './treatments_ongoing/OnGoingTreatmentList'
import { UseTreatmentSelection } from './hooks/UseTreatmentSelection'
import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types'
import { PatientHistory } from 'types/history/PatientHistory_Types'

interface DoctorTreatmentContentProps {
    treatment_state: TreatmentState;
    handleActiveChat: (other_members: TreatmentInfoTemplate) => void
    userData?: UserData;
}

const Content = ({ treatment_state, handleActiveChat, userData }: DoctorTreatmentContentProps) => {

    const { selectedTreatment, handleSelectTreatment, handleCloseCurrentTreatment } = UseTreatmentSelection();

    return (
        <ScrollView style={{ top: -20, }}>
            <View style={styles.messagesContent_Container}>
                <LinearGradient colors={[`#51828f`, `rgba(182, 200, 209, 0.6)`, 'rgba(114, 81, 130, 0.1)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }} style={styles.treatment_View}>
                    <View style={styles.treatmentContentTemplate_View}>
                        <Text style={[styles.treatmentContentTemplate_Text, { color: 'white', fontSize: 20, }]}>Tratamentos em andamento</Text>
                    </View>
                    <View style={styles.treatmentInfo_View}>
                        <OnGoingTreatmentList treatment_state={treatment_state} handleSelectTreatment={handleSelectTreatment} />
                    </View>
                </LinearGradient>
                <View style={styles.lastChats_View}>
                    <View style={styles.treatmentContentTemplate_View}>
                        <Text style={[styles.treatmentContentTemplate_Text, { color: `#425e6b`, fontSize: 18 }]}>{"Últimas conversas"}</Text>
                    </View>
                    <View style={styles.lastChatsInfo_View}>
                        <LastChatList handleActiveChat={handleActiveChat} userData={userData} treatment_state={treatment_state} />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default Content;

const styles = StyleSheet.create({
    messagesContent_Container: {
        flex: 1,
        display: 'flex',
        gap: 20,
        height: 'auto',
        paddingBottom: '25%',
        width: screenWidth,
    },
    treatment_View: {
        display: 'flex',
        gap: 10,
        height: screenHeight * 0.3,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingTop: 45,
        paddingBottom: 20,
    },
    treatmentContentTemplate_Text: {
        fontWeight: 'bold'
    },
    treatmentContentTemplate_View: {
        width: '100%',
        display: 'flex',
        paddingHorizontal: 25,

    },
    treatmentInfo_View: {
        display: 'flex',
        height: '85%',
    },
    lastChats_View: {
        borderRadius: 20,
        paddingTop: 25,
        display: 'flex',
        gap: 25,
        height: 'auto',
    },
    lastChatsInfo_View: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
    },
});