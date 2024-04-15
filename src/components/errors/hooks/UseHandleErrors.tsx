import { EventManagerTemplate } from "../../../hooks/EventManager";
import { EventTypes } from "../../../types/events/EventTypes";

export const HandleErrors = (errorResponse: string | undefined) => {
    if (!errorResponse) {
        console.log("(HandleErrors) Não há erro especificado. Houve um erro desconhecido");
        errorResponse = "Erro desconhecido";
        return errorResponse;
    }

    const EmitEvent = (event: string, args: string) => {
        EventManagerTemplate.emit(event, args);
    }

    console.log(errorResponse);

    /*errorResponse.forEach((err) => {
        switch (err) {
            case 'Token inválido':
                console.log('(HandleErrors) Sessão expirada. Por favor, faça login novamente.');
                EmitEvent(EventTypes.ErrorTypes.InvalidToken, err);
                break;
            case 'Usuário não autorizado':
                console.log('(HandleErrors) Sessão expirada. Por favor, faça login novamente.');
                EmitEvent(EventTypes.ErrorTypes.UnauthorizedUser, err);
                break;

            default:
                console.log("(HandleErrors) Erro desconhecido: ", err);
                break;
        }
    });*/

    return errorResponse;
}
