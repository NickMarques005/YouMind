import { Answer, FormattedAnswer } from "types/app/patient/health/Question_Types"

interface UseAnswerVerificationProps {
    answers: FormattedAnswer[];
}

export const useAnswerVerification = ({ answers }: UseAnswerVerificationProps) => {
    const isQuestionAnswered = (index: number): boolean => {
        if (answers[index]?.subAnswers) {
            const result = answers[index]?.subAnswers?.every(subAnswer => subAnswer.answer !== '') ? true : false;
            return result;
        }
        
        return !!answers[index]?.answer;
    };

    const isEveryQuestionAnswered = (questionsLength: number): boolean => {
        
        const answersDefined = answers.every(answer => {
            if (answer.subAnswers?.length !== 0) {
                const result = answer.subAnswers?.every(subAnswer => subAnswer.answer !== '');
                return result;
            }
            else {
                const result = answer.answer !== '';
                return result;
            }
        });

        
        const finalResult =  answersDefined && answers.length === questionsLength;
        return finalResult;
    };

    const isEverySubQuestionAnswered = (questionIndex: number) => {

        const currentQuestion = answers[questionIndex];
        if(currentQuestion.subAnswers?.length === 0) return false;
        const result = currentQuestion.subAnswers?.every(subAnswer => subAnswer.answer !== '' )
        return result;
    }

    return {
        isQuestionAnswered,
        isEveryQuestionAnswered,
        isEverySubQuestionAnswered
    };
}