
export type AnswerType = "precisa_melhorar" | "ruim"| "bom" | "ótimo" | "excelente";

export interface Answer {
    answer?: string;
    type?: AnswerType;
}

export interface FormattedAnswer {
    answer?: string;
    type?: AnswerType;
    subAnswers?: Answer[];
}

export interface Question {
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

export interface Request_GetQuestionnairesArgs {
    
}

export interface Request_GetTemplateQuestionnaireByIdArgs {

}


export interface Request_SendAnswersArgs {
    answers: FormattedAnswer[];
    id: string;
}



