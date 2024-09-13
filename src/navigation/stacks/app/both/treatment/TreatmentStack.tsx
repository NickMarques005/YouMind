import React from 'react'
import { Stack } from '@navigation/Stack'
import ChatEnvironment from '@features/app/pages/both/treatment/pages/chat/ChatEnvironment';
import MainTreatment from '@features/app/pages/both/treatment/pages/main/MainTreatment';
import { TreatmentScreenName } from 'types/navigation/Navigation_Types';
import { UserData } from 'types/user/User_Types';
import SelectedTreatment from '@features/app/pages/both/treatment/pages/selected/SelectedTreatment';
import Status from '@features/app/pages/both/treatment/pages/status/Status';
import SelectedUserToStartTreatment from '@features/app/pages/both/treatment/pages/user/SelectedUserToStartTreatment';

interface TreatmentStackProps {
    initialRoute: TreatmentScreenName;
}

const TreatmentStack = ({ initialRoute}: TreatmentStackProps) => {

    return (

        <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false, animation: 'slide_from_right', animationDuration: 500 }}>
            <Stack.Screen name="main_treatment" component={MainTreatment} />
            <Stack.Screen name="selected_user" component={SelectedUserToStartTreatment}/>
            <Stack.Screen name="chat_treatment" component={ChatEnvironment} />
            <Stack.Screen name="selected_treatment" component={SelectedTreatment} />
            <Stack.Screen name="status" component={Status} />
        </Stack.Navigator>
    )
}

export default TreatmentStack;