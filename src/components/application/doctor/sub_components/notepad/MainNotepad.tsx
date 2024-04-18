import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, } from 'react-native';
import AddNote from './AddNote';
import { LinearGradient } from 'expo-linear-gradient';
import { NotepadType, UseNotepad } from '../../../../../providers/NotepadProvider';
import { screenHeight, screenWidth } from '../../../../../utils/layout/Screen_Size';
import NoteList from './NoteList';
import NoteTemplate from './NoteTemplate';

function MainNotepad() {
    const { notepadData } = UseNotepad();
    const [addNoteVisible, setNoteVisible] = useState(false);
    const [selectedNote, setSelectedNote] = useState<NotepadType | null>(null);

    const handleSelectedNote = (note: NotepadType) => {
        console.log("CURRENT NOTE: ", note);
        setSelectedNote(note);
    }

    const handleBackNotePress = () => {
        setSelectedNote(null);
    }

    return (
        <View style={{ flex: 1, width: screenWidth, display: 'flex', gap: 30, height: screenHeight * 0.8 }}>
            {
                !selectedNote ?
                <>
                    <Image style={{ position: 'absolute', width: screenWidth, zIndex: 2 }} source={require('../../../../../assets/app_doctor/notepad/notepad_bg.png')} />

                    <LinearGradient colors={['#246e6d', '#429aa6', 'rgba(104, 165, 173, 0.2)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0.2, y: 1 }} style={styleNotepad.styleNotepadHeader_View}>
                        <View style={{}}>
                            <Text style={{ fontSize: 28, color: 'white', fontWeight: 'bold' }}>Seu Notepad</Text>
                        </View>
                        <View style={{ width: '80%', height: 'auto', }}>
                            <Text style={{ fontSize: 18, color: '#e4eff2', }}>Faça anotações dos seus tratamentos aqui!</Text>
                        </View>
                    </LinearGradient>

                    <View style={styleNotepad.styleNotepadMainContent_View}>
                        <TouchableOpacity onPress={() => setNoteVisible(true)} style={styleNotepad.styleNotepadAdd_Button}>
                            <LinearGradient colors={['#246e6d', '#429aa6', '#6791a6']} style={{ borderRadius: 20, }}>
                                <View style={{
                                    paddingHorizontal: 20, paddingVertical: 30, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 15,
                                }}>
                                    <Image style={{ height: 32, width: 32 }} source={require('../../../../../assets/app_doctor/notepad/plus_icon_notepad.png')} />
                                    <Text style={{ fontSize: 16, color: '#e4f6fa', fontWeight: 'bold', textTransform: 'uppercase', }}>Adicionar nova anotação</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>

                        <View style={{
                            height: screenHeight * 0.445,
                            width: '100%',
                        }}>
                            <NoteList handleSelectedNote={handleSelectedNote} />
                        </View>

                    </View>
                    <AddNote
                        isVisible={addNoteVisible}
                        onClose={() => setNoteVisible(false)}
                        onAddNote={(title, description) => {
                            console.log('Adding note:', { title, description });
                        }}
                    />

                </>
                : <NoteTemplate note_data={selectedNote} handleBackNotePress={handleBackNotePress}/>

            }
        </View>
    );
}

const styleNotepad = StyleSheet.create({
    styleNotepadHeader_View: {
        display: 'flex',
        width: '100%',
        height: screenHeight * 0.27,
        paddingHorizontal: 25,
        paddingVertical: 45,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        gap: 15,

    },
    styleNotepadAdd_Button: {
        width: '100%',
        borderRadius: 30,
        elevation: 10,
    },
    styleNotepadMainContent_View: {
        flex: 1,
        display: 'flex',
        paddingHorizontal: 25,
        gap: 25,

    }
});

export default MainNotepad;