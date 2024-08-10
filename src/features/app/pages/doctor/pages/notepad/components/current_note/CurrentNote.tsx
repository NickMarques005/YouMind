import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NoteConfig from './components/NoteConfig';
import images from '@assets/images';
import NotePages from './components/NotePages';
import Header from './components/Header';
import { RouteProp, useRoute } from '@react-navigation/native';
import { UseNotepadNavigation } from '../../hooks/UseNotepadNavigation';
import { NoteTemplate } from 'types/app/doctor/notepad/Notepad_Types';
import { NotepadStackNavigation } from 'types/navigation/Navigation_Types';
import { UseCurrentNote } from './hooks/UseCurrentNote';
import { useCurrentNoteData } from './hooks/UseCurrentNoteData';
import { useHeaderGestures } from './hooks/UseHeaderAnimations';
import { usePageHandling } from './hooks/UsePageHandling';
import { usePageGestures } from './hooks/UsePageGestures';
import { screenHeight } from '@utils/layout/Screen_Size';
import { UseCurrentNoteHandling } from './hooks/UseCurrentNoteHandling';
import useCurrentNoteBehavior from './hooks/UseCurrentNoteBehavior';
import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';
import { UseLoading } from '@hooks/loading/UseLoading';
import NoteVerification from './components/NoteVerification';
import { UseForm } from '@features/app/providers/sub/UserProvider';

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
    const { userData } = UseForm();
    const updateLoading = UseLoading();
    const deleteLoading = UseLoading();
    const { HandleResponseAppError, HandleResponseAppSuccess } = UseGlobalResponse();
    const { note } = UseCurrentNote({ params: currentNoteParams });
    const currentNoteBehavior = useCurrentNoteBehavior({ note, navigateToNotepadScreen });
    const { handleUpdateCurrentNote, handleUpdateNewContent } = useCurrentNoteData({ setCurrentNote: currentNoteBehavior.setCurrentNote, setNewNote: currentNoteBehavior.setNewNote });
    const { headerHeight, handleHeaderDragging } = useHeaderGestures();
    const { activeIndex, editContent, addPage, deletePage, setEditContent } = usePageHandling({ initialContent: currentNoteBehavior.currentNote.content, handleUpdateNewContent, newNote: currentNoteBehavior.newNote });
    const { handlePageFlingDown, handlePageFlingLeft, handlePageFlingRight, handlePageFlingUp } = usePageGestures({ editContent, addPage, deletePage, activeIndex });
    const currentNoteHandling = UseCurrentNoteHandling({
        updateSetLoading: updateLoading.setLoading, deleteSetLoading: deleteLoading.setLoading,
        HandleResponseAppError, HandleResponseAppSuccess, handleUpdateCurrentNote, handleBackToMainNote: currentNoteBehavior.handleBackToMainNote
    });

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
                        currentNote={currentNoteBehavior.currentNote}
                        newNote={currentNoteBehavior.newNote}
                        headerHeight={headerHeight}
                        handleBackNotePress={currentNoteBehavior.handleBackNotePress}
                        handleUpdateVerification={currentNoteHandling.handleUpdateVerification}
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
                    <TouchableOpacity onPress={() => currentNoteBehavior.setConfigNoteVisible(true)} style={styles.configButton}>
                        <Image style={styles.configIcon} source={noteConfig} />
                    </TouchableOpacity>
                    {
                        currentNoteBehavior.configNoteVisible &&
                        <NoteConfig
                            visible={currentNoteBehavior.configNoteVisible}
                            currentNote={currentNoteBehavior.currentNote}
                            onClose={currentNoteBehavior.closeHandleNoteConfig}
                            updateLoading={updateLoading}
                            deleteLoading={deleteLoading}
                            noteVerification={currentNoteHandling.noteVerification}
                            noteBehavior={currentNoteHandling.noteBehavior}
                            handleNoteVerification={currentNoteHandling.handleNoteVerification}
                            handleDeleteNote={currentNoteHandling.handleDeleteNote}
                            handleUpdateNote={currentNoteHandling.handleUpdateNote}
                            clearNoteVerification={currentNoteHandling.clearNoteVerification}
                            newNote={currentNoteBehavior.newNote}
                            setNewNote={currentNoteBehavior.setNewNote}
                            updatedNoteVerification={currentNoteBehavior.updatedNoteVerification}
                        />
                    }
                    {
                        userData && currentNoteHandling.exitNoteVerification &&
                        <NoteVerification
                            userData={userData}
                            handleVerificationDecline={() => {
                                currentNoteHandling.clearExitNoteVerification();
                                navigateToNotepadScreen('main_notepad');
                            }}
                            handleVerificationAccept={currentNoteHandling.exitNoteVerification.handleAccept}
                            handleCloseVerification={currentNoteHandling.clearExitNoteVerification}
                            verificationMessage={currentNoteHandling.exitNoteVerification.message || "Deseja confirmar essa ação?"}
                            acceptText={currentNoteHandling.exitNoteVerification.acceptText}
                            declineText={currentNoteHandling.exitNoteVerification.declineText}
                            behavior={currentNoteHandling.noteBehavior}
                            loading={updateLoading.loading}
                            notClose={true}
                        />
                    }
                </LinearGradient>
            </KeyboardAwareScrollView>
        </GestureHandlerRootView>

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