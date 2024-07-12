import React from 'react';
import PatientTab from '@navigation/tab-navigator/tabs/PatientTab';
import { UseGetMedications, UseGetQuestionnaires } from '@features/app/hooks/UseGetInitialData';
import { UseLoading } from '@hooks/loading/UseLoading';
import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';
import UseGlobalSocketHandling from '@api/socket/SocketService';
import { useMedicationPendingNavigation } from './hooks/UseMedicationPendingNavigation';

const PatientSession: React.FC = () => {
    const { setLoading } = UseLoading();
    const { HandleConnectionAppError } = UseGlobalResponse();
    UseGlobalSocketHandling();
    UseGetQuestionnaires({ setLoading, HandleConnectionAppError});
    UseGetMedications({setLoading, HandleConnectionAppError});
    useMedicationPendingNavigation();

    return <PatientTab />
};

export default PatientSession;