import { Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
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
import { FormatISOToStringDate, formatDateToString, formatMedicationDateString } from '@utils/date/DateFormatting';
import { calculateDaysBetweenDates } from '@utils/date/DateConversions';

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
    const { currentMedication } = UseCurrentMedication({ params: currentMedicationParams });
    const updateLoading = UseLoading();
    const fetchLoading = UseLoading();
    const { HandleResponseAppError, HandleResponseAppSuccess } = UseGlobalResponse();
    const { activeModal, clearActiveModal, showFormModal,
        suggestions, setSuggestions, formatFrequency,
        formatExpiresAt, frequencyType, handleFrequency, currentSchedule, currentScheduleIndex,
        setCurrentSchedule, setCurrentScheduleIndex, startDateText, handleStartDateSelect,
        durationType, handleDuration, } = useMedicationFormBehavior({ currentMedication });

    const { fetchMedications, handleUpdateMedication } = useScheduleHandling({
        setLoading: updateLoading.setLoading,
        setFetchLoading: fetchLoading.setLoading,
        HandleResponseAppError,
        HandleResponseAppSuccess,
        formatExpiresAt,
        formatFrequency,
        frequencyType,
        durationType
    });

    const initialState: MedicationFormType = {
        name: currentMedication ? currentMedication.name : '',
        dosage: currentMedication ? currentMedication.dosage : '',
        expiresAt: currentMedication ? calculateDaysBetweenDates(currentMedication.start, currentMedication.expiresAt).toString() : '',
        frequency: currentMedication ? currentMedication.frequency : 0,
        type: currentMedication ? currentMedication.type : '',
        schedules: currentMedication ? currentMedication.schedules : [],
        start: currentMedication ? FormatISOToStringDate(currentMedication.start) : formatDateToString(new Date()),
        alarmDuration: currentMedication ? currentMedication.alarmDuration : 120,
        reminderTimes: currentMedication ? currentMedication.reminderTimes : 1
    };

    const { form, handleInputChange, dosageUnits, setForm, addScheduleToForm, deleteScheduleForm, updateScheduleForm, handleAlarmDurationForm, handleReminderTimesForm, handleStartDate, handleExpiresAtForm, handleSuggestionSelection } = useMedicationForm({ initialState, fetchMedications });
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
                        handleInputChange={handleInputChange}
                        activeModal={activeModal}
                        showFormModal={showFormModal}
                        suggestions={suggestions}
                        setSuggestions={setSuggestions}
                        handleFrequencyType={handleFrequency}
                        frequencyType={frequencyType}
                        updateMedication={handleUpdateMedication}
                        buttonText="Atualizar"
                        loading={updateLoading.loading}
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
                        currentMedication={currentMedication}
                        currentSchedule={currentSchedule}
                        setCurrentSchedule={setCurrentSchedule}
                        handleSuggestionSelection={handleSuggestionSelection}
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