import images from '@assets/images';
import { responsiveSize, screenHeight } from '@utils/layout/Screen_Size';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SearchUserData } from 'types/treatment/Search_Types';
import { UserData } from 'types/user/User_Types';
import { FontAwesome } from '@expo/vector-icons';

interface UserTypesProps {
    userSearch: SearchUserData;
    userData?: UserData;
    handleChooseUser: (searchUserData: SearchUserData) => void;
}

const SearchUserTemplateItem = ({ userSearch, userData, handleChooseUser }: UserTypesProps) => {
    const userIcon = userSearch.type === 'doctor' ? images.app_doctor_images.chat.doctor_icon_chat : images.app_patient_images.chat.user_icon_chat;
    const iconSize = responsiveSize * 0.16;
    const miniIconSize = responsiveSize * 0.065;
    const userSearchStyles = styles(miniIconSize);

    return (
        <View style={[userSearchStyles.userSearchTemplateContainer, { backgroundColor: `${userSearch.type === "patient" ? "rgba(84, 41, 97, 0.5)" : "rgba(41, 85, 97, 0.5)"}`, opacity: userSearch.type === 'patient' && userSearch.is_treatment_running ? 0.6 : 1 }]}>
            <TouchableOpacity onPress={() => handleChooseUser(userSearch)} style={userSearchStyles.userSearchButton}>
                <View style={[userSearchStyles.userSearchImage, { backgroundColor: `${userSearch.type === "patient" ? "rgba(157, 108, 212, 0.2)" : "rgba(108, 181, 212, 0.2)"}` }]}>
                    <Image style={{ width: iconSize, height: iconSize, opacity: 0.9 }} source={userSearch.avatar ? { uri: userSearch.avatar } : userIcon} />
                </View>
                <View style={userSearchStyles.userSearchContentView}>
                    <View style={userSearchStyles.userNameView}>
                        <Text style={userSearchStyles.userNameText}>
                            {userSearch.name}
                        </Text>
                        <View style={{}}>
                            {
                                userSearch.type === 'patient' ?
                                    userSearch.is_treatment_running &&
                                    <View style={userSearchStyles.treatmentInfo}>
                                        <View style={userSearchStyles.avatarContainer}>
                                            
                                            {userSearch.doctor?.avatar ? (
                                                <Image
                                                    style={userSearchStyles.doctorAvatar}
                                                    source={{ uri: userSearch.doctor.avatar }}
                                                />
                                            ) : (
                                                <FontAwesome name="user-md" size={miniIconSize * 0.6} color="white" />
                                            )}
                                        </View>
                                        <Text style={userSearchStyles.treatmentStatusText}>Tratamento em andamento</Text>
                                    </View> :
                                    userSearch.type === 'doctor' ?
                                        userSearch.total_treatments && userSearch.total_treatments?.length !== 0 &&
                                        <View style={userSearchStyles.treatmentInfo}>
                                            <View style={userSearchStyles.treatmentAvatars}>
                                                {userSearch.total_treatments.slice(0, 2).map((treatment, index) => {
                                                    return (
                                                        <View key={index} style={userSearchStyles.avatarContainer}>
                                                            {
                                                                treatment.avatar ? (
                                                                    <Image
                                                                        style={userSearchStyles.treatmentAvatar}
                                                                        source={{ uri: treatment.avatar }}
                                                                        key={index}
                                                                    />
                                                                ) : (
                                                                    <FontAwesome name="user" size={miniIconSize * 0.6} color="#75296a" key={index} />
                                                                )
                                                            }
                                                        </View>
                                                    )

                                                }
                                                )
                                                }
                                            </View>
                                            <Text style={userSearchStyles.userInfoTreatmentText}>
                                                {`${userSearch.total_treatments.length} tratamento${userSearch.total_treatments.length > 1 ? 's' : ''} executado${userSearch.total_treatments.length > 1 ? 's' : ''}`}
                                            </Text>
                                        </View>
                                        :
                                        null
                            }
                        </View>
                    </View>
                    <View>

                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = (miniIconSize: number) => StyleSheet.create({
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
    userInfoTreatmentText: {
        fontSize: 13,
        color: 'rgba(237, 232, 230, 0.6)'
    },
    treatmentInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    avatarContainer: {
        width: miniIconSize, 
        height: miniIconSize, borderRadius: miniIconSize/2, 
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        overflow: 'hidden', 
        alignItems: 'center',
        justifyContent: 'center'
    },
    doctorAvatar: {
        width: miniIconSize,
        height: miniIconSize,
        borderRadius: miniIconSize / 2,
    },
    treatmentStatusText: {
        fontSize: 14,
        color: 'rgba(237, 232, 230, 0.8)',
    },
    treatmentAvatars: {
        flexDirection: 'row',
        gap: 5,
    },
    treatmentAvatar: {
        width: miniIconSize,
        height: miniIconSize,
        borderRadius: miniIconSize/2,
    },
});

export default SearchUserTemplateItem;