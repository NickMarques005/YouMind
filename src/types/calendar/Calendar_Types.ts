import { MarkingTypes } from "react-native-calendars/src/types";

export interface CalculateMarkedDates {
    start: string;
    expiresAt?: string;
    frequency?: number;
    frequencyType: string;
    markingType?: MarkingTypes;
}