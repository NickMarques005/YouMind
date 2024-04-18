import React, { useState, useEffect } from 'react';
import { Stack } from '@navigation/Stack';
import { AppStackProps } from 'types/stack/Stack_Types';
import DoctorSession from '@features/app/doctor/DoctorSession';
import PatientSession from '@features/app/patient/PatientSession';
import NotificationSession from '@features/app/notifications/NotificationSession';

function AppStack({ type }: AppStackProps) {

    return (
        <>
            {
                <Stack.Navigator initialRouteName='main-page' screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}>
                    <Stack.Screen name="main_page" component={type === 'doctor' ? DoctorSession : PatientSession} />
                    <Stack.Screen name="notifications" component={NotificationSession} />
                </Stack.Navigator>
            }
        </>
    )
}

export default AppStack;