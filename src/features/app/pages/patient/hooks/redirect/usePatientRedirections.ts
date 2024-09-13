import { useAnswerQuestionnaireNavigationRedirection } from "../UseAnswerQuestionnaireNavigation";
import { useMedicationPendingNavigationRedirection } from "../UseMedicationPendingNavigation";
import { useMotivationalPhraseNavigationRedirection } from "../UseMotivationalPhraseNavigation";


const usePatientMainRedirections = () => {

    useMedicationPendingNavigationRedirection();
    useMotivationalPhraseNavigationRedirection();
    useAnswerQuestionnaireNavigationRedirection();

    return null;
}

export default usePatientMainRedirections;