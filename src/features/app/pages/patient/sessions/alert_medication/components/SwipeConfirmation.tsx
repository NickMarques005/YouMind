import { StyleSheet, View } from 'react-native';
import React from 'react';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DefaultLoading from '@components/loading/DefaultLoading';
import images from '@assets/images';

interface SwipeConfirmationProps {
    swipeGesture: any;
    animatedStyle: any;
    isConfirming: boolean;
    confirmed: boolean;
    declined: boolean;
}

const SwipeConfirmation: React.FC<SwipeConfirmationProps> = ({
    swipeGesture,
    animatedStyle,
    isConfirming,
    confirmed,
    declined,
}) => {
    return (
        <View style={styles.swipeButtonView}>
            <GestureDetector gesture={swipeGesture}>
                <View style={styles.swipeButton}>
                    {
                        !isConfirming && !confirmed && !declined &&
                        <LottieView style={[styles.directionAnimation, { transform: [{ scaleX: -1 }] }]} source={images.animations.arrows} autoPlay loop />
                    }
                    <Animated.View style={[styles.swipeTrigger, animatedStyle]}>
                        {
                            isConfirming ?
                                <DefaultLoading size={32} color={'#5763b5'} />
                                :
                                declined ? (
                                    <MaterialIcons name="cancel" size={32} color="white" />
                                ) :
                                    confirmed ? (
                                        <MaterialIcons name="check" size={32} color="#57c979" />
                                    ) : (
                                        <MaterialIcons name="alarm" size={32} color="#9b86a6" />
                                    )
                        }
                    </Animated.View>
                </View>
            </GestureDetector>
        </View>
    );
};

export default SwipeConfirmation;

const styles = StyleSheet.create({
    swipeButtonView: {
        width: '100%',
        height: '13%',
    },
    swipeButton: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(143, 99, 148, 0.4)',
        borderRadius: 100,
        padding: '2%',
        elevation: 20,
    },
    swipeTrigger: {
        zIndex: 2,
        width: '26%',
        height: '100%',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    directionAnimation: {
        height: '45%',
        opacity: 0.3,
        width: '50%',
        position: 'absolute',
        alignSelf: 'center',
        bottom: '30%',
    },
});