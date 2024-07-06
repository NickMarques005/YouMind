import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { WheelPicker } from 'react-native-wheel-picker-android';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface AlarmDurationModalProps {
    closeModal: () => void;
    onSelect: (duration: number) => void;
    initialValue: number;
}

const durations = Array.from({ length: 5 }, (_, i) => (i + 1).toString());

const AlarmDurationModal: React.FC<AlarmDurationModalProps> = ({ closeModal, onSelect, initialValue }) => {
    const initialIndex = durations.indexOf(durations[0]);
    
    console.log("initialValue: ", initialIndex);
    const [selectedDuration, setSelectedDuration] = useState<string>(durations[initialIndex]);

    const handleSelect = () => {
        const durationInSeconds = parseInt(selectedDuration) * 60; 
        onSelect(durationInSeconds);
        closeModal();
    };

    const formattedDurations = durations.map(duration => `${duration} ${duration === "1" ? 'minuto' : 'minutos'}`);

    return (
        <View style={styles.modalContent}>
            <View style={{ width: '100%', marginBottom: '10%', marginTop: '3%' }}>
                <Text style={styles.modalTitle}>Por quanto tempo o alarme tocará?</Text>
            </View>
            <WheelPicker
                selectedItem={initialIndex}
                data={formattedDurations}
                onItemSelected={index => setSelectedDuration(durations[index])}
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

export default AlarmDurationModal;

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