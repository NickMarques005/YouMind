import { useContext, useCallback } from 'react';
import { UseLoading } from "../../contexts/LoadingContext";
import { LoadingAction } from '../../types/loading/Loading_Types';
import { Response } from '../../types/service/Request_Types';

export const UseRequest = () => {
    const { setLoading } = UseLoading();

    const HandleRequest = useCallback(async <T,>(actionKey: LoadingAction, serviceFunction: (...args: any[]) => Promise<Response<T>>, ...params: any[]): Promise<Response<T>> => {
        setLoading(actionKey, true);
        try {
            const response: Response<T> = await serviceFunction(...params);
            return response;
        }
        catch (err) {
            throw err;
        }
        finally {
            setLoading(actionKey, false);
        }
    }, [setLoading]);

    return { HandleRequest };
};



