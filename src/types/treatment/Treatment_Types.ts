export interface Request_InitializeTreatmentArgs {
    email_1: string;
    email_2: string;
}

export interface Request_DeleteTreatmentArgs {
    treatmentId: string;
}

export interface NewTreatment {
    _id: string;
    doctorId: string;
    patientId: string;
}

export interface TreatmentInfoTemplate {
    _id: string;
    name: string;
    email: string;
}

export interface DeleteTreatmentResponse {
    treatmentId: string;
}