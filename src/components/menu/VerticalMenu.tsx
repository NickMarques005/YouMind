import React from 'react';
import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MenuOption } from 'types/menu/Menu_Types';

interface VerticalMenuProps {
    options: MenuOption[];
    rootView?: ViewStyle;
    containerStyle?: ViewStyle;
    backgroundStyle?: ViewStyle;
    itemStyle?: ViewStyle;
    lineStyle?: ViewStyle;
    iconStyle?: ViewStyle;
    iconSize?: number;
    iconColor?: string;
    textStyle?: TextStyle;
    opacity: SharedValue<number>;
    translateY: SharedValue<number>;
    closeMenu: () => void;
}

const VerticalMenu: React.FC<VerticalMenuProps> = ({
    options,
    rootView,
    containerStyle,
    backgroundStyle,
    itemStyle,
    lineStyle,
    iconStyle,
    iconSize,
    iconColor,
    textStyle,
    opacity,
    translateY,
    closeMenu
}) => {

    const backgroundAnimationStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    const containerAnimationStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }]
    }));

    const tapGesture = Gesture.Tap().onEnd(() => {
        runOnJS(closeMenu)();
    });

    return (
        <View style={rootView}>
            <GestureDetector gesture={tapGesture}>
                <Animated.View style={[backgroundStyle, backgroundAnimationStyle]}>
                    <Animated.View style={[containerStyle, containerAnimationStyle]}>
                        {options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={{paddingHorizontal: 12, }}
                                onPress={option.action}
                            >
                                <View style={[itemStyle, index !== options.length - 1 && lineStyle]}>
                                    {option.icon && (
                                        <Icon color={iconColor || 'black'} name={option.icon} size={iconSize || 20} style={[iconStyle]} />
                                    )}
                                    <Text style={[textStyle]}>{option.name}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </Animated.View>
                </Animated.View>
            </GestureDetector>
        </View>
    );
};

export default VerticalMenu;