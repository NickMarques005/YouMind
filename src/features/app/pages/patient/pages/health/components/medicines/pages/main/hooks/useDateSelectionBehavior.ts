import { formatDateToInitialDate } from "@utils/date/DateFormatting";
import { useState } from "react";


const useDateSelectionBehavior = () => {
    const [selectedDate, setSelectedDate] = useState(formatDateToInitialDate(new Date()));

    const handleSelectDate = (date: Date) => {
        const newDate = formatDateToInitialDate(date);
        setSelectedDate(newDate);
    }

    return { handleSelectDate, selectedDate };
}

export default useDateSelectionBehavior;