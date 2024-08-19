import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DoctorStatus = () => {
    return (
        <View style={styles.doctorContentContainer}>
            <Text style={styles.dataTitle}>Tratamentos Encerrados:</Text>
            <Text>Simulando dados de tratamentos encerrados...</Text>

            <Text style={styles.dataTitle}>Tratamentos em Andamento:</Text>
            <Text>Simulando dados de tratamentos em andamento...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    doctorContentContainer: {
        marginTop: 20,
    },
    dataTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default DoctorStatus;