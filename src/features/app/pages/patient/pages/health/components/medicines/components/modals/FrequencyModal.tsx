import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MedicationFrequencyType } from 'types/app/patient/health/Medicine_Types';

interface FrequencyModalProps {
    closeModal: () => void;
    frequency: MedicationFrequencyType;
    onSelect: (frequency: MedicationFrequencyType) => void;
}

const FrequencyModal: React.FC<FrequencyModalProps> = ({ closeModal, onSelect, frequency }) => {
    const frequencies: MedicationFrequencyType[] = ['Dias', 'Semanas', 'Meses'];

    const handleSelectFrequency = (frequency: MedicationFrequencyType) => {
        onSelect(frequency);
        closeModal();
    }

    return (
        <View style={styles.modalContent}>
            <View style={{ width: '100%', marginBottom: '10%', marginTop: '3%' }}>
                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '700', color: '#6b2061' }}>
                    Com que frequência seu medicamento será tomado?
                </Text>
            </View>
            {
                frequencies.map((item) => (
                    <TouchableOpacity
                        key={item}
                        onPress={() => handleSelectFrequency(item)}

                        style={[styles.optionButton, { opacity: frequency === item ? 1 : 0.7 }]}
                    >
                        <Text style={styles.optionText}>{item}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    );
};

export default FrequencyModal;

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