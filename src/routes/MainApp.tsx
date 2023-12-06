import React, { useState, useEffect } from 'react';
import AppStack from './AppStack';
import LoadingAuthScreen from '../components/loading/LoadingAuthScreen';
import { FetchData } from '../services/fetchUtils/APIUtils';
import { UseAuth } from '../contexts/AuthContext';
import USE_ENV from '../services/server_url/ServerUrl';

const startDataRequest = {
    url: "userData",
    method: 'GET',
}

function MainApp() {
    const { authData } = UseAuth();
    const [data, setData] = useState<any>();
    const [errors, setErrors] = useState<string[] | undefined>(undefined);
    const [message, setMessage] = useState<string | undefined>(undefined);
    const [mainLoading, setMainLoading] = useState(true);
    const { fullApiServerUrl } = USE_ENV();

    useEffect(() => {
        console.log("FETCH DATA!!");
        const fetchDataWrapper = async () => {
            console.log(startDataRequest);
            console.log("SERVER URL: ", fullApiServerUrl);
            const result = await FetchData(startDataRequest, authData.token, `${fullApiServerUrl}`);
            if (result.success) {
                setData(result.data);
                setMessage(result.message);
                setMainLoading(false);
            }
            else {
                setErrors(result.errors);
                setMainLoading(false);
            }
        }

        fetchDataWrapper();

    }, []);

    const reloadData = () => {
        setErrors(undefined);
        setMessage(undefined);
        setData(undefined);
        setMainLoading(true);
        const fetchDataAgain = async () => {
            const result = await FetchData(startDataRequest, authData.token);
            if (result.success) {
                setData(result.data);
                setMessage(result.message);
                setMainLoading(false);
            }
            else {
                setErrors(result.errors);
                setMainLoading(false);
            }
        }
        fetchDataAgain();
    }

    return (
        <>
            {
                mainLoading ?
                    <LoadingAuthScreen />
                    :
                    <AppStack data={data} message={message} errors={errors} reloadData={reloadData} />
            }
        </>
    )
}

export default MainApp