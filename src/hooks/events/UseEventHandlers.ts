import { UseAuth } from "../../features/root/providers/AuthenticationProvider";

export function UseEventHandlers () {
    const { signOut }= UseAuth();
    class ErrorEvents {
        static HandlerInvalidToken () {
            console.log("(EventHandlers) Token inválido, deslogando...");
            signOut();
        }

        static HandlerUnauthorizedUser () {
            console.log("(EventHandlers) Usuário não autorizado. Por favor, faça login novamente");
            signOut();
        }
    }



    return {
        ErrorEvents
    }
}