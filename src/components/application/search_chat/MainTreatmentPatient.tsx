import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, ScrollView, TextInput, Platform, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { UseAuth } from '../../../contexts/AuthContext';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { screenHeight } from '../../screen_size/Screen_Size';
import SearchUsers from './SearchUsers';
import { UseTreatment } from '../../../contexts/TreatmentContext';
import PatientTreatmentRunning from './treatment_pacient/PatientTreatmentRunning';
import { useNavigation } from '@react-navigation/native';
import { TreatmentStackTypes } from '../../../routes/MainRouter';

function MainTreatmentPatient() {
    const navigation = useNavigation<TreatmentStackTypes>();
    const { authData } = UseAuth();
    const { treatment_state } = UseTreatment();
    const [modalSearch, setSearch] = useState(false);
    const [solicitationTreatment, setSolicitationTreatment] = useState(false);

    const userIcon = authData.type === 'patient' ? require("../../../assets/app_patient/chat/user_icon_chat.png") : require("../../../assets/app_doctor/chat/doctor_icon_chat.png");
    const iconSize = 26;

    const handleSearchUsers = () => {
        console.log("HANDLE SEARCH");
        setSearch(!modalSearch);
    }

    return (
        <>
            {

                <View style={styleMainTreatmentPatient.screen_Messages}>
                    {
                        treatment_state.treatments.length === 0 ?
                            <View style={styleMainTreatmentPatient.messagesContent_Container}>
                                <LinearGradient colors={[`#c48fb9`, '#854ba6', `#342954`,]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 0, y: 1 }} style={styleMainTreatmentPatient.treatment_View}>
                                    <View style={styleMainTreatmentPatient.treatmentContentTemplate_View}>
                                        <Text style={[styleMainTreatmentPatient.treatmentContentTemplate_Text]}>
                                            Comece seu tratamento e cultive uma mente saudável!
                                        </Text>
                                    </View>
                                    <View style={styleMainTreatmentPatient.treatmentInfo_View}>
                                        <View style={styleMainTreatmentPatient.treatmentUserPatientView}>
                                            <Text style={styleMainTreatmentPatient.treatmentUserPatientText}>
                                                Em nosso espaço dedicado à saúde mental, acreditamos que cada passo em direção ao autocuidado é uma vitória. Se você ainda não está envolvido em um tratamento, procure por seu médico na barra de pesquisa abaixo.
                                                O tratamento pode oferecer melhores insights, estratégias de enfrentamento e um espaço seguro para compartilhar seus pensamentos e sentimentos.
                                            </Text>
                                        </View>
                                        <TouchableOpacity onPress={() => handleSearchUsers()} style={styleMainTreatmentPatient.searchIcon_Button}>
                                            <LinearGradient colors={[`#d683c5`, '#8e4d94', `#7685b3`,]}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 0, y: 1 }} style={styleMainTreatmentPatient.startSearch_View}>
                                                <FontAwesome name="search" size={screenHeight * ((iconSize + 5) / 1000)} onPress={() => handleSearchUsers()} color="white" />
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View>
                                </LinearGradient>
                            </View>
                            :
                            <PatientTreatmentRunning />
                    }
                    <LinearGradient colors={[`${authData.type == "patient" ? "#753567" : "#355f75"}`, `${authData.type == "patient" ? '#9b3aa6' : "#3a94a6"}`,]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0.8, y: 0.28 }} style={styleMainTreatmentPatient.headerMessages_View}>
                        <View style={styleMainTreatmentPatient.headerIcons_View}>
                            <TouchableOpacity style={styleMainTreatmentPatient.menuIcon_Button}>
                                <FontAwesome name="list" size={screenHeight * ((iconSize + 5) / 1000)} color="white" />
                            </TouchableOpacity>
                            <View style={styleMainTreatmentPatient.iconCurrentUser_View}>
                                <TouchableOpacity style={[styleMainTreatmentPatient.iconCurrentUser_Button, { backgroundColor: `${authData.type === "patient" ? "#582869" : "#1a3d54"}` }]}>
                                    <Image style={{ width: screenHeight * ((iconSize + 25) / 1000), height: screenHeight * ((iconSize + 25) / 1000) }} source={userIcon} />
                                </TouchableOpacity>
                            </View>
                            <View>
                            </View>
                        </View>

                    </LinearGradient>

                    <SearchUsers visible={modalSearch} onClose={handleSearchUsers} authData={authData} />
                </View>}
        </>

    )
}

const styleMainTreatmentPatient = StyleSheet.create({
    screen_Messages: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    headerMessages_View: {
        position: 'absolute',
        width: '100%',
        height: screenHeight * 0.11,
        paddingHorizontal: 30,
        paddingTop: 20,
        paddingBottom: 30,
        borderBottomLeftRadius: 25,
        zIndex: 5
    },
    headerIcons_View: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    menuIcon_Button: {
        height: '100%',
        justifyContent: 'center'
    },
    searchIcon_Button: {
        marginVertical: 20,
        width: 70,
        height: 70,
        borderRadius: 50,
        elevation: 12,
        backgroundColor: 'red'
    },
    iconCurrentUser_View: {
        height: '100%',
    },
    iconCurrentUser_Button: {

        borderRadius: 60,
        overflow: 'hidden',
    },
    headerTitle_View: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
    },
    headerTitle_Text: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white',
    },
    messagesContent_Container: {
        display: 'flex',
        gap: 20,
        height: screenHeight * 0.92,
        width: '100%',
        paddingTop: 70,
    },
    treatment_View: {
        height: '100%',
        width: '100%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingTop: 55,
        paddingBottom: 20,
    },
    treatmentUserPatientView: {
        width: '100%',
        height: '70%',
        paddingHorizontal: 35,
    },
    treatmentContentTemplate_Text: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 24,
        width: '80%',
        textTransform: 'uppercase',
        textAlign: 'auto'
    },
    treatmentContentTemplate_View: {
        width: '100%',
        display: 'flex',
        alignItems: 'center'

    },
    treatmentInfo_View: {
        marginVertical: 35,
        display: 'flex',
        alignItems: 'center',
    },
    treatmentUserPatientText: {
        fontSize: 18,
        color: 'rgba(212, 184, 203, 0.9)',
        textAlign: 'justify',
        lineHeight: 25
    },
    startSearch_View: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        borderRadius: 50,
        justifyContent: 'center'
    },
});

export default MainTreatmentPatient