import { useEffect, useMemo } from 'react';
import { UseSocket } from '@features/app/providers/sub/SocketProvider';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import { UseAuth } from '@features/root/providers/AuthenticationProvider';

import UseMedicationSocket from './hooks/MedicationSocket';
import UseTreatmentSocket from './hooks/TreatmentSocket';
import UseQuestionnairesSocket from './hooks/QuestionnairesSocket';
import { QuestionnaireItem } from 'types/app/patient/health/Question_Types';
import { MedicationPending } from 'types/app/patient/health/Medicine_Types';
import { LatestQuestionnaire, PatientHistory, SocketLatestMedication, SocketLatestQuestionnaire, SocketPatientHistory } from 'types/history/PatientHistory_Types';
import UsePatientHistorySocket from './hooks/PatientHistorySocket';
import { UsePerformProps } from 'types/service/Request_Types';
import { useUpdatePatientState } from '@features/app/pages/patient/hooks/UpdatePatientState';
import { useUpdateDoctorState } from '@features/app/pages/doctor/hooks/UpdateDoctorState';

const UseGlobalSocketHandling = ({ setLoading, HandleConnectionAppError }: UsePerformProps) => {
    const { uid } = UseAuth();
    const { userData } = UseForm();
    const { socket } = UseSocket();

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
        handleTreatmentUpdateStatus,
        handleUpdateInitialChat
    } = UseTreatmentSocket({ perform: { setLoading, HandleConnectionAppError }, userType: userData?.type });


    const memoizedUserData = useMemo(() => ({
        _id: userData?._id,
        type: userData?.type,
    }), [userData?._id, userData?.type]);

    useEffect(() => {
        if (socket && uid && userData) {
            console.log("(Socket Service) Socket inicializado com user: ", userData);
            socket.emit('joinRoom', { room: uid, userId: userData?._id });

            socket.on('treatmentInitiate', handleTreatmentAdd);
            socket.on('treatmentComplete', handleTreatmentEnd);
            socket.on('welcomeMessage', handleNoticeMessage);
            socket.on('userStatusChanged', handleTreatmentUpdateStatus);
            socket.on('updateInitialChat', handleUpdateInitialChat);

            if (userData.type === 'patient') {
                socket.on('addNewQuestionnaire', handleQuestionnaireAdd);
                socket.on('medicationPending', handleNewMedicationAlert);
            }

            if (userData.type === 'doctor') {
                console.log("UpdateHistory preparado");
                socket.on('updateHistory', handleUpdatePatientHistory);
                socket.on('updateLatestQuestionnaire', handleUpdateLatestQuestionnaire);
                socket.on('deleteLatestQuestionnaire', handleDeleteLatestQuestionnaire);
                socket.on('updateLatestMedication', handleUpdateLatestMedication);
                socket.on('deleteLatestMedication', handleDeleteLatestMedication);
            }
            return () => {
                console.log("(Socket Service) Socket OFF");
                socket.off('treatmentInitiate', handleTreatmentAdd);
                socket.off('treatmentComplete', handleTreatmentEnd);
                socket.off('userStatusChanged', handleTreatmentUpdateStatus);
                socket.off('updateInitialChat', handleUpdateInitialChat);

                if (userData.type === 'patient' && handleQuestionnaireAdd && handleNewMedicationAlert) {
                    socket.off('addNewQuestionnaire', handleQuestionnaireAdd);
                    socket.off('medicationPending', handleNewMedicationAlert);
                }
                else if (userData.type === 'doctor') {
                    socket.off('updateHistory', handleUpdatePatientHistory);
                    socket.off('updateLatestQuestionnaire', handleUpdateLatestQuestionnaire);
                    socket.off('deleteLatestQuestionnaire', handleDeleteLatestQuestionnaire);
                    socket.off('updateLatestMedication', handleUpdateLatestMedication);
                    socket.off('deleteLatestMedication', handleDeleteLatestMedication);
                }

                socket.emit('leaveRoom', { room: uid, userId: userData?._id });
            };
        }
    }, [uid, socket, memoizedUserData]);

    return null;
};

export default UseGlobalSocketHandling;