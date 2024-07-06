export type MedicationType = "Comprimido" | "Cápsula" | "Líquido" | '';

export interface Medication {
    _id: string;
    name: string;
    dosage: string;
    type: MedicationType;
    expiresAt: string;
    frequency: number;
    schedules: string[];
    start: string;
    alarmDuration: number;
    reminderTimes: number;  
    patientId: string;
    createdAt: string;
    updatedAt: string;
}

export interface MedicationPending {
    medication: Medication;
    currentSchedule: string;
    medicationHistoryId: string;
}

export interface TakenMedication {
    currentSchedule: string;
    medicationId: string;
}

export type MedicationFrequency = 'Dias' | 'Semanas' | 'Meses';
export type MedicationDuration = string;

export interface MedicationFormType {
    name: string;
    type: MedicationType;
    dosage: string;
    expiresAt: string;
    frequency: number;
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
    schedules: string[];
    start?: Date;
    alarmDuration: number;
    reminderTimes: number;
}

export interface DeleteMedicationResponse {
    id: string;
}