import { formatDateToString } from '@utils/date/DateFormatting';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { WheelPicker } from 'react-native-wheel-picker-android';

interface StartMedicationModalProps {
    closeModal: () => void;
    onSelect: (start: string) => void;
    initialValue: string;
    updateStartDateText: (date: string) => void;
}

const generateDateOptions = () => {
    const options = ["Hoje", "Amanhã", "Depois de amanhã"];
    for (let i = 3; i <= 7; i++) {
        if (i < 7) {
            options.push(`Daqui a ${i} dias`);
        } else {
            options.push("Daqui a 1 semana");
        }
    }
    return options;
};

const StartMedicationModal: React.FC<StartMedicationModalProps> = ({ closeModal, onSelect, initialValue, updateStartDateText }) => {
    const dateOptions = generateDateOptions();
    const initialIndex = 0;
    const [selectedOption, setSelectedOption] = useState<string>(dateOptions[initialIndex]);

    const calculateStartDate = (option: string): Date => {
        const now = new Date();
        switch (option) {
            case "Hoje":
                return now;
            case "Amanhã":
                return new Date(now.setDate(now.getDate() + 1));
            case "Depois de amanhã":
                return new Date(now.setDate(now.getDate() + 2));
            case "Daqui a 3 dias":
                return new Date(now.setDate(now.getDate() + 3));
            case "Daqui a 4 dias":
                return new Date(now.setDate(now.getDate() + 4));
            case "Daqui a 5 dias":
                return new Date(now.setDate(now.getDate() + 5));
            case "Daqui a 1 semana":
                return new Date(now.setDate(now.getDate() + 7));
            default:
                return now;
        }
    };

    const handleSelect = () => {
        const startDate = calculateStartDate(selectedOption);
        onSelect(formatDateToString(startDate));
        updateStartDateText(selectedOption);
        closeModal();
    };

    return (
        <View style={styles.modalContent}>
            <View style={{ width: '100%', marginBottom: '10%', marginTop: '3%' }}>
                <Text style={styles.modalTitle}>Quando deseja iniciar a medicação?</Text>
            </View>
            <WheelPicker
                selectedItem={initialIndex}
                data={dateOptions}
                onItemSelected={index => setSelectedOption(dateOptions[index])}
                selectedItemTextFontFamily="Helvetica"
                itemTextFontFamily="Helvetica"
                style={styles.wheelPicker}
                selectedItemTextSize={22}
                itemTextSize={15}
                
            />
            <TouchableOpacity style={styles.selectButton} onPress={handleSelect}>
                <Text style={styles.selectButtonText}>Selecionar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default StartMedicationModal;

const styles = StyleSheet.create({
    modalContent: {
        width: '100%',
        paddingHorizontal: '8%',
        paddingTop: '4%',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    modalTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
        color: '#6b2061',
    },
    wheelPicker: {
        width: 220,
        height: 150,
    },
    selectButton: {
        marginTop: '15%',
        backgroundColor: '#6b2061',
        padding: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    selectButtonText: {
        color: 'white',
        fontSize: 18,
    },
});