import { Menu } from "@hooks/menu/Menu";
import { TreatmentMenuOptionNames, MenuOptionDetails } from "./TreatmentMenuOptions";
import useTreatmentMenuActions from "./TreatmentMenuActions";
import { UserType } from "types/user/User_Types";

interface UseTreatmentMenuBehaviorParams {
    userType: UserType;
}

const useTreatmentMenuBehavior = ({ userType }: UseTreatmentMenuBehaviorParams) => {
    const treatmentMenuActions = useTreatmentMenuActions();

    const treatmentMenu = new Menu(MenuOptionDetails);
    treatmentMenu.addOption(TreatmentMenuOptionNames.STATUS, treatmentMenuActions.handleStatus);
    if(userType === 'patient') {
        treatmentMenu.addOption(TreatmentMenuOptionNames.MOTIVATIONAL_PHRASES, treatmentMenuActions.handleMotivationPhrases);
    }
    treatmentMenu.addOption(TreatmentMenuOptionNames.INSTRUCTIONS, treatmentMenuActions.handleInstructions);

    return { options: treatmentMenu.getOptions() };
}

export default useTreatmentMenuBehavior;