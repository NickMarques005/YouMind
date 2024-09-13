import { useCallback } from 'react';
import { UseTreatment } from '@features/app/providers/sub/TreatmentProvider';

import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types';
import { Notice } from 'types/notice/Notice_Types';
import { useNotice } from '@features/app/providers/sub/NoticeProvider';
import { UsePerformProps } from 'types/service/Request_Types';
import { UseTreatmentService } from '@hooks/api/UseTreatmentService';
import { useUpdatePatientState } from '@features/app/pages/patient/hooks/UpdatePatientState';
import { useUpdateDoctorState } from '@features/app/pages/doctor/hooks/UpdateDoctorState';
import { SocketInitialChat } from 'types/chat/Chat_Types';
import { UseTreatmentEnded } from '@features/app/providers/sub/TreatmentEndedProvider';
import { UseForm } from '@features/app/providers/sub/UserProvider';

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
    const { UpdateSpecificDataInUser } = UseForm();
    const { addEndedTreatment, removeEndedTreatment } = UseTreatmentEnded();
    const { performVerifyTreatmentInitialization, performVerifyTreatmentCompletion } = UseTreatmentService(setLoading);
    let handleInitiateTreatmentData: () => Promise<void>, handleRemoveTreatmentData: (treatmentId?: string) => Promise<void>;
    
    if (userType === 'patient') {
        ({ handleInitiateTreatmentData, handleRemoveTreatmentData } = useUpdatePatientState({ setLoading, HandleConnectionAppError }));
    } else if (userType === 'doctor') {
        ({ handleInitiateTreatmentData, handleRemoveTreatmentData } = useUpdateDoctorState({ setLoading, HandleConnectionAppError }));
    }

    const { handleSelectedNotice } = useNotice();

    /*
    ### Função para adicionar o tratamento
    */
    const handleTreatmentAdd = useCallback(async (data: { treatment: TreatmentInfoTemplate, notice: Notice, is_treatment_running?: boolean }) => {
        console.log("Tratamento iniciado: ", data);
        //Inicio de Tratamento!
        try {
            const newTreatment = data.treatment;
            const response = await performVerifyTreatmentInitialization(newTreatment._id);

            if (!response.success) {
                return console.log("Tratamento não iniciado!");
            }

            if (handleInitiateTreatmentData) {
                await handleInitiateTreatmentData();
            }

            removeEndedTreatment(newTreatment._id);  //Remove dos tratamentos encerrados se tiver
            addTreatment(newTreatment);              //Adiciona nos tratamentos atuais

            if(data.is_treatment_running){
                const isTreatmentRunning = data.is_treatment_running;
                console.log("***Tratamento em andamento atualização: ", isTreatmentRunning);
                UpdateSpecificDataInUser({ is_treatment_running: isTreatmentRunning });
            }

            handleSelectedNotice(data.notice);
        }
        catch (err) {
            console.error(err);
        }

    }, [addTreatment]);

    /*
    ### Função para encerrar o tratamento
    */
    const handleTreatmentEnd = useCallback(async (data: { treatment: TreatmentInfoTemplate, notice: Notice }) => {
        console.log("Tratamento encerrado: ", data);
        //Encerramento de Tratamento!
        try {
            const treatmentEnded = data.treatment;

            const response = await performVerifyTreatmentCompletion(treatmentEnded._id);
            if (!response.success) {
                return console.log("Tratamento não encerrado!");
            }

            if (handleRemoveTreatmentData) {
                await handleRemoveTreatmentData(treatmentEnded._id);
            }

            removeTreatment(treatmentEnded._id); //Remove de tratamentos atuais se estiver
            addEndedTreatment(treatmentEnded);   //Adiciona aos tratamentos encerrados
            handleSelectedNotice(data.notice);
        }
        catch (err) {
            console.error(err);
        }

    }, [removeTreatment]);

    /*
    ### Função para deletar o tratamento do aplicativo
    */
    const handleTreatmentDelete = useCallback(() => {

    }, []);

    /*
    ### Função para mostrar a mensagem de alerta no aplicativo
    */
    const handleNoticeMessage = useCallback((data: { notice: Notice }) => {
        console.log("New Notice message: ", data);
        handleSelectedNotice(data.notice);
    }, [handleSelectedNotice]);

    /*
    ### Função para atualizar o Status de online e offline do usuário no tratamento
    */
    const handleTreatmentUpdateOnlineStatus = useCallback((data: UpdateStatus) => {
        const isUserInTreatments = treatment_state.treatments.some(treatment => treatment.uid === data.userId);

        if (isUserInTreatments) {
            const updatedTreatments = treatment_state.treatments.map(treatment =>
                treatment.uid === data.userId ? { ...treatment, online: data.online } : treatment
            );
            setTreatments(updatedTreatments);
        }
    }, [treatment_state]);

    /*
    ### Função para atualizar os dados iniciais do chat (última mensagem adicionada, etc)
    */
    const handleUpdateInitialChat = useCallback((data: SocketInitialChat) => {
        console.log("Initial Chat Update: ", data);

        const { updatedChat } = data;
        updateInitialChat(updatedChat);

    }, [treatment_state]);

    return {
        handleTreatmentAdd,
        handleTreatmentEnd,
        handleTreatmentDelete,
        handleNoticeMessage,
        handleTreatmentUpdateOnlineStatus,
        handleUpdateInitialChat
    };
};

export default UseTreatmentSocket;