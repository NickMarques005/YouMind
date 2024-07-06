import { ConvertHoursToDateString } from '@utils/date/DateConversions';
import { FormatISOToStringDate } from '@utils/date/DateFormatting';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Medication } from 'types/app/patient/health/Medicine_Types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface MedicationItemProps {
    item: Medication;
    icon: ImageSourcePropType;
    handleCurrentMedication: (medication: Medication) => void;
    navigateToUpdateMedication: () => void;
}

const MedicationItem: React.FC<MedicationItemProps> = React.memo(({ item, icon, navigateToUpdateMedication, handleCurrentMedication }) => (
    <View style={styles.medicationItem}>
        <View style={styles.medicationNameContainer}>
            <Text style={styles.medicationName}>{item.name}</Text>
        </View>
        <LinearGradient colors={['#c085c9', '#814d87']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }} style={styles.detailsGradient}>
            <View style={{ height: 0, width: '100%', alignItems: 'flex-end' }}>
                <LinearGradient colors={['#b165c2', '#783160']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0.3, y: 1 }} style={styles.iconGradient}>
                    <Image source={icon} style={styles.icon} />
                </LinearGradient>
            </View>
            <View style={{ flexDirection: 'row', gap: 5, }}>
                <MaterialIcons name="schedule" size={20} color="#ecdff2" />
                {item.schedules.map((schedule, index) => (
                        <Text style={styles.medicationDetails} key={index}>{schedule}{index < item.schedules.length - 1 ? ', ' : ''}</Text>
                    ))}
            </View>
            <View style={{ flexDirection: 'row', gap: 5, }}>
                <MaterialIcons name="opacity" size={20} color="#ecdff2" />
                
                <Text style={styles.medicationDetails}>{`${item.dosage}${item.type === 'Comprimido' || item.type === 'Cápsula' ? `mg` : 'ml'}`}</Text>
            </View>
            <View>
                <Text style={styles.medicationDetails}>{`A cada ${item.frequency} dia(s)`}</Text>
            </View>
            <View>
                <Text style={styles.medicationDetails}>{`Usar até o dia ${FormatISOToStringDate(item.expiresAt)}`}</Text>
            </View>
            <View style={{ width: '100%', justifyContent: 'flex-end', flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity onPress={navigateToUpdateMedication} style={{ width: 50, height: 50, borderRadius: screenWidth * 0.1, backgroundColor: '#80407c', alignItems: 'center', justifyContent: 'center' }}>
                    <MaterialIcons name='edit' size={25} color="#ecdff2" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCurrentMedication(item)} style={{ width: 50, height: 50, borderRadius: screenWidth * 0.1, backgroundColor: '#80407c', alignItems: 'center', justifyContent: 'center' }}>
                    <MaterialIcons name='delete' size={25} color="#ecdff2" />
                </TouchableOpacity>
            </View>
        </LinearGradient>
    </View>
));

const styles = StyleSheet.create({
    medicationItem: {
        width: '100%',
        backgroundColor: '#f9f9f9',
        borderRadius: 20,
        elevation: 5,
        marginVertical: '5%'
    },
    iconGradient: {
        right: "-12%",
        top: -(screenWidth * 0.27),
        elevation: 6,
        zIndex: 2,
        width: screenWidth * 0.3,
        height: screenWidth * 0.3,
        borderRadius: screenWidth * 0.2,
        padding: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: screenWidth * 0.2,
        height: screenWidth * 0.2,
    },
    medicationNameContainer: {
        width: '100%',
        padding: '4%',
        height: screenHeight * 0.1,
        justifyContent: 'center',
        backgroundColor: '#fff7ff',
        elevation: 8,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    medicationName: {
        fontSize: 18,
        width: '75%',
        fontWeight: 'bold',
        color: '#4d2448',
    },
    detailsGradient: {
        paddingHorizontal: '6%',
        paddingVertical: '5%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        gap: 3,
    },
    medicationDetails: {
        fontSize: 14,
        color: '#ecdff2',
    },
});

export default MedicationItem;