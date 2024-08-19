import { UseAppNavigation } from "@features/app/hooks/UseAppNavigation";
import { UseTreatmentNavigation } from "@features/app/pages/both/treatment/hooks/UseTreatmentNavigation";

const useTreatmentMenuActions = () => {

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

    return { handleStatus, handleInstructions }
}

export default useTreatmentMenuActions;