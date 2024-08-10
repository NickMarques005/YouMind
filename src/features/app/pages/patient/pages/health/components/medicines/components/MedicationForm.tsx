import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import DefaultModal from '@components/modals/default/DefaultModal';
import DefaultLoading from '@components/loading/DefaultLoading';
import { Medication, MedicationDuration, MedicationFormType, MedicationFrequency } from 'types/app/patient/health/Medicine_Types';
import { calculateDaysBetweenDates } from '@utils/date/DateConversions';
import { FormatISOToStringDate } from '@utils/date/DateFormatting';
import { MedicationFormModal } from '../hooks/useMedicationFormBehavior';
import ScheduleModal from './modals/ScheduleModal';
import FrequencyModal from './modals/FrequencyModal';
import StartMedicationModal from './modals/StartMedicationModal';
import AlarmDurationModal from './modals/AlarmDurationModal';
import ReminderTimesModal from './modals/ReminderTimesModal';
import MedicationInfo from './components/MedicationInfo';
import MedicationSchedules from './components/MedicationSchedules';
import MedicationAlarms from './components/MedicationAlarms';
import DurationModal from './modals/DurationModal';

interface MedicationFormProps {
    form: MedicationFormType;
    activeModal: MedicationFormModal | null;
    showFormModal: (modalType: MedicationFormModal) => void;
    handleInputChange: (field: keyof MedicationFormType, value: string) => void;
    suggestions?: string[];
    setSuggestions: (suggestions: string[] | undefined) => void;
    handleFrequencyType: (frequency: MedicationFrequency) => void;
    frequencyType: MedicationFrequency;
    addScheduleToForm: (schedule: string) => void;
    updateScheduleForm: (schedule: string, index: number) => void;
    deleteScheduleForm: (index: number) => void;
    updateMedication?: (form: MedicationFormType, id: string, onSuccess?: () => void) => void;
    addMedication?: (form: MedicationFormType, onSuccess?: () => void) => void;
    buttonText: string;
    loading: boolean;
    dosageUnits: Record<string, string>;
    onSuccess?: () => void;
    currentMedication?: Medication;
    clearActiveModal: () => void;
    currentScheduleIndex?: number;
    setCurrentScheduleIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
    currentSchedule: string | undefined;
    setCurrentSchedule: React.Dispatch<React.SetStateAction<string | undefined>>;
    handleReminderTimesForm: (reminderTimes: number) => void;
    handleAlarmDurationForm: (duration: number) => void;
    handleStartDate: (start: string) => void;
    handleStartDateSelect: (date: string) => void;
    startDateText: string;
    handleExpiresAtForm: (duration: string) => void;
    durationType: MedicationDuration;
    handleDuration: (duration: MedicationDuration) => void;
    handleSuggestionSelection: (value: string) => void;
}

const MedicationForm: React.FC<MedicationFormProps> = ({
    form,
    handleInputChange,
    activeModal,
    showFormModal,
    suggestions,
    setSuggestions,
    handleFrequencyType,
    frequencyType,
    addScheduleToForm,
    updateScheduleForm,
    deleteScheduleForm,
    currentScheduleIndex,
    setCurrentScheduleIndex,
    updateMedication,
    addMedication,
    buttonText,
    loading,
    dosageUnits,
    onSuccess,
    currentMedication,
    clearActiveModal,
    currentSchedule,
    setCurrentSchedule,
    handleAlarmDurationForm,
    handleReminderTimesForm,
    handleStartDate,
    startDateText,
    handleStartDateSelect,
    handleExpiresAtForm,
    durationType,
    handleDuration,
    handleSuggestionSelection
}) => {



    const formValidation = (form: MedicationFormType, currentMedication?: Medication) => {
        let result: boolean;

        const isFormValid =
            form.name &&
                form.type &&
                form.dosage &&
                form.frequency &&
                form.start &&
                form.alarmDuration &&
                form.reminderTimes &&
                form.schedules.length !== 0 &&
                form.expiresAt
                ? true
                : false;

        if (currentMedication) {
            const formIsDifferentFromCurrentMedication = form.name !== currentMedication.name ||
                form.type !== currentMedication.type ||
                form.dosage !== currentMedication.dosage ||
                form.expiresAt !== String(calculateDaysBetweenDates(currentMedication.start, currentMedication.expiresAt)) ||
                form.frequency !== currentMedication.frequency ||
                JSON.stringify(form.schedules) !== JSON.stringify(currentMedication.schedules) ||
                form.start !== FormatISOToStringDate(currentMedication.start)  ||
                form.alarmDuration !== currentMedication.alarmDuration ||
                form.reminderTimes !== currentMedication.reminderTimes;

            result = formIsDifferentFromCurrentMedication && isFormValid;
        } else {
            result = isFormValid;
        }

        return result;
    }

    const onSubmit = () => {
        console.log("SUBMIT: ", form);
        currentMedication ?
            updateMedication ?
                updateMedication(form, currentMedication._id, onSuccess)
                : console.log("Houve algum erro ")
            : addMedication && addMedication(form, onSuccess)
    }

    return (
        <>
            <View style={{ minHeight: screenHeight, flex: 1, paddingVertical: '7%', paddingHorizontal: '4%' }}>
                <View style={styles.medicationInfo}>
                    <MedicationInfo
                        form={form}
                        handleInputChange={handleInputChange}
                        suggestions={suggestions}
                        setSuggestions={setSuggestions}
                        loading={loading}
                        dosageUnits={dosageUnits}
                        handleSuggestionSelection={handleSuggestionSelection}
                    />
                    <MedicationSchedules
                        form={form}
                        showFormModal={showFormModal}
                        loading={loading}
                        setCurrentSchedule={setCurrentSchedule}
                        setCurrentScheduleIndex={setCurrentScheduleIndex}
                        handleInputChange={handleInputChange}
                        frequencyType={frequencyType}
                        startDateText={startDateText}
                        durationType={durationType}
                    />
                    <MedicationAlarms
                        form={form}
                        showFormModal={showFormModal}
                        loading={loading}
                        handleAlarmDurationForm={handleAlarmDurationForm}
                        handleReminderTimesForm={handleReminderTimesForm}
                    />
                </View>
                <LinearGradient colors={['#7f3b8f', '#ad52bf']} start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} style={[styles.buttonGradientForm, { opacity: !formValidation(form, currentMedication) ? 0.6 : 1 }]}>
                    <TouchableOpacity disabled={loading || !formValidation(form, currentMedication)} onPress={onSubmit} style={[styles.button]}>
                        {loading ? <DefaultLoading size={30} color={'white'} /> : <Text style={styles.buttonText}>{buttonText}</Text>}
                    </TouchableOpacity>
                </LinearGradient>
            </View>
            {activeModal && (
                <DefaultModal disableGestures={false} isVisible={!!activeModal} onClose={clearActiveModal}>
                    {activeModal === 'Schedules' ? (
                        <ScheduleModal index={currentScheduleIndex} onUpdate={updateScheduleForm} onDelete={deleteScheduleForm} schedules={form.schedules} currentSchedule={currentSchedule} closeModal={clearActiveModal} onAdd={addScheduleToForm} />
                    ) : activeModal === 'Frequencies' ? (
                        <FrequencyModal closeModal={clearActiveModal} onSelect={handleFrequencyType} frequency={frequencyType} />
                    ) : activeModal === 'AlarmDuration' ? (
                        <AlarmDurationModal initialValue={form.alarmDuration} closeModal={clearActiveModal} onSelect={handleAlarmDurationForm} />
                    ) : activeModal === 'ReminderTimes' ? (
                        <ReminderTimesModal initialValue={form.reminderTimes} closeModal={clearActiveModal} onSelect={handleReminderTimesForm} />
                    ) : activeModal === 'Start' ? (
                        <StartMedicationModal closeModal={clearActiveModal} initialValue={form.start} onSelect={handleStartDate} updateStartDateText={handleStartDateSelect} />
                    ) : activeModal === 'Duration' ? (
                        <DurationModal closeModal={clearActiveModal} duration={durationType} onSelect={handleDuration} />
                    ) :
                        null
                    }
                </DefaultModal>
            )}
        </>
    );
};

export default MedicationForm;

const styles = StyleSheet.create({
    medicationInfo: {
        width: '100%',
        flex: 1,
    },
    medicationCharacteristics: {
        backgroundColor: '#fcf5fc',
        paddingVertical: '6%',
        justifyContent: 'space-between',
        paddingHorizontal: '8%',
        borderRadius: 20,
        flex: 1,
        marginBottom: '5%',
    },
    medicationSchedules: {
        backgroundColor: '#fcf5fc',
        justifyContent: 'space-between',
        paddingVertical: '6%',
        paddingHorizontal: '8%',
        borderRadius: 20,
        marginBottom: '5%',
    },
    medicationAlarms: {
        backgroundColor: '#fcf5fc',
        justifyContent: 'space-between',
        paddingVertical: '6%',
        paddingHorizontal: '8%',
        borderRadius: 20,
        marginBottom: '5%',
    },
    infoTemplate: {
        marginBottom: '5%',
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
    infoTypeTemplate: {
        flex: 1,
        marginBottom: '5%',
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
    infoTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#631c50',
        marginBottom: '2%',
    },
    typesContainer: {
        flexDirection: 'row',
        height: screenHeight * 0.2,
        gap: 5,
    },
    typeButton: {
        flex: 1,
        padding: '4%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#631c50',
        backgroundColor: '#f0e9ed',
    },
    selectedTypeButton: {
        backgroundColor: '#692d66',
        borderColor: '#e49af5',
        width: '100%',
    },
    typeButtonText: {
        marginTop: '3%',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    typeIcon: {
        flex: 1,
        padding: '14%',
    },
    dosageContainer: {
        width: '100%',
        flexDirection: 'row',
    },
    dosageUnit: {
        width: '35%',
        borderColor: '#a541b0',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: '2%',
        marginLeft: '2%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fcf7fa',
    },
    dosageUnitText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#a541b0',
    },
    infoContainer: {
        width: '100%',
        flexDirection: 'row',
        gap: 5,
        flexWrap: 'wrap',
    },
    schedulesContainer: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
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
    frequencyButton: {
        width: '35%',
        padding: '5%',
        borderColor: '#a541b0',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: '5%',
        marginLeft: '2%',
        backgroundColor: '#945989',
        alignItems: 'center',
        justifyContent: 'center',
    },
    frequencyButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fcf7fa',
        flex: 1,
        textAlign: 'center',
        marginLeft: '10%'
    },
    buttonGradientForm: {
        width: '100%',
        marginTop: '5%',
        height: screenHeight * 0.1,
        borderRadius: screenWidth * 0.03,
    },
    button: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    suggestionsContainer: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        bottom: '-250%',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        height: '250%',
        backgroundColor: 'white',
        elevation: 10,
        zIndex: 2,
        overflow: 'hidden',
    },
    suggestionItem: {
        paddingVertical: '3%',
        borderBottomWidth: 1,
        borderColor: '#8f798c',
        paddingHorizontal: '2%',
    },
    suggestionsGradient: {
        width: '100%',
        height: '25%',
        paddingHorizontal: '5%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
});