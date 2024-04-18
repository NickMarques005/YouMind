import React from 'react';
import { View, ActivityIndicator, Text, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

import { screenHeight, screenWidth } from '../../utils/layout/Screen_Size';

function LoadingAuthScreen() {
    return (
        <View style={{ position: 'absolute', zIndex: 5, flex: 1, justifyContent: 'center', backgroundColor: 'rgba(64, 57, 66, 0.7)', alignItems: 'center', width: screenWidth, height: screenHeight}}>
            <LottieView style={{ width: screenWidth * 0.5, height: screenWidth * 0.5}} source={require('../../assets/animations/loading.json')} autoPlay loop />
        </View>
    );
};

export default LoadingAuthScreen;