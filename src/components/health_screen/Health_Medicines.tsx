import React, { useState, useEffect, useRef } from 'react';
import {
    View, Linking, ActivityIndicator, ScrollView, Animated,
    ToastAndroid, Image, FlatList, Dimensions, ImageBackground, TextInput, TouchableOpacity, Text, StyleSheet, SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCurrentDate } from '../../providers/CurrentDateProvider';
import { DateTime, Settings } from 'luxon';
import CurrentDateCard from './medicines/CurrentDateCard';
import { UseMedicines } from '../../providers/MedicineProvider';
import MedicineList from './medicines/MedicineList';
import { Easing } from 'react-native-reanimated';
import { ShowMedicineOnDate, FilterMedicineForCurrentDate } from '../../features/app/patient/health/utils/MedicineDates';
import { FormatDate, FormatRelativeDate } from '../../functions/medicines/FormatDate';
import NoMedicines from './medicines/NoMedicines';

Settings.defaultLocale = 'pt';

//retorna as dimensões do dispositivo 
import { screenHeight, screenWidth } from '../../utils/layout/Screen_Size';


interface Medicine {
    id: number;
    type: string;
    name: string;
    start_period: string;
    final_period: string;
    last_period: string;
    frequency: string;
    quantity: number;
    value: number | null;
    checked: boolean;
}

function Health_Medicines() {

    //Use State Medicines:
    const { medicines } = UseMedicines();
    const [medicinesDisplayed, setMedicinesDisplayed] = useState<Medicine[]>([]);

    //Use State Dates:
    const { weekDates } = useCurrentDate();
    const [selectedDate, setSelectedDate] = useState<DateTime>(DateTime.local());

    //Use State Animations:
    const [isScheduleButtonOpen, setScheduleButtonOpen] = useState(false);
    const [backgroundGradientDisplay, setBackgroundGradientDisplay] = useState(false);
    const [buttonOpacity] = useState(new Animated.Value(0.95));
    const [buttonWidth] = useState(new Animated.Value(60));
    const [buttonTranslateX] = useState(new Animated.Value(0));
    const [buttonScale] = useState(new Animated.Value(1));
    const [backgroundTranslateY] = useState(new Animated.Value(0));
    const [backgroundOpacity] = useState(new Animated.Value(0));

    //**************//
    //  FUNCTIONS   //
    //**************//

    const addNewSchedule = () => {
        console.log("ADD NEW SCHEDULE!");
    }

    const handleDateSelection = (date: DateTime) => {
        console.log("HANDLE DATE SELECTION! ", date);
        setSelectedDate(date);

    }

    const handleAddScheduleScale = () => {
        console.log("Handle Button Scale");

        setScheduleButtonOpen(!isScheduleButtonOpen);

        Animated.parallel([
            Animated.timing(buttonOpacity, {
                toValue: !isScheduleButtonOpen ? 1 : 0.95,
                duration: 500,
                useNativeDriver: false,
                easing: Easing.inOut(Easing.ease)
            }),
            Animated.timing(buttonWidth, {
                toValue: !isScheduleButtonOpen ? screenWidth * 0.8 : 60,
                duration: 500,
                useNativeDriver: false,
                easing: Easing.inOut(Easing.ease),
            }),
            Animated.timing(buttonScale, {
                toValue: !isScheduleButtonOpen ? 1.1 : 1,
                duration: 700,
                useNativeDriver: false,
                easing: Easing.inOut(Easing.ease),
            }),
            Animated.timing(buttonTranslateX, {
                toValue: !isScheduleButtonOpen ? -22 : 0,
                duration: 600,
                useNativeDriver: false,
            }),
            Animated.timing(backgroundTranslateY, {
                toValue: !isScheduleButtonOpen ? -20 : 0,
                duration: 900,
                useNativeDriver: false,
                easing: Easing.inOut(Easing.ease),
            }),
            Animated.timing(backgroundOpacity, {
                toValue: !isScheduleButtonOpen ? 1 : 0,
                duration: 900,
                useNativeDriver: false,
            }),
        ]).start();

        if (isScheduleButtonOpen) {
            setTimeout(() => {
                setBackgroundGradientDisplay(false)
            }, 900);
        }
        else {
            setBackgroundGradientDisplay(true);
        }

    }

    //****************//
    //   USE EFFECT   //
    //****************//

    useEffect(() => {
        if (selectedDate) {
            const filterMedicines = FilterMedicineForCurrentDate(medicines, selectedDate.toISODate());
            console.log(filterMedicines);
            setMedicinesDisplayed(filterMedicines);
        }

    }, [medicines, selectedDate]);



    return (
        <SafeAreaView style={styleHealthMedicines.Medicine_mainView}>
            <LinearGradient colors={['#4d2448', '#ab32a5']}
                start={{ x: 0.1, y: 0 }}
                end={{ x: 0.3, y: 0.28 }} style={styleHealthMedicines.Medicine_contentView}>
                <View style={styleHealthMedicines.titleView}>
                    <Text style={styleHealthMedicines.titleText}>Seus Medicamentos</Text>
                </View>

                <View style={styleHealthMedicines.scheduleInfoDiv}>
                    <View style={styleHealthMedicines.scheduleDateDiv}>
                        <View style={styleHealthMedicines.scheduleCurrentDateInfoView}>
                            <Text style={styleHealthMedicines.scheduleCurrentDateInfoText}>{`${FormatRelativeDate(selectedDate)}, `} </Text>
                            <Text style={styleHealthMedicines.scheduleCurrentDateInfoMiniText}>{selectedDate ? FormatDate(selectedDate) : ""}</Text>
                        </View>

                        <View style={styleHealthMedicines.currentDateInfoDiv}>
                            {
                                weekDates ?
                                    <FlatList
                                        data={weekDates}
                                        horizontal={true}
                                        keyExtractor={(item, index) => index.toString()}
                                        contentContainerStyle={styleHealthMedicines.health_Medicines_dateList}
                                        renderItem={({ item, index }) => (
                                            <CurrentDateCard date={item} handleCurrentDay={handleDateSelection} key={index} />
                                        )}
                                    />
                                    : ""

                            }
                        </View>
                    </View>
                    <View style={styleHealthMedicines.currentSchedulesDiv}>
                        {medicines.length > 0 ?
                            medicinesDisplayed.length > 0 ?
                                <View style={styleHealthMedicines.SchedulesContent_View}>
                                    {
                                        <MedicineList medicines={medicinesDisplayed} />
                                    }
                                </View>
                                :
                                <NoMedicines.NoMedicinesToday />
                            :
                            <NoMedicines.NoMedicinesRegistered />
                        }
                    </View>
                </View>

                <View style={styleHealthMedicines.createScheduleButton}>
                    <Animated.View
                        style={[styleHealthMedicines.createScheduleView, {
                            transform: [{ scale: buttonScale }, { translateX: buttonTranslateX },],
                            opacity: buttonOpacity,
                            width: buttonWidth,
                        }]}
                    >
                        <LinearGradient colors={['transparent', '#c558db', 'rgba(178, 114, 194, 0.9)']}
                            start={{ x: 0, y: 0.1 }}
                            end={{ x: 0.8, y: 1 }}
                            style={styleHealthMedicines.createScheduleButtonLinearG}>
                            {
                                isScheduleButtonOpen ?
                                    <View style={styleHealthMedicines.addNewScheduleView}>
                                        <TouchableOpacity onPress={() => addNewSchedule()} style={styleHealthMedicines.addNewScheduleButton}>
                                            <Text style={styleHealthMedicines.addNewScheduleText}>CRIAR NOVA ROTINA</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => { handleAddScheduleScale() }} style={styleHealthMedicines.createScheduleBackButton}>
                                            <Image style={styleHealthMedicines.createScheduleImg} source={require('../../assets/health/medicines/backIcon_addScheduleButton.png')} />
                                        </TouchableOpacity>
                                    </View>

                                    :
                                    <TouchableOpacity onPress={() => { handleAddScheduleScale() }}>
                                        <Image style={styleHealthMedicines.createScheduleImg} source={require('../../assets/health/medicines/plusIcon_button.png')} />
                                    </TouchableOpacity>
                            }
                        </LinearGradient>
                    </Animated.View>
                </View>
                <Animated.View
                    style={[
                        styleHealthMedicines.createScheduleBackgroundView,
                        {
                            transform: [{ translateY: backgroundTranslateY }],
                            opacity: backgroundOpacity,
                            display: `${backgroundGradientDisplay ? "flex" : "none"}`
                        },]}
                >
                    <LinearGradient colors={['transparent', 'rgba(159, 68, 179, 0.9)', 'rgba(152, 55, 176, 1)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={styleHealthMedicines.createScheduleBackgroundView}>

                    </LinearGradient>
                </Animated.View>

            </LinearGradient>

        </SafeAreaView >
    )
}

const styleHealthMedicines = StyleSheet.create({
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
        paddingTop: 80,
        gap: 15
    },
    titleView: {
        width: '90%',
        height: 'auto',
        alignItems: 'center',
        paddingVertical: 30
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

    },
    currentDateInfoDiv: {
        height: '70%',
        width: '90%',
        borderRadius: 20,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
    },
    scheduleCurrentDateInfoView: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 10,
        width: '100%',
        paddingHorizontal: 30,
        alignItems: 'flex-end'
    },
    scheduleCurrentDateInfoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#422b47',
    },
    scheduleCurrentDateInfoMiniText: {
        fontSize: 18,
        fontWeight: '500',
        color: 'rgba(135, 124, 138, 0.8)',
    },
    health_Medicines_dateList: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
    scheduleDateDiv: {
        position: 'relative',
        width: '100%',
        height: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(174, 169, 176, 0.7)',
        paddingVertical: 20,
        gap: 6,
    },
    SchedulesContent_View: {
        width: '100%',
        height: '100%',
    },
    currentSchedulesDiv: {
        height: '58%',
        width: '100%',
        paddingHorizontal: 20,
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
})

export default Health_Medicines