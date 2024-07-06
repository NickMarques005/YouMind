import React from 'react';
import { Stack } from '@navigation/Stack';
import MainQuestions from '@features/app/pages/patient/pages/health/components/questions/pages/main/MainQuestions';
import VisualizeQuestion from '@features/app/pages/patient/pages/health/components/questions/pages/visualize/VisualizeQuestion';

const QuestionStack = () => {

    return (
        <>
            {
                <Stack.Navigator initialRouteName='main_questions' screenOptions={{ headerShown: false, animation: 'fade' }}>
                    <Stack.Screen name="main_questions" component={MainQuestions} />
                    <Stack.Screen name="visualize_question" component={VisualizeQuestion} />
                </Stack.Navigator>
            }
        </>
    );
};

export default QuestionStack;