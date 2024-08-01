import { Medication } from "types/app/patient/health/Medicine_Types";
import { Questionnaire, QuestionnaireItem, QuestionnaireTemplate } from "types/app/patient/health/Question_Types";

export interface MedicationHistory {
    total: number;
    taken: number;
    notTaken: number;
}

export interface QuestionnaireHistory {
    total: number;
    answered: number;
    notAnswered: number;
}

export interface PatientHistory {
    patientId: string;
    treatmentId: string;
    patientName?: string;
    patientEmail?: string;
    patientAvatar?: string;
    medicationHistory: MedicationHistory;
    questionnaireHistory: QuestionnaireHistory;
    overallPerformance: number;
    questionnairePerformance: number;
    medicationPerformance: number;
    lastWeekTaken: number;
}

export interface CurrentPatientItem {
    name: string;
    email: string;
    avatar?: string;
    patientId: string;
}

export type AllHistoryResponse = PatientHistory[];

export interface HistoryQuestionnaire {
    _id: string;
    patientId: string;
    patientName?: string;
    patientAvatar?: string;
    currentQuestionnaire: Questionnaire;
    template?: QuestionnaireTemplate;
    pending: boolean;
    answered: boolean;
    updatedAt: string;
}

export interface HistoryMedication {
    _id: string;
    patientId: string;
    patientAvatar?: string;
    patientName?: string;
    currentMedication: Medication;
    currentSchedule: string;
    consumeDate?: string;
    pending: boolean;
    alert: boolean;
    taken: boolean;
    updatedAt: string;
}

export interface SocketPatientHistory {
    history: PatientHistory;
}

export type LatestQuestionnaire = HistoryQuestionnaire;

export type LatestMedication = HistoryMedication;

export interface SocketLatestQuestionnaire {
    latestQuestionnaire: LatestQuestionnaire
}
export interface SocketLatestMedication {
    latestMedication: LatestMedication
}

export interface LatestHistoryResponse {
    latestQuestionnaires: LatestQuestionnaire[];
    latestMedications: LatestMedication[];
}

export type QuestionPerformance = number;

export interface QuestionPerformanceResponse {
    performance: QuestionPerformance;
}

export interface HistoryQuestionnairesResponse {
    questionnaires: HistoryQuestionnaire[];
}

export interface HistoryMedicationsResponse {
    medications: HistoryMedication[];
}