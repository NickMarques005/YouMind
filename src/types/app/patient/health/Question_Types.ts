
export type AnswerType = "precisa_melhorar" | "ruim"| "bom" | "ótimo" | "excelente";
export interface Answer {
    answer?: string;
    type?: AnswerType;
    hasMetadata?: boolean;
}

export interface FormattedAnswer {
    questionId: string;
    answer?: string;
    type?: AnswerType;
    subAnswers?: Answer[];
    metadata?: string;
}

export interface Question_Metadata {
    questionId: string;
    metadata: string;
}

export interface Question {
    _id: string;
    title: string;
    answers: Answer[];
    sub_questions?: string[];
}

export interface QuestionnaireTemplate {
    _id: string;
    questions: Question[];
    createdAt: string;
    updatedAt: string;
}

export interface Questionnaire {
    _id: string;
    patientId: string;
    expiredAt?: string;
    createdAt: string;
    name: string;
    checked: boolean;
    answers?: FormattedAnswer[];
    questionnaireTemplateId: string;
}

export interface QuestionnaireItem {
    currentQuestionnaire: Questionnaire;
    template?: QuestionnaireTemplate;
}

export interface AnswerQuestionnaire {
    questionnaireId: string;
    template: QuestionnaireTemplate;
}

export interface Request_GetQuestionnairesArgs {
    
}

export interface Request_GetTemplateQuestionnaireByIdArgs {

}


export interface Request_SendAnswersArgs {
    answers: FormattedAnswer[];
    id: string;
}



