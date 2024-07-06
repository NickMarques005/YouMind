export interface Request_InitializeTreatmentArgs {
    email_1: string;
    email_2: string;
}

export interface Request_EndTreatmentArgs {
    treatmentId: string;
}

export interface NewTreatment {
    _id: string;
    doctorId: string;
    patientId: string;
}

export interface TreatmentInfoTemplate {
    _id: string;
    uid?: string;
    name: string;
    email: string;
    phone?: string;
    gender?: string;
    birth?: string;
    avatar?: string;
    online?: boolean;
}

export interface EndTreatmentResponse {
    treatmentToUpdate: TreatmentInfoTemplate;
}