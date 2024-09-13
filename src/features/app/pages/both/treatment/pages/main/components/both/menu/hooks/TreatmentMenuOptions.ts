
export enum TreatmentMenuOptionNames {
    STATUS = "STATUS",
    INSTRUCTIONS = "INSTRUCTIONS",
    MOTIVATIONAL_PHRASES= "MOTIVATIONAL_PHRASES"
}

export const MenuOptionDetails = {
    [TreatmentMenuOptionNames.STATUS]: {
        name: "Status",
        icon: "info",
    },
    [TreatmentMenuOptionNames.INSTRUCTIONS]: {
        name: "Instruções",
        icon: "description",
    },
    [TreatmentMenuOptionNames.MOTIVATIONAL_PHRASES]: {
        name: "Frases Motivacionais",
        icon: "lightbulb",
    },
};