import { screenHeight } from '@utils/layout/Screen_Size';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export enum RedirectModalTypes {
    MEDICATION_PENDING = 'medicationPending',
    VOICE_CALL = 'voiceCall',
}

interface DraggableModalProps {
    id: string;
    children: ReactNode;
    onClick?: () => void;
    isVisible: boolean;
    disabledMainAction?: boolean;
    index: number;
}

const MARGIN = 20;

const DraggableModal: React.FC<DraggableModalProps> = ({ id, children, onClick, isVisible, disabledMainAction, index }) => {
    const [shouldRender, setShouldRender] = useState(isVisible); // Controla se o modal é renderizado
    const opacity = useSharedValue(0);
    const translationX = useSharedValue(MARGIN);
    const translationY = useSharedValue(MARGIN);
    const offsetX = useSharedValue(MARGIN);
    const offsetY = useSharedValue(MARGIN);
    const modalRef = useRef<View>(null);

    // Efeito para gerenciar animação de opacidade ao aparecer e desaparecer
    useEffect(() => {
        if (isVisible) {
            setShouldRender(true);
            opacity.value = withTiming(1, { duration: 400, easing: Easing.inOut(Easing.ease) });
        } else {
            opacity.value = withTiming(0, { duration: 300, easing: Easing.inOut(Easing.ease) }, () => {
                runOnJS(setShouldRender)(false); // Remover da tela após animação
            });
        }
    }, [isVisible]);

    useEffect(() => {
        if (modalRef.current) {
            modalRef.current.measure((x, y, width, height, pageX, pageY) => {
                if (!isNaN(height)) {
                    translationY.value = MARGIN + (index * (height + MARGIN));
                    offsetY.value = translationY.value;
                }
            });
        }
    }, [index, modalRef.current]);

    // Gesto para arrastar o modal
    const dragGesture = Gesture.Pan()
        .onUpdate((event) => {
            translationX.value = event.translationX + offsetX.value;
            translationY.value = event.translationY + offsetY.value;
        })
        .onEnd(() => {
            const boundaryX = Math.max(MARGIN, Math.min(translationX.value, 0));
            const boundaryY = Math.max(MARGIN, Math.min(translationY.value, screenHeight * 0.8));

            translationX.value = boundaryX;
            translationY.value = boundaryY;

            offsetX.value = translationX.value;
            offsetY.value = translationY.value;
        });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value, // Controla a opacidade com animação
            transform: [
                { translateX: withSpring(translationX.value) },
                { translateY: withSpring(translationY.value) }
            ],
        };
    });

    // Renderiza o modal apenas se `shouldRender` for true
    if (!shouldRender) return null;

    return (
        <GestureDetector gesture={dragGesture}>
            <Animated.View ref={modalRef} style={[styles.modal, animatedStyle]}>
                <TouchableOpacity disabled={disabledMainAction} activeOpacity={0.9} onPress={onClick} style={styles.modalContent}>
                    {children}
                </TouchableOpacity>
            </Animated.View>
        </GestureDetector>
    );
};

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
    },
    modalContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchable: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default DraggableModal;