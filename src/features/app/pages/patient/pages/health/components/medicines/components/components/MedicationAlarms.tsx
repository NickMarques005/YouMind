import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MedicationFormType } from 'types/app/patient/health/Medicine_Types';
import { MedicationFormModal } from '../../hooks/useMedicationFormBehavior';

interface MedicationAlarmsProps {
    form: MedicationFormType;
    showFormModal: (modalType: MedicationFormModal) => void;
    loading: boolean;
    handleAlarmDurationForm: (duration: number) => void;
    handleReminderTimesForm: (reminderTimes: number) => void;
    sessionIconSize: number;
}

const MedicationAlarms: React.FC<MedicationAlarmsProps> = ({
    form, showFormModal, loading, sessionIconSize
}) => {
    const styles = medicationAlarmsStyle(sessionIconSize);

    return (
        <View style={styles.medicationAlarms}>
            <View style={styles.sessionIconContainer}>
                <MaterialIcons name="alarm" size={sessionIconSize / 2} color="white" />
            </View>
            <View style={[styles.infoRowDirection, styles.infoTemplate]}>
                <Text style={styles.infoTitle}>Duração do alarme</Text>

                <View style={{ minWidth: '35%' }}>
                    <TouchableOpacity
                        style={[styles.viewActivateModal, { opacity: loading ? 0.6 : 1 }]}
                        onPress={() => showFormModal('AlarmDuration')}
                        disabled={loading}
                    >
                        <Text style={[styles.alarmButtonText]}>
                            {`${form.alarmDuration / 60} min`}
                        </Text>
                        <MaterialIcons name="arrow-drop-down" size={24} color="white" style={{ marginRight: '10%' }} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.infoRowDirection, styles.infoTemplate]}>
                <Text style={styles.infoTitle}>Quantidade de lembretes</Text>

                <View style={{ minWidth: '35%' }}>
                    <TouchableOpacity
                        style={[styles.viewActivateModal, { opacity: loading ? 0.6 : 1 }]}
                        onPress={() => showFormModal('ReminderTimes')}
                        disabled={loading}
                    >
                        <Text style={[styles.alarmButtonText]}>
                            {form.reminderTimes}
                        </Text>
                        <MaterialIcons name="arrow-drop-down" size={24} color="white" style={{ marginRight: '10%' }} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default MedicationAlarms;

const medicationAlarmsStyle = (sessionIconSize: number) => {
    return StyleSheet.create({
        medicationAlarms: {
            backgroundColor: '#fcf5fc',
            paddingVertical: '6%',
            justifyContent: 'space-between',
            paddingHorizontal: '8%',
            borderRadius: 20,
            flex: 1,
            marginVertical: '6%',
        },
        sessionIconContainer: {
            backgroundColor: '#a468b3',
            position: 'absolute',
            top: - sessionIconSize * 0.65,
            left: '3%',
            height: sessionIconSize,
            width: sessionIconSize,
            borderRadius: sessionIconSize,
            alignItems: 'center',
            justifyContent: 'center'
        },
        infoRowDirection: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 7,
        },
        infoTemplate: {
            marginVertical: '5%',
        },
        infoTitle: {
            fontSize: 15,
            fontWeight: '600',
            color: '#631c50',
            marginBottom: '2%',
        },
        viewActivateModal: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: '4%',
            borderColor: '#a541b0',
            borderWidth: 1,
            borderRadius: 10,
            flex: 1,
            backgroundColor: '#945989',
        },
        alarmButtonText: {
            fontSize: 14,
            fontWeight: 'bold',
            color: '#fcf7fa',
            flex: 1,
            textAlign: 'center',
            marginLeft: '10%'
        },
    });
} 