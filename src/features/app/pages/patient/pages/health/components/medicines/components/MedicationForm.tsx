import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveSize, screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import DefaultModal from '@components/modals/default/DefaultModal';
import DefaultLoading from '@components/loading/DefaultLoading';
import { Medication, MedicationDurationType, MedicationFormType, MedicationFrequencyType } from 'types/app/patient/health/Medicine_Types';
import { MedicationFormModal } from '../hooks/useMedicationFormBehavior';
import ScheduleModal from './modals/ScheduleModal';
import FrequencyModal from './modals/FrequencyModal';
import AlarmDurationModal from './modals/AlarmDurationModal';
import ReminderTimesModal from './modals/ReminderTimesModal';
import MedicationInfo from './components/MedicationInfo';
import MedicationSchedules from './components/MedicationSchedules';
import MedicationAlarms from './components/MedicationAlarms';
import DurationModal from './modals/DurationModal';
import { UserPatient, UserType } from 'types/user/User_Types';
import useMedicationInfoModal from '../hooks/useInfoModal';
import useMedicationFormHandling from '../hooks/useMedicationFormHandling';
import { MarkedDates, MarkingTypes } from 'react-native-calendars/src/types';
import { UseForm } from '@features/app/providers/sub/UserProvider';

interface MedicationFormProps {
    form: MedicationFormType;
    suggestions?: string[];
    activeModal: MedicationFormModal | null;
    frequencyType: MedicationFrequencyType;
    buttonText: string;
    loading: boolean;
    dosageUnits: Record<string, string>;
    currentMedication?: Medication;
    currentScheduleIndex?: number;
    durationType: MedicationDurationType;
    currentSchedule: string | undefined;
    userType: UserType;
    showCalendar: boolean;
    duration: string;
    scheduleMarkedDates?: MarkedDates;
    showFormModal: (modalType: MedicationFormModal) => void;
    handleInputChange: (field: keyof MedicationFormType, value: string) => void;
    setSuggestions: (suggestions: string[] | undefined) => void;
    handleFrequencyType: (frequency: MedicationFrequencyType) => void;
    addScheduleToForm: (schedule: string) => void;
    updateScheduleForm: (schedule: string, index: number) => void;
    deleteScheduleForm: (index: number) => void;
    updateMedication?: (form: MedicationFormType, id: string, onSuccess?: () => void) => void;
    addMedication?: (form: MedicationFormType, onSuccess?: () => void) => void;
    clearActiveModal: () => void;
    setCurrentScheduleIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
    setCurrentSchedule: React.Dispatch<React.SetStateAction<string | undefined>>;
    handleReminderTimesForm: (reminderTimes: number) => void;
    handleAlarmDurationForm: (duration: number) => void;
    handleDurationType: (duration: MedicationDurationType) => void;
    handleSuggestionSelection: (value: string) => void;
    handleShowCalendar: () => void;
    handleDurationChange: (value: string) => void;
    hasSchedulePeriodCompleted: boolean;
    scheduleMarkingType: MarkingTypes | undefined;
}

const MedicationForm: React.FC<MedicationFormProps> = (medicationForm) => {
    const { userData } = UseForm();
    const sessionIconSize = responsiveSize * 0.13;
    const { handleInfoModalPress,
        isFrequencyModalVisible, modalFrequencyInfo, clearInfoModalType,
        isStartModalVisible, modalStartInfo
    } = useMedicationInfoModal();
    const { formValidation, onSubmit } = useMedicationFormHandling({
        updateMedication: medicationForm.updateMedication,
        addMedication: medicationForm.addMedication,
        userPatient: userData as UserPatient
    });

    return (
        <>
            <View style={{ minHeight: screenHeight, flex: 1, paddingVertical: '7%', paddingHorizontal: '4%' }}>
                <View style={styles.medicationInfo}>
                    <MedicationInfo
                        form={medicationForm.form}
                        sessionIconSize={sessionIconSize}
                        suggestions={medicationForm.suggestions}
                        loading={medicationForm.loading}
                        dosageUnits={medicationForm.dosageUnits}
                        handleInputChange={medicationForm.handleInputChange}
                        setSuggestions={medicationForm.setSuggestions}
                        handleSuggestionSelection={medicationForm.handleSuggestionSelection}
                    />
                    <MedicationSchedules
                        userPatient={userData as UserPatient}
                        form={medicationForm.form}
                        loading={medicationForm.loading}
                        frequencyType={medicationForm.frequencyType}
                        durationType={medicationForm.durationType}
                        sessionIconSize={sessionIconSize}
                        userType={medicationForm.userType}
                        isFrequencyModalVisible={isFrequencyModalVisible}
                        isStartModalVisible={isStartModalVisible}
                        modalStartInfo={modalStartInfo}
                        modalFrequencyInfo={modalFrequencyInfo}
                        showCalendar={medicationForm.showCalendar}
                        duration={medicationForm.duration}
                        scheduleMarkingType={medicationForm.scheduleMarkingType}
                        setCurrentSchedule={medicationForm.setCurrentSchedule}
                        setCurrentScheduleIndex={medicationForm.setCurrentScheduleIndex}
                        handleInputChange={medicationForm.handleInputChange}
                        handleInfoModalPress={handleInfoModalPress}
                        clearInfoModalType={clearInfoModalType}
                        handleShowCalendar={medicationForm.handleShowCalendar}
                        handleDurationChange={medicationForm.handleDurationChange}
                        showFormModal={medicationForm.showFormModal}
                        scheduleMarkedDates={medicationForm.scheduleMarkedDates}
                        hasSchedulePeriodCompleted={medicationForm.hasSchedulePeriodCompleted}
                    />
                    <MedicationAlarms
                        form={medicationForm.form}
                        loading={medicationForm.loading}
                        sessionIconSize={sessionIconSize}
                        showFormModal={medicationForm.showFormModal}
                        handleAlarmDurationForm={medicationForm.handleAlarmDurationForm}
                        handleReminderTimesForm={medicationForm.handleReminderTimesForm}
                    />
                </View>
                <LinearGradient colors={['#7f3b8f', '#ad52bf']} start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} style={[styles.buttonGradientForm, { opacity: !formValidation(medicationForm.form, medicationForm.currentMedication) ? 0.6 : 1 }]}>
                    <TouchableOpacity disabled={medicationForm.loading || !formValidation(medicationForm.form, medicationForm.currentMedication)} onPress={() => onSubmit(medicationForm.form, medicationForm.currentMedication)} style={[styles.button]}>
                        {medicationForm.loading ? <DefaultLoading size={30} color={'white'} /> : <Text style={styles.buttonText}>{medicationForm.buttonText}</Text>}
                    </TouchableOpacity>
                </LinearGradient>
            </View>
            {medicationForm.activeModal && (
                <DefaultModal disableGestures={false} isVisible={!!medicationForm.activeModal} onClose={medicationForm.clearActiveModal}>
                    {medicationForm.activeModal === 'Schedules' ? (
                        <ScheduleModal
                            index={medicationForm.currentScheduleIndex}
                            onUpdate={medicationForm.updateScheduleForm}
                            onDelete={medicationForm.deleteScheduleForm}
                            schedules={medicationForm.form.schedules}
                            currentSchedule={medicationForm.currentSchedule}
                            closeModal={medicationForm.clearActiveModal} onAdd={medicationForm.addScheduleToForm}
                        />
                    ) : medicationForm.activeModal === 'Frequencies' ? (
                        <FrequencyModal
                            closeModal={medicationForm.clearActiveModal}
                            onSelect={medicationForm.handleFrequencyType}
                            frequency={medicationForm.frequencyType}
                        />
                    ) : medicationForm.activeModal === 'AlarmDuration' ? (
                        <AlarmDurationModal
                            initialValue={medicationForm.form.alarmDuration}
                            closeModal={medicationForm.clearActiveModal}
                            onSelect={medicationForm.handleAlarmDurationForm} />
                    ) : medicationForm.activeModal === 'ReminderTimes' ? (
                        <ReminderTimesModal
                            initialValue={medicationForm.form.reminderTimes}
                            closeModal={medicationForm.clearActiveModal}
                            onSelect={medicationForm.handleReminderTimesForm} />
                    )
                    : medicationForm.activeModal === 'Duration' ? (
                        <DurationModal
                            closeModal={medicationForm.clearActiveModal}
                            duration={medicationForm.durationType}
                            onSelect={medicationForm.handleDurationType}
                        />
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