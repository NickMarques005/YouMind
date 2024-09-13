import { useEffect, useState } from 'react';
import { NoteTemplate } from 'types/app/doctor/notepad/Notepad_Types';
import { MessageSelected } from 'types/chat/Chat_Types';

interface UseMessageSelection {
    currentChatNote?: NoteTemplate;
}

export const useMessageSelection = ({ currentChatNote }: UseMessageSelection) => {
    const [selectedMessages, setSelectedMessages] = useState<MessageSelected[]>([]);
    const [isSelecting, setIsSelecting] = useState(false);
    const [isNoteSelecting, setIsNoteSelecting] = useState(false);

    const handleAddMessageSelection = (message: MessageSelected) => {

        if (!selectedMessages.some(selected => selected.messageId === message.messageId)) {
            setSelectedMessages(prev => [...prev, message]);
        }
    };

    const handleRemoveMessageSelection = (messageSelected: MessageSelected) => {
        setSelectedMessages(prev => prev.filter(currentMessage => currentMessage.messageId !== messageSelected.messageId));
    }

    const handleLongPressMessage = (message: MessageSelected, chatNote?: NoteTemplate) => {
        console.log("Handle Long Press Message!");
        if(chatNote)
        {
            if(message.hasAudio) return;

            if(!isNoteSelecting)
            {
                setIsNoteSelecting(true);
            }
        }
        else if (!isSelecting) {
            console.log("Estado de selecionamento ativado");
            setIsSelecting(true);
        }
        else {
            return;
        }
        handleAddMessageSelection(message);
    };

    const handleTapMessage = (message: MessageSelected) => {
        if(isNoteSelecting && message.hasAudio) return;

        if (isSelecting || isNoteSelecting) {
            if (selectedMessages.some(selected => selected.messageId === message.messageId)) {
                handleRemoveMessageSelection(message);
            }
            else {
                handleAddMessageSelection(message);
            }
        }
    };

    const clearSelection = () => {
        if(isSelecting) {
            setIsSelecting(false);
        }
        if(isNoteSelecting) {
            setIsNoteSelecting(false);
        }
        setSelectedMessages([]);
    };

    useEffect(() => {
        console.log(selectedMessages);
        if (selectedMessages.length === 0 && isSelecting) {
            console.log("Estado de selecionamento desativado");
            clearSelection();
        }

        if(isNoteSelecting && !currentChatNote)
        {
            console.log("Estado de selecionamento de anotações desativado");
            clearSelection();
        }
    }, [selectedMessages, currentChatNote]);

    return {
        selectedMessages,
        isSelecting,
        isNoteSelecting,
        handleLongPressMessage,
        clearSelection,
        handleTapMessage
    };
}