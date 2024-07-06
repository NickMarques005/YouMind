import { AdvertisingData } from "react-native-ble-manager";

export type DeviceState = 'deviceOff' | 'deviceScanning' | 'deviceOn';

export interface BleDeviceData {
    id: string;
    name?: string;
    rssi: number;
    advertising: AdvertisingData;
    batteryLevel?: number;
    charging?: boolean;
    saving?: boolean;
    ultraSaving?: boolean;
    energySaving?: boolean;
    version?: string;
}

export interface FormBleUser {
    name?: string;
    surname?: string;
    email?: string;
}

export interface MedicineBleData {
    content: string;
    medicine_name: string;
    dateTime: Date;
}

export type AnswerQuestions = 'Sim' | 'Nao';

export interface BleQuestion {
    type: number;
    info: string;
    answers: AnswerQuestions[];
}

export interface QuestionsBleData {
    questions: BleQuestion[];
    doctor: string;
}

export interface ServiceUUIDs {
    form: string[];
    question: string[];
    device: string[];
    medicine: string[];
}

export interface CharacteristicUUIDs {
    form: string;
    question: string;
    device: string;
    medicine: string;
}


