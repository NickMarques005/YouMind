
import { UseAppNavigation } from "@features/app/hooks/navigation/UseAppNavigation";
import { UseTreatmentNavigation } from "@features/app/pages/both/treatment/hooks/UseTreatmentNavigation";
import { usePriority } from "@features/app/providers/bridge/PriorityProvider";

const useTreatmentMenuActions = () => {
    const { addPriority, priorityList, removePriority } = usePriority();
    const { navigateToAppScreen } = UseAppNavigation();
    const { navigateToTreatmentScreen } = UseTreatmentNavigation();

    const handleStatus = () => {
        console.log("Status selecionado");
        navigateToTreatmentScreen('status');
    };

    const handleInstructions = () => {
        console.log("Instruções selecionadas");
        navigateToAppScreen('welcome');
    };

    const handleMotivationPhrases = () => {
        console.log("Phrase");
        addPriority('motivationalPhrase');
    }

    return { handleStatus, handleInstructions, handleMotivationPhrases }
}

export default useTreatmentMenuActions;