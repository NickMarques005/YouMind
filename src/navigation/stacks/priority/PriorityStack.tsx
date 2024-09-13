import React from 'react';
import AnswerQuestionnaireSession from '@features/app/pages/patient/sessions/answer_questionnaire/AnswerQuestionnaireSession';
import AlertMedicationSession from '@features/app/pages/patient/sessions/alert_medication/AlertMedicationSession';
import { PriorityStackProps } from 'types/navigation/StackProp_Types';
import MotivacionalPhraseSession from '@features/app/pages/patient/sessions/motivacional_phrase/MotivacionalPhraseSession';
import VoiceCallSession from '@features/app/pages/both/sessions/voice_call/VoiceCallSession';
import { Stack } from '@navigation/Stack';

function PriorityStack({ type }: PriorityStackProps) {
    
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}>
            {
                type === 'patient' &&
                <>
                    <Stack.Screen name="motivational_phrase" component={MotivacionalPhraseSession}/>
                    <Stack.Screen name="answer_questionnaire" component={AnswerQuestionnaireSession} />
                    <Stack.Screen name="alert_medication" component={AlertMedicationSession} />
                </>
            }
            
            <Stack.Screen name="voice_call" component={VoiceCallSession}/>
        </Stack.Navigator>
    );
}

export default PriorityStack;