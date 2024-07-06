import React from 'react';
import { View, Text, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { screenHeight } from '@utils/layout/Screen_Size';

interface CustomTabBarProps extends BottomTabBarProps {
    userType?: string;
}

const CustomTabBar: React.FC<CustomTabBarProps> = ({ state, descriptors, navigation, userType }) => {
    return (
            <LinearGradient
                colors={userType === 'doctor' ? ['#60b5b2', '#279691'] : ['#c25adb', '#6f2796']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flexDirection: 'row', height: screenHeight * 0.1, justifyContent: 'space-around', alignItems: 'center', padding: 10 }}
            >
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const icon = options.tabBarIcon ? options.tabBarIcon({ focused: isFocused, color: '', size: 0 }) : null;

                    return (
                        <TouchableOpacity key={index} onPress={onPress} style={{ flex: 1, alignItems: 'center', gap: 2, }}>
                            {icon}
                            <Text style={{ color: 'white', opacity: isFocused ? 1 : 0.6, fontSize: 13 }}>{options.title || route.name}</Text>
                        </TouchableOpacity>
                    );
                })}
            </LinearGradient>
    );
};

export default CustomTabBar;