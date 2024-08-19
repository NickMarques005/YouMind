import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MedicationDurationType, MedicationFormType, MedicationFrequencyType } from 'types/app/patient/health/Medicine_Types';
import { MedicationFormModal } from '../../hooks/useMedicationFormBehavior';
import CustomTextInput from '@components/text_input/CustomInput';
import InfoModal from '@components/modals/info/InfoModal';
import { UserType } from 'types/user/User_Types';
import CustomCalendar from '@components/calendar/CustomCalendar';
import { FormatISOToStringDate } from '@utils/date/DateFormatting';
import { responsiveSize } from '@utils/layout/Screen_Size';
import { MarkedDates, MarkingTypes } from 'react-native-calendars/src/types';

interface MedicationSchedulesProps {
    form: MedicationFormType;
    loading: boolean;
    frequencyType: MedicationFrequencyType;
    durationType: MedicationDurationType;
    duration: string;
    sessionIconSize: number;
    userType: UserType;
    isFrequencyModalVisible: boolean;
    modalFrequencyInfo?: string;
    modalStartInfo?: string;
    showCalendar: boolean;
    isStartModalVisible: boolean;
    scheduleMarkedDates: MarkedDates | undefined;
    hasSchedulePeriodCompleted: boolean;
    scheduleMarkingType: MarkingTypes | undefined;
    handleInputChange: (field: keyof MedicationFormType, value: string) => void;
    handleDurationChange: (value: string) => void;
    handleInfoModalPress: (type: keyof MedicationFormType) => void;
    clearInfoModalType: (type: keyof MedicationFormType) => void;
    showFormModal: (modalType: MedicationFormModal) => void;
    setCurrentScheduleIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
    setCurrentSchedule: React.Dispatch<React.SetStateAction<string | undefined>>;
    handleShowCalendar: () => void;
}

const MedicationSchedules: React.FC<MedicationSchedulesProps> = ({
    form,
    loading,
    frequencyType,
    durationType,
    sessionIconSize,
    userType,
    modalFrequencyInfo,
    modalStartInfo,
    isStartModalVisible,
    isFrequencyModalVisible,
    showCalendar,
    duration,
    scheduleMarkedDates,
    hasSchedulePeriodCompleted,
    scheduleMarkingType,
    showFormModal,
    setCurrentScheduleIndex,
    setCurrentSchedule,
    handleInputChange,
    handleInfoModalPress,
    clearInfoModalType,
    handleShowCalendar,
    handleDurationChange
}) => {
    const infoModalYOffset = responsiveSize * 0.07;
    const styles = medicationSchedulesStyle(sessionIconSize);

    const hasEndOfDaySchedule = (schedules: string[]) => {
        return schedules.includes("23:59");
    }

    return (
        <View style={styles.medicationSchedules}>
            <View style={styles.sessionIconContainer}>
                <MaterialIcons name="schedule" size={sessionIconSize / 2} color="white" />
            </View>
            <View style={[styles.infoTemplate]}>
                <View style={styles.infoTitleContainer}>
                    <Text style={styles.infoTitle}>Frequência</Text>
                    <TouchableOpacity onPress={() => !isFrequencyModalVisible ? handleInfoModalPress('frequency') : clearInfoModalType('frequency')}>
                        <MaterialIcons name="help-outline" size={20} color="#631c50" />
                    </TouchableOpacity>
                </View>
                {
                    modalFrequencyInfo &&
                    <InfoModal
                        info={modalFrequencyInfo}
                        isVisible={isFrequencyModalVisible}
                        userType={userType}
                        positionStyle={{ top: infoModalYOffset, position: 'absolute', zIndex: 5 }}
                    />
                }
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
            <View style={styles.infoTemplate}>
                <View style={styles.infoTitleContainer}>
                    <Text style={styles.infoTitle}>Horários</Text>
                </View>

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
                <View style={styles.infoTitleContainer}>
                    <View style={styles.infoTitleContainer}>
                        <Text style={styles.infoTitle}>Início</Text>
                        <TouchableOpacity onPress={() => !isFrequencyModalVisible ? handleInfoModalPress('start') : () => clearInfoModalType('start')}>
                            <MaterialIcons name="help-outline" size={20} color="#631c50" />
                        </TouchableOpacity>
                    </View>
                    {
                        modalStartInfo &&
                        <InfoModal
                            info={modalStartInfo}
                            isVisible={isStartModalVisible}
                            userType={userType}
                            positionStyle={{ top: infoModalYOffset, position: 'absolute', zIndex: 5 }}
                        />
                    }
                </View>

                <View style={styles.infoRowDirection}>
                    <View
                        style={[styles.viewInput, { opacity: loading ? 0.6 : 0.8 }]}
                    >
                        <Text style={styles.input}>
                            {FormatISOToStringDate(form.start)}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.infoTemplate}>
                <View style={styles.infoTitleContainer}>
                    <Text style={styles.infoTitle}>Duração</Text>
                </View>

                <View style={styles.infoRowDirection}>
                    <CustomTextInput
                        viewStyle={[styles.viewInput, { opacity: loading ? 0.6 : 1 }]}
                        inputStyle={styles.input}
                        value={duration}
                        onChangeText={(text) => handleDurationChange(text)}
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

            <View style={styles.infoTemplate}>
                <TouchableOpacity
                    style={[styles.viewActivateModal, { opacity: loading ? 0.6 : 1 }]}
                    onPress={() => handleShowCalendar()}
                    disabled={loading}
                >
                    <View>
                        <MaterialIcons name="event" size={24} color="white" />
                        {
                            hasSchedulePeriodCompleted &&
                            <View style={styles.calendarButtonUpdateIcon} />
                        }
                        
                    </View>
                </TouchableOpacity>
            </View>
            {
                showCalendar &&
                <View style={styles.infoTemplate}>
                    <CustomCalendar
                        onDateSelect={(date) => {
                            handleInputChange('start', date);
                        }}
                        theme={{
                            backgroundColor: '#ffffff',
                            calendarBackground: '#ffffff',
                            textSectionTitleColor: '#c8b6cd',
                            selectedDayBackgroundColor: '#6b0e96',
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: '#bd70db',
                            dayTextColor: '#482d50',
                            textDisabledColor: '#d0c3d6',
                            arrowColor: '#3c1d57',
                            monthTextColor: '#a92cbf',
                            indicatorColor: '#a92cbf',
                        }}
                        markedDates={scheduleMarkedDates}
                        markingType={scheduleMarkingType}
                    />
                </View>
            }
        </View>
    );
};

export default MedicationSchedules;

const medicationSchedulesStyle = (sessionIconSize: number) => {
    return StyleSheet.create({
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
        infoTitleContainer: {
            width: '100%',
            flexDirection: 'row',
            gap: 5,
            marginBottom: '2%'
        },
        infoTitle: {
            fontSize: 15,
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
        calendarButtonUpdateIcon: {
            width: sessionIconSize * 0.4,
            height: sessionIconSize * 0.4,
            borderRadius: sessionIconSize * 0.4,
            position: 'absolute',
            right: - sessionIconSize * 0.25,
            top: - sessionIconSize * 0.18,
            backgroundColor: '#daa7fa',
            borderWidth: 3,
            borderColor: '#945989'
        }
    });
} 