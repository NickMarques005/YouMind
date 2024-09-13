import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface VoiceCallButtonProps {
    iconName: keyof typeof MaterialCommunityIcons.glyphMap;
    onPress: () => void;
    style?: ViewStyle;
    iconSize?: number;
    iconColor?: string;
}

const VoiceCallButton: React.FC<VoiceCallButtonProps> = ({
    iconName,
    onPress,
    style,
    iconSize = 26,
    iconColor = 'white',
}) => {
    const callButtonStyle = styles(iconSize);

    return (
        <TouchableOpacity style={[callButtonStyle.button, style]} onPress={onPress}>
            <MaterialCommunityIcons name={iconName} size={iconSize} color={iconColor} />
        </TouchableOpacity>
    );
};

const styles = (iconSize: number) => {
    return StyleSheet.create({
        button: {
            height: iconSize * 2.2,
            width: iconSize * 2.2,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: iconSize * 2.2,
        },
    });
} 

export default VoiceCallButton;