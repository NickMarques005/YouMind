import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { screenWidth } from '@utils/layout/Screen_Size';

interface Medication {
    name: string;
    dosage: string;
    type: string;
}

interface AlertMedicationContentProps {
    medication?: Medication;
    mainIcon: any;
}

const AlertMedicationContent: React.FC<AlertMedicationContentProps> = ({ medication, mainIcon }) => {
    return (
        <View style={styles.contentView}>
            <View style={styles.iconContainer}>
                <View style={styles.iconWrapper}>
                    <Image style={styles.iconImage} source={mainIcon} />
                </View>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.medicationName}>{medication ? medication.name : "Medicamento"}</Text>
                <Text style={styles.dosageText}>
                    {
                        medication ? `Tomar ${medication.dosage}${medication.type === 'Líquido' ? 'ml' : 'mg'}` :
                            "Oops! Não há medicamento pendente"
                    }
                </Text>
            </View>
        </View>
    );
};

export default AlertMedicationContent;

const styles = StyleSheet.create({
    contentView: {
        flex: 1,
        minHeight: '40%',
    },
    iconContainer: {
        width: '100%',
        marginVertical: '10%',
        alignItems: 'center',
    },
    iconWrapper: {
        height: 170,
        width: 170,
        padding: '12%',
        borderRadius: screenWidth * 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#703f6e',
        elevation: 5,
    },
    iconImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    textContainer: {
        width: '100%',
        flex: 1,
        gap: 10,
    },
    medicationName: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: '600',
        color: 'white',
    },
    dosageText: {
        fontSize: 22,
        textAlign: 'center',
        color: '#ead8ed',
    },
});