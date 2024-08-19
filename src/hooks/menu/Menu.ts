import { MenuOption, MenuOptionDetailsType } from "types/menu/Menu_Types";
import { MenuOptionNames, MenuOptionDetails } from "../../features/app/pages/both/treatment/pages/main/components/both/menu/hooks/TreatmentMenuOptions";

export class Menu {
    private options: MenuOption[] = [];
    private optionDetails: MenuOptionDetailsType;

    constructor(optionDetails: MenuOptionDetailsType) {
        this.optionDetails = optionDetails;
    }

    addOption(optionName: string, action: () => void) {
        const option = this.optionDetails[optionName];
        if (option) {
            this.options.push({
                name: option.name,
                icon: option.icon,
                action
            });
        } else {
            console.error(`Opção ${optionName} não encontrada.`);
        }
    }

    removeOption(optionName: string) {
        this.options = this.options.filter(option => option.name !== this.optionDetails[optionName].name);
    }

    getOptions() {
        return this.options;
    }
}