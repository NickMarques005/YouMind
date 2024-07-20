import React, { useState, useEffect } from 'react';
import { Stack } from '@navigation/Stack';
import { AppStackProps } from 'types/navigation/StackProp_Types';
import DoctorSession from '@features/app/pages/doctor/DoctorSession';
import PatientSession from '@features/app/pages/patient/PatientSession';
import NotificationSession from '@features/app/pages/both/notifications/NotificationSession';
import AnswerQuestionnaireSession from '@features/app/pages/patient/sessions/answer_questionnaire/AnswerQuestionnaireSession';
import AlertMedicationSession from '@features/app/pages/patient/sessions/alert_medication/AlertMedicationSession';
import WelcomeSession from '@features/app/pages/both/sessions/welcome/WelcomeSession';

function AppStack({ type }: AppStackProps) {

    return (
        <>
            {
                <Stack.Navigator initialRouteName='main_page' screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}>
                    <Stack.Screen name="main_page" component={type === 'doctor' ? DoctorSession : PatientSession} />
                    <Stack.Screen name="notifications" component={NotificationSession} />
                    <Stack.Screen name="answer_questionnaire" component={AnswerQuestionnaireSession}/>
                    <Stack.Screen name="alert_medication" component={AlertMedicationSession}/>
                    <Stack.Screen name="welcome" component={WelcomeSession}/>
                </Stack.Navigator>
            }
        </>
    )
}

export default AppStack;