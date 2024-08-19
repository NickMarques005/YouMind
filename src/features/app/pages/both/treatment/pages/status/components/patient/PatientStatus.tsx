import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PatientStatus = () => {
    return (
        <View style={styles.patientContentContainer}>
            <View style={styles.dataContainer}>
                <View>
                    <Text style={styles.dataTitle}>Questionários Respondidos:</Text>
                    <Text>{56}</Text>
                </View>
                <View>
                    <Text style={styles.dataTitle}>Medicamentos Tomados:</Text>
                    <Text>{34}</Text>
                </View>
                <View>
                    <Text style={styles.dataTitle}>Tempo de Uso do YouMind T-Watch:</Text>
                    <Text>20 horas</Text>
                </View>
            </View>
            <View>
                <Text style={styles.sessionTitle}>Histórico de Sessões</Text>
                {/* Simular FlatList aqui */}
                <Text>Simulando uma sessão...</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    patientContentContainer: {
        marginTop: 20,
    },
    dataContainer: {
        marginBottom: 20,
    },
    dataTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    sessionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PatientStatus;