import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { responsiveSize } from '@utils/layout/Screen_Size';

const NoTreatmentSession = () => {
    const noTreatmentSessionIconSize = responsiveSize * 0.2;

    return (
        <View style={styles.container}>
            <View style={{ 
                width: noTreatmentSessionIconSize, 
                height: noTreatmentSessionIconSize, 
                borderRadius: noTreatmentSessionIconSize / 2, 
                backgroundColor: 'rgba(176, 163, 181, 0.5)', 
                margin: '4%', 
                alignItems: 'center', 
                justifyContent: 'center' }}>
                <Icon name="calendar-remove" size={noTreatmentSessionIconSize * 0.7} color="#b0a3b5" />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.noTreatmentSessionText}>
                    {`Não há sessões registradas`}
                </Text>
            </View>

        </View>
    )
}

export default NoTreatmentSession

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        width: '85%',
    },
    noTreatmentSessionText: {
        fontSize: 17,
        color: '#b0a3b5',
        textAlign: 'center'
    }
})