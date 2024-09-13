import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, ScrollView, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import images from '@assets/images';
import AddNote from './AddNote';
import NoteList from './NoteList';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import { UseLoading } from '@hooks/loading/UseLoading';
import DefaultLoading from '@components/loading/DefaultLoading';
import { NoteTemplate } from 'types/app/doctor/notepad/Notepad_Types';
import { useNotepad } from '@features/app/providers/doctor/NotepadProvider';
import { UseNotepadBehavior } from '../../hooks/UseNotepadBehavior';
import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';
import { UseNotesHandling } from '../../hooks/UseNotesHandling';
import { useCurrentNote } from '@features/app/providers/doctor/CurrentNoteProvider';

function MainNotepad() {
    const { userData } = UseForm();
    const { state } = useNotepad();
    const { handleInitiateCurrentNote } = useCurrentNote();
    const { HandleResponseAppError, HandleResponseAppSuccess } = UseGlobalResponse();
    const { loading, setLoading } = UseLoading();

    const { handleAddNoteVisible, addNoteVisible, handleSelectedNote } = UseNotepadBehavior({ handleInitiateCurrentNote });
    const { handleAddNote } = UseNotesHandling({ setLoading, HandleResponseAppError, HandleResponseAppSuccess });

    const notepadBg = images.app_doctor_images.notepad.notepad_bg;
    const addNoteIcon = images.app_doctor_images.notepad.icon_plus_notepad;
    const colorLoading = userData?.type === 'doctor' ? '#1e6569' : '#651e69';

    return (
        <View style={{ width: screenWidth, display: 'flex', maxHeight: screenHeight * 0.9 }}>
            <LinearGradient colors={['#246e6d', '#429aa6', 'rgba(104, 165, 173, 0.4)']}
                start={{ x: 0.1, y: 0 }}
                end={{ x: 0.2, y: 1 }} style={styles.header_View}>
                <Image style={{ position: 'absolute', width: screenWidth, zIndex: 1 }} source={notepadBg} />
                <View style={{}}>
                    <Text style={{ fontSize: 28, color: 'white', fontWeight: 'bold' }}>Seu Notepad</Text>
                </View>
                <View style={{ width: '80%', height: 'auto', }}>
                    <Text style={{ fontSize: 18, color: '#e4eff2', }}>Faça anotações dos seus tratamentos aqui!</Text>
                </View>
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => handleAddNoteVisible(true)} style={styles.styleAdd_Button}>
                        <LinearGradient colors={['#246e6d', '#429aa6', '#6791a6']} style={{ borderRadius: 20, }}>
                            <View style={{
                                paddingHorizontal: 20, paddingVertical: 30, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 15
                            }}>
                                <Image style={{ height: 32, width: 32 }} source={addNoteIcon} />
                                <Text style={{ fontSize: 16, color: '#e4f6fa', fontWeight: 'bold', textTransform: 'uppercase', }}>Adicionar nova anotação</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            <View style={styles.styleMainContent_View}>
                {
                    loading ?
                        <DefaultLoading size={50} color={colorLoading} />
                        :
                        <NoteList notes={state.notes} userType={userData?.type} handleSelectedNote={handleSelectedNote} />
                }
            </View>
            {
                addNoteVisible &&
                <AddNote
                    isVisible={addNoteVisible}
                    onClose={() => handleAddNoteVisible(false)}
                    onAddNote={handleAddNote}
                    loading={loading}
                />}
        </View>
    );
}

const styles = StyleSheet.create({
    header_View: {
        width: '100%',
        minHeight: '26%',
        paddingHorizontal: 25,
        paddingVertical: 45,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        gap: 40,
    },
    styleAdd_Button: {
        width: '100%',
        borderRadius: 30,
        elevation: 10,
        zIndex: 3
    },
    styleMainContent_View: {
        width: '100%',
        maxHeight: '52%',
    }
});

export default MainNotepad;