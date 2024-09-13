import { useCurrentNote } from "@features/app/providers/doctor/CurrentNoteProvider";
import { useNotepad } from "@features/app/providers/doctor/NotepadProvider";
import { UseGlobalResponse } from "@features/app/providers/sub/ResponseProvider";
import { UseChatService } from "@hooks/api/UseChatService";
import { NoteTemplate } from "types/app/doctor/notepad/Notepad_Types";
import { MessageSelected, Request_AddMessagesToNoteArgs } from "types/chat/Chat_Types";
import { MessageIconTypeKey } from "types/icon/Icon_Types";
import { LoadingStructure } from "types/loading/Loading_Types";
import { UserType } from "types/user/User_Types";

interface useSendMessageToNoteHandlingParams {
    sendToNoteLoading: LoadingStructure;
    userType: UserType;
}

export const useSendMessageToNoteHandling = ({ sendToNoteLoading, userType }: useSendMessageToNoteHandlingParams) => {
    if (userType !== 'doctor') return null;

    const { HandleResponseAppError, HandleResponseAppSuccess } = UseGlobalResponse();
    const { performAddMessagesToNote } = UseChatService(sendToNoteLoading.setLoading);
    const { dispatch } = useNotepad();
    const { handleUpdateAndAddPagesInCurrentNote } = useCurrentNote();

    const handleSendMessagesToNote = async (selectedMessages: MessageSelected[], currentChatNote: NoteTemplate, onSuccess?: () => void) => {
        try {
            console.log("Send Messages To Note");
            const messagesContent = selectedMessages.map((message) => message.content);

            const formattedSendToNoteMessages: Request_AddMessagesToNoteArgs = {
                messages: messagesContent,
                noteId: currentChatNote._id
            }

            const response = await performAddMessagesToNote(formattedSendToNoteMessages);
            if (response.success) {
                if (response.data) {
                    const updatedNote = response.data;
                    dispatch({ type: 'UPDATE_NOTE', payload: updatedNote });
                    handleUpdateAndAddPagesInCurrentNote(updatedNote._id, updatedNote.content);
                }
                if (response.message) {
                    HandleResponseAppSuccess(response.message, response.type as MessageIconTypeKey)
                }

                if(onSuccess)
                {
                    onSuccess();
                }
            }
            else {
                if (response.error) {
                    return HandleResponseAppError(response.error);
                }

            }
        } catch (err) {
            const error = err as Error;
            return HandleResponseAppError(error.message);
        }
    }

    return {
        handleSendMessagesToNote
    };
}