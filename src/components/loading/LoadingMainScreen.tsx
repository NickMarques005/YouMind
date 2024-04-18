import React, { useEffect } from 'react';
import { View, ActivityIndicator, Text, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { UseAuth } from '../../providers/AuthenticationProvider';
import { screenHeight, screenWidth } from '../../utils/layout/Screen_Size';

function LoadingMainScreen() {
    const { loadRefreshToken } = UseAuth();

    useEffect(() => {
        loadRefreshToken();
    }, []);

    return (
        <View style={{ zIndex: 2, flex: 1, justifyContent: 'center', backgroundColor: 'rgba(64, 57, 66, 0.2)', alignItems: 'center', width: screenWidth, height: screenHeight}}>
            <LottieView style={{ width: screenWidth * 0.65, height: screenWidth * 0.65}} source={require('../../assets/animations/loading.json')} autoPlay loop />
        </View>
    );
};

export default LoadingMainScreen;