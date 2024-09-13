import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';
import images from '@assets/images';
import { profile_options_style } from '../../../styles/main/profile_options_style';


interface ProfileOptionProps {
    name: string;
    icon: ImageSourcePropType;
    onPress: () => void;
    userType: string | undefined;
}

const imageDivisa = images.generic_images.divisa.divisa_normal;

const ProfileOption = ({ name, icon, onPress, userType }: ProfileOptionProps) => {
    
    const styles = profile_options_style(userType);

    return (
    <View style={styles.profileOptionsView}>
        <TouchableOpacity style={styles.profileOptionButton} onPress={() => onPress()}>
            <View style={styles.profileOptionView}>
                <Image source={icon} style={styles.profileOptionIcon} />
                <Text style={styles.profileOptionText}>{name}</Text>
            </View>
            <Image
                source={imageDivisa}
                style={styles.profileDivisaIcon}
            />
        </TouchableOpacity>
    </View>
)
}

export default ProfileOption;