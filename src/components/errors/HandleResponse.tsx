import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import { screenWidth, screenHeight } from '../../utils/layout/Screen_Size';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import { HandleNotificationResponse } from '../notifications/components/HandleNotification';


interface HandleResponseProps {
    data?: any;
    errors?: string[];
    message?: string;
    additional_data?: HandleNotificationResponse;
}

function HandleResponse({ data, errors, message, additional_data }: HandleResponseProps) {

    return (
        <View style={{ flex: 1, position: 'absolute', display: 'flex', zIndex: 5, backgroundColor: 'rgba(54, 42, 56, 0.5)', width: screenWidth, height: screenHeight, justifyContent: 'center', paddingHorizontal: 20, }}>
            <View style={{ width: '100%', backgroundColor: 'transparent', elevation: 10 }}>
                <LinearGradient
                    colors={['white', 'rgba(207, 195, 230, 1)', 'rgba(131, 83, 148, 1)']}
                    start={{ x: 0, y: 0.3 }}
                    end={{ x: 0, y: 1 }} style={{ display: 'flex', gap: 45, width: '100%', borderRadius: 30, paddingVertical: 30, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 30, }}>
                    <View style={{ width: '80%', alignItems: 'center', justifyContent: 'center', display: 'flex', gap: 35, paddingTop: 25, }}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#404278', textAlign: 'center' }}>{errors ? `${errors}` : message ? message : ""}</Text>
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            {
                                message ?
                                    <LottieView style={{ width: 140, height: 140 }} source={require('../../assets/animations/confirmation.json')} loop={false} autoPlay />
                                    :
                                    <Image style={{ width: 110, height: 110 }} source={require('../../assets/init/error/error_icon.png')} />
                            }
                        </View>
                    </View>

                    <LinearGradient
                        colors={['#5d7cba', '#5f5eb8', '#6e398f']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0.8, y: 1 }} style={{ width: '100%', height: 'auto', borderRadius: 40, }}>
                        <TouchableOpacity onPress={() => additional_data?.handleLoading()} style={{ width: '100%', alignItems: 'center', paddingVertical: 20 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>OK</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </LinearGradient>
            </View>

        </View>
    )
}

export default HandleResponse;