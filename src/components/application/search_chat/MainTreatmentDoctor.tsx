import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, ScrollView, TextInput, Platform, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { UseAuth } from '../../../contexts/AuthContext';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { screenHeight } from '../../screen_size/Screen_Size';
import SearchUsers from './SearchUsers';
import { Treatment, UseTreatment } from '../../../contexts/TreatmentContext';
import MiniLoading from '../../loading/MiniLoading';
import TreatmentList from './TreatmentList';
import LastChatList from './LastChatList';
import { useNavigation } from '@react-navigation/native';
import { TreatmentStackTypes } from '../../../routes/MainRouter';
import { UseHandleActiveChat } from '../../../functions/chat/HandleActiveChat';
import CurrentTreatment from './CurrentTreatment';
import { UseChat } from '../../../contexts/ChatContext';

function MainTreatmentDoctor() {
    const navigation = useNavigation<TreatmentStackTypes>();
    const HandleActiveChat = UseHandleActiveChat();
    const { authData } = UseAuth();
    const { treatment_state } = UseTreatment();
    const [modalSearch, setSearch] = useState(false);
    const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
    const [currentTreatmentVisible, setCurrentTreatmentVisible] = useState(false);
    const { currentChat, redirectChat, handleRedirectChat } = UseChat();

    const userIcon = authData.type === 'patient' ? require("../../../assets/app_patient/chat/user_icon_chat.png") : require("../../../assets/app_doctor/chat/doctor_icon_chat.png");
    const iconSize = 26;

    useEffect(() => {
        if (redirectChat) {
            console.log("Redirect Chat! ", redirectChat);
            HandleActiveChat(redirectChat);
            
        }
        else {
            console.log("No redirect");
        }
    }, [redirectChat]);

    const handleSearchUsers = () => {
        console.log("HANDLE SEARCH");
        setSearch(!modalSearch);
    }

    const handleTreatmentClick = (treatment: Treatment) => {
        setSelectedTreatment(treatment);
        setCurrentTreatmentVisible(true);
        console.log("TREATMENT: ", treatment);
    };

    const handleCloseCurrentTreatment = () => {
        setCurrentTreatmentVisible(!currentTreatmentVisible);
        setSelectedTreatment(null);
        console.log("CLOSE CURRENT TREATMENT");
    }

    return (
        <View style={styleMainTreatmentDoctor.screen_Messages}>
            <LinearGradient colors={[`#355f75`, "#3a94a6",]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.8, y: 0.28 }} style={styleMainTreatmentDoctor.headerMessages_View}>
                <View style={styleMainTreatmentDoctor.headerIcons_View}>
                    <TouchableOpacity style={styleMainTreatmentDoctor.menuIcon_Button}>
                        <FontAwesome name="list" size={screenHeight * ((iconSize + 5) / 1000)} color="white" />
                    </TouchableOpacity>
                    <View style={styleMainTreatmentDoctor.iconCurrentUser_View}>
                        <TouchableOpacity style={[styleMainTreatmentDoctor.iconCurrentUser_Button, { backgroundColor: `${authData.type === "patient" ? "#582869" : "#1a3d54"}` }]}>
                            <Image style={{ width: screenHeight * ((iconSize + 25) / 1000), height: screenHeight * ((iconSize + 25) / 1000) }} source={userIcon} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => handleSearchUsers()} style={styleMainTreatmentDoctor.searchIcon_Button}>
                        <FontAwesome name="search" size={screenHeight * ((iconSize + 5) / 1000)} color="white" />
                    </TouchableOpacity>
                </View>

            </LinearGradient>
            <ScrollView style={{ top: -20, flex: 1, width: '100%', }}>
                <View style={styleMainTreatmentDoctor.messagesContent_Container}>
                    <LinearGradient colors={[`#51828f`, `rgba(182, 200, 209, 0.6)`, 'rgba(114, 81, 130, 0.1)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }} style={styleMainTreatmentDoctor.treatment_View}>
                        <View style={styleMainTreatmentDoctor.treatmentContentTemplate_View}>
                            <Text style={[styleMainTreatmentDoctor.treatmentContentTemplate_Text, { color: 'white', fontSize: 20, }]}>Tratamentos em andamento</Text>
                        </View>
                        <View style={styleMainTreatmentDoctor.treatmentInfo_View}>

                            {
                                <TreatmentList handleTreatmentClick={handleTreatmentClick} />
                            }

                        </View>
                    </LinearGradient>
                    <View style={styleMainTreatmentDoctor.lastChats_View}>
                        <View style={styleMainTreatmentDoctor.treatmentContentTemplate_View}>
                            <Text style={[styleMainTreatmentDoctor.treatmentContentTemplate_Text, { color: `#425e6b`, fontSize: 18 }]}>{"Últimas conversas"}</Text>
                        </View>
                        <View style={styleMainTreatmentDoctor.lastChatsInfo_View}>
                            {
                                treatment_state.treatments.length === 0 ?
                                    <MiniLoading />
                                    :
                                    <LastChatList handleChat={HandleActiveChat} />

                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
            {
                currentTreatmentVisible && selectedTreatment ?
                    <CurrentTreatment isVisible={currentTreatmentVisible} treatment={selectedTreatment} onClose={handleCloseCurrentTreatment} />
                    : ""
            }
            <SearchUsers visible={modalSearch} onClose={handleSearchUsers} authData={authData} />
        </View>

    )
}

const styleMainTreatmentDoctor = StyleSheet.create({
    screen_Messages: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingTop: screenHeight * 0.11,
        alignItems: 'center',
        width: '100%',
    },
    headerMessages_View: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: screenHeight * 0.11,
        paddingHorizontal: 30,
        paddingTop: 20,
        paddingBottom: 30,
        backgroundColor: '#48c7b4',
        borderBottomLeftRadius: 25,
        zIndex: 2
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
        height: '100%',
        justifyContent: 'center'
    },
    iconCurrentUser_View: {
        height: '100%',
    },
    iconCurrentUser_Button: {
        backgroundColor: 'red',
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
        minHeight: screenHeight * 0.83,
        width: '100%',
    },
    treatment_View: {
        display: 'flex',
        gap: 10,
        height: '38%',
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
        flex: 1,
        borderRadius: 20,
        paddingTop: 25,
        display: 'flex',
        gap: 25,
    },
    lastChatsInfo_View: {
        width: '100%',
        minHeight: '40%',
        display: 'flex',
        justifyContent: 'flex-start',
    },

});

export default MainTreatmentDoctor;