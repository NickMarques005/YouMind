import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import NoMedications from './components/NoMedications';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { UseMedications } from '@features/app/providers/patient/MedicationProvider';
import { UseMedicationNavigation } from '../../hooks/UseMedicationNavigation';
import { FormatDateToSpeakDate, formatDateToString } from '@utils/date/DateFormatting';
import MedicationListToConsume from './components/MedicationListToConsume';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { UseLoading } from '@hooks/loading/UseLoading';
import useHandlingMedicationsToConsume from './hooks/useHandlingMedicationToConsume';
import DefaultLoading from '@components/loading/DefaultLoading';
import DateSelector from '@components/date/DateSelector';
import useDateSelectionBehavior from './hooks/useDateSelectionBehavior';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import { UserPatient } from 'types/user/User_Types';

const MainMedications = () => {
    const { userData } = UseForm();
    const { medications } = UseMedications();
    const { loading, setLoading } = UseLoading();
    const { navigateToMedicationScreen } = UseMedicationNavigation();

    const { selectedDate, handleSelectDate } = useDateSelectionBehavior();
    const { medicationsToConsume, areMedicationsScheduled } = useHandlingMedicationsToConsume({ medications, selectedDate, setLoading });

    const userPatient = userData as UserPatient;
    const loadingIconSize = Math.min(screenHeight, screenWidth) * 0.1;

    return (
        <SafeAreaView style={styles.Medicine_mainView}>
            <LinearGradient colors={['#4d2448', '#ab32a5']}
                start={{ x: 0.1, y: 0 }}
                end={{ x: 0.3, y: 0.28 }} style={styles.Medicine_contentView}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>Medicamentos</Text>
                </View>
                <View style={styles.scheduleInfoDiv}>
                    <LinearGradient colors={['#f5e9ef', '#ebc7d8']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }} style={styles.scheduleDateDiv}>
                        <View style={styles.scheduleCurrentDateInfoView}>
                            <View style={{ flex: 1, alignItems: 'flex-start', }}>
                                <Text style={styles.scheduleCurrentDateInfoText}>{`${FormatDateToSpeakDate(selectedDate)}, `}</Text>
                                <Text style={styles.scheduleCurrentDateInfoMiniText}>{formatDateToString(selectedDate)}</Text>
                            </View>
                            <TouchableOpacity onPress={() => navigateToMedicationScreen('schedule_medication')} style={{ height: '100%', width: 'auto', marginLeft: '5%', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ paddingHorizontal: '2%' }}>
                                    <MaterialIcons name="settings" size={30} color="white" />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <DateSelector
                            selectedDate={selectedDate}
                            handleSelectedDate={handleSelectDate}
                        />
                    </LinearGradient>
                    <View style={styles.currentSchedulesDiv}>
                        {loading ? (
                            <DefaultLoading size={loadingIconSize} color={'#8f2e9e'} />
                        ) : (
                            medications.length !== 0 ? (
                                userPatient.is_treatment_running ?
                                    areMedicationsScheduled ? (
                                        medicationsToConsume !== undefined ? (
                                            <View style={styles.SchedulesContent_View}>
                                                <MedicationListToConsume currentDateMedications={medicationsToConsume} selectedDate={selectedDate} />
                                            </View>
                                        ) : (
                                            <NoMedications.NoMedicationsToday selectedDate={selectedDate} />
                                        )
                                    ) : (
                                        <NoMedications.NoMedicationsScheduled />
                                    )
                                    :
                                    (
                                        <NoMedications.TreatmentIsNotRunningForScheduleMedications />
                                    )
                            ) : (
                                <NoMedications.NoMedicationsRegistered />
                            )
                        )}
                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView >
    )
}

export default MainMedications;

const styles = StyleSheet.create({
    Medicine_mainView: {
        flex: 1,
        width: screenWidth,
        height: screenHeight * 0.9,
        alignItems: 'center',
    },
    Medicine_contentView: {

        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 70,
        gap: 15
    },
    titleView: {
        width: '100%',
        height: 'auto',
        alignItems: 'center',
        paddingVertical: '6.5%'
    },
    dayButton: {
        height: '100%',
        flex: 1,
        marginHorizontal: '1.5%',
        borderRadius: 20,
        overflow: 'hidden'
    },
    dayTopView: {
        width: '100%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayBottomView: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50%',
    },
    selectedDay: {

    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#f1e1f2'
    },
    scheduleInfoDiv: {
        width: '100%',
        height: '95%',
        alignItems: 'center',
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        backgroundColor: '#faf5fc',
        overflow: 'hidden'
    },
    currentDateInfoDiv: {
        flex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: '5%',
    },
    scheduleCurrentDateInfoView: {
        flexDirection: 'row',
        height: '40%',
        width: '100%',
        paddingHorizontal: '8%',
        paddingVertical: '2%',
        alignItems: 'center',
        backgroundColor: '#59164e'
    },
    scheduleCurrentDateInfoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#f9ebfc',
    },
    scheduleCurrentDateInfoMiniText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'rgba(228, 185, 237, 0.6)',
    },
    health_Medicines_dateList: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
    scheduleDateDiv: {
        width: '100%',
        height: screenHeight * 0.25,
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(174, 169, 176, 0.7)',
        backgroundColor: 'white',
        justifyContent: 'space-between'
    },
    SchedulesContent_View: {
        width: '100%',
        height: '100%',

    },
    currentSchedulesDiv: {
        height: '58%',
        width: '100%',
    },
    createScheduleDiv: {
        width: screenWidth,
        height: 'auto',
        alignItems: 'flex-end',

    },
    createScheduleButton: {
        display: 'flex',
        position: 'absolute',
        bottom: 92,
        right: 15,
        zIndex: 2,
    },
    createScheduleView: {
        width: 40,
        height: 60,

    },
    createScheduleButtonLinearG: {
        width: '100%',
        height: '100%',
        borderRadius: 80,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    createScheduleBackgroundView: {
        position: 'absolute',
        width: screenWidth,
        height: screenHeight * 0.4,
        bottom: 0,
        zIndex: 1,
    },
    createScheduleBackgroundLinear: {

    },
    createScheduleImg: {
        width: 40,
        height: 40
    },
    createScheduleBackButton: {
        width: '20%',
        height: '100%',
        alignItems: 'flex-end',
    },
    addNewScheduleView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    addNewScheduleGradient: {
        height: 50,
        width: 50,
        resizeMode: 'cover',
        borderRadius: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addNewScheduleText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        overflow: 'visible'
    },
    addNewScheduleButton: {
        width: '70%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: 25,
    }
});