import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import images from '@assets/images';
import { responsiveSize, screenHeight } from '@utils/layout/Screen_Size';
import { useMedicationIcon } from '@hooks/medications/UseMedicationIcon';
import { HistoryMedication } from 'types/history/PatientHistory_Types';

interface MedicationToConsumeProps {
    item: HistoryMedication;
}

const MedicationToConsume: React.FC<MedicationToConsumeProps> = ({ item }) => {
    const checked = images.app_patient_images.health.medicines.icon_checked_medicine;
    const { icon } = useMedicationIcon(item.currentMedication.type);
    const medicationIconSize = responsiveSize * 0.14;
    const checkIconSize = responsiveSize * 0.11;
    const styles = medicationToConsumeStyle(checkIconSize, medicationIconSize);
    const medicationGradient = item.pending ? ['#533685', '#803db3'] : ['#823685', '#b33da3'];

    return (
        <View style={[styles.medicationContainer, { opacity: item.taken === false ? 0.7 : 1 }]}>
            <View style={styles.scheduleView}>
                <Text style={styles.scheduleText}>{item.currentSchedule}</Text>
            </View>
            <View style={[styles.medicationItem, { elevation: item.taken === false ? 0 : 5 }]}>
                <LinearGradient
                    colors={medicationGradient}
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
                        <Text style={styles.medicationName}>{item.currentMedication.name}</Text>
                    </View>
                    <View style={styles.medicationInfoContainer}>
                        <Text style={styles.medicationInfo}>{`Ingerir ${item.currentMedication.dosage}${item.currentMedication.type === 'Comprimido' || item.currentMedication.type === 'Cápsula' ? 'mg' : 'ml'}`}</Text>
                        <Text style={styles.medicationInfo}>{`Duração do alarme de ${item.currentMedication.alarmDuration} segundo(s)`}</Text>
                    </View>

                    {
                        item.pending &&
                        <View style={styles.pendingContainer}>
                            <View style={styles.pendingView}>
                                <Text style={styles.pendingText}>Pendente</Text>
                            </View>
                        </View>
                    }
                </View>
                <View style={styles.checkIconContainer}>
                    <View style={styles.checkIconWrapper}>
                        {
                            item.taken &&
                            <Image style={styles.checkIcon} source={checked} />
                        }
                    </View>
                </View>
            </View>
        </View>
    );
};

export default MedicationToConsume;

const medicationToConsumeStyle = (checkIconSize?: number, medicationIconSize?: number) => {
    return StyleSheet.create({
        medicationContainer: {
            width: '100%',
            minHeight: screenHeight * 0.16,
            maxHeight: screenHeight * 0.2,
            flexDirection: 'row'
        },
        scheduleView: {
            width: '18%',
            height: '70%',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '2%',
            alignSelf: 'center',
            borderRightWidth: 5,
            borderColor: '#a472a8'
        },
        scheduleText: {
            fontSize: 18,
            width: '100%',
            textAlign: 'center',
            color: '#a472a8',
            fontWeight: '700',
        },
        medicationItem: {
            flex: 1,
            flexDirection: 'row',
            backgroundColor: '#fff',
            borderRadius: 15
        },
        gradient: {
            width: '25%',
            padding: '3.5%',
            marginRight: '2%',
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
            justifyContent: 'center',
            alignItems: 'center'
        },
        medicationImage: {
            width: medicationIconSize,
            height: medicationIconSize,

        },
        medicationContent: {
            flex: 1,
            padding: '3%',
            gap: 5
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
        medicationInfoContainer: {
        },
        medicationInfo: {
            fontSize: 14,
            color: '#a472a8',
        },
        checkIconContainer: {
            width: 0,
            left: checkIconSize ? - checkIconSize * 1.05 : '-40%',
            top: '-7%',
        },
        checkIconWrapper: {
            width: checkIconSize || 40,
            height: checkIconSize || 40,
            backgroundColor: '#f7e1f2',
            borderWidth: 3,
            borderColor: '#9e287e',
            borderRadius: checkIconSize || 40,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center'
        },
        checkIcon: {
            width: '105%',
            height: '105%',
            resizeMode: 'cover',
        },
        pendingContainer: {
            width: '100%', 
            alignItems: 'flex-end', 
            marginTop: 5,
        },
        pendingView: {
            paddingVertical: 5, 
            paddingHorizontal: 10, 
            borderRadius: 30, 
            backgroundColor: '#533685'
        },
        pendingText: {
            color: 'white', 
            fontWeight: '600'
        }
    });
} 