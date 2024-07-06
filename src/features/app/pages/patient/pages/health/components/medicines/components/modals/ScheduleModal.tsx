import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
    WheelPicker,
    TimePicker,
    DatePicker
} from "react-native-wheel-picker-android";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface ScheduleModalProps {
    closeModal: () => void;
    onAdd: (schedule: string) => void;
    onUpdate: (schedule: string, index: number) => void;
    onDelete: (index: number) => void;
    currentSchedule?: string;
    index?: number;
    schedules: string[];
}

const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

const ScheduleModal = ({ currentSchedule, index, onAdd, onUpdate, closeModal, schedules, onDelete }: ScheduleModalProps) => {
    const initialHour = hours[0];
    const initialMinute = minutes[0];

    const [selectedHour, setSelectedHour] = useState<string>(initialHour);
    const [selectedMinute, setSelectedMinute] = useState<string>(initialMinute);
    const [scheduleError, setScheduleError] = useState<string | undefined>(undefined);


    const isValidSchedule = (newSchedule: string, schedules: string[], currentSchedule?: string, index?: number): string | undefined => {
        const [newHour, newMinute] = newSchedule.split(':').map(Number);
        const newTimeInMinutes = newHour * 60 + newMinute;
        let currentIndex;
        if (index === undefined) {
            currentIndex = schedules.length;
            console.log(currentIndex);
        }
        else {
            currentIndex = index;
        }

        for (let i = 0; i < currentIndex; i++) {
            const [hour, minute] = schedules[i].split(':').map(Number);
            const timeInMinutes = hour * 60 + minute;
            if (newTimeInMinutes <= timeInMinutes) {
                return "Erro: o horário não pode ser menor que seus horários anteriores";
            }
        }

        if (currentSchedule) {
            for (let i = currentIndex + 1; i < schedules.length; i++) {
                const [hour, minute] = schedules[i].split(':').map(Number);
                const timeInMinutes = hour * 60 + minute;
                if (newTimeInMinutes >= timeInMinutes) {
                    return "Erro: o horário não pode ser maior que seus horários posteriores";
                }
            }
        }


        return undefined;
    };

    const handleTime = () => {
        const selectedTime = `${selectedHour}:${selectedMinute}`;
        console.log("selectedTime: ", selectedTime);
        if (schedules.includes(selectedTime) || selectedTime === currentSchedule) {
            setScheduleError('Esse horário já existe');
            return;
        }

        const scheduleError = isValidSchedule(selectedTime, schedules, currentSchedule, index);

        if (scheduleError) {
            setScheduleError(scheduleError);
            return;
        }

        if (currentSchedule && index !== undefined) {
            onUpdate(selectedTime, index);
        }
        else {
            onAdd(selectedTime);
        }

        closeModal();
    };

    const handleDelete = () => {
        if (index !== undefined) {
            onDelete(index);
            closeModal();
        }
    };

    return (
        <View style={styles.modalContent}>
            {
                currentSchedule &&
                (
                    <TouchableOpacity onPress={handleDelete} style={{ width: 50, height: 50, alignSelf: 'flex-end', borderRadius: 70, backgroundColor: '#54142f', alignItems: 'center', justifyContent: 'center', marginBottom: '3%' }}>
                        <MaterialIcons name="delete" size={25} color="white" />
                    </TouchableOpacity>
                )
            }

            <View style={{ width: '100%', marginBottom: '10%', marginTop: '3%' }}>
                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '700', color: '#6b2061' }}>
                    {currentSchedule ? "Atualize seu horário" : "Adicione um novo Horário"}
                </Text>
            </View>
            <View style={styles.pickerContainer}>
                <WheelPicker
                    selectedItem={hours.indexOf(selectedHour)}
                    data={hours}
                    onItemSelected={index => setSelectedHour(hours[index])}
                    selectedItemTextFontFamily="Helvetica"
                    itemTextFontFamily="Helvetica"
                    style={styles.wheelPicker}
                    selectedItemTextSize={22}
                />
                <Text style={styles.colon}>:</Text>
                <WheelPicker
                    selectedItem={minutes.indexOf(selectedMinute)}
                    data={minutes}
                    onItemSelected={index => setSelectedMinute(minutes[index])}
                    selectedItemTextFontFamily="Helvetica"
                    itemTextFontFamily="Helvetica"
                    style={styles.wheelPicker}
                    selectedItemTextSize={22}
                />
            </View>
            <View style={{ width: '100%', marginVertical: '2%', minHeight: 40}}>
                <Text style={{ fontSize: 16, color: 'red', fontWeight: '500' }}>{scheduleError}</Text>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={handleTime}>
                <Text style={styles.addButtonText}>{currentSchedule ? "Atualizar" : "Adicionar"}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default React.memo(ScheduleModal);

const styles = StyleSheet.create({

    modalContent: {
        width: '100%',
        paddingHorizontal: '8%',
        paddingTop: '4%',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    wheelPicker: {
        width: 100,
        height: 150,
    },
    colon: {
        fontSize: 24,
        fontWeight: 'bold',
        marginHorizontal: 10,
    },
    addButton: {
        backgroundColor: '#6b2061',
        padding: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontSize: 18,
    },

})