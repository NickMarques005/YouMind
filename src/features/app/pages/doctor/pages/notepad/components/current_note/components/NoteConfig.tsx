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
import { NoteTemplate } from 'types/app/doctor/notepad/Notepad_Types';
import { UseLoading } from '@hooks/loading/UseLoading';
import DefaultLoading from '@components/loading/DefaultLoading';
import { UseCurrentNoteHandling } from '../hooks/UseCurrentNoteHandling';
import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';


interface UpdateNoteData {
    title: string;
    description: string;
    content?: string[];
}

interface NoteConfigProps {
    visible: boolean;
    onClose: (typeConfig: 'delete' | 'update' | undefined) => void;
    noteData: NoteTemplate;
    newContent: string[];
}

const NoteConfig: React.FC<NoteConfigProps> = ({ newContent, visible, onClose, noteData }) => {
    const updateLoading = UseLoading();
    const deleteLoading = UseLoading();
    const { HandleResponseAppError, HandleResponseAppSuccess } = UseGlobalResponse();
    const { handleDeleteNote, handleUpdateNote } = UseCurrentNoteHandling({ updateSetLoading: updateLoading.setLoading, deleteSetLoading: deleteLoading.setLoading, HandleResponseAppError, HandleResponseAppSuccess });
    const translateY = useSharedValue(400);
    const opacity = useSharedValue(0);
    const [updateNoteData, setUpdateNoteData] = useState<UpdateNoteData>({
        title: noteData.title,
        description: noteData.description,
        content: newContent
    });
    const [typeRequestResponse, setTypeRequestResponse] = useState<'delete' | 'update'>();
    const isAnimating = useSharedValue(false);

    console.log(updateNoteData);
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

    const finishAddingNote = () => {
        setUpdateNoteData({ title: '', description: '', content: [] });
        handleCloseAddNote();
    };

    const handleCloseAddNote = () => {
        if (!isAnimating.value) {
            isAnimating.value = true;
            translateY.value = withTiming(screenHeight * 0.96, { duration: 500, easing: Easing.ease }, (isFinished) => {
                if (isFinished) {
                    opacity.value = withTiming(0, { duration: 700, easing: Easing.ease }, (isFinished) => {
                        if (isFinished) {
                            isAnimating.value = false;
                            runOnJS(onClose)(typeRequestResponse);
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
                                            value={updateNoteData.title}
                                            onChangeText={(e) => setUpdateNoteData({ ...updateNoteData, title: e })}
                                            placeholderTextColor={'#ddeded'}

                                        />
                                        <TextInput
                                            editable={!deleteLoading.loading && !updateLoading.loading}
                                            style={[styleAddNote.input, { opacity: deleteLoading.loading || updateLoading.loading ? 0.5 : 1 }]}
                                            placeholder="Descrição"
                                            value={updateNoteData.description}
                                            onChangeText={(e) => setUpdateNoteData({ ...updateNoteData, description: e })}
                                            placeholderTextColor={'#577980'}

                                        />
                                    </View>
                                    <View style={{ width: '100%', alignItems: 'center', marginBottom: 15, }}>
                                        <Text style={{ fontSize: 18, color: '#dff0f0' }}>{`Possui o total de ${newContent.length} páginas`}</Text>
                                    </View>
                                </LinearGradient>

                                <View style={styleAddNote.eventView}>
                                    <TouchableOpacity disabled={deleteLoading.loading || updateLoading.loading} onPress={() => handleUpdateNote(noteData._id, updateNoteData)} style={[styleAddNote.eventButton, { backgroundColor: '#356d75', opacity: deleteLoading.loading || updateLoading.loading ? 0.5 : 1 }]}>
                                        {
                                            updateLoading.loading ?
                                                <DefaultLoading size={30} color={'white'} />
                                                :
                                                <Text style={[styleAddNote.addButtonText,]}>SALVAR</Text>
                                        }
                                    </TouchableOpacity>

                                    <TouchableOpacity disabled={deleteLoading.loading || updateLoading.loading} onPress={() => handleDeleteNote(noteData._id, handleCloseAddNote)} style={[styleAddNote.eventButton, { backgroundColor: '#2f5a66', opacity: deleteLoading.loading || updateLoading.loading ? 0.5 : 1 }]}>
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