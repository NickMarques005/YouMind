import { Image, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react';
import { useScheduleHandling } from '../schedule/hooks/UseScheduleHandling';
import { UseLoading } from '@hooks/loading/UseLoading';
import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';
import { screenHeight } from '@utils/layout/Screen_Size';
import { ScrollView } from 'react-native';
import images from '@assets/images';
import { UseMedicationNavigation } from '../../hooks/UseMedicationNavigation';
import { useMedicationFormBehavior } from '../../hooks/useMedicationFormBehavior';
import { MedicationFormType } from 'types/app/patient/health/Medicine_Types';
import { useMedicationForm } from '../../hooks/useMedicationForm';
import MedicationForm from '../../components/MedicationForm';
import { formatDateToISO, validateAndFormatISODate } from '@utils/date/DateFormatting';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import { UserType } from 'types/user/User_Types';
import { formatExpiresAt, formatFrequency } from '@utils/health/HandlingMedication';


const initialState: MedicationFormType = {
    name: '',
    type: '',
    dosage: '',
    frequency: '1',
    expiresAt: undefined,
    schedules: [],
    start: validateAndFormatISODate(formatDateToISO(new Date())),
    alarmDuration: 120,
    reminderTimes: 1
};

const AddMedication = () => {
    const { userData } = UseForm();
    const addLoading = UseLoading();
    const fetchLoading = UseLoading();
    const { HandleResponseAppError, HandleResponseAppSuccess } = UseGlobalResponse();
    const { activeModal, clearActiveModal, showFormModal,
        suggestions, setSuggestions, frequencyType, handleFrequency, currentSchedule, currentScheduleIndex,
        setCurrentSchedule, setCurrentScheduleIndex, durationType, handleDurationType, duration, 
        handleDurationChange, showCalendar, handleShowCalendar
    } = useMedicationFormBehavior({});

    const { navigateToMedicationScreen } = UseMedicationNavigation();

    const { handleAddMedication, fetchMedications } = useScheduleHandling({
        setLoading: addLoading.setLoading,
        setFetchLoading: fetchLoading.setLoading,
        HandleResponseAppError, HandleResponseAppSuccess, setSuggestions,
        frequencyType, formatExpiresAt, durationType, duration
    });

    const { form, handleInputChange, dosageUnits, addScheduleToForm, deleteScheduleForm,
        updateScheduleForm, handleAlarmDurationForm, handleReminderTimesForm, 
        handleSuggestionSelection, scheduleMarkedDates, hasSchedulePeriodCompleted, scheduleMarkingType } = useMedicationForm({ 
            initialState, fetchMedications, formatExpiresAt, 
            duration, frequencyType, durationType, handleDurationChange });

    const backIcon = images.generic_images.back.arrow_back_patient;

    return (
        <>
            {
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : 'height'}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 30}
                    style={{ flex: 1 }} enabled>
                    <ScrollView scrollEnabled style={{ flex: 1 }}>
                        <View style={styles.scheduleContainer}>
                            <View style={{ height: screenHeight * 0.12, width: '100%', paddingHorizontal: '5%', justifyContent: 'space-between' }}>
                                <TouchableOpacity disabled={addLoading.loading || fetchLoading.loading} onPress={() => navigateToMedicationScreen('schedule_medication')} style={{ height: '100%', width: 50, padding: '2%' }}>
                                    <Image source={backIcon} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }}>
                                <MedicationForm
                                    currentSchedule={currentSchedule}
                                    form={form}
                                    activeModal={activeModal}
                                    suggestions={suggestions}
                                    frequencyType={frequencyType}
                                    userType={userData?.type as UserType}
                                    showCalendar={showCalendar}
                                    buttonText="Adicionar"
                                    loading={addLoading.loading}
                                    dosageUnits={dosageUnits}
                                    durationType={durationType}
                                    duration={duration}
                                    currentScheduleIndex={currentScheduleIndex}
                                    scheduleMarkedDates={scheduleMarkedDates}
                                    scheduleMarkingType={scheduleMarkingType}
                                    handleInputChange={handleInputChange}
                                    showFormModal={showFormModal}
                                    setSuggestions={setSuggestions}
                                    handleFrequencyType={handleFrequency}
                                    setCurrentSchedule={setCurrentSchedule}
                                    setCurrentScheduleIndex={setCurrentScheduleIndex}
                                    handleReminderTimesForm={handleReminderTimesForm}
                                    handleAlarmDurationForm={handleAlarmDurationForm}
                                    clearActiveModal={clearActiveModal}
                                    addScheduleToForm={addScheduleToForm}
                                    updateScheduleForm={updateScheduleForm}
                                    deleteScheduleForm={deleteScheduleForm}
                                    addMedication={handleAddMedication}
                                    handleDurationType={handleDurationType}
                                    handleDurationChange={handleDurationChange}
                                    handleSuggestionSelection={handleSuggestionSelection}
                                    handleShowCalendar={handleShowCalendar}
                                    hasSchedulePeriodCompleted={hasSchedulePeriodCompleted}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            }
        </>

    )
}

export default AddMedication;

const styles = StyleSheet.create({
    scrollviewKeyboard: {
        flexGrow: 1
    },
    scheduleContainer: {
        width: '100%',
        backgroundColor: '#f2e6f1'
    },
});