import { Priority } from "@features/app/providers/bridge/PriorityProvider";
import { useEffect, useState } from "react";
import { DailyMotivationalPhrase } from "types/motivational_phrase/MotivationalPhrase_Types";

interface UseMotivationalPhraseSessionBehaviorParams {
    removePriority: (priority: Priority) => void;
    phrases: DailyMotivationalPhrase[];
}

export const useMotivationalPhraseSessionBehavior = ({ removePriority, phrases }: UseMotivationalPhraseSessionBehaviorParams) => {

    const [currentPhrase, setCurrentPhrase] = useState<DailyMotivationalPhrase | undefined>(undefined);

    const handleCurrentPhrase = (selectedPhrase: DailyMotivationalPhrase) => {
        setCurrentPhrase(selectedPhrase);
    }

    const clearCurrentPhrase = () => {
        setCurrentPhrase(undefined);
    }

    const handleBackSessionPriority = () => {
        console.log("Sair de motivational phrase");
        removePriority('motivationalPhrase');

    }

    useEffect(() => {
        const newestPhrase = phrases.length > 0 ? phrases[phrases.length - 1] : undefined;
        if (newestPhrase) {
            handleCurrentPhrase(newestPhrase);
        }
    }, []);

    return {
        currentPhrase, handleCurrentPhrase, clearCurrentPhrase,
        handleBackSessionPriority
    }
}