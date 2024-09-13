import { useCallback, useEffect, useMemo } from 'react';
import UseMedicationSocket from './hooks/MedicationSocket';
import UseTreatmentSocket from './hooks/TreatmentSocket';
import UseQuestionnairesSocket from './hooks/QuestionnairesSocket';
import { QuestionnaireItem } from 'types/app/patient/health/Question_Types';
import { MedicationPending } from 'types/app/patient/health/Medicine_Types';
import { LatestQuestionnaire, SocketLatestMedication, SocketLatestQuestionnaire, SocketPatientHistory } from 'types/history/PatientHistory_Types';
import UsePatientHistorySocket from './hooks/PatientHistorySocket';
import { Socket } from 'socket.io-client';
import { UserData } from 'types/user/User_Types';

interface GlobalSocketParams {
    uid: string | null;
    userData?: UserData;
    socket: Socket | null;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    HandleConnectionAppError: (value: string) => void;
}

const useGlobalSocketHandling = ({ uid, userData, socket, setLoading, HandleConnectionAppError }: GlobalSocketParams) => {

    //Patient Socket Handlers
    let handleQuestionnaireAdd: (data: QuestionnaireItem) => void = () => { };
    let handleNewMedicationAlert: (data: MedicationPending) => void = () => { };

    //Doctor Socket Handlers
    let handleUpdatePatientHistory: (data: SocketPatientHistory) => void = () => { };
    let handleUpdateLatestQuestionnaire: (data: SocketLatestQuestionnaire) => void = () => { };
    let handleDeleteLatestQuestionnaire: (data: { latestQuestionnaire: LatestQuestionnaire }) => void = () => { };
    let handleUpdateLatestMedication: (data: SocketLatestMedication) => void = () => { };
    let handleDeleteLatestMedication: (data: SocketLatestMedication) => void = () => { };

    if (userData?.type === 'patient') {
        const questionnaireHandlers = UseQuestionnairesSocket();
        const medicationHandlers = UseMedicationSocket();
        handleQuestionnaireAdd = questionnaireHandlers.handleQuestionnaireAdd;
        handleNewMedicationAlert = medicationHandlers.handleNewMedicationAlert;
    }

    if (userData?.type === 'doctor') {
        const patientHistoryHandlers = UsePatientHistorySocket();
        handleUpdatePatientHistory = patientHistoryHandlers.handleUpdatePatientHistory;
        handleUpdateLatestQuestionnaire = patientHistoryHandlers.handleUpdateLatestQuestionnaire;
        handleDeleteLatestQuestionnaire = patientHistoryHandlers.handleDeleteLatestQuestionnaire
        handleUpdateLatestMedication = patientHistoryHandlers.handleUpdateLatestMedication;
        handleDeleteLatestMedication = patientHistoryHandlers.handleDeleteLatestMedication;
    }

    const {
        handleTreatmentAdd,
        handleTreatmentEnd,
        handleNoticeMessage,
        handleTreatmentUpdateOnlineStatus,
        handleUpdateInitialChat
    } = UseTreatmentSocket({ perform: { setLoading, HandleConnectionAppError }, userType: userData?.type });

    const configureSocketListeners = useCallback((socket: Socket) => {

        socket.on('treatmentInitiate', handleTreatmentAdd);
        socket.on('treatmentComplete', handleTreatmentEnd);
        socket.on('welcomeMessage', handleNoticeMessage);
        socket.on('userStatusChanged', handleTreatmentUpdateOnlineStatus);
        socket.on('updateInitialChat', handleUpdateInitialChat);
    
        if (userData?.type === 'patient') {
            socket.on('addNewQuestionnaire', handleQuestionnaireAdd);
            socket.on('medicationPending', handleNewMedicationAlert);
        }
    
        if (userData?.type === 'doctor') {
            socket.on('updateHistory', handleUpdatePatientHistory);
            socket.on('updateLatestQuestionnaire', handleUpdateLatestQuestionnaire);
            socket.on('deleteLatestQuestionnaire', handleDeleteLatestQuestionnaire);
            socket.on('updateLatestMedication', handleUpdateLatestMedication);
            socket.on('deleteLatestMedication', handleDeleteLatestMedication);
        }
    }, [userData]);

    const handleJoinMainRoom = useCallback((socket: Socket) => {
        console.log("(Socket Service) Socket inicializado com user: ", userData);
        socket.emit('joinRoom', { room: uid, userId: userData?._id });
    }, [userData]);

    const removeSocketListeners = useCallback((socket: Socket | null) => {
        if (!socket) return;
    
        socket.off('treatmentInitiate');
        socket.off('treatmentComplete');
        socket.off('welcomeMessage');
        socket.off('userStatusChanged');
        socket.off('updateInitialChat');
    
        if (userData?.type === 'patient') {
            socket.off('addNewQuestionnaire');
            socket.off('medicationPending');
        }
    
        if (userData?.type === 'doctor') {
            socket.off('updateHistory');
            socket.off('updateLatestQuestionnaire');
            socket.off('deleteLatestQuestionnaire');
            socket.off('updateLatestMedication');
            socket.off('deleteLatestMedication');
        }
    }, [userData]);

    return { configureSocketListeners, handleJoinMainRoom, removeSocketListeners };
};

export default useGlobalSocketHandling;