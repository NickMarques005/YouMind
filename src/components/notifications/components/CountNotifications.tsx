import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { UseAuth } from '../../../contexts/AuthContext';
import { UseNotifications } from '../../../contexts/NotificationsContext';

function CountNotifications() {

    const { notifications } = UseNotifications();
    const { authData } = UseAuth();

    return (
        <>
        {
            notifications.length !== 0 ?
            <LinearGradient
            colors={authData.type == 'doctor' ? ['rgba(207, 195, 230, 0.5)', 'rgba(114, 186, 169, 0.4)'] : ['rgba(207, 195, 230, 0.5)', 'rgba(151, 104, 179, 0.4)']}
            start={{ x: 0, y: 0.3 }}
            end={{ x: 0, y: 1 }}
            style={{
                position: 'absolute',
                top: -5, 
                right: -14, 
                borderRadius: 60,
                paddingVertical: 5,
                paddingHorizontal: 10,
            }}>
                <Text style={{fontSize: 14, color: 'white', fontWeight: 'bold'}}>
                    {
                        notifications.length
                    }
                </Text>
        </LinearGradient>
        : ""
        }
        </>
        
    )
}

export default CountNotifications;