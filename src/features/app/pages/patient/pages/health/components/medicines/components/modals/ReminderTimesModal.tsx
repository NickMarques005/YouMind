import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { WheelPicker } from 'react-native-wheel-picker-android';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface ReminderTimesModalProps {
    closeModal: () => void;
    onSelect: (times: number) => void;
    initialValue: number;
}

const times = Array.from({ length: 5 }, (_, i) => (i + 1).toString());

const ReminderTimesModal: React.FC<ReminderTimesModalProps> = ({ closeModal, onSelect, initialValue }) => {
    const initialIndex = times.indexOf(times[0]);
    const [selectedTimes, setSelectedTimes] = useState<string>(times[initialIndex]);

    const handleSelect = () => {
        onSelect(Number(selectedTimes));
        closeModal();
    };

    return (
        <View style={styles.modalContent}>
            <View style={{ width: '100%', marginBottom: '10%', marginTop: '3%' }}>
                <Text style={styles.modalTitle}>Quantas vezes você será lembrado?</Text>
            </View>
            <WheelPicker
                selectedItem={initialIndex}
                data={times}
                onItemSelected={index => setSelectedTimes(times[index])}
                selectedItemTextFontFamily="Helvetica"
                itemTextFontFamily="Helvetica"
                style={styles.wheelPicker}
                selectedItemTextSize={22}
            />
            <TouchableOpacity style={styles.selectButton} onPress={handleSelect}>
                <Text style={styles.selectButtonText}>Selecionar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ReminderTimesModal;

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
        width: 150,
        height: 150,
    },
    selectButton: {
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