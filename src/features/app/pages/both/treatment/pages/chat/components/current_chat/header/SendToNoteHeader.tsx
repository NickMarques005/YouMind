import { responsiveSize } from '@utils/layout/Screen_Size';
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MessageSelected } from 'types/chat/Chat_Types';
import { Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NoteTemplate } from 'types/app/doctor/notepad/Notepad_Types';
import { LoadingStructure } from 'types/loading/Loading_Types';

interface SendToNoteHeaderProps {
    handleBack: () => void;
    selectedNoteMessages: MessageSelected[];
    currentChatNote: NoteTemplate;
    sendToNoteLoading: LoadingStructure;
}

const SendToNoteHeader: React.FC<SendToNoteHeaderProps> = ({
    handleBack,
    selectedNoteMessages,
    currentChatNote,
    sendToNoteLoading
}) => {
    const iconSize = responsiveSize * 0.07;
    const noteIconSize = responsiveSize * 0.12;

    return (
        <View style={styles.header_container}>
            <View style={styles.noteContainer}>
                <View style={{
                    width: noteIconSize,
                    height: noteIconSize,
                    borderRadius: noteIconSize /2,
                    backgroundColor: '#1c1940',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 3,
                    borderColor: '#abffe9'
                }}>
                    <MaterialCommunityIcons name="notebook" size={noteIconSize * 0.5} color="white" />
                </View>
                <View style={{ gap: 5, flex: 1, }}>
                    <View style={{}}>
                        <Text numberOfLines={1} style={{ fontSize: 18, fontWeight: '500', color: 'white' }}>
                            {currentChatNote.title}
                        </Text>
                    </View>
                    <View style={{}}>
                        <Text numberOfLines={1} style={{ fontSize: 14, fontWeight: '400', color: 'rgba(255, 255, 255, 0.6)' }}>
                            {currentChatNote.description}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{ gap: 20, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 25, fontWeight: '500', color: 'white' }}>
                    {
                        selectedNoteMessages.length
                    }
                </Text>
                <TouchableOpacity disabled={sendToNoteLoading.loading} onPress={handleBack}>
                    <MaterialCommunityIcons name="note-remove" size={iconSize} color="white" />
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        gap: 15
    },
    noteContainer: {
        flexDirection: 'row',
        flex: 1,
        gap: 15,
    },
});

export default SendToNoteHeader;