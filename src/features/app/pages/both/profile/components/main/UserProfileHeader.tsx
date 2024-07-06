import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import images from '@assets/images';
import { UseProfile } from '../../hooks/UseProfile';
import { profile_header_style } from '../../styles/main/profile_header_style';

interface UserProfileHeaderProps {
    userName: string;
    uri?: string;
    userType: string | undefined;
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({ userName, uri, userType}) =>{ 
    
    const imageDefault = userType === 'doctor' ? images.app_doctor_images.profile.doctor_profile_icon : images.app_patient_images.profile.user_profile_icon;
    const userDivisa = userType === 'doctor' ? images.app_doctor_images.profile.divisa_user : images.app_patient_images.profile.divisa_user;
    const { GoToProfileData } = UseProfile();

    const styles = profile_header_style(userType);

    return (
    <LinearGradient colors={userType === 'doctor' ? ['#0b5959', '#4d8999', 'rgba(191, 172, 143, 0.1)'] :['#631c50', '#b049c9', 'rgba(191, 143, 179, 0.1)']} style={styles.headerProfile}>
        <View style={styles.accountView}>
            <TouchableOpacity style={styles.accountButton} onPress={GoToProfileData}>
                <Image source={uri ? { uri } : imageDefault} style={styles.accountImage} />
            </TouchableOpacity>
            <View style={styles.accountUserView}>
                <LinearGradient colors={userType === 'doctor' ? ['#95bfa5', '#269bad', '#115882'] : ['#e384c2', '#c62cd1', '#9322b3']} style={styles.accountUserTextBackground}>
                    <TouchableOpacity style={styles.accountUserButton} onPress={GoToProfileData}>
                        <Text style={styles.accountUserText}>{userName}</Text>
                        <Image source={userDivisa} style={styles.accountDivisaIcon} />
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </View>
    </LinearGradient>
);

}

export default UserProfileHeader;