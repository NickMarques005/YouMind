import { useEffect, useMemo } from 'react';
import { UseSocket } from '@features/app/providers/sub/SocketProvider';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import { UseAuth } from '@features/root/providers/AuthenticationProvider';

import UseMedicationSocket from './hooks/MedicationSocket';
import UseTreatmentSocket from './hooks/TreatmentSocket';
import UseQuestionnairesSocket from './hooks/QuestionnairesSocket';
import { QuestionnaireItem } from 'types/app/patient/health/Question_Types';
import { MedicationPending } from 'types/app/patient/health/Medicine_Types';
import { PatientHistory } from 'types/history/PatientHistory_Types';
import UsePatientHistorySocket from './hooks/PatientHistorySocket';

const UseGlobalSocketHandling = () => {
    const { uid } = UseAuth();
    const { userData } = UseForm();
    const { socket } = UseSocket();
    
    const { handleTreatmentAdd, handleWelcomeMessage, handleTreatmentUpdateStatus } = UseTreatmentSocket();
    
    //Patient Socket Handlers
    let handleQuestionnaireAdd: (data: QuestionnaireItem) => void, 
    handleNewMedicationAlert: (data: MedicationPending) => void;
    
    //Doctor Socket Handlers
    let handleUpdatePatientHistory: (data: PatientHistory) => void;
    
    if (userData?.type === 'patient') {
        const questionnaireHandlers = UseQuestionnairesSocket();
        const medicationHandlers = UseMedicationSocket();
        handleQuestionnaireAdd = questionnaireHandlers.handleQuestionnaireAdd;
        handleNewMedicationAlert = medicationHandlers.handleNewMedicationAlert;
    }

    if(userData?.type === 'doctor'){
        const patientHistoryHandlers = UsePatientHistorySocket();
        handleUpdatePatientHistory = patientHistoryHandlers.handleUpdatePatientHistory;
    }

    const memoizedUserData = useMemo(() => ({
        _id: userData?._id,
        type: userData?.type,
    }), [userData?._id, userData?.type]);

    useEffect(() => {
        if (socket && uid && userData) {
            console.log("(Socket Service) Socket inicializado com user: ", userData);
            socket.emit('joinRoom', { room: uid, userId: userData?._id });
            
            socket.on('treatmentUpdate', handleTreatmentAdd);
            socket.on('welcomeMessage', handleWelcomeMessage);
            socket.on('userStatusChanged', handleTreatmentUpdateStatus);

            if (userData.type === 'patient') {
                socket.on('newQuestionnaire', handleQuestionnaireAdd);
                socket.on('medicationPending', handleNewMedicationAlert);
            }
            
            if(userData.type === 'doctor')
            {
                console.log("UpdateHistory preparado");
                socket.on('updateHistory', handleUpdatePatientHistory);
            }
            return () => {
                console.log("(Socket Service) Socket OFF");
                socket.off('treatmentUpdate', handleTreatmentAdd);
                socket.off('welcomeMessage', handleWelcomeMessage);
                socket.off('userStatusChanged', handleTreatmentUpdateStatus);

                if (userData.type === 'patient'  && handleQuestionnaireAdd && handleNewMedicationAlert) {
                    socket.off('newQuestionnaire', handleQuestionnaireAdd);
                    socket.off('medicationPending', handleNewMedicationAlert);
                }
                else if(userData.type === 'doctor'){
                    socket.off('updateHistory', handleUpdatePatientHistory);
                }
                
                socket.emit('leaveRoom', { room: uid, userId: userData?._id });
            };
        }
    }, [uid, socket, memoizedUserData]);

    return null;
};

export default UseGlobalSocketHandling;