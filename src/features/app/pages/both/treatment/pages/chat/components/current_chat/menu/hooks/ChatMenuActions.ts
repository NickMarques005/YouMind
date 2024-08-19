
const useChatMenuActions = () => {

    const handleCall = () => {
        console.log("Ligar selecionado");
        
    };

    const handleAppointments = () => {
        console.log("Consultas selecionadas");
        
    };

    const handleSendToNotes = () => {
        console.log("Enviar para Anotação selecionado");
        
    };

    const handleStarredMessages = () => {
        console.log("Mensagens Marcadas selecionadas");
        
    };

    return { handleCall, handleAppointments, handleSendToNotes, handleStarredMessages };
}

export default useChatMenuActions;