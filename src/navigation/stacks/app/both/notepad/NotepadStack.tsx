import React from 'react';
import { Stack } from '@navigation/Stack';
import MainNotepad from '@features/app/pages/doctor/pages/notepad/components/main/MainNotepad';
import CurrentNote from '@features/app/pages/doctor/pages/notepad/components/current_note/CurrentNote';

const NotepadStack = () => {

    return (
        <>
            {
                <Stack.Navigator initialRouteName='main_notepad' screenOptions={{ headerShown: false, animation: 'fade', animationDuration: 500 }}>
                    <Stack.Screen name="main_notepad" component={MainNotepad} />
                    <Stack.Screen name="current_note" component={CurrentNote} />
                </Stack.Navigator>
            }
        </>
    );
};

export default NotepadStack;