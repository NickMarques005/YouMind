import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    withSpring,
    useAnimatedStyle,
    withTiming,
    runOnJS,
    Easing,
} from 'react-native-reanimated';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { LinearGradient } from 'expo-linear-gradient';
import images from '@assets/images';
import DefaultLoading from '@components/loading/DefaultLoading';
import CustomTextInput from '@components/text_input/CustomInput';

interface AddNoteData {
    title: string;
    description: string;
}


interface AddNoteProps {
    isVisible: boolean;
    onClose: () => void;
    onAddNote: (title: string, description: string, onSuccess?: () => void) => void;
    loading: boolean;
}

const AddNote: React.FC<AddNoteProps> = ({ isVisible, onClose, onAddNote, loading }) => {
    const axis_y_default_position = - screenHeight * 0.2
    const translateY = useSharedValue(axis_y_default_position);
    const opacity = useSharedValue(0);

    const [addNoteData, setAddNoteData] = useState<AddNoteData>({
        title: "",
        description: "",
    });

    useEffect(() => {
        if (isVisible) {
            translateY.value = withSpring(0, { damping: 40, stiffness: 45 });
            opacity.value = withTiming(1, { duration: 400 });
        }
    }, [isVisible, translateY, opacity]);

    const closeAnimation = useCallback(() => {
        translateY.value = withTiming(axis_y_default_position, { duration: 800 });
        opacity.value = withTiming(0, { duration: 800 }, () => {
            runOnJS(onClose)();
        });
    }, [onClose, translateY, opacity]);

    const modalStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
            opacity: opacity.value
        };
    });
    const overlayStyle = useAnimatedStyle(() => ({
        opacity: opacity.value
    }));

    const addNoteFinish = () => {
        setAddNoteData({ title: '', description: '' });
        closeAnimation();
    };

    const handleTitleChange = (text: string) => {
        setAddNoteData(prev => ({ ...prev, title: text }));
    };

    const handleDescriptionChange = (text: string) => {
        setAddNoteData(prev => ({ ...prev, description: text }));
    };

    const backIcon = images.generic_images.back.arrow_back_doctor;

    return (
        <>
            {
                isVisible ?
                    <Animated.View style={[styles.addNote_Container, overlayStyle]} >
                        <Animated.View style={[styles.content, modalStyle]}>
                            <LinearGradient colors={['rgba(104, 165, 173, 0)', '#c5d4d6',]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0.2, y: 1 }} style={{ padding: 35, height: '100%', justifyContent: 'space-between', paddingVertical: 40, }}>

                                <View style={{ paddingVertical: 20, left: -10, width: '100%', }}>
                                    <TouchableOpacity disabled={loading} style={{ opacity: loading ? 0.5 : 1 }} onPress={closeAnimation}>
                                        <Image style={{ width: 35, height: 35 }} source={backIcon} />
                                    </TouchableOpacity>

                                </View>
                                <View style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                    <Text style={styles.headerText}>Adicionar Nova Anotação</Text>
                                </View>

                                <View style={styles.inputsContainer}>
                                    <View style={styles.viewInputTemplate}>
                                        <Text style={styles.textInputTemplate}>Título</Text>
                                        <CustomTextInput
                                            value={addNoteData.title}
                                            inputStyle={styles.input}
                                            viewStyle={styles.viewInput}
                                            onChangeText={(text) => handleTitleChange(text)}
                                            placeholder="Título da nova anotação"
                                            maxLength={45}
                                            editable={!loading}
                                        />
                                    </View>
                                    <View style={styles.viewInputTemplate}>
                                        <Text style={styles.textInputTemplate}>Descrição</Text>
                                        <CustomTextInput
                                            value={addNoteData.description}
                                            inputStyle={styles.input}
                                            viewStyle={styles.viewInput}
                                            onChangeText={(text) => handleDescriptionChange(text)}
                                            placeholder="Descrição da anotação"
                                            customLoading={loading}
                                            maxLength={150}
                                        />
                                    </View>
                                </View>
                            </LinearGradient>
                            <Animated.View style={[modalStyle]}>
                                <TouchableOpacity disabled={loading} style={[styles.addButton, { opacity: loading ? 0.7 : 1 }]} onPress={() => onAddNote(addNoteData.title, addNoteData.description, addNoteFinish)}>
                                    {
                                        loading ?
                                            <DefaultLoading size={25} color={'white'} />
                                            :
                                            <Text style={styles.addButtonText}>ADICIONAR</Text>
                                    }
                                </TouchableOpacity>

                            </Animated.View>
                        </Animated.View>
                    </Animated.View >
                    : ""
            }
        </>
    );
};

const styles = StyleSheet.create({
    addNote_Container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(36, 56, 61, 0.5)',
        alignItems: 'center',
        height: screenHeight,
        zIndex: 5
    },
    content: {
        backgroundColor: '#edf4f5',
        height: screenHeight * 0.7,
        width: screenWidth,
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
    inputsContainer: {
        marginVertical: 25,
        gap: 10,
    },
    viewInputTemplate: {
        width: '100%',
        gap: 2,
    },
    textInputTemplate: {
        fontSize: 14,
        color: '#6299a1'
    },
    viewInput: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        padding: 10,
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        width: '100%',
        borderBottomColor: '#38656b'
    },
    input: {
        height: 40,
        fontSize: 16,
        color: '#17353b',
        paddingRight: 10,
    },
    addButton: {
        minHeight: '14%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3a5559',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default AddNote;