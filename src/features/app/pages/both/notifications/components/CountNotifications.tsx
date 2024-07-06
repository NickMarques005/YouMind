import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { UseNotifications } from '@features/app/reducers/NotificationReducer';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import { screenWidth } from '@utils/layout/Screen_Size';

const CountNotifications = () => {

    const { state } = UseNotifications();
    const { userData } = UseForm();

    return (
        <>
            {
                state.notifications.length !== 0 ?
                    <LinearGradient
                        colors={userData?.type == 'doctor' ? ['#99d2f7', '#1f7c7d'] : ['#bc66de', '#440157']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                            position: 'absolute',
                            top: '-16%',
                            left: '-60%',
                            borderRadius: 70,
                            height: 36,
                            width: 36,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }}>
                            {
                                state.notifications.length
                            }
                        </Text>
                    </LinearGradient>
                    : ""
            }
        </>

    )
}

export default CountNotifications;