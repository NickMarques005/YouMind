export enum ChatMenuOptionNames {
    CALL = "CALL",
    APPOINTMENTS = "APPOINTMENTS",
    SEND_TO_NOTES = "SEND_TO_NOTES",
    STARRED_MESSAGES = "STARRED_MESSAGES"
}

export const MenuOptionDetails = {
    [ChatMenuOptionNames.CALL]: {
        name: "Ligar",
        icon: "phone",
    },
    [ChatMenuOptionNames.APPOINTMENTS]: {
        name: "Consultas",
        icon: "event",
    },
    [ChatMenuOptionNames.SEND_TO_NOTES]: {
        name: "Enviar para Anotação",
        icon: "send",
    },
    [ChatMenuOptionNames.STARRED_MESSAGES]: {
        name: "Mensagens Marcadas",
        icon: "star",
    }
};