import { Menu } from "@hooks/menu/Menu";
import { TreatmentMenuOptionNames, MenuOptionDetails } from "./TreatmentMenuOptions";
import useTreatmentMenuActions from "./TreatmentMenuActions";

const useTreatmentMenuBehavior = () => {
    const treatmentMenuActions = useTreatmentMenuActions();

    const treatmentMenu = new Menu(MenuOptionDetails);
    treatmentMenu.addOption(TreatmentMenuOptionNames.STATUS, treatmentMenuActions.handleStatus);
    treatmentMenu.addOption(TreatmentMenuOptionNames.INSTRUCTIONS, treatmentMenuActions.handleInstructions);

    return { options: treatmentMenu.getOptions() };
}

export default useTreatmentMenuBehavior;