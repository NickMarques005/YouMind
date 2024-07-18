import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { WelcomeMenuSelectOption } from '../WelcomeSession';

interface MenuOptionProps {
    option: WelcomeMenuSelectOption;
    onSelect: (option: WelcomeMenuSelectOption) => void;
}

const MenuOption = ({ option, onSelect }: MenuOptionProps) => {
    
    const handleOptionColor = (option: WelcomeMenuSelectOption) => {
        switch (option){
            case 'Tratamento':
                return '#4f718f';
            case 'Paciente':
                return '#834f8f';
            case 'Doutor':
                return '#4f898f';
            default:
                return '#4f718f';
        }
    }

    const handleOptionTextColor = (option: WelcomeMenuSelectOption) => {
        switch (option){
            case 'Tratamento':
                return '#cee2f2';
            case 'Paciente':
                return '#e7ceed';
            case 'Doutor':
                return '#d5ecf2';
            default:
                return '#cee2f2';
        }
    }
    
    return (
        <TouchableOpacity style={[
            styles.menuOption, { backgroundColor: handleOptionColor(option)}
            ]} onPress={() => onSelect(option)}>
            <Text style={[styles.menuOptionText, { color: handleOptionTextColor(option)}]}>{option}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    menuOption: {
        flex: 1,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginBottom: '5%'
    },
    menuOptionText: {
        fontSize: 20,
        textTransform: 'uppercase',
        color: 'white',
        fontWeight: 'bold'
    }
});

export default MenuOption;