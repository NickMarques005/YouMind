import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MedicationDuration, MedicationFrequency } from 'types/app/patient/health/Medicine_Types';

interface DurationModalProps {
    closeModal: () => void;
    duration: MedicationDuration;
    onSelect: (expiresAt: MedicationDuration) => void;
}

const DurationModal: React.FC<DurationModalProps> = ({ closeModal, onSelect, duration }) => {
    const medDurations: MedicationDuration[] = ['Dias', 'Semanas', 'Meses'];
    
    const handleSelectFrequency = (duration: MedicationDuration) => {
        
        onSelect(duration);
        closeModal();
    }

    return (
            <View style={styles.modalContent}>
                <View style={{width: '100%', marginBottom: '10%', marginTop: '3%'}}>
                    <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '700', color: '#6b2061' }}>
                        Com que frequência seu medicamento será tomado?
                    </Text>
                </View>
                {medDurations.map((item) => (
                    <TouchableOpacity
                        key={item}
                        onPress={() => handleSelectFrequency(item)}
                        
                        style={[styles.optionButton, {opacity: duration === item ? 1 : 0.7}]}
                    >
                        <Text style={styles.optionText}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>
    );
};

export default DurationModal;

const styles = StyleSheet.create({
    modalContent: {
        width: '100%',
        paddingHorizontal: '8%',
        paddingTop: '4%',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    optionButton: {
        width: '85%',
        padding: '6%',
        marginVertical: '2%',
        backgroundColor: '#7f3b8f',
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
    },
    optionText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    closeButton: {
        height: '100%',
        width: '17%',
        borderRadius: 5,
    },
});