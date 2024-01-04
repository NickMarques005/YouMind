import React, { useState, useEffect, useRef } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { View, Image, TouchableOpacity, Text, Animated, StyleSheet, } from 'react-native';
import { NotepadType, UseNotepad } from '../../../../../contexts/NotepadContext';
import CarouselNotes from './CarouselNotes';
import { screenHeight } from '../../../../screen_size/Screen_Size';
import { Directions, Gesture, GestureDetector, GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { useSharedValue, withTiming, Easing, withSpring } from 'react-native-reanimated';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NoteConfig from './NoteConfig';
import { SharedValue, runOnJS } from 'react-native-reanimated';

interface NoteTemplateProps {
    note_data: NotepadType;
    handleBackNotePress: () => void;

}

function NoteTemplate({ note_data, handleBackNotePress }: NoteTemplateProps) {
    const [configNoteVisible, setConfigNoteVisible] = useState(false);
    const newNote = useRef<NotepadType | undefined>(note_data);
    const activeIndex = useSharedValue(note_data.content.length);
    const [addPage, setAddPage] = useState<'last' | 'first' | undefined>(undefined);
    const handleFlingLeft = Gesture.Fling().direction(Directions.LEFT).onStart(() => {
        console.log("DATA LENGTH: ", note_data.content.length);
        console.log("INDEX: ", activeIndex.value);
        if (activeIndex.value >= note_data.content.length) {

            console.log("END");
            return;
        }

        activeIndex.value = withTiming(activeIndex.value + 1, { duration: 400, easing: Easing.ease });
        console.log("CARD LEFT");
        //console.log(activeIndex);

    });

    const handleFlingRight = Gesture.Fling().direction(Directions.RIGHT).onStart(() => {
        console.log("DATA LENGTH: ", note_data.content.length);
        console.log("INDEX: ", activeIndex.value);
        if (activeIndex.value == 0) {
            console.log("START");
            //runOnJS(setAddPage)('first');

        }
        else if (addPage !== 'first' && activeIndex.value !== note_data.content.length) {
            console.log("MOVE PAGE!");
            runOnJS(setAddPage)(undefined);
            activeIndex.value = withTiming(activeIndex.value - 1, { duration: 400, easing: Easing.ease });
        }
        //console.log("ACTIVE INDEX: ", activeIndex);
        console.log("CARD RIGHT");
    });

    const handleFlingUp = Gesture.Fling().direction(Directions.UP).onStart(() => {
        console.log("FLINGUP!!");
        console.log("DATA LENGTH: ", note_data.content);
        console.log("INDEX: ", activeIndex.value);
        if (activeIndex.value === note_data.content.length) {
            console.log("ADD PAGE !!");
            activeIndex.value = withTiming(activeIndex.value + 1, { duration: 400, easing: Easing.ease });
            runOnJS(setAddPage)('last');
        }
    });

    const handleFlingDown = Gesture.Fling().direction(Directions.DOWN).onStart(() => {
        console.log("FLING DOWN");
    });

    console.log("CURRENT NOTE RELOADED");

    const handleDeleteNote = (noteId: string) => {
        console.log(noteId);

    }

    const handleUpdateNote = (noteId: string, new_note: NotepadType) => {
        console.log(new_note);
    }

    const closeHandleNote = (type: 'delete' | 'update' | undefined) => {

        if (type) {
            handleBackNotePress();
        }
        else {
            setConfigNoteVisible(!configNoteVisible);
        }

    }

    const handleDeletePage = (currentPage: any) => {
        console.log(currentPage);
    }

    const handleAddNewPage = (typeAddNote: string) => {
        switch (typeAddNote) {
            case 'last':
                console.log("LAST ADD");
                if (newNote.current) {
                    const newContent = [...newNote.current.content, ''];
                    console.log("CONTENT LAST: ", newContent);
                    newNote.current = { ...newNote.current, content: newContent };
                }

                break;
            case 'first':
                console.log("FIRST ADD");
                if (newNote.current) {
                    const newContent = ['', ...newNote.current.content];
                    console.log("CONTENT LAST: ", newContent);
                    newNote.current = { ...newNote.current, content: newContent };
                }

                break;
            case undefined:
                return;
            default:
                break;
        }
    }

    useEffect(() => {
        newNote.current = note_data;
        console.log("SET NOTE");
    }, []);

    useEffect(() => {
        console.log(newNote);
    }, [newNote]);

    useEffect(() => {
        if (addPage === 'last' || addPage === 'first') {
            handleAddNewPage(addPage);
            setAddPage(undefined);
        }
    }, [addPage]);

    return (
        <KeyboardAwareScrollView enableOnAndroid={true} contentContainerStyle={{ width: '100%', height: '90%' }}>
            <LinearGradient colors={['#43757d', '#182424']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.2, y: 1 }} style={{ width: '100%', height: '100%' }}>
                <LinearGradient colors={['#246e6d', '#429aa6', '#87b9cc']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }} style={{ width: '100%', paddingHorizontal: 25, paddingVertical: 40, display: 'flex', borderBottomRightRadius: 40, }}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{}}>
                            <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>{note_data.title}</Text>
                        </View>
                        <View style={{}}>
                            <TouchableOpacity onPress={handleBackNotePress} style={{ padding: 5 }}>
                                <Image style={{ width: 45, height: 45, }} source={require('../../../../../assets/init/back/default_back_white.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ width: '75%' }}>
                        <Text style={{ color: '#e1e8eb' }}>
                            {note_data.description}
                        </Text>
                    </View>
                </LinearGradient>

                {
                    <GestureHandlerRootView style={{}}>
                        <GestureDetector
                            gesture={Gesture.Exclusive(handleFlingLeft, handleFlingRight, handleFlingUp, handleFlingDown)}
                        >
                            <View style={{ width: '100%', minHeight: '50%' }}>
                                {
                                    newNote.current?.content ?
                                        <CarouselNotes content_data={newNote.current.content} activeIndex={activeIndex} />
                                        : <Text>Algo deu errado</Text>
                                }
                            </View>
                        </GestureDetector>
                    </GestureHandlerRootView>
                }

                <View style={{ position: 'absolute', bottom: 0, right: 0, padding: 20, }}>
                    <TouchableOpacity onPress={() => setConfigNoteVisible(true)} style={{}}>
                        <Image style={{ width: 70, height: 70 }} source={require('../../../../../assets/app_doctor/notepad/note_configuration.png')} />
                    </TouchableOpacity>
                </View>
                {
                    configNoteVisible && newNote.current ?
                        <NoteConfig visible={configNoteVisible} noteData={newNote.current} onClose={closeHandleNote} onDelete={handleDeleteNote} onUpdate={handleUpdateNote} />
                        : ""
                }

            </LinearGradient>
        </KeyboardAwareScrollView>
    )
}

export default NoteTemplate;