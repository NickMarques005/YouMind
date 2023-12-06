import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { screenHeight, screenWidth } from '../../screen_size/Screen_Size';
import { SearchUserData } from './SearchUsers';
import { AuthData } from '../../../contexts/AuthContext';
import { UseForm } from '../../../contexts/FormContext';


interface UserTypesProps {
    user: SearchUserData;
    authData: AuthData;
    chooseUser: (userData: SearchUserData) => void;
}

function UserTypesChat({ user, authData, chooseUser }: UserTypesProps) {

    const { formData } = UseForm();
    const userIcon = authData.type === 'patient' ? require("../../../assets/app_doctor/chat/doctor_icon_chat.png") : require("../../../assets/app_patient/chat/user_icon_chat.png");

    const isTreatmentRunning = user.is_treatment_running || (user.total_treatments && user.total_treatments.includes(authData.type === 'patient' ? formData.email : ""));
    const iconSize = 65;

    return (
        <View style={[styleUserTypesChat.userSearchTemplateContainer, {backgroundColor: `${user.type == "patient" ? "rgba(84, 41, 97, 0.5)" : "rgba(41, 85, 97, 0.5)"}`, opacity: isTreatmentRunning ? 0.6 : 1}]}>
            <TouchableOpacity onPress={() => chooseUser(user)} style={styleUserTypesChat.userSearchButton}>
                <View style={[styleUserTypesChat.userSearchImage, {backgroundColor: `${authData.type === "patient" ? "rgba(108, 181, 212, 0.2)" : "rgba(157, 108, 212, 0.2)"}`}]}>
                    <Image style={{ width: screenHeight * ((iconSize) / 1000), height: screenHeight * ((iconSize) / 1000), opacity: 0.7 }} source={userIcon} />
                </View>
                <View style={styleUserTypesChat.userSearchContentView}>
                    <View style={styleUserTypesChat.userNameView}>
                        <Text style={styleUserTypesChat.userNameText}>
                            {user.name}
                        </Text>
                        <Text style={styleUserTypesChat.userEmailText}>
                            {user.email}
                        </Text>
                    </View>
                    <View>

                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styleUserTypesChat = StyleSheet.create({
    userSearchTemplateContainer: {
        display: 'flex',
        width: '100%',
        borderBottomWidth: 0.5,
        borderColor: 'white',
        paddingVertical: 10,
    },
    userSearchButton: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        gap: 15,
        
    },
    userSearchImage: {
        borderRadius: 45,
        overflow: 'hidden',
    },
    userSearchContent: {

    },
    userSearchContentView: {
        display: 'flex',
    },
    userNameView: {
        display: 'flex',
        gap: 5,
    },
    userNameText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    userEmailText: {
        fontSize: 13,
        color: 'rgba(237, 232, 230, 0.6)'
    }
});

export default UserTypesChat;