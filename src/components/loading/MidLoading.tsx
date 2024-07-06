import React, { useEffect } from 'react';
import { View, ActivityIndicator, Text, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { UseAuth } from '../../features/root/providers/AuthenticationProvider';
import { screenHeight, screenWidth } from '../../utils/layout/Screen_Size';

function MidLoading() {

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%'}}>
            <LottieView style={{ width: 240, height: 240}} source={require('../../assets/animations/loading.json')} autoPlay loop />
        </View>
    );
};

export default MidLoading;