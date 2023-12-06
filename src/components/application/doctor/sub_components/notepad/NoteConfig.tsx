import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    withSpring,
    useAnimatedStyle,
    withTiming,
    runOnJS,
    Easing,

} from 'react-native-reanimated';
import { screenHeight, screenWidth } from '../../../../screen_size/Screen_Size';
import { LinearGradient } from 'expo-linear-gradient';
import HandleNoteResponse from '../../../../errors/HandleNoteResponse';
import { NotepadType } from '../../../../../contexts/NotepadContext';

interface AddNoteData {
    title: string;
    description: string;
}

interface AddNoteProps {
    visible: boolean;
    onClose: (type: 'delete' | 'update' | undefined) => void;
    noteData: NotepadType;
    onDelete: (noteId: string) => void;
    onUpdate: (noteId: string, new_note: NotepadType) => void;

}

const NoteConfig: React.FC<AddNoteProps> = ({ visible, onClose, noteData, onDelete, onUpdate }) => {
    const translateY = useSharedValue(400); // Updated initial Y translation value
    const opacity = useSharedValue(0);
    const [noteToUpdate, setNoteToUpdate] = useState();
    const [addResponse, setAddResponse] = useState(false);
    const [addNoteData, setAddNoteData] = useState<AddNoteData>({
        title: noteData.title,
        description: noteData.description,
    });
    const [typeRequestResponse, setTypeRequestResponse] = useState<'delete' | 'update'>();

    const handleAddNote = async () => {
        if (!addNoteData.title || !addNoteData.description) {
            return;
        }

        console.log(addNoteData);

        setAddResponse(true);
    };

    const isAnimating = useSharedValue(false);

    useEffect(() => {
        translateY.value = withSpring(visible ? screenHeight * 0.15 : 1000, { damping: 20 }, (isFinished) => {
            if (!isFinished && !visible) {
                translateY.value = -(screenHeight * 0.15);

            }
        });
        opacity.value = withTiming(visible ? 1 : 0, { duration: 300, easing: Easing.ease });
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

    const addNoteFinish = () => {

        setAddNoteData({ title: '', description: '' });
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
                            runOnJS(setAddResponse)(false);
                        }
                    });
                }
            });
        }

    }

    return (
        <>
            {
                visible ?
                    <Animated.View style={[styleAddNote.addNote_Container, fadeIn]} >
                        <Animated.View style={[styleAddNote.content, slideIn]}>
                            <LinearGradient colors={['rgba(104, 165, 173, 0)', '#c5d4d6',]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0.2, y: 1 }} style={{ height: '100%', justifyContent: 'space-between', width: screenWidth, paddingBottom: 20, }}>
                                {

                                    !addResponse ?
                                        <>
                                            <LinearGradient colors={['#154747', '#246e6d', '#42747a',]}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 0.2, y: 1 }} style={{ paddingHorizontal: 25, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, height: '62%', paddingVertical: 10, }}>
                                                <View style={{ paddingTop: 20, left: -10, width: '100%', }}>
                                                    <TouchableOpacity style={{}} onPress={handleCloseAddNote}>
                                                        <Image style={{ width: 35, height: 35 }} source={require('../../../../../assets/init/back/arrow_back_white.png')} />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                                    <Text style={styleAddNote.headerText}>Configuração da Anotação</Text>
                                                </View>
                                                <View style={{ height: '45%', justifyContent: 'center' }}>
                                                    <TextInput
                                                        style={styleAddNote.input}
                                                        placeholder="Título"
                                                        value={addNoteData.title}
                                                        onChangeText={(e) => setAddNoteData({ ...addNoteData, title: e })}
                                                        placeholderTextColor={'#ddeded'}
                                                    />
                                                    <TextInput
                                                        style={styleAddNote.input}
                                                        placeholder="Descrição"
                                                        value={addNoteData.description}
                                                        onChangeText={(e) => setAddNoteData({ ...addNoteData, description: e })}
                                                        placeholderTextColor={'#577980'}
                                                    />
                                                </View>
                                                <View style={{ width: '100%', alignItems: 'center' }}>
                                                    <Text style={{ fontSize: 18, color: '#dff0f0' }}>{`Possui o total de ${noteData.content.length} páginas`}</Text>
                                                </View>
                                            </LinearGradient>

                                            <View style={{display: 'flex', gap: 15, width: '100%', alignItems: 'center', paddingHorizontal: 20,}}>
                                                <TouchableOpacity onPressIn={() => onUpdate(noteData._id, noteData)} style={[styleAddNote.addButton, { backgroundColor: '#356d75' }]} onPress={handleAddNote}>
                                                    <Text style={[styleAddNote.addButtonText,]}>SALVAR</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity onPressIn={() => onDelete(noteData._id)} style={[styleAddNote.addButton, { backgroundColor: '#2f5a66' }]} onPress={handleAddNote}>
                                                    <Text style={[styleAddNote.addButtonText]}>DELETAR</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </>
                                        :
                                        <HandleNoteResponse apiRequestData={{ url: typeRequestResponse ? typeRequestResponse : '', method: 'POST', data: noteData }} additional_data={{ handleLoading: addNoteFinish, }} />
                                }
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
        overflow: 'hidden'

    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 25,
        color: 'white'
    },
    closeButton: {

        marginBottom: 10,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#a7c9c9',
        marginBottom: 20,
        paddingVertical: 10,
        fontSize: 16,
        color: '#f5ffff'
    },
    addButton: {
        width: '100%',
        borderRadius: 10,
        paddingVertical: 30,
        alignItems: 'center',

    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default NoteConfig;