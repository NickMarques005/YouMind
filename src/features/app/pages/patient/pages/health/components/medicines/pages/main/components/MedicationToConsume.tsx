import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Medication, TakenMedication } from 'types/app/patient/health/Medicine_Types';
import LinearGradient from 'react-native-linear-gradient';
import images from '@assets/images';
import { screenHeight } from '@utils/layout/Screen_Size';
import { useMedicationIcon } from '@hooks/medications/UseMedicationIcon';

interface MedicationToConsumeProps {
    item: Medication & { schedule: string };
    takenMedications: TakenMedication[] | undefined;
}

const MedicationToConsume: React.FC<MedicationToConsumeProps> = ({ item, takenMedications }) => {
    const checked = images.app_patient_images.health.medicines.icon_checked_medicine;
    const { icon } = useMedicationIcon(item.type);

    const isMedicationTaken = takenMedications?.some(
        (takenMedication) =>
            takenMedication.medicationId === item._id &&
            takenMedication.currentSchedule === item.schedule
    );

    return (
        <View style={styles.medicationContainer}>
            <View style={styles.scheduleView}>
                <Text style={styles.scheduleText}>{item.schedule}</Text>
            </View>
            <View style={styles.medicationItem}>
                <LinearGradient
                    colors={['#823685', '#b33da3']}
                    start={{ x: 0, y: 0.2 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradient}>
                    <Image
                        style={styles.medicationImage}
                        source={icon}
                    />
                </LinearGradient>
                <View style={styles.medicationContent}>
                    <View style={styles.medicationNameContainer}>
                        <Text style={styles.medicationName}>{item.name}</Text>
                    </View>
                    <View>
                        <Text style={styles.medicationInfo}>{`${item.dosage}${item.type === 'Comprimido' || item.type === 'Cápsula' ? 'mg' : 'ml'}`}</Text>
                        <Text style={styles.medicationInfo}>{`Duração de ${item.alarmDuration} segundo(s)`}</Text>
                    </View>
                </View>
                <View style={styles.checkIconContainer}>
                    <View style={styles.checkIconWrapper}>
                        {
                            isMedicationTaken &&
                            <Image style={styles.checkIcon} source={checked} />
                        }
                    </View>
                </View>
            </View>
        </View>
    );
};

export default MedicationToConsume;

const styles = StyleSheet.create({
    medicationContainer: {
        width: '100%',
        height: screenHeight * 0.12,
        flexDirection: 'row',
    },
    scheduleView: {
        width: '18%',
        height: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '2%',
        alignSelf: 'center',
        borderRightWidth: 4,
        borderColor: '#a472a8'
    },
    scheduleText: {
        fontSize: 18,
        width: '100%',
        textAlign: 'center',
        color: '#a472a8',
        fontWeight: '700',
        height: '50%',
    },
    medicationItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 15,
        elevation: 5,
        flex: 1,
    },
    gradient: {
        width: '25%',
        padding: '3.5%',
        marginRight: '2%',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15
    },
    medicationImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    medicationContent: {
        flex: 1,
        paddingHorizontal: '3%',
        paddingVertical: '3%'
    },
    medicationNameContainer: {
        width: '80%',
        marginBottom: '1%'
    },
    medicationName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#9933a1',
    },
    medicationInfo: {
        fontSize: 13,
        color: '#a472a8',
    },
    checkIconContainer: {
        width: 0,
        left: '-40%',
        top: '-7%',
    },
    checkIconWrapper: {
        width: 40,
        height: 40,
        backgroundColor: '#f7e1f2',
        borderWidth: 3,
        borderColor: '#9e287e',
        borderRadius: 70,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkIcon: {
        width: '105%',
        height: '105%',
        resizeMode: 'cover',
    },
});