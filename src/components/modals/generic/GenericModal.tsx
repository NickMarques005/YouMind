import React from 'react';
import Animated, { runOnJS, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserType } from 'types/user/User_Types';
import { generic_modal_styles } from './styles/GenericModal';
import UseModalAnimation from '@hooks/animation/UseModalAnimation';
import { screenWidth } from '@utils/layout/Screen_Size';
import { View } from 'react-native';

interface FunctionalModalProps {
    isVisible: boolean;
    onClose: () => void;
    userType?: UserType;
    children: React.ReactNode;
    gestureEnabled?: boolean;
    containerStyle?: any;
    overlayStyle?: any;
}

interface ChildComponentProps {
    closeModal: () => void;
}

const GenericModal: React.FC<FunctionalModalProps & Record<string, any>> = ({ 
    isVisible, onClose, userType, 
    children, gestureEnabled = true, containerStyle, overlayStyle,
    ...props }) => {
    const { offset, opacity, closeAnimation } = UseModalAnimation({ isVisible, onClose });
    const styles = generic_modal_styles(userType);

    const modalAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: offset.value }],
            opacity: opacity.value
        };
    });

    const overlayAnimatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value
    }));

    const tapGesture = Gesture.Tap().onEnd(() => {
        if (gestureEnabled) {
            runOnJS(closeAnimation)();
        }
    });

    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement<ChildComponentProps>(child)) {
            return React.cloneElement(child, { closeModal: () => runOnJS(closeAnimation)(), ...props });
        }
        return child;
    });

    return (
        <View style={{ width: screenWidth, height: '100%', position: 'absolute', zIndex: 4}}>
            {gestureEnabled ? (
                <GestureDetector gesture={tapGesture}>
                    <Animated.View style={[styles.overlay, overlayAnimatedStyle, overlayStyle]} />
                </GestureDetector>
            ) : (
                <Animated.View style={[styles.overlay, overlayAnimatedStyle, overlayStyle]} />
            )}
            <Animated.View style={[styles.container, modalAnimatedStyle, containerStyle]}>
                {childrenWithProps}
            </Animated.View>
        </View>
    );
};

export default GenericModal;