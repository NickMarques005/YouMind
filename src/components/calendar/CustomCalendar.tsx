import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
import { MarkedDates, MarkingTypes } from 'react-native-calendars/src/types';

LocaleConfig.locales['br'] = {
    monthNames: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    today: 'Hoje'
};

LocaleConfig.defaultLocale = 'br';

interface CustomCalendarProps {
    onDateSelect?: (date: string) => void;
    theme?: any;
    markedDates?: MarkedDates;
    markingType?: MarkingTypes;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
    onDateSelect,
    theme,
    markedDates,
    markingType
}) => {

    const handleDayPress = (day: DateData) => {
        const selectedDate = day.dateString;
        if (onDateSelect) {
            onDateSelect(selectedDate);
        }
    };

    return (
        <View style={styles.calendarContainer}>
            <Calendar
                markedDates={markedDates}
                onDayPress={handleDayPress}
                theme={theme}
                markingType={markingType}
            />
        </View>
    );
};

export default CustomCalendar;

const styles = StyleSheet.create({
    calendarContainer: {
        marginVertical: 10,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 4,
    },
});