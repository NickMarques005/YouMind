export interface WelcomeInstruction {
    title?: string;
    content: string;
    image?: string;
}

export type WelcomeInstructionsData = Record<'Tratamento' | 'Paciente' | 'Doutor', WelcomeInstruction[]>;