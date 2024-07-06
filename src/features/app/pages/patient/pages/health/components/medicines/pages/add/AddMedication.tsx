import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import CustomTextInput from '@components/text_input/CustomInput';
import { useScheduleHandling } from '../schedule/hooks/UseScheduleHandling';
import { UseLoading } from '@hooks/loading/UseLoading';
import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { ScrollView } from 'react-native';
import images from '@assets/images';
import { UseMedicationNavigation } from '../../hooks/UseMedicationNavigation';
import { useMedicationFormBehavior } from '../../hooks/useMedicationFormBehavior';
import { MedicationFormType } from 'types/app/patient/health/Medicine_Types';
import { useMedicationForm } from '../../hooks/useMedicationForm';
import MedicationForm from '../../components/MedicationForm';
import { formatDateToString } from '@utils/date/DateFormatting';

const initialState: MedicationFormType = {
    name: '',
    type: '',
    dosage: '',
    frequency: 1,
    expiresAt: '',
    schedules: [],
    start: formatDateToString(new Date()),
    alarmDuration: 120,
    reminderTimes: 1
};

const AddMedication = () => {

    const addLoading = UseLoading();
    const fetchLoading = UseLoading();
    const { HandleResponseAppError, HandleResponseAppSuccess } = UseGlobalResponse();
    const { activeModal, clearActiveModal, showFormModal,
        suggestions, setSuggestions, formatFrequency,
        formatExpiresAt, frequencyType, handleFrequency, currentSchedule, currentScheduleIndex,
        setCurrentSchedule, setCurrentScheduleIndex, startDateText, handleStartDateSelect,
        durationType, handleDuration,
    } = useMedicationFormBehavior({});

    const { navigateToMedicationScreen } = UseMedicationNavigation();

    const { handleAddMedication, fetchMedications } = useScheduleHandling({
        setLoading: addLoading.setLoading,
        setFetchLoading: fetchLoading.setLoading,
        HandleResponseAppError,
        HandleResponseAppSuccess, setSuggestions,
        formatFrequency, frequencyType, formatExpiresAt, durationType
    });
    const { form, handleInputChange, dosageUnits, addScheduleToForm, deleteScheduleForm,
        updateScheduleForm, handleAlarmDurationForm, handleReminderTimesForm, handleStartDate, handleExpiresAtForm,
        handleSuggestionSelection } = useMedicationForm({ initialState, fetchMedications });

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
                                    setCurrentSchedule={setCurrentSchedule}
                                    form={form}
                                    handleInputChange={handleInputChange}
                                    activeModal={activeModal}
                                    showFormModal={showFormModal}
                                    suggestions={suggestions}
                                    setSuggestions={setSuggestions}
                                    handleFrequencyType={handleFrequency}
                                    frequencyType={frequencyType}
                                    addMedication={handleAddMedication}
                                    buttonText="Adicionar"
                                    loading={addLoading.loading}
                                    dosageUnits={dosageUnits}
                                    onSuccess={() => navigateToMedicationScreen('schedule_medication')}
                                    clearActiveModal={clearActiveModal}
                                    addScheduleToForm={addScheduleToForm}
                                    currentScheduleIndex={currentScheduleIndex}
                                    setCurrentScheduleIndex={setCurrentScheduleIndex}
                                    updateScheduleForm={updateScheduleForm}
                                    deleteScheduleForm={deleteScheduleForm}
                                    handleReminderTimesForm={handleReminderTimesForm}
                                    handleAlarmDurationForm={handleAlarmDurationForm}
                                    handleStartDate={handleStartDate}
                                    startDateText={startDateText}
                                    handleStartDateSelect={handleStartDateSelect}
                                    durationType={durationType}
                                    handleExpiresAtForm={handleExpiresAtForm}
                                    handleDuration={handleDuration}
                                    handleSuggestionSelection={handleSuggestionSelection}
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