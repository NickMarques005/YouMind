import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle } from 'react-native-reanimated';
import UseModalAnimation from '@hooks/animation/UseModalAnimation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '@components/button/CustomButton';
import images from '@assets/images';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import LinearGradient from 'react-native-linear-gradient';

interface EnableInitModalProps {
    isVisible: boolean;
    message: string;
    onClose: () => void;
    buttonTextLeft: string;
    ButtonActionLeft: () => void;
    buttonTextRight: string;
    ButtonActionRight: () => void;
    iconName?: string;
    iconSize?: number;
}

const EnableInitModal: React.FC<EnableInitModalProps> = ({
    isVisible, 
    message, 
    onClose, 
    buttonTextLeft, 
    ButtonActionLeft, 
    buttonTextRight, 
    ButtonActionRight,
    iconName, 
    iconSize = 24
}) => {
    const { offset, opacity, closeAnimation } = UseModalAnimation({ isVisible, onClose });

    const modalStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: offset.value }],
        opacity: opacity.value
    }));

    const overlayStyle = useAnimatedStyle(() => ({
        opacity: opacity.value
    }));

    const closeButton = images.generic_images.back.default_back_gray;

    return (
        <Modal
            transparent={true}
            visible={isVisible}
            onRequestClose={runOnJS(closeAnimation)}
            animationType="fade"
        >
            <GestureHandlerRootView style={styles.rootView}>
                <Animated.View style={[styles.overlay, overlayStyle]} onTouchEnd={onClose} />
                <Animated.View style={[styles.container, modalStyle]}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => runOnJS(closeAnimation)()} style={styles.closeButton}>
                            <Image source={closeButton} style={styles.closeImage} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.message}>{message}</Text>
                        {iconName && (
                            <MaterialCommunityIcons
                                name={iconName}
                                size={iconSize}
                                color="#404278"  // Customize the color if needed
                                style={styles.icon}
                            />
                        )}
                        <View style={styles.buttonContainer}>
                            <LinearGradient
                                colors={buttonGradient.colors}
                                start={buttonGradient.start}
                                end={buttonGradient.end}
                                style={styles.buttonGradient}>
                                <CustomButton
                                    title={buttonTextLeft}
                                    onPress={ButtonActionLeft}
                                    buttonStyle={styles.button}
                                    textStyle={styles.buttonText}
                                />
                            </LinearGradient>

                            <LinearGradient
                                colors={buttonGradient.colors}
                                start={buttonGradient.start}
                                end={buttonGradient.end}
                                style={styles.buttonGradient}>
                                <CustomButton
                                    title={buttonTextRight}
                                    onPress={ButtonActionRight}
                                    buttonStyle={styles.button}
                                    textStyle={styles.buttonText}
                                />
                            </LinearGradient>
                        </View>
                    </View>

                </Animated.View>
            </GestureHandlerRootView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(54, 42, 56, 0.5)',
        width: screenWidth,
        height: screenHeight,
    },
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    container: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 30,
        paddingVertical: 30,
        paddingHorizontal: 20,
        gap: 30,
        alignItems: 'center',
        elevation: 10,
    },
    header: {
        width: '100%',
        height: '16%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    closeButton: {
        width: '20%',
    },
    closeImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    content: {
        width: '100%',
        flexGrow: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    message: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#404278',
        textAlign: 'center',
    },
    icon: {
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 15,
    },
    buttonGradient: {
        flex: 1,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    }
});

const buttonGradient = {
    colors: ['#5d7cba', '#5f5eb8'],
    start: { x: 0, y: 0 },
    end: { x: 0.8, y: 1 }
};

export default EnableInitModal;