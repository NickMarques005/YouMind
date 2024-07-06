import React from 'react';
import { ScrollView, View } from 'react-native';
import UserProfileHeader from './UserProfileHeader';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import main_profile_style from '../../styles/main/main_profile_style';
import ProfileOptionsList from './ProfileOptionsList';
import { UseProfile } from '../../hooks/UseProfile';

const MainProfile: React.FC = () => {
    const { userData } = UseForm();
    
    return (
        <ScrollView style={{flex: 1}}>
            <View style={main_profile_style.screenProfile}>
                <UserProfileHeader userName={userData ? `${userData.name.split(' ')[0]}` : "Usuário"} uri={userData?.avatar} userType={userData?.type} />
                <ProfileOptionsList userType={userData?.type}/>
            </View>
        </ScrollView>
    );
};

export default MainProfile;