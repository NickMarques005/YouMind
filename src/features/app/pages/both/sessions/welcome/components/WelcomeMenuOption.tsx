import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { WelcomeMenuSelectOption } from '../WelcomeSession';

interface MenuOptionProps {
    option: WelcomeMenuSelectOption;
    onSelect: (option: WelcomeMenuSelectOption) => void;
}

const MenuOption = ({ option, onSelect }: MenuOptionProps) => {
    return (
        <TouchableOpacity style={styles.menuOption} onPress={() => onSelect(option)}>
            <Text style={styles.menuOptionText}>{option}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    menuOption: {
        padding: '4%',
        borderBottomWidth: 1,
        elevation: 5,
    },
    menuOptionText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    }
});

export default MenuOption;