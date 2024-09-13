import { useMotivationalPhrase } from "@features/app/providers/patient/MotivationalPhraseProvider";
import { UseGlobalResponse } from "@features/app/providers/sub/ResponseProvider";
import { UseMotivationalPhraseService } from "@hooks/api/UseMotivationalPhraseService";
import { LoadingStructure } from "types/loading/Loading_Types";
import { DailyMotivationalPhrase } from "types/motivational_phrase/MotivationalPhrase_Types";

interface UseCurrentPhraseHandling {
    viewingLoading: LoadingStructure;
}

export const useCurrentPhraseHandling = ({ viewingLoading }: UseCurrentPhraseHandling) => {
    const { HandleResponseAppError } = UseGlobalResponse();
    const { performVerifyViewing } = UseMotivationalPhraseService(viewingLoading.setLoading);
    const { dispatch: motivationalPhraseDispatch } = useMotivationalPhrase();

    const handleViewVerification = async (phrase: DailyMotivationalPhrase) => {
        if(phrase.viewed) return;
        
        const phraseId = phrase._id;
        try{
            const response = await performVerifyViewing(phraseId);
            if(response.success && response.data)
            {
                const updatedPhrase = response.data;
                motivationalPhraseDispatch({ type: 'UPDATE_PHRASE', payload: updatedPhrase });
            }
        }
        catch (err)
        {
            const error = err as Error;
            HandleResponseAppError(error.message);
        }
        
    }

    return { handleViewVerification };
}