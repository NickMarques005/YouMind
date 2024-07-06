import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Medication } from 'types/app/patient/health/Medicine_Types';
import { Image } from 'react-native';
import { useMedicationIcon } from '@hooks/medications/UseMedicationIcon';
import { screenWidth } from '@utils/layout/Screen_Size';
import { FormatDateToSpeakDate } from '@utils/date/DateFormatting';
import LinearGradient from 'react-native-linear-gradient';

interface UseMedicationDisplay {
    medication: Medication;
}

const MedicationDisplay = ({ medication }: UseMedicationDisplay) => {

    const { icon } = useMedicationIcon(medication.type);

    return (
        <View style={styles.ButtonContainer}>
            <View style={styles.View}>
                <LinearGradient colors={['rgba(180, 98, 227, 0.4)', '#6d1370']} style={{ width: '100%', height: '25%', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingVertical: '4%' }}>
                    <Image
                        source={icon}
                        style={styles.Image}
                    />
                </LinearGradient>

                <View style={styles.ViewName}>
                    <View style={{width: '100%', marginBottom: '5%', gap: 5}}>
                        <Text style={styles.Name}>{medication.name}</Text>
                        <Text style={styles.TextInfo1}>{`${medication.dosage}${medication.type === 'Líquido' ? 'ml' : 'mg'}`}</Text>
                    </View>

                    <View style={{}}>
                        
                        <Text style={styles.TextInfo2}>{`Uso até dia ${FormatDateToSpeakDate(new Date(medication.expiresAt))}`}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default MedicationDisplay

const styles = StyleSheet.create({
    ButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: screenWidth * 0.46,
        padding: '5%',
    },
    View: {
        width: '100%',
        height: '100%',
        marginVertical: '5%',
        backgroundColor: 'rgba(138, 54, 104, 0.65)',
        flexDirection: 'column',
        borderRadius: 20,
    },
    Image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    Name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff2fa',
    },
    ViewName: {
        flex: 1,
        justifyContent: 'space-between',
        padding: '10%',
    },
    ViewInfo: {
        marginTop: 5,
        flexDirection: 'row',
    },
    TextInfo1: {
        fontSize: 16,
        fontWeight: '500',
        color: '#f1ebf5'
    },
    TextInfo2: {
        fontSize: 16,
        fontWeight: '700',
        color: '#f2dfeb',
        textAlign: 'center'
    },

});