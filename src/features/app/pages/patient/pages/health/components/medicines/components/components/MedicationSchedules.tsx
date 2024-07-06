import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { MedicationDuration, MedicationFormType, MedicationFrequency } from 'types/app/patient/health/Medicine_Types';
import { MedicationFormModal } from '../../hooks/useMedicationFormBehavior';
import CustomTextInput from '@components/text_input/CustomInput';

interface MedicationSchedulesProps {
    form: MedicationFormType;
    showFormModal: (modalType: MedicationFormModal) => void;
    setCurrentScheduleIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
    setCurrentSchedule: React.Dispatch<React.SetStateAction<string | undefined>>;
    loading: boolean;
    frequencyType: MedicationFrequency;
    handleInputChange: (field: keyof MedicationFormType, value: string) => void;
    startDateText: string;
    durationType: MedicationDuration;
}

const MedicationSchedules: React.FC<MedicationSchedulesProps> = ({
    form,
    showFormModal,
    setCurrentScheduleIndex,
    setCurrentSchedule,
    loading,
    frequencyType,
    durationType,
    handleInputChange,
    startDateText
}) => {

    const sizeIcon = Math.min(screenHeight, screenWidth) * 0.11;

    const hasEndOfDaySchedule = (schedules: string[]) => {
        return schedules.includes("23:59");
    }

    return (
        <View style={styles.medicationSchedules}>
            <View style={{ backgroundColor: '#a468b3', position: 'absolute', top: '-5%', left: '3%', height: sizeIcon, width: sizeIcon, borderRadius: sizeIcon, alignItems: 'center', justifyContent: 'center' }}>
                <MaterialIcons name="schedule" size={sizeIcon * 0.5} color="white" />
            </View>
            <View style={styles.infoTemplate}>
                <Text style={styles.infoTitle}>Horários</Text>
                <View style={styles.infoContainer}>
                    {form.schedules.map((schedule, index) => (
                        <TouchableOpacity disabled={loading} key={index} onPress={() => {
                            setCurrentScheduleIndex(index);
                            setCurrentSchedule(schedule);
                            showFormModal('Schedules');
                        }} style={styles.scheduleItem}>
                            <Text style={styles.scheduleText}>{schedule}</Text>
                        </TouchableOpacity>
                    ))}
                    {
                        !hasEndOfDaySchedule(form.schedules) &&
                        <TouchableOpacity disabled={loading} onPress={() => showFormModal('Schedules')} style={styles.addScheduleButton}>
                            <MaterialIcons name="add" size={20} color="white" />
                        </TouchableOpacity>
                    }
                </View>
            </View>
            <View style={[styles.infoTemplate]}>
                <Text style={styles.infoTitle}>Frequência</Text>
                <View style={styles.infoRowDirection}>
                    <CustomTextInput
                        editable={!loading}
                        viewStyle={[styles.viewInput, { opacity: loading ? 0.6 : 1 }]}
                        inputStyle={styles.input}
                        value={String(form.frequency)}
                        onChangeText={(text) => handleInputChange('frequency', text)}
                        placeholder="Frequência"
                        backgroundColor='#fcf7fa'
                        keyboardType={'number-pad'}
                        maxLength={3}
                    />
                    <View style={{ minWidth: '35%' }}>
                        <TouchableOpacity
                            style={[styles.viewActivateModal, { opacity: loading ? 0.6 : 1 }]}
                            onPress={() => showFormModal('Frequencies')}
                            disabled={loading}
                        >
                            <Text style={[styles.frequencyButtonText]}>
                                {frequencyType}
                            </Text>
                            <MaterialIcons name="arrow-drop-down" size={24} color="white" style={{ marginRight: '10%' }} />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
            <View style={[styles.infoTemplate]}>
                <Text style={styles.infoTitle}>Início</Text>
                <View style={styles.infoRowDirection}>
                    <CustomTextInput
                        viewStyle={[styles.viewInput, { opacity: loading ? 0.6 : 1 }]}
                        inputStyle={styles.input}
                        value={form.start}
                        onChangeText={(text) => handleInputChange('start', text)}
                        placeholder="Inicío do uso"
                        backgroundColor='#fcf7fa'
                        keyboardType={'number-pad'}
                        editable={false}
                    />
                    <View style={{ minWidth: '35%' }}>
                        <TouchableOpacity
                            style={[styles.viewActivateModal, { opacity: loading ? 0.6 : 1 }]}
                            onPress={() => showFormModal('Start')}
                            disabled={loading}
                        >
                            <Text style={[styles.frequencyButtonText]}>
                                {startDateText}
                            </Text>
                            <MaterialIcons name="arrow-drop-down" size={24} color="white" style={{ marginRight: '10%' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.infoTemplate}>

                <Text style={styles.infoTitle}>Duração</Text>
                <View style={styles.infoRowDirection}>
                    <CustomTextInput
                        viewStyle={[styles.viewInput, { opacity: loading ? 0.6 : 1 }]}
                        inputStyle={styles.input}
                        value={form.expiresAt}
                        onChangeText={(text) => handleInputChange('expiresAt', text)}
                        placeholder="Duração"
                        backgroundColor='#fcf7fa'
                        keyboardType={'number-pad'}
                        editable={!loading}
                        maxLength={3}
                    />
                    <View style={{ minWidth: '35%' }}>
                        <TouchableOpacity
                            style={[styles.viewActivateModal, { opacity: loading ? 0.6 : 1 }]}
                            onPress={() => showFormModal('Duration')}
                            disabled={loading}
                        >
                            <Text style={[styles.frequencyButtonText]}>
                                {durationType}
                            </Text>
                            <MaterialIcons name="arrow-drop-down" size={24} color="white" style={{ marginRight: '10%' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default MedicationSchedules;

const styles = StyleSheet.create({
    medicationSchedules: {
        backgroundColor: '#fcf5fc',
        justifyContent: 'space-between',
        paddingVertical: '6%',
        paddingHorizontal: '8%',
        borderRadius: 20,
        marginVertical: '6%',
    },
    infoTemplate: {
        marginVertical: '5%',
    },
    infoTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#631c50',
        marginBottom: '2%',
    },
    infoContainer: {
        width: '100%',
        flexDirection: 'row',
        gap: 5,
        flexWrap: 'wrap',
    },
    infoRowDirection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 7,
    },
    viewInput: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: '4%',
        borderColor: '#a541b0',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: '5%',
        flex: 1,
    },
    input: {
        fontSize: 16,
        color: '#5b1869',
    },
    scheduleItem: {
        minWidth: '20%',
        paddingVertical: '2%',
        paddingHorizontal: '3%',
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 4,
    },
    scheduleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#7e248c',
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
    addScheduleButton: {
        minWidth: '20%',
        paddingVertical: '2%',
        paddingHorizontal: '3%',
        backgroundColor: '#945989',
        borderRadius: 10,
        elevation: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    frequencyButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fcf7fa',
        flex: 1,
        textAlign: 'center',
        marginLeft: '10%'
    },
});