import { useContext, useCallback } from 'react';
import { LoadingState, SetLoading } from '../../types/loading/Loading_Types';
import { Response } from '../../types/service/Request_Types';

export interface ServiceFunction<T, Params extends any[]> {
    (...args: Params): Promise<Response<T>>;
}

export const UseRequest = () => {

    const HandleRequest = useCallback(async <T ,Params extends any[]>(
        serviceFunction: ServiceFunction<T, Params>,
        setLoading: SetLoading,
        ...params: Params
    ): Promise<Response<T>> => {
        setLoading(true);
        try {
            const response: Response<T> = await serviceFunction(...params);
            return response;
        }
        catch (err) {
            console.log("(Use Request) Error: ", err);
            throw err;
        }
        finally {
            setLoading(false);
        }
    }, []);

    return { HandleRequest };
};



