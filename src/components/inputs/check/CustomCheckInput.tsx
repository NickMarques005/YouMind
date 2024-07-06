import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { custom_check_input_style } from './styles/custom_check_input_style';
import LinearGradient from 'react-native-linear-gradient';

interface CustomCheckInputProps {
    userType?: string;
    label: string;
    isSelected: boolean;
    onPress: () => void;
}

const CustomCheckInput: React.FC<CustomCheckInputProps> = ({ userType, label, isSelected, onPress }) => {
    const iconName = isSelected ? 'radio-button-checked' : 'radio-button-unchecked';
    const styles= custom_check_input_style(userType);
    const checkSelected = userType === 'doctor' ? [ '#0b5959', '#4d8999'] : ['#793b82', '#b049c9'];
    const checkNotSelected = ['#ede9f0', 'transparent'];

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <LinearGradient colors={isSelected ? checkSelected : checkNotSelected} style={styles.row}>
                <MaterialIcons
                    name={iconName}
                    size={24}
                    color={isSelected ? 'white' : userType === 'doctor' ? '#31adab' : '#9831ad'}
                    style={styles.icon}
                />
                <Text style={[styles.text, { fontWeight: 'bold', color: isSelected ? 'white' : userType === 'doctor' ? '#2e868c' : '#832e8c'}]}>
                    {label}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default CustomCheckInput;