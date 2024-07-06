import React from 'react';
import { Stack } from '@navigation/Stack';
import MainProfile from '@features/app/pages/both/profile/components/main/MainProfile';
import ProfileData from '@features/app/pages/both/profile/components/data/ProfileData';

const ProfileStack = () => {

    return (
        <>
            {
                <Stack.Navigator initialRouteName='main_profile' screenOptions={{ headerShown: false, animation: 'flip' }}>
                    <Stack.Screen name="main_profile" component={MainProfile} />
                    <Stack.Screen name="profile_data" component={ProfileData} />
                </Stack.Navigator>
            }
        </>
    );
};

export default ProfileStack;