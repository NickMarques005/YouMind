import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useMedicationForm } from '../../hooks/useMedicationForm'
import { useMedicationFormBehavior } from '../../hooks/useMedicationFormBehavior';
import { useScheduleHandling } from '../schedule/hooks/UseScheduleHandling';
import { UseLoading } from '@hooks/loading/UseLoading';
import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';
import { Medication, MedicationFormType } from 'types/app/patient/health/Medicine_Types';
import MedicationForm from '../../components/MedicationForm';
import { UseMedicationNavigation } from '../../hooks/UseMedicationNavigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MedicationStackNavigation } from 'types/navigation/Navigation_Types';
import { UseCurrentMedication } from './hooks/useCurrentMedication';
import images from '@assets/images';
import { screenHeight } from '@utils/layout/Screen_Size';
import LinearGradient from 'react-native-linear-gradient';
import { formatDateToISO, validateAndFormatISODate } from '@utils/date/DateFormatting';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import { UserType } from 'types/user/User_Types';
import { formatExpiresAt } from '@utils/health/HandlingMedication';

interface UpdateMedicationParams {
    currentMedication: Medication;
}

const UpdateMedication = () => {
    const { navigateToMedicationScreen } = UseMedicationNavigation();
    const route = useRoute<RouteProp<MedicationStackNavigation, 'update_medication'> & { params?: UpdateMedicationParams }>();
    const currentMedicationParams = route.params?.params;
    if (!currentMedicationParams) {
        console.log("No current Medication.. ", currentMedicationParams);
        navigateToMedicationScreen('schedule_medication');
        return;
    }
    const { userData } = UseForm();
    const { currentMedication } = UseCurrentMedication({ params: currentMedicationParams });
    const updateLoading = UseLoading();
    const fetchLoading = UseLoading();
    const { HandleResponseAppError, HandleResponseAppSuccess } = UseGlobalResponse();
    const { activeModal, clearActiveModal, showFormModal,
        suggestions, setSuggestions, frequencyType, handleFrequency, currentSchedule, currentScheduleIndex,
        setCurrentSchedule, setCurrentScheduleIndex, durationType, handleDurationType, duration, handleDurationChange, showCalendar, handleShowCalendar } = useMedicationFormBehavior({ currentMedication });

    const { fetchMedications, handleUpdateMedication } = useScheduleHandling({
        setLoading: updateLoading.setLoading,
        setFetchLoading: fetchLoading.setLoading,
        HandleResponseAppError,
        HandleResponseAppSuccess,
        formatExpiresAt,
        frequencyType,
        durationType,
        duration
    });

    const initialState: MedicationFormType = {
        name: currentMedication ? currentMedication.name : '',
        dosage: currentMedication ? currentMedication.dosage : '',
        expiresAt: undefined,
        frequency: currentMedication ? currentMedication.frequency.toString() : '1',
        type: currentMedication ? currentMedication.type : '',
        schedules: currentMedication ? currentMedication.schedules : [],
        start: currentMedication ? (currentMedication.start.split('T')[0]) : validateAndFormatISODate(formatDateToISO(new Date())) ,
        alarmDuration: currentMedication ? currentMedication.alarmDuration : 120,
        reminderTimes: currentMedication ? currentMedication.reminderTimes : 1
    };

    const { form, handleInputChange, dosageUnits, setForm, 
        addScheduleToForm, deleteScheduleForm, updateScheduleForm, 
        handleAlarmDurationForm, handleReminderTimesForm, 
        handleSuggestionSelection, hasSchedulePeriodCompleted, scheduleMarkedDates,
        scheduleMarkingType } = useMedicationForm({ 
            initialState, fetchMedications, frequencyType, 
            duration, durationType, formatExpiresAt, handleDurationChange });
    const backIcon = images.generic_images.back.arrow_back_white;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : 'height'}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 30}
            style={{ flex: 1 }} enabled>
            <ScrollView scrollEnabled style={{ minHeight: '100%', }}>
                <LinearGradient colors={['#782e73', '#5e2e5e']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }} style={styles.header}>
                    <View style={{ height: screenHeight * 0.12, width: '100%', paddingHorizontal: '5%', justifyContent: 'space-between' }}>
                        <TouchableOpacity disabled={updateLoading.loading || fetchLoading.loading} onPress={() => navigateToMedicationScreen('schedule_medication')} style={{ height: '100%', width: 50, padding: '2%' }}>
                            <Image source={backIcon} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', flex: 1, paddingHorizontal: '5%', alignItems: 'center' }}>
                        <Text style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>Editar Medicação</Text>
                    </View>
                </LinearGradient>
                <View style={styles.form}>
                    <MedicationForm
                        form={form}
                        activeModal={activeModal}
                        suggestions={suggestions}
                        frequencyType={frequencyType}
                        durationType={durationType}
                        duration={duration}
                        currentMedication={currentMedication}
                        currentSchedule={currentSchedule}
                        userType={userData?.type as UserType}
                        showCalendar={showCalendar}
                        buttonText="Atualizar"
                        loading={updateLoading.loading}
                        dosageUnits={dosageUnits}
                        currentScheduleIndex={currentScheduleIndex}
                        hasSchedulePeriodCompleted={hasSchedulePeriodCompleted}
                        scheduleMarkedDates={scheduleMarkedDates}
                        scheduleMarkingType={scheduleMarkingType}
                        setSuggestions={setSuggestions}
                        handleFrequencyType={handleFrequency}
                        updateMedication={handleUpdateMedication}
                        clearActiveModal={clearActiveModal}
                        addScheduleToForm={addScheduleToForm}
                        handleInputChange={handleInputChange}
                        setCurrentScheduleIndex={setCurrentScheduleIndex}
                        updateScheduleForm={updateScheduleForm}
                        deleteScheduleForm={deleteScheduleForm}
                        handleReminderTimesForm={handleReminderTimesForm}
                        handleAlarmDurationForm={handleAlarmDurationForm}
                        handleDurationType={handleDurationType}
                        handleDurationChange={handleDurationChange}
                        setCurrentSchedule={setCurrentSchedule}
                        handleSuggestionSelection={handleSuggestionSelection}
                        handleShowCalendar={handleShowCalendar}
                        showFormModal={showFormModal}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default UpdateMedication

const styles = StyleSheet.create({
    updateMedicationContainer: {
        flex: 1,
    },
    header: {
        width: '100%',
        height: screenHeight * 0.22,
    },
    form: {
        width: '100%',
        backgroundColor: '#f2e6f1',
    },
});