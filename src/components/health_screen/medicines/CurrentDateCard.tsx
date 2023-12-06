import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { DateTime, Settings } from 'luxon';
import { LinearGradient } from 'expo-linear-gradient';

interface CurrentDateCardProps {
    date: DateTime;
    handleCurrentDay: (date: DateTime) => void;
}

const CurrentDateCard = ({ date, handleCurrentDay }: CurrentDateCardProps) => {
    const currentDate = DateTime.local();
    const isToday = date.hasSame(currentDate, 'day');
    const gradientColors = isToday ? ['#7a3c8c', '#b35ccc']
    : ['#6b4f6a', '#8a4d88'];
    
    return (
        <LinearGradient colors={gradientColors}
            start={{ x: 0.2, y: 0.6 }}
            end={{ x: 0.5, y: 0.28 }} style={currentDateStyle.currentDateCard_View}>
            <TouchableOpacity style={currentDateStyle.currentDateCard_Button} onPress={() => handleCurrentDay(date)}>
                <View style={currentDateStyle.currentDayWeek_View}>
                    <Text style={currentDateStyle.currentDayWeek_Text}>{date.toFormat('EEE').toUpperCase().slice(0, 3) || ""}</Text>
                </View>
                <Text style={currentDateStyle.currentDate_Text}>{`${date?.day}/${date?.month}` || ""}</Text>
            </TouchableOpacity>
        </LinearGradient>
    )
};

const currentDateStyle = StyleSheet.create({
    currentDateCard_View: {
        display: 'flex',
        width: 80,
        backgroundColor: '#e6c2fc',
        borderRadius: 20,
    },
    currentDateCard_Button: {
        width: '100%',
        height: '100%',
        padding: 10,
        alignItems: 'center',
        gap: 10
    },
    currentDayWeek_View: {
        width: '100%',
    },
    currentDayWeek_Text: {
        fontSize: 16,
        color: '#ecd1ed'
    },
    currentDate_Text: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 22
    },
});

export default CurrentDateCard;