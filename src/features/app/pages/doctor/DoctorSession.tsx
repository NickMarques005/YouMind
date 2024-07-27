import React, { useEffect } from 'react';
import DoctorTab from '@navigation/tab-navigator/tabs/DoctorTab';

import { UseLoading } from '@hooks/loading/UseLoading';
import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';
import UseGlobalSocketHandling from '@api/socket/SocketService';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import { UseAuth } from '@features/root/providers/AuthenticationProvider';
import { useGetDoctorInitialData } from './hooks/UseGetDoctorInitialData';

const DoctorSession: React.FC = () => {

    const { HandleConnectionAppError, stateAppLoading } = UseGlobalResponse();
    const { userData } = UseForm();
    const { uid } = UseAuth();
    const { getDoctorInitialData } = useGetDoctorInitialData({ setLoading: stateAppLoading.setLoading, HandleConnectionAppError });
    UseGlobalSocketHandling({ setLoading: stateAppLoading.setLoading, HandleConnectionAppError });

    useEffect(() => {
        getDoctorInitialData();
    }, [uid, userData?._id]);

    return (
            <DoctorTab />
    );
};

export default DoctorSession;