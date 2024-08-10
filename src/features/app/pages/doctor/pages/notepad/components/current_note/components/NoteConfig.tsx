import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    withSpring,
    useAnimatedStyle,
    withTiming,
    runOnJS,
    Easing,

} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import images from '@assets/images';
import { NoteTemplate, UpdateNote } from 'types/app/doctor/notepad/Notepad_Types';
import DefaultLoading from '@components/loading/DefaultLoading';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import NoteVerification, { NoteBehavior } from './NoteVerification';
import { LoadingStructure } from 'types/loading/Loading_Types';
import { Verification } from 'types/verification/Verification_Types';

interface NoteConfigProps {
    visible: boolean;
    deleteLoading: LoadingStructure;
    updateLoading: LoadingStructure;
    onClose: () => void;
    currentNote: NoteTemplate;
    handleDeleteNote: (noteId: string, onSuccess?: () => void) => Promise<void>;
    handleUpdateNote: (noteId: string, updated_note: UpdateNote, onSuccess?: () => void) => Promise<void>;
    noteVerification: Verification | undefined;
    noteBehavior: NoteBehavior | undefined;
    handleNoteVerification: (handleAccept: () => void, message?: string, acceptText?: string, declineText?: string, behavior?: NoteBehavior) => void;
    clearNoteVerification: () => void;
    setNewNote: React.Dispatch<React.SetStateAction<NoteTemplate>>;
    newNote: NoteTemplate;
    updatedNoteVerification: () => boolean;
}

const NoteConfig: React.FC<NoteConfigProps> = ({
    deleteLoading,
    updateLoading,
    visible,
    onClose,
    currentNote,
    handleDeleteNote,
    handleUpdateNote,
    noteVerification,
    noteBehavior,
    handleNoteVerification,
    clearNoteVerification,
    setNewNote,
    newNote,
    updatedNoteVerification
}) => {
    const { userData } = UseForm();
    const translateY = useSharedValue(400);
    const opacity = useSharedValue(0);
    const isAnimating = useSharedValue(false);

    useEffect(() => {
        translateY.value = withSpring(visible ? screenHeight * 0.15 : 1000, { damping: 60, mass: 3 }, (isFinished) => {
            if (!isFinished && !visible) {
                translateY.value = -(screenHeight * 0.15);
            }
        });
        opacity.value = withSpring(visible ? 1 : 0, { damping: 80, stiffness: 50 });
    }, [visible, translateY]);

    const fadeIn = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    const slideIn = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: withSpring(translateY.value) }],
        };
    });

    const handleCloseAddNote = () => {
        if (!isAnimating.value) {
            isAnimating.value = true;
            translateY.value = withTiming(screenHeight * 0.96, { duration: 500, easing: Easing.ease }, (isFinished) => {
                if (isFinished) {
                    opacity.value = withTiming(0, { duration: 700, easing: Easing.ease }, (isFinished) => {
                        if (isFinished) {
                            isAnimating.value = false;
                            runOnJS(onClose)();
                        }
                    });
                }
            });
        }
    }

    const backIcon = images.generic_images.back.arrow_back_white;

    return (
        <>
            {
                visible ?
                    <Animated.View style={[styleAddNote.addNote_Container, fadeIn]} >
                        <Animated.View style={[styleAddNote.content, slideIn]}>
                            <LinearGradient colors={['rgba(104, 165, 173, 0)', '#c5d4d6',]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0.2, y: 1 }} style={styleAddNote.mainViewContent}>
                                <LinearGradient colors={['#154747', '#246e6d', '#42747a',]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 0.2, y: 1 }} style={styleAddNote.configHeader}>
                                    <View style={{ paddingVertical: 20, width: '100%', }}>
                                        <TouchableOpacity disabled={deleteLoading.loading || updateLoading.loading} style={{ opacity: deleteLoading.loading || updateLoading.loading ? 0.5 : 1 }} onPress={handleCloseAddNote}>
                                            <Image style={{ width: 30, height: 30 }} source={backIcon} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                        <Text style={styleAddNote.headerText}>Configuração da Anotação</Text>
                                    </View>
                                    <View style={{ height: '45%', justifyContent: 'center', gap: 20, }}>
                                        <TextInput
                                            editable={!deleteLoading.loading && !updateLoading.loading}
                                            style={[styleAddNote.input, { opacity: deleteLoading.loading || updateLoading.loading ? 0.5 : 1 }]}
                                            placeholder="Título"
                                            value={newNote.title}
                                            onChangeText={(e) => setNewNote({ ...newNote, title: e })}
                                            placeholderTextColor={'#ddeded'}
                                        />
                                        <TextInput
                                            editable={!deleteLoading.loading && !updateLoading.loading}
                                            style={[styleAddNote.input, { opacity: deleteLoading.loading || updateLoading.loading ? 0.5 : 1 }]}
                                            placeholder="Descrição"
                                            value={newNote.description}
                                            onChangeText={(e) => setNewNote({ ...newNote, description: e })}
                                            placeholderTextColor={'#577980'}
                                        />
                                    </View>
                                    <View style={{ width: '100%', alignItems: 'center', marginBottom: 15, }}>
                                        <Text style={{ fontSize: 18, color: '#dff0f0' }}>{`Possui o total de ${newNote.content.length} páginas`}</Text>
                                    </View>
                                </LinearGradient>

                                <View style={styleAddNote.eventView}>
                                    <TouchableOpacity
                                        disabled={deleteLoading.loading || updateLoading.loading || !updatedNoteVerification()}
                                        onPress={() => updatedNoteVerification() && handleNoteVerification(() => handleUpdateNote(currentNote._id, newNote), 'Gostaria de salvar esta anotação?', 'Salvar', undefined, 'update')}
                                        style={[styleAddNote.eventButton, { backgroundColor: '#356d75', opacity: deleteLoading.loading || updateLoading.loading || !updatedNoteVerification() ? 0.5 : 1 }]}
                                    >
                                        {
                                            updateLoading.loading ?
                                                <DefaultLoading size={30} color={'white'} />
                                                :
                                                <Text style={[styleAddNote.addButtonText,]}>SALVAR</Text>
                                        }
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        disabled={deleteLoading.loading || updateLoading.loading}
                                        onPress={() => handleNoteVerification(() => handleDeleteNote(currentNote._id, handleCloseAddNote), 'Deseja realmente deletar esta anotação?', 'Deletar', undefined, 'delete')}
                                        style={[styleAddNote.eventButton, { backgroundColor: '#2f5a66', opacity: deleteLoading.loading || updateLoading.loading ? 0.5 : 1 }]}
                                    >
                                        {
                                            deleteLoading.loading ?
                                                <DefaultLoading size={30} color={'white'} />
                                                :
                                                <Text style={[styleAddNote.addButtonText]}>DELETAR</Text>
                                        }
                                    </TouchableOpacity>
                                </View>
                            </LinearGradient>
                        </Animated.View>
                    </Animated.View >
                    : ""
            }
            {
                userData && noteVerification &&
                <NoteVerification
                    userData={userData}
                    verificationMessage={noteVerification.message || "Deseja confirmar essa ação?"}
                    handleVerificationAccept={noteVerification.handleAccept}
                    acceptText={noteVerification.acceptText}
                    handleCloseVerification={clearNoteVerification}
                    behavior={noteBehavior}
                />
            }
        </>
    );
};

const styleAddNote = StyleSheet.create({
    addNote_Container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(36, 56, 61, 0.5)',
        alignItems: 'center',
        height: screenHeight,
        zIndex: 3
    },
    content: {
        backgroundColor: '#edf4f5',
        height: screenHeight * 0.75,
        width: screenWidth,
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
        elevation: 15,
        overflow: 'hidden',
    },
    mainViewContent: {
        height: '100%',
        justifyContent: 'space-between',
        width: screenWidth,
    },
    configHeader: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        height: '65%',
        justifyContent: 'space-between'
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white'
    },
    closeButton: {
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#a7c9c9',
        width: '100%',
        paddingVertical: 10,
        fontSize: 16,
        color: '#f5ffff',
    },
    eventView: {
        flex: 1,
        gap: 15,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    eventButton: {
        width: '100%',
        borderRadius: 10,
        paddingVertical: 30,
        alignItems: 'center',
        height: screenHeight * 0.1
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default NoteConfig;