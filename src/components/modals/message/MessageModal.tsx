import React from 'react';
import { Modal, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { screenWidth, screenHeight } from '@utils/layout/Screen_Size';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import images from '@assets/images';
import LinearGradient from 'react-native-linear-gradient';
import UseModalAnimation from '@hooks/animation/UseModalAnimation';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import { MessageModalProps } from './types/type_message_modal';
import { message_modal_styles } from './styles/MessageModal';
import { UseAuth } from '@features/root/providers/AuthenticationProvider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MessageModal: React.FC<MessageModalProps> = ({ isVisible, message, onClose, messageType }) => {
    const { offset, opacity, closeAnimation } = UseModalAnimation({ isVisible, onClose });
    const { userType } = UseAuth();

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

    const iconMap = {
        success: 'check-circle-outline',
        email_sent: 'email-outline',
        info: 'information-outline',
        treatment: 'hospital-box-outline',
        warning: 'alert-outline',
        medication: 'pill', 
        questionnaire: 'clipboard-question-outline',
    };

    const styles = message_modal_styles(userType);
    const logo = images.generic_images.logo.logo_mobile_color;

    return (
        <Modal
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
            animationType="fade"
        >
            <GestureHandlerRootView style={{ width: screenWidth, flex: 1 }}>
                <GestureDetector gesture={tapGesture}>
                    <Animated.View style={[styles.overlay, overlayStyle]} />
                </GestureDetector>
                <GestureDetector gesture={dragGesture}>
                    <Animated.View style={[styles.container, modalStyle]}>
                        <View style={styles.dragHandle} />
                        <View style={styles.header}>
                            <View style={styles.containerLogo}>
                                {messageType ? (
                                    <MaterialCommunityIcons
                                        name={iconMap[messageType] || 'alert-circle-outline'}
                                        size={40}
                                        color={userType === 'doctor' ? "#57afb5" : "#823d94"}
                                    />
                                ) : (
                                    <Image source={logo} style={styles.imageLogo} />
                                )}
                            </View>
                        </View>
                        <View style={styles.viewMessage}>
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

export default MessageModal;