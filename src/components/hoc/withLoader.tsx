import React, { useEffect, useState } from 'react';
import LoadingAuthScreen from '../loading/LoadingScreen';
import { ApiRequest } from '../../services/APIService';
import { UseAuth } from '../../features/root/providers/AuthenticationProvider';
import MiniLoading from '../loading/MiniLoading';
import { FetchData } from '../../services/fetchUtils/APIUtils';
import USE_ENV from '../../services/server_url/ServerUrl';

interface ApiRequestData {
    route: string;
    method: string;
    data?: object;
}

interface WrappedComponentProps {
    data: any;
    message: string | undefined;
    errors: string[] | undefined;
    reloadData: () => void;
    additional_data: object | undefined;
}

const WithLoader = (WrappedComponent: React.FC, apiRequestData: ApiRequestData, type_loading: 'main_loading' | 'mini_loading', additional_data: object | undefined) => {

    return (props: any) => {

        const { authData } = UseAuth();
        const [loading, setLoading] = useState(true);
        const [data, setData] = useState<any>();
        const [errors, setErrors] = useState<string[] | undefined>(undefined);
        const [message, setMessage] = useState<string | undefined>(undefined);
        const { fullApiServerUrl } = USE_ENV();

        console.log("LOADER REMOUNT!");

        useEffect(() => {
            console.log("FETCH DATA!!");
            const fetchDataWrapper = async () => {
                const result = await FetchData(apiRequestData, {accessToken: authData.accessToken, refreshToken: authData.refreshToken}, fullApiServerUrl);
                if (result.success) {
                    setData(result.data);
                    setMessage(result.message);
                    setLoading(false);
                }
                else {
                    setErrors(result.errors);
                    setLoading(false);
                }
            }

            fetchDataWrapper();

        }, []);

        const reloadData = () => {
            setErrors(undefined);
            setMessage(undefined);
            setData(undefined);
            setLoading(true);
            const fetchDataAgain = async () => {
                console.log("(WithLoader) Fetching Again...");
                const result = await FetchData(apiRequestData, {accessToken: authData.accessToken, refreshToken: authData.refreshToken});
                if (result.success) {
                    setData(result.data);
                    setMessage(result.message);
                    setLoading(false);
                }
                else {
                    setErrors(result.errors);
                    setLoading(false);
                }
            }
            fetchDataAgain();
        }

        return loading ?
            type_loading == "main_loading" ?
                <LoadingAuthScreen />
                :
                <MiniLoading />
            : <WrappedComponent {...props} data={data} message={message} errors={errors} reloadData={reloadData} additional_data={additional_data} />
    }
}

export default WithLoader;