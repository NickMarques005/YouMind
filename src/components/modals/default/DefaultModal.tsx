import React from 'react';
import { Modal, View, } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import UseModalAnimation from '@hooks/animation/UseModalAnimation';
import { default_modal_styles } from './styles/DefaultModal';
import { UserType } from 'types/user/User_Types';

interface DefaultModalProps {
    disableGestures: boolean;
    isVisible: boolean;
    onClose: () => void;
    children: React.ReactNode;
    userType?: string;
}

interface ChildComponentProps {
    closeModal: () => void;
}


const DefaultModal: React.FC<DefaultModalProps & Record<string, any>> = ({ disableGestures, isVisible, onClose, children, userType, ...props }) => {
    const { offset, opacity, closeAnimation } = UseModalAnimation({ isVisible, onClose });
    const styles = default_modal_styles(userType as UserType);

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
        })
        .onEnd(() => {
            if (offset.value > 150) {
                if (disableGestures) {
                    offset.value = withSpring(0, { damping: 15, stiffness: 55 });
                    return;
                }
                runOnJS(closeAnimation)();
            } else {
                offset.value = withSpring(0, { damping: 15, stiffness: 55 });
            }
        });

    const tapGesture = Gesture.Tap()
        .onEnd(() => {
            if (!disableGestures) {
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
        <Modal
            transparent={true}
            visible={isVisible}
            onRequestClose={runOnJS(closeAnimation)}
        >
            <GestureHandlerRootView style={styles.rootView}>
                <GestureDetector gesture={tapGesture}>
                    <Animated.View style={[styles.overlay, overlayStyle]} />
                </GestureDetector>
                <GestureDetector gesture={dragGesture}>
                    <Animated.View style={[styles.container, modalStyle]}>
                        <View style={styles.dragHandle} />
                        {childrenWithProps}
                    </Animated.View>
                </GestureDetector>
            </GestureHandlerRootView>
        </Modal>
    );
};

export default DefaultModal;