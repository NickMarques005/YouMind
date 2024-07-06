import React from 'react';
import DoctorTab from '@navigation/tab-navigator/tabs/DoctorTab';
import { UseGetNotepad, UseGetPatientHistory, UseGetLatestHistory } from './hooks/UseGetDoctorInitialData';
import { UseLoading } from '@hooks/loading/UseLoading';
import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';
import UseGlobalSocketHandling from '@api/socket/SocketService';

const DoctorSession: React.FC = () => {
    
    const { loading, setLoading } = UseLoading();
    const { HandleConnectionAppError } = UseGlobalResponse();
    
    console.log("Re render")

    UseGetPatientHistory({setLoading, HandleConnectionAppError});
    UseGetLatestHistory({setLoading, HandleConnectionAppError});
    UseGetNotepad({ setLoading, HandleConnectionAppError});
    UseGlobalSocketHandling();

    return (
        <DoctorTab />
    );
};

export default DoctorSession;