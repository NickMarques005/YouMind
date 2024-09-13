import { usePriority } from "@features/app/providers/bridge/PriorityProvider";
import { useEffect } from "react";
import { UseForm } from "@features/app/providers/sub/UserProvider";
import { useAnswerQuestionnaire } from "@features/app/providers/patient/AnswerQuestionnaireProvider";

export const useAnswerQuestionnaireNavigationRedirection = () => {
    const { answerQuestionnaire } = useAnswerQuestionnaire();
    const { addPriority } = usePriority();
    const { userData } = UseForm();

    useEffect(() => {
        console.log("Responder questionário redirecionamento!!");
        if (answerQuestionnaire && userData && userData.type === 'patient') {
            addPriority('questionnaireAnswer');
        }
    }, [answerQuestionnaire, userData]);

    return null;
};