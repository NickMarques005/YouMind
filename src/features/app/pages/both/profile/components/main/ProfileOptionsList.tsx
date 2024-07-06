import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import profile_options_list_style from '../../styles/main/profile_options_list_style';
import { UseAuth } from '@features/root/providers/AuthenticationProvider';
import ProfileOption from './ProfileOption';
import images from '@assets/images';
import { ProfilePatientFunctions } from '../../hooks/UseProfileActions';
import { useProfileOptions } from '../../hooks/UseProfileOptions';

interface ProfileOptionListProps {
    userType: string | undefined;
}

const ProfileOptionsList = ({ userType }: ProfileOptionListProps) => {

    const profileOptions = useProfileOptions(userType);

    return (
        <View style={profile_options_list_style.menuProfileView}>
            {profileOptions.map((option, index) => (
                <ProfileOption
                    key={index}
                    name={option.name}
                    icon={option.icon}
                    onPress={option.function}
                    userType={userType}
                />
            ))}
        </View>
    );
};

export default ProfileOptionsList;