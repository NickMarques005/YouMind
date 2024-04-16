import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { screenHeight, screenWidth } from '../../screen_size/Screen_Size';
import { LinearGradient } from 'expo-linear-gradient';
import { SearchUserData } from './SearchUsers';
import { AuthData } from '../../../contexts/AuthContext';
import { UseForm } from '../../../contexts/UserContext';
import HandleSolicitationTreatment from './HandleSolicitationTreatment';

export interface RequestSolicitationTreatmentData {
    url: string;
    method: string;
    data: {
        destinatary_user_type: string;
        destinatary_user_email: string;
    }

}

interface StartTreatmentProps {
    user: SearchUserData;
    authData: AuthData;
    handleBackSearch: (userData: SearchUserData) => void;
}

function StartTreatment({ user, authData, handleBackSearch }: StartTreatmentProps) {

    const { formData } = UseForm();
    const [solicitation, setSolicitation] = useState(false);
    const userIcon = user.type === 'doctor' ? require("../../../assets/app_doctor/chat/doctor_icon_chat.png") : require("../../../assets/app_patient/chat/user_icon_chat.png");
    const iconSize = 135;

    const isDoctorTreatment = (user.total_treatments && user.total_treatments.includes(authData.type === 'patient' ? formData.email : ""));
    const [requestData, setRequestData] = useState<RequestSolicitationTreatmentData | undefined>(undefined);

    useEffect(() => {
        console.log(user);
    }, []);

    const handleLoadingResponse = () => {
        console.log("Set Loading Response");
        setSolicitation(false);
    }

    const handleTreatmentSolicitation = (user: SearchUserData) => {
        const url_solicitation = 'notifyTreatmentSolicitation';
        const requestData: RequestSolicitationTreatmentData = {
            url: url_solicitation,
            method: 'POST',
            data: {
                destinatary_user_email: user.email,
                destinatary_user_type: user.type
            }
        }
        console.log(requestData);
        if (requestData) {
            setRequestData(requestData);
            setSolicitation(true);
        }

    }

    return (
        <>
            <View style={styleStartTreatment.staticContentTreatment_View}>
                <View style={styleStartTreatment.userTreatment_Header}>
                    <TouchableOpacity onPress={() => handleBackSearch(user)} style={styleStartTreatment.userTreatment_Container}>
                        <Image style={{ height: 30, width: 30 }} source={require('../../../assets/init/back/arrow_back_white.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styleStartTreatment.userTreatmentImg_View}>
                    <View style={[styleStartTreatment.userIcon_View, { backgroundColor: `${authData.type === "patient" ? "rgba(108, 181, 212, 0.2)" : "rgba(157, 108, 212, 0.2)"}` }]}>
                        <Image style={{ width: screenHeight * ((iconSize) / 1000), height: screenHeight * ((iconSize) / 1000) }} source={userIcon} />
                    </View>
                </View>
            </View>
            <View style={styleStartTreatment.userTreatment_Container}>
                <LinearGradient colors={user.type === 'doctor' ? ["#437a7d", 'rgba(98, 126, 138, 0.1)'] : ["#8a6283", "#7d4373", "rgba(148, 112, 142, 0.2)"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }} style={[styleStartTreatment.userTreatment_Gradient, { paddingBottom: user.is_treatment_running ? 0 : 100 }]}>
                    <View style={styleStartTreatment.userContent_View}>
                        <View style={styleStartTreatment.userNameTreatment_View}>
                            <Text style={styleStartTreatment.userNameTreatment_Text}>{authData.type === 'patient' ? `Dr. ${user.name}` : user.name}</Text>
                        </View>
                        <View style={styleStartTreatment.userInfoTreatment_View}>
                            <View style={styleStartTreatment.userInfoTemplateContainer}>
                                <Image style={{ width: 40, height: 40 }} source={require('../../../assets/init/search/user_icon.png')} />
                                <Text style={styleStartTreatment.userTextTemplate}>
                                    {user.name}
                                </Text>
                            </View>
                            <View style={styleStartTreatment.userInfoTemplateContainer}>
                                <Image style={{ width: 40, height: 40 }} source={require('../../../assets/init/search/email_icon.png')} />
                                <Text style={styleStartTreatment.userTextTemplate}>
                                    {user.email}
                                </Text>
                            </View>
                            <View style={styleStartTreatment.userInfoTemplateContainer}>
                                <Image style={{ width: 40, height: 40 }} source={require('../../../assets/init/search/phone_icon.png')} />
                                <Text style={styleStartTreatment.userTextTemplate}>
                                    {user.phone}
                                </Text>
                            </View>
                            <View style={styleStartTreatment.userInfoTemplateContainer}>
                                {
                                    user.type === "doctor" ?
                                        <>
                                            <Image style={{ width: 40, height: 40 }} source={require('../../../assets/init/search/treatment_icon.png')} />
                                            <Text style={styleStartTreatment.userTextTemplate}>
                                                {`Total de ${user.total_treatments ? user.total_treatments.length : 0} tratamentos feitos`}
                                            </Text>
                                        </>
                                        :
                                        ""
                                }
                            </View>
                        </View>
                    </View>
                    {
                        !user.is_treatment_running || isDoctorTreatment ?
                            <View style={styleStartTreatment.initTreatment_Container}>
                                <LinearGradient colors={user.type === 'patient' ? ["#914183", "#b565a9"] : ["#417c91", 'rgba(64, 76, 168, 0.7)']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 0, y: 1 }} style={styleStartTreatment.handleTreatment_View}>
                                    <TouchableOpacity onPress={() => handleTreatmentSolicitation(user)} style={styleStartTreatment.initTreatment_Button}>
                                        <Text style={styleStartTreatment.initTreatment_Text}>Iniciar Tratamento</Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                            :
                            <LinearGradient colors={user.type === 'patient' ? ["transparent", "#43264a"] : ["#417c91", 'rgba(64, 76, 168, 0.7)']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }} style={styleStartTreatment.alreadyInTreatment_View}>
                                <Text style={[styleStartTreatment.initTreatment_Text, { width: '60%', textAlign: 'center' }]}>{isDoctorTreatment ? "Esse médico já está executando tratamento com você" : `Usuário já está em tratamento no momento`}</Text>
                                <Image style={{ width: 80, height: 80, }} source={require('../../../assets/global/chat/in_treatment.png')} />
                            </LinearGradient>}
                </LinearGradient>

            </View >
            {
                solicitation ?
                    <HandleSolicitationTreatment requestData={requestData} handleLoading={() => handleLoadingResponse()} />
                    :
                    ""
            }
        </>
    )
}

const styleStartTreatment = StyleSheet.create({
    staticContentTreatment_View: {
        width: '100%',
        alignItems: 'center'
    },
    userTreatment_Header: {
        display: 'flex',
        width: '100%',
        alignItems: 'flex-start',
        paddingHorizontal: 25,
        paddingVertical: 25,
    },
    userTreatmentImg_View: {
        display: 'flex',
        paddingTop: 5,
        paddingBottom: 30,

    },
    userIcon_View: {
        borderRadius: 100,
        overflow: 'hidden'

    },
    userTreatment_Container: {
        display: 'flex',
        width: '100%'
    },
    userTreatment_Gradient: {
        display: 'flex',
        paddingTop: 50,
        paddingBottom: 70,
        gap: 20,
        width: '100%',
        height: '90%',
        borderRadius: 40,
        justifyContent: 'space-between',

    },
    userContent_View: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    userNameTreatment_View: {
        display: 'flex',
    },
    userNameTreatment_Text: {
        fontSize: 24,
        color: 'white',
        fontWeight: '500',
    },

    userInfoTreatment_View: {
        display: 'flex',
        width: '100%',
        gap: 10,
        paddingVertical: 45,
        justifyContent: 'center'
    },
    userInfoTemplateContainer: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    userTextTemplate: {
        fontSize: 16,
        color: 'rgba(197, 203, 209, 0.8)',

    },
    initTreatment_Container: {
        backgroundColor: 'transparent',
        borderRadius: 50,
        elevation: 5,
        marginHorizontal: 30,
    },
    handleTreatment_View: {
        width: '100%',
        alignItems: 'center',
        borderRadius: 50,

    },
    initTreatment_Button: {
        paddingVertical: 25,
    },
    initTreatment_Text: {
        fontSize: 20,
        color: 'white'
    },
    alreadyInTreatment_View: {
        display: 'flex',
        gap: 25,
        width: '100%',
        height: screenHeight * 0.35,
        alignItems: 'center',

    },
    alreadyInTreatment_Text: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    alreadyInTreatment_MiniText: {
        fontSize: 16,
        color: 'rgba(191, 191, 214, 0.8)',
    }
});

export default StartTreatment;