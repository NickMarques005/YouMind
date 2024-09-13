import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainSendToNoteHeader from './components/header/MainSendToNoteHeader'
import { useSendToNoteBehavior } from './hooks/useSendToNoteBehavior'
import { UseForm } from '@features/app/providers/sub/UserProvider'
import { UserType } from 'types/user/User_Types'
import { useNotepad } from '@features/app/providers/doctor/NotepadProvider'
import NoteList from '@features/app/pages/doctor/pages/notepad/components/main/NoteList'
import { useSendToNoteHandling } from './hooks/useSendToNoteHandling'

const SendMessageToNote = () => {
    const { userData } = UseForm();
    const { state: notepadState } = useNotepad();
    const { handleBackToChat } = useSendToNoteBehavior();
    const { handleSelectedNote } = useSendToNoteHandling({ handleBackToChat });

    return (
        <View style={{ flex: 1 }}>
            <MainSendToNoteHeader
                handleBackToChat={handleBackToChat}
                userType={userData?.type as UserType}
            />
            <NoteList
                userType={userData?.type as UserType}
                handleSelectedNote={handleSelectedNote}
                notes={notepadState.notes}
            />
        </View>
    )
}

export default SendMessageToNote

const styles = StyleSheet.create({})