import { HistoryMedication } from "types/history/PatientHistory_Types";

export type MedicationType = "Comprimido" | "Cápsula" | "Líquido" | '';

export interface Medication {
    _id: string;
    name: string;
    dosage: string;
    type: MedicationType;
    expiresAt?: string;
    frequency?: number;
    schedules?: string[];
    start?: string;
    alarmDuration: number;
    reminderTimes: number;
    isScheduled?: boolean;
    patientId: string;
    createdAt: string;
    updatedAt: string;
}

export interface MedicationPending {
    medication: Medication;
    currentSchedule: string;
    medicationHistoryId: string;
}

export type MedicationToConsume = HistoryMedication;

export type MedicationFrequencyType = 'Dias' | 'Semanas' | 'Meses';
export type MedicationDurationType = 'Hoje' | 'Dias' | 'Semanas' | 'Meses';

export interface MedicationFormType {
    name: string;
    type: MedicationType;
    dosage: string;
    expiresAt?: string;
    frequency: string;
    schedules: string[];
    start: string;
    alarmDuration: number;
    reminderTimes: number;
}

export interface FormattedMedicationForm {
    name: string;
    type: MedicationType;
    dosage: string;
    expiresAt?: Date;
    frequency?: number;
    schedules?: string[];
    start?: Date;
    alarmDuration: number;
    reminderTimes: number;
}

export interface DeleteMedicationResponse {
    id: string;
}