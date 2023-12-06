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

interface AddNoteData {
    title: string;
    description: string;
}

interface AddNoteProps {
    isVisible: boolean;
    onClose: () => void;
    onAddNote: (title: string, description: string) => void;
}

const AddNote: React.FC<AddNoteProps> = ({ isVisible, onClose, onAddNote }) => {
    const translateY = useSharedValue(-400); // Updated initial Y translation value
    const opacity = useSharedValue(0);
    const [addResponse, setAddResponse] = useState(false);
    
    const [addNoteData, setAddNoteData] = useState<AddNoteData>({
        title: "",
        description: "",
    });

    const handleAddNote = async () => {
        if(!addNoteData.title || !addNoteData.description)
        {
            return;
        }

        console.log(addNoteData);

        setAddResponse(true);
    };

    const isAnimating = useSharedValue(false);

    useEffect(() => {
        translateY.value = withSpring(isVisible ? -10 : -500, { damping: 20 }, (isFinished) => {
            if (!isFinished && !isVisible) {
                translateY.value = -(screenHeight * 0.6);
                
            }
        });
        opacity.value = withTiming(isVisible ? 1 : 0, { duration: 300, easing: Easing.ease });
    }, [isVisible, translateY]);

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
        runOnJS(onAddNote)(addNoteData.title, addNoteData.description);
        setAddNoteData({ title: '', description: '' });
        handleCloseAddNote();
        
    };

    const handleCloseAddNote = () => {

        if (!isAnimating.value) {
            isAnimating.value = true;

            translateY.value = withTiming(-(screenHeight * 0.8), { duration: 500, easing: Easing.ease }, (isFinished) => {
                if (isFinished) {
                    opacity.value = withTiming(0, { duration: 500, easing: Easing.ease }, (isFinished) => {
                        if (isFinished) {
                            isAnimating.value = false;
                            runOnJS(onClose)();
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
                isVisible ?
                    <Animated.View style={[styleAddNote.addNote_Container, fadeIn]} >
                        <Animated.View style={[styleAddNote.content, slideIn]}>
                            <LinearGradient colors={['rgba(104, 165, 173, 0)', '#c5d4d6',]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0.2, y: 1 }} style={{ padding: 35, height: '100%', justifyContent: 'space-between', paddingVertical: 40, }}>
                                {

                                    !addResponse ?
                                        <>
                                            <View style={{ paddingVertical: 20, left: -10, width: '100%', }}>
                                                <TouchableOpacity style={{}} onPress={handleCloseAddNote}>
                                                    <Image style={{ width: 35, height: 35 }} source={require('../../../../../assets/init/back/arrow_back_doctor.png')} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                                <Text style={styleAddNote.headerText}>Adicionar Nova Anotação</Text>
                                            </View>
                                            <View style={{ height: '45%', justifyContent: 'center' }}>
                                                <TextInput
                                                    style={styleAddNote.input}
                                                    placeholder="Título"
                                                    value={addNoteData.title}
                                                    onChangeText={(e) => setAddNoteData({ ...addNoteData, title: e })}
                                                    placeholderTextColor={'#577980'}
                                                />
                                                <TextInput
                                                    style={styleAddNote.input}
                                                    placeholder="Descrição"
                                                    value={addNoteData.description}
                                                    onChangeText={(e) => setAddNoteData({ ...addNoteData, description: e })}
                                                    placeholderTextColor={'#577980'}
                                                />
                                            </View>

                                            <TouchableOpacity style={styleAddNote.addButton} onPress={handleAddNote}>
                                                <Text style={styleAddNote.addButtonText}>ADICIONAR</Text>
                                            </TouchableOpacity>
                                        </>
                                        : 
                                        <HandleNoteResponse apiRequestData={{url: "createNewNote", method: 'POST', data: addNoteData}} additional_data={{handleLoading: addNoteFinish, } }/>
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
        borderBottomRightRadius: 35,
        borderBottomLeftRadius: 35,
        elevation: 15,
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 25,
        color: '#1d5c66'
    },
    closeButton: {

        marginBottom: 10,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#69858a',
        marginBottom: 20,
        paddingVertical: 10,
        fontSize: 16,
        color: '#17353b'
    },
    addButton: {
        borderRadius: 10,
        paddingVertical: 30,
        alignItems: 'center',
        backgroundColor: '#3a5559'
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default AddNote;