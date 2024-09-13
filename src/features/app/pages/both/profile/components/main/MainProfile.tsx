import React from 'react';
import { ScrollView, View } from 'react-native';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import main_profile_style from '../../styles/main/main_profile_style';
import UserProfileHeader from './components/UserProfileHeader';
import ProfileOptionsList from './components/ProfileOptionsList';
import { UseMainProfileBehavior } from './hooks/UseMainProfileBehavior';

const MainProfile: React.FC = () => {
    const { userData } = UseForm();
    const { goToProfileData } = UseMainProfileBehavior();

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={main_profile_style.screenProfile}>
                <UserProfileHeader
                    userName={userData ? `${userData.name.split(' ')[0]}` : "Usuário"}
                    uri={userData?.avatar}
                    userType={userData?.type}
                    goToProfileData={goToProfileData}
                />
                <ProfileOptionsList userType={userData?.type} />
            </View>
        </ScrollView>
    );
};

export default MainProfile;