import React, { createContext, useContext, useState, useEffect } from 'react';
import {DateTime} from 'luxon';

interface CurrentDate{
    day: string;
    month: string;
}

interface CurrentDateContextData{
    currentDate?: CurrentDate;
    weekDates: DateTime[];
}

export const CurrentDateContext = createContext<CurrentDateContextData>({
    currentDate: undefined,
    weekDates: [],
});

export const useCurrentDate = () => {
    return useContext(CurrentDateContext);
};

type DateProviderProps = {
    children: React.ReactNode
}

export const CurrentDateProvider: React.FC<DateProviderProps> = ({ children }) => {
    const [currentDate, setCurrentDate] = useState<CurrentDate>();
    const [weekDates, setWeekDates] = useState<DateTime[]>([]);

    useEffect(() => {
        const updateCurrentDate = () => {
            const dateNow = DateTime.local();
            const currentDate = dateNow.day;
            const currentMonth = dateNow.month;

            setCurrentDate({
                day: currentDate.toString(),
                month: currentMonth.toString(),
            });

            console.log("UPDATE DATE!");
        };

        const updateWeekDates = () => {
            const dateNow = DateTime.local();
            const weekStart = dateNow.minus({ days: dateNow.weekday - 1});
            const weekEnd = dateNow.plus({ days: 7 - dateNow.weekday });
            const days: DateTime[] = [];

            for (let i = 0; i < 14; i++)
            {
                const currentDay = weekStart.plus({days : i});
                days.push(currentDay);
            }
            setWeekDates(days);
        };

        const updateAtMidnight = () => {
            const dateNow = DateTime.local();
            const midnight = dateNow.plus({days : 1}).startOf('day');
            const timeUntilMidnight = midnight.toMillis() - dateNow.toMillis();

            setTimeout(() => {
                updateCurrentDate();
                updateWeekDates();
                updateAtMidnight();
            }, timeUntilMidnight);
        };

        updateCurrentDate();
        updateWeekDates();
        updateAtMidnight();

    }, []);

    return (
        <CurrentDateContext.Provider value={{currentDate, weekDates}}>
            {children}
        </CurrentDateContext.Provider>
    );
};