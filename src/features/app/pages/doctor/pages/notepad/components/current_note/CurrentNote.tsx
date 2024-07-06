import React, { useState, useEffect, useRef } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { View, Image, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, } from 'react-native';
import { Directions, Gesture, GestureDetector, GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, withTiming, Easing, withSpring } from 'react-native-reanimated';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NoteConfig from './components/NoteConfig';
import { SharedValue, runOnJS } from 'react-native-reanimated';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import images from '@assets/images';
import NotePages from './components/NotePages';
import { RouteProp, useRoute } from '@react-navigation/native';
import { UseNotepadNavigation } from '../../hooks/UseNotepadNavigation';
import { NoteTemplate } from 'types/app/doctor/notepad/Notepad_Types';
import { NotepadStackNavigation } from 'types/navigation/Navigation_Types';
import { UseCurrentNote } from './hooks/UseCurrentNote';
import { useCurrentNoteData } from './hooks/UserCurrentNoteData';
import { useCurrentNoteGestures } from './hooks/UseCurrentNoteAnimation';
import { useHeaderGestures } from './hooks/UseHeaderAnimations';
import Header from './components/Header';
import { UseNotesHandling } from '../../hooks/UseNotesHandling';
import { UseLoading } from '@hooks/loading/UseLoading';
import { usePageHandling } from './hooks/UsePageHandling';
import { usePageGestures } from './hooks/UsePageGestures';
import { screenHeight } from '@utils/layout/Screen_Size';

export interface CurrentNoteParams {
    currentNote?: NoteTemplate;
}

const CurrentNote = () => {
    const { navigateToNotepadScreen } = UseNotepadNavigation();
    const route = useRoute<RouteProp<NotepadStackNavigation, 'current_note'> & { params?: CurrentNoteParams }>();
    const currentNoteParams = route.params?.params;
    if (!currentNoteParams) {
        console.log("No current Note.. ", currentNoteParams);
        navigateToNotepadScreen('main_notepad');
        return null;
    }
    const { note } = UseCurrentNote({ params: currentNoteParams });
    const [currentNote, setCurrentNote] = useState<NoteTemplate>(note);
    const [configNoteVisible, setConfigNoteVisible] = useState(false);
    const { updatePage } = useCurrentNoteData({ setCurrentNote });
    const { headerHeight, handleHeaderDragging } = useHeaderGestures();
    const { activeIndex, editContent, addPage, deletePage, setEditContent } = usePageHandling({ initialContent: currentNote.content });
    const { handlePageFlingDown, handlePageFlingLeft, handlePageFlingRight, handlePageFlingUp } = usePageGestures({ editContent, addPage, deletePage, activeIndex });

    const handleBackNotePress = () => {
        console.log("Back to main notepad");
        navigateToNotepadScreen('main_notepad');
    }

    const closeHandleNote = (type: 'delete' | 'update' | undefined) => {
        if (type) {
            handleBackNotePress();
        }
        else {
            setConfigNoteVisible(!configNoteVisible);
        }
    }

    const backIcon = images.generic_images.back.default_back_white;
    const noteConfig = images.app_doctor_images.notepad.note_configuration;

    return (


        <GestureHandlerRootView style={{ flex: 1 }}>
            <KeyboardAwareScrollView onKeyboardWillShow={(frames: Object) => {
                console.log('Keyboard event', frames)
            }}>
                <LinearGradient colors={['#43757d', '#182424']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0.2, y: 1 }} style={styles.outerGradient}>
                    <Header
                        currentNote={currentNote}
                        headerHeight={headerHeight}
                        handleBackNotePress={handleBackNotePress}
                        handleHeaderDragging={handleHeaderDragging}
                        backIcon={backIcon}
                    />

                    <GestureDetector
                        gesture={Gesture.Exclusive(handlePageFlingLeft, handlePageFlingRight, handlePageFlingUp, handlePageFlingDown)}
                    >
                        <View style={styles.pageContainer}>
                            <NotePages
                                setContent={setEditContent}
                                content={editContent}
                                activeIndex={activeIndex}
                            />
                        </View>
                    </GestureDetector>
                    <TouchableOpacity onPress={() => setConfigNoteVisible(true)} style={styles.configButton}>
                        <Image style={styles.configIcon} source={noteConfig} />
                    </TouchableOpacity>
                    {
                        configNoteVisible &&
                        <NoteConfig
                            newContent={editContent}
                            visible={configNoteVisible}
                            noteData={note}
                            onClose={closeHandleNote}
                        />
                    }
                </LinearGradient>
            </KeyboardAwareScrollView>
        </GestureHandlerRootView >

    )
}

const styles = StyleSheet.create({
    mainScrollView: {
        flex: 1
    },
    scrollviewKeyboard: {
        width: '100%',
        height: '100%',
    },
    outerGradient: {
        width: '100%',
        height: screenHeight * 0.9
    },
    pageContainer: {
        width: '100%',
        paddingTop: '50%',
        height: '100%',
        alignItems: 'center'
    },
    configButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: 20
    },
    configIcon: {
        width: 70,
        height: 70
    }
});

export default CurrentNote;