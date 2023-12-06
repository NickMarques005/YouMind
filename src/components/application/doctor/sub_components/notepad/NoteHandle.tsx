import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import AddNote from './AddNote';
import { LinearGradient } from 'expo-linear-gradient';
import { UseNotepad } from '../../../../../contexts/NotepadContext';
import { screenHeight, screenWidth } from '../../../../screen_size/Screen_Size';
import { NotepadType } from '../../../../../contexts/NotepadContext';

interface NoteHandleProps {
    data?: NotepadType[];
    errors?: string[];
    message?: string;
    additional_data?: object | undefined;
}

interface HandleSelectedNoteData {
    handleSelectedNote: (note: NotepadType) => void
}

const NoteHandle = ({ data, errors, message, additional_data}: NoteHandleProps) => {
    const { notepadData, addNotepad } = UseNotepad();
    const selectedNotePress = additional_data as HandleSelectedNoteData;

    useEffect(() => {
        const handleNotepadData = (notepads_data: NotepadType[]) => {
            if (errors) {
                console.log("Houve algum erro ao retornar notas");
                return;
            }

            if (notepads_data) {
                console.log("DATA: ", notepads_data);
                if (data) {
                    data.forEach((item) => {
                        if (!notepadData.some(note => note._id === item._id)) {
                            addNotepad(item);
                        }
                    });
                }
            }
        };

        if (data) {
            handleNotepadData(data);
        }
    }, [notepadData]);


    return (
        <>
            {notepadData.length !== 0 ? (
                <FlatList
                    data={notepadData}
                    numColumns={2}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={{paddingVertical: 20,}}
                    renderItem={({ item }) => (
                        <LinearGradient colors={['#76a1ab', '#d8e4e6', 'rgba(104, 165, 173, 0.1)']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0.2, y: 1 }} style={{ display: 'flex', flex: 1, maxWidth: '50%', padding: 10, borderTopRightRadius: 30, borderBottomRightRadius: 20, alignItems: 'center', backgroundColor: 'white', elevation: 5, minHeight: screenHeight * 0.3}}>
                            <TouchableOpacity onPress={() => selectedNotePress.handleSelectedNote(item)} style={{ width: '100%', alignItems: 'center' }}>
                                <View style={{}}>
                                    <Image style={{ width: screenWidth * 0.3, height: screenWidth * 0.3 }} source={require('../../../../../assets/app_doctor/notepad/notepad_template.png')} />
                                </View>
                                <View style={{ width: '100%' }}>
                                    <View style={{}}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#395354' }}>{item.title}</Text>
                                    </View>

                                    <Text style={{ fontSize: 13, color: '#68818c' }}>{item.description}</Text>
                                </View>
                            </TouchableOpacity>
                        </LinearGradient>
                    )}
                />
            )
                : (
                    <View style={{ width: '100%', marginTop: 40, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row', gap: 10 }}>
                        <Text style={{ fontSize: 16, color: 'rgba(117, 143, 156, 1)' }}>Nenhuma nota encontrada</Text>
                    </View >
                )}
        </>
    )
}

export default NoteHandle;


