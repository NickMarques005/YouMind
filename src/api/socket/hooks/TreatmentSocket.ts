import { useCallback } from 'react';
import { UseTreatment } from '@providers/TreatmentProvider';
import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';
import { UseChat } from '@providers/ChatProvider';
import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types';
import { Notice } from 'types/notice/Notice_Types';

interface UpdateStatus {
    userId: string;
    online: boolean;
}

const UseTreatmentSocket = () => {
    const { addTreatment, treatment_state, setTreatments } = UseTreatment();
    const { HandleNotice } = UseGlobalResponse();
    const { setCurrentChat, currentChat } = UseChat();

    const handleTreatmentAdd = useCallback((data: TreatmentInfoTemplate) => {
        console.log("Tratamento atualizado: ", data);
        addTreatment(data);
    }, [addTreatment]);

    const handleWelcomeMessage = useCallback((data: Notice) => {
        console.log("Welcome message: ", data);
        HandleNotice(data);
    }, [HandleNotice]);

    const handleTreatmentUpdateStatus = useCallback((data: UpdateStatus) => {
        const updatedTreatments = treatment_state.treatments.map(treatment =>
            treatment.uid === data.userId ? { ...treatment, online: data.online } : treatment
        );
        setTreatments(updatedTreatments);

        if (currentChat && currentChat.members) {
            const updatedMembers = currentChat.members.map(member =>
                member.uid === data.userId ? { ...member, online: data.online } : member
            );
            const updatedCurrentChat = { ...currentChat, members: updatedMembers };
            setCurrentChat(updatedCurrentChat);
        }
    }, [treatment_state, currentChat, setCurrentChat]);

    return { handleTreatmentAdd, handleWelcomeMessage, handleTreatmentUpdateStatus };
};

export default UseTreatmentSocket;