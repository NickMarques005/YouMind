import { useCallback } from 'react';
import { UseTreatment } from '@providers/TreatmentProvider';
import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';
import { UseChat } from '@providers/ChatProvider';
import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types';
import { Notice } from 'types/notice/Notice_Types';
import { useNotice } from '@features/app/providers/sub/NoticeProvider';

interface UpdateStatus {
    userId: string;
    online: boolean;
}

const UseTreatmentSocket = () => {
    const { addTreatment, treatment_state, setTreatments } = UseTreatment();
    const { handleSelectedNotice } = useNotice();
    const { setCurrentChat, currentChat } = UseChat();

    const handleTreatmentAdd = useCallback((data: { treatment: TreatmentInfoTemplate}) => {
        console.log("Tratamento atualizado: ", data);
        addTreatment(data.treatment);
    }, [addTreatment]);

    const handleWelcomeMessage = useCallback((data: { notice: Notice}) => {
        console.log("Welcome message: ", data);
        handleSelectedNotice(data.notice);
    }, [handleSelectedNotice]);

    const handleTreatmentUpdateStatus = useCallback((data: UpdateStatus) => {
        const isUserInTreatments = treatment_state.treatments.some(treatment => treatment.uid === data.userId);

        if (isUserInTreatments) {
            const updatedTreatments = treatment_state.treatments.map(treatment =>
                treatment.uid === data.userId ? { ...treatment, online: data.online } : treatment
            );
            setTreatments(updatedTreatments);
        }

        if (currentChat && currentChat.uid === data.userId) {
            const updatedCurrentChat = { ...currentChat, online: data.online };
            setCurrentChat(updatedCurrentChat);
        }

    }, [treatment_state, currentChat, setCurrentChat]);

    return { handleTreatmentAdd, handleWelcomeMessage, handleTreatmentUpdateStatus };
};

export default UseTreatmentSocket;