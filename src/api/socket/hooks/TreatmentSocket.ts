import { useCallback } from 'react';
import { UseTreatment } from '@providers/TreatmentProvider';
import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';
import { UseChat } from '@providers/ChatProvider';
import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types';
import { Notice } from 'types/notice/Notice_Types';
import { useNotice } from '@features/app/providers/sub/NoticeProvider';
import { UsePerformProps } from 'types/service/Request_Types';
import { UseTreatmentService } from '@hooks/api/UseTreatmentService';
import { useUpdatePatientState } from '@features/app/pages/patient/hooks/UpdatePatientState';
import { useUpdateDoctorState } from '@features/app/pages/doctor/hooks/UpdateDoctorState';
import { SocketInitialChat } from 'types/chat/Chat_Types';

interface UpdateStatus {
    userId: string;
    online: boolean;
}

interface UseTreatmentSocketProps {
    perform: UsePerformProps;
    userType?: string;
}

const UseTreatmentSocket = ({ perform, userType }: UseTreatmentSocketProps) => {
    const { setLoading, HandleConnectionAppError } = perform;
    const { addTreatment, removeTreatment, treatment_state, setTreatments, updateInitialChat } = UseTreatment();
    const { performVerifyTreatmentInitialization, performVerifyTreatmentCompletion } = UseTreatmentService(setLoading);
    let handleInitiateTreatmentData: () => Promise<void>, handleRemoveTreatmentData: (treatmentId?: string) => Promise<void>;
    if (userType === 'patient') {
        ({ handleInitiateTreatmentData, handleRemoveTreatmentData } = useUpdatePatientState({ setLoading, HandleConnectionAppError }));
    } else if (userType === 'doctor') {
        ({ handleInitiateTreatmentData, handleRemoveTreatmentData } = useUpdateDoctorState({ setLoading, HandleConnectionAppError }));
    }

    const { handleSelectedNotice } = useNotice();
    const { setCurrentChat, currentChat } = UseChat();

    const handleTreatmentAdd = useCallback(async (data: { treatment: TreatmentInfoTemplate, notice: Notice }) => {
        console.log("Tratamento adicionado: ", data);
        try {
            const newTreatment = data.treatment;
            const response = await performVerifyTreatmentInitialization(newTreatment._id);

            if (!response.success) {
                return console.log("Tratamento não iniciado!");
            }

            if (handleInitiateTreatmentData) {
                await handleInitiateTreatmentData();
            }

            addTreatment(newTreatment);
            handleSelectedNotice(data.notice);
        }
        catch (err) {
            console.error(err);
        }

    }, [addTreatment]);

    const handleTreatmentEnd = useCallback(async (data: { treatment: TreatmentInfoTemplate, notice: Notice }) => {
        console.log("Tratamento removido: ", data);

        try {
            const newTreatment = data.treatment;

            const response = await performVerifyTreatmentCompletion(newTreatment._id);
            if (!response.success) {
                return console.log("Tratamento não encerrado!");
            }

            if (handleRemoveTreatmentData) {
                await handleRemoveTreatmentData(newTreatment._id);
            }

            removeTreatment(newTreatment._id);
            handleSelectedNotice(data.notice);
        }
        catch (err) {
            console.error(err);
        }

    }, [removeTreatment]);

    const handleNoticeMessage = useCallback((data: { notice: Notice }) => {
        console.log("New Notice message: ", data);
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

    const handleUpdateInitialChat = useCallback((data: SocketInitialChat) => {
        console.log("Initial Chat Update: ", data);

        const { updatedChat } = data;
        updateInitialChat(updatedChat);
        
    }, [treatment_state]);

    return { 
        handleTreatmentAdd, 
        handleTreatmentEnd, 
        handleNoticeMessage, 
        handleTreatmentUpdateStatus,
        handleUpdateInitialChat
    };
};

export default UseTreatmentSocket;