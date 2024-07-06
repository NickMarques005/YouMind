import React from 'react';
import { View, ActivityIndicator, Text, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

import { screenHeight, screenWidth } from '../../utils/layout/Screen_Size';
import images from '@assets/images';

interface LoadingScreenProps {
    isApp?: boolean;
}

const LoadingScreen = ({ isApp }: LoadingScreenProps) => {

    const loading = images.animations.loading;

    return (
        <View style={{ position: 'absolute', zIndex: 10, flex: 1, justifyContent: 'center', backgroundColor: isApp ? 'rgba(126, 120, 143, 0.5)' : '#ffffff', alignItems: 'center', width: screenWidth, height: screenHeight}}>
            <LottieView style={{ width: screenWidth * 0.5, height: screenWidth * 0.5}} source={loading} autoPlay loop />
        </View>
    );
};

export default LoadingScreen;