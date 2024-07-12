import { useCallback } from 'react';
import { LoginBackendDataResponse } from 'types/auth/Auth_Types';
import { SetLoading } from 'types/loading/Loading_Types';
import { Response } from 'types/service/Request_Types';

export interface ServiceFunction<T, Params extends any[]> {
    (...args: Params): Promise<Response<T>>;
}

export interface RequestParams<T, Params extends any[]> {
    serviceFunction: ServiceFunction<T, Params>;
    setLoading: SetLoading;
    params: Params;
    firebaseFunction?: (res: Response<T>) => Promise<Response<T>>;
    stopLoading?: boolean;
}

export const UseRequest = () => {

    const HandleRequest = useCallback(async <T, Params extends any[]>(
        { serviceFunction, setLoading, params, firebaseFunction, stopLoading = true }: RequestParams<T, Params>
    ): Promise<Response<T>> => {
        setLoading(true);
        let response: Response<T>;
        try {
            response = await serviceFunction(...params);
            if (firebaseFunction && response.success) {
                response = await firebaseFunction(response);
            }
            return response;
        } catch (err) {
            console.log("(Use Request) Error: ", err);
            throw err;
        } finally {
            if (stopLoading) {
                setLoading(false);
            }
        }
    }, []);

    return { HandleRequest };
};



