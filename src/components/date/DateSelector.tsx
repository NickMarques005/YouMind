import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FormatDateToSpeakDate, formatDateToJustADay, getDayweekInitial } from '@utils/date/DateFormatting';
import { MaterialIcons } from '@expo/vector-icons';
import { getSevenDaysFrom, isPastDate } from '@utils/date/DateRendering';
import { responsiveSize } from '@utils/layout/Screen_Size';

interface DateSelectorProps {
    selectedDate: Date;
    handleSelectedDate: (date: Date) => void;
    buttonSelectColor?: string;
}

const DateSelector: React.FC<DateSelectorProps> = ({ selectedDate, handleSelectedDate, buttonSelectColor }) => {
    const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
    const [dates, setDates] = useState<Date[]>([]);
    const styles = dateSelectorStyles(responsiveSize, buttonSelectColor);

    useEffect(() => {
        const newDates = getSevenDaysFrom(currentWeekOffset);
        setDates(newDates);
    }, [currentWeekOffset]);

    const handlePreviousWeek = () => {
        setCurrentWeekOffset(currentWeekOffset - 1);
    };

    const handleNextWeek = () => {
        setCurrentWeekOffset(currentWeekOffset + 1);
    };

    console.log(selectedDate);

    return (
        <View style={styles.currentDateInfoDiv}>

            <TouchableOpacity onPress={handlePreviousWeek} style={styles.arrowButton}>
                <MaterialIcons name="chevron-left" size={24} color="white" />
            </TouchableOpacity>
            {
                dates.map((day, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.dayButton, isPastDate(day) && { opacity: 0.5}]}
                        onPress={() => {
                            console.log(day)
                            handleSelectedDate(day)}}
                    >
                        <View style={[styles.dayTopView, { backgroundColor: selectedDate.toISOString() == day.toISOString() ? '#9c2c87' : 'transparent' }]}>
                            <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>{getDayweekInitial(day)}</Text>
                        </View>
                        <View style={[styles.dayBottomView, { backgroundColor: selectedDate.toISOString() == day.toISOString() ? 'white' : 'transparent' }]}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#66364d' }}>{formatDateToJustADay(day)}</Text>
                        </View>
                    </TouchableOpacity>
                ))
            }
            <TouchableOpacity onPress={handleNextWeek} style={styles.arrowButton}>
                <MaterialIcons name="chevron-right" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

export default DateSelector;

const dateSelectorStyles = (responsiveSize: number, buttonSelectColor?: string) => {
    return StyleSheet.create({
        currentDateInfoDiv: {
            flex: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            paddingVertical: '5%',
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
        arrowButton: {
            alignSelf: 'center',
            width: responsiveSize * 0.08,
            height: responsiveSize * 0.08,
            borderRadius: responsiveSize * 0.08,
            backgroundColor: buttonSelectColor || '#59164e',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '1.5%'
        }
    });
}
