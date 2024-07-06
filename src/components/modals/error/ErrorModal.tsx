import React, { useCallback, useEffect, useRef } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ErrorModalProps } from './types/type_error_modal';
import { UserType } from 'types/user/User_Types';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    runOnJS,
    withTiming
} from 'react-native-reanimated';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import UseModalAnimation from '@hooks/animation/UseModalAnimation';
import { error_modal_styles } from './styles/ErrorModal';

const ErrorModal: React.FC<ErrorModalProps> = ({ isVisible, message, onClose, userType }) => {
    const { offset, opacity, closeAnimation } = UseModalAnimation({isVisible, onClose});

    const modalStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: offset.value }],
            opacity: opacity.value
        };
    });
    const overlayStyle = useAnimatedStyle(() => ({
        opacity: opacity.value
    }));

    const dragGesture = Gesture.Pan()
        .onUpdate((event) => {
            if (event.translationY < 0) {
                return;
            }
            offset.value = event.translationY;
        }
        )
        .onEnd(() => {
            if (offset.value > 150) {
                runOnJS(closeAnimation)();
            } else {
                offset.value = withSpring(0, { damping: 15, stiffness: 55 });
            }
        });

    const tapGesture = Gesture.Tap()
        .onEnd(() => {
            runOnJS(closeAnimation)();
        });

    const styles = error_modal_styles(userType);

    return (
        <Modal
            transparent={true}
            visible={isVisible}
            onRequestClose={runOnJS(closeAnimation)}
        >
            <GestureHandlerRootView style={{ width: screenWidth, flex: 1 }}>

                <GestureDetector gesture={tapGesture}>
                    <Animated.View style={[styles.overlay, overlayStyle]} />
                </GestureDetector>
                <GestureDetector gesture={dragGesture}>
                    <Animated.View style={[styles.container, modalStyle]}>
                        <View style={styles.dragHandle} />
                        <View style={styles.viewMessage}>
                            <MaterialCommunityIcons name="alert-circle" size={40} color={userType === 'doctor' ? '#2e5250' : '#3f2e52'} style={{ alignSelf: 'center' }} />
                            <Text style={styles.message}>{message}</Text>
                        </View>

                        <TouchableOpacity style={styles.button} onPress={runOnJS(closeAnimation)}>
                            <LinearGradient
                                colors={userType === 'doctor' ? ['#57afb5', '#326660'] : ['#823d94', '#4d2448']}
                                style={styles.buttonGradient}
                            >
                                <Text style={styles.buttonText}>OK</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </Animated.View>
                </GestureDetector>
            </GestureHandlerRootView>
        </Modal>
    );
};



export default ErrorModal;