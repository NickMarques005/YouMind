
export enum TreatmentMenuOptionNames {
    STATUS = "STATUS",
    INSTRUCTIONS = "INSTRUCTIONS"
}

export const MenuOptionDetails = {
    [TreatmentMenuOptionNames.STATUS]: {
        name: "Status",
        icon: "info",
    },
    [TreatmentMenuOptionNames.INSTRUCTIONS]: {
        name: "Instruções",
        icon: "description",
    }
};