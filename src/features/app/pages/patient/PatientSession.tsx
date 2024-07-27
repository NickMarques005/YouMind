import React, { useEffect } from 'react';
import PatientTab from '@navigation/tab-navigator/tabs/PatientTab';

import { UseLoading } from '@hooks/loading/UseLoading';
import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';
import UseGlobalSocketHandling from '@api/socket/SocketService';
import { useMedicationPendingNavigation } from './hooks/UseMedicationPendingNavigation';
import { useGetPatientInitialData } from './hooks/UseGetPatientInitialData';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import { UseAuth } from '@features/root/providers/AuthenticationProvider';

const PatientSession: React.FC = () => {
    const { HandleConnectionAppError, stateAppLoading } = UseGlobalResponse();
    const { userData } = UseForm();
    const { uid } = UseAuth();
    UseGlobalSocketHandling({ setLoading: stateAppLoading.setLoading, HandleConnectionAppError });
    useMedicationPendingNavigation(); 
    const { getPatientInitialData } = useGetPatientInitialData({ setLoading: stateAppLoading.setLoading, HandleConnectionAppError });

    useEffect(() => {
        getPatientInitialData();
    }, [uid, userData?._id]);

    return (
            <PatientTab />
    )
};

export default PatientSession;