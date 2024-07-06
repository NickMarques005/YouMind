import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { useNotepad } from '@features/app/providers/doctor/NotepadProvider';
import { UseLoading } from '@hooks/loading/UseLoading';
import DefaultLoading from '@components/loading/DefaultLoading';
import images from '@assets/images';
import { NoteTemplate } from 'types/app/doctor/notepad/Notepad_Types';
import Note from './Note';

interface NoteListProps {
    userType?: string;
    handleSelectedNote: (note: NoteTemplate) => void;
    notes: NoteTemplate[];
}

const NoteList = ({ notes, userType, handleSelectedNote }: NoteListProps) => {
    const noteIcon = images.app_doctor_images.notepad.notepad_template;
    const noNotepads = images.app_doctor_images.notepad.no_notepads;
    const notePart = images.app_doctor_images.notepad.note_part;

    const lastNotes = [...notes].reverse();

    return (
        <>
            {
                notes.length !== 0 ? (
                    <FlatList
                        data={lastNotes}
                        numColumns={2}
                        horizontal={false}
                        keyExtractor={(item) => item._id}
                        contentContainerStyle={{ paddingBottom: '15%', paddingTop: '5%', paddingHorizontal: 30, width: screenWidth }}
                        renderItem={({ item }) => (
                            <Note item={item} 
                            handleSelectedNote={handleSelectedNote} 
                            notePart={notePart}/>
                        )}
                    />
                )
                    : (
                        <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 15 }}>
                            <Image source={noNotepads} style={{ width: 80, height: 80 }} />
                            <Text style={{ fontSize: 18, color: 'rgba(117, 143, 156, 1)' }}>Nenhuma nota encontrada</Text>
                        </View >
                    )}
        </>
    )
}

const styles = StyleSheet.create({
    noteList: {
        paddingBottom: 15
    }
});

export default NoteList;


