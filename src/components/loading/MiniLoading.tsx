import React, { useEffect } from 'react';
import { View, ActivityIndicator, Text, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { UseAuth } from '../../features/root/providers/AuthenticationProvider';
import { screenHeight, screenWidth } from '../../utils/layout/Screen_Size';

function MiniLoading() {

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%'}}>
            <LottieView style={{ width: 200, height: 200}} source={require('../../assets/animations/mini_loading.json')} autoPlay loop />
        </View>
    );
};

export default MiniLoading;