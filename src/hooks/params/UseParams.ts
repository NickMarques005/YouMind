import { useEffect, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { GenericRouteParams } from 'types/params/Params_Type';
import { MessageIcon } from '@components/modals/message/types/type_message_modal';

interface DetailedParams {
    type?: MessageIcon;
    message?: string;
    [key: string]: any;
}

export interface RouteParams {
    params?: DetailedParams;
}

export function UseParams<T extends RouteParams>() {
    const route = useRoute<GenericRouteParams<T>>();

    const [params, setParams] = useState<T | undefined>(undefined);
    const [paramType, setParamType] = useState<MessageIcon | undefined>(undefined);
    const [hasParams, setHasParams] = useState<boolean>(false);

    const HandleParams = (newParams: T, paramType?: MessageIcon | undefined) => {
        console.log("SETANDO NOVOS PARAMETROS: ", newParams);
        setParams(newParams);
        if (paramType) {
            setParamType(paramType)
        }
    };

    const ClearParams = () => {
        setParams(undefined);
        setHasParams(false);
    };

    useEffect(() => {
        if (route.params && route.params.params) {
            const newParams = { ...route.params.params };
            console.log("Params: ", newParams);
            const { type, message } = newParams;
            if (message) {
                const paramsObject = { params: { message, type } } as T;
                HandleParams(paramsObject, type);
                setHasParams(true);
            }
        } else {
            console.log("Não há parâmetros no momento.");
            setHasParams(false);
        }
    }, [route.params]);

    return {
        params,
        paramType,
        HandleParams,
        ClearParams,
        hasParams,
        setHasParams
    };
}

export default UseParams;