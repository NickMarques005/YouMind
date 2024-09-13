import { UseChatNavigation } from "../../../../hooks/UseChatNavigation";

const useChatMenuActions = () => {

    const { navigateToChatScreen } = UseChatNavigation();

    const handleCall = () => {
        console.log("Ligar selecionado");
        
    };

    const handleAppointments = () => {
        console.log("Consultas selecionadas");
        
    };

    const handleSendToNotes = () => {
        console.log("Enviar para Anotação selecionado");
        navigateToChatScreen('send_to_notes');
    };

    const handleMarkedMessages = () => {
        console.log("Mensagens Marcadas selecionadas");
        navigateToChatScreen('tagged_messages');
    };

    return { handleCall, handleAppointments, handleSendToNotes, handleMarkedMessages };
}

export default useChatMenuActions;