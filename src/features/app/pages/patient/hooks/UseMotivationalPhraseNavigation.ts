import { usePriority } from "@features/app/providers/bridge/PriorityProvider";
import { useMotivationalPhrase } from "@features/app/providers/patient/MotivationalPhraseProvider";
import { UseForm } from "@features/app/providers/sub/UserProvider";
import { verifyUnviewedPhrase } from "@utils/treatment/HandlingMotivationalPhrases";
import { useEffect } from "react";

export const useMotivationalPhraseNavigationRedirection = () => {
    const { state: motivationalPhraseState } = useMotivationalPhrase();
    const { userData } = UseForm();
    const { addPriority } = usePriority();

    useEffect(() => {
        const hasUnviewedPhrase = verifyUnviewedPhrase(motivationalPhraseState.phrases);
        if(hasUnviewedPhrase)
        {
            console.log("Tem frase hoje não visualizada!!");
            addPriority('motivationalPhrase');
        }
    }, [motivationalPhraseState.phrases, userData]);

    return null;
}