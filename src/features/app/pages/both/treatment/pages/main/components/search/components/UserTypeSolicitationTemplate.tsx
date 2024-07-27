import images from '@assets/images';
import { screenHeight } from '@utils/layout/Screen_Size';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SearchUserData } from 'types/treatment/Search_Types';
import { UserData } from 'types/user/User_Types';


interface UserTypesProps {
    userSearch: SearchUserData;
    userData?: UserData;
    selectUser: (userData: SearchUserData) => void;
}

const UserTypeSolicitationTemplate = ({ userSearch, userData, selectUser }: UserTypesProps) => {

    const userIcon = userSearch.type === 'doctor' ? images.app_doctor_images.chat.doctor_icon_chat : images.app_patient_images.chat.user_icon_chat;

    const isTreatmentRunning = userSearch.is_treatment_running;
    const iconSize = 65;

    return (
        <View style={[styles.userSearchTemplateContainer, {backgroundColor: `${userSearch.type === "patient" ? "rgba(84, 41, 97, 0.5)" : "rgba(41, 85, 97, 0.5)"}`, opacity: userSearch.type === 'patient' && isTreatmentRunning ? 0.6 : 1}]}>
            <TouchableOpacity onPress={() => selectUser(userSearch)} style={styles.userSearchButton}>
                <View style={[styles.userSearchImage, {backgroundColor: `${userSearch.type === "patient" ? "rgba(157, 108, 212, 0.2)" : "rgba(108, 181, 212, 0.2)"}`}]}>
                    <Image style={{ width: screenHeight * ((iconSize) / 1000), height: screenHeight * ((iconSize) / 1000), opacity: 0.7 }} source={ userSearch.avatar ? {uri: userSearch.avatar} : userIcon} />
                </View>
                <View style={styles.userSearchContentView}>
                    <View style={styles.userNameView}>
                        <Text style={styles.userNameText}>
                            {userSearch.name}
                        </Text>
                        <Text style={styles.userEmailText}>
                            {userSearch.email}
                        </Text>
                    </View>
                    <View>

                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
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

export default UserTypeSolicitationTemplate;