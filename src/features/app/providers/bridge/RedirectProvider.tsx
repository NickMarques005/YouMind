import React, { createContext, useContext, useEffect, useState } from 'react';
import { UseForm } from '../sub/UserProvider';
import usePatientMainRedirections from '@features/app/pages/patient/hooks/redirect/usePatientRedirections';
import { usePriority } from './PriorityProvider';
import { useRouteRedirection } from '@features/app/hooks/route/UseRouteRedirection';

interface RedirectContextProps {
    handleEnableRedirects: () => void;
    handleDisableRedirects: () => void;
}

const RedirectContext = createContext<RedirectContextProps | undefined>(undefined);

export const RedirectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    
    const { userData } = UseForm();
    const { highestPriority } = usePriority();
    const { handleRouteNavigationRedirect } = useRouteRedirection();
    const [redirectEnabled, setRedirectEnabled] = useState<boolean>(false);

    const handleEnableRedirects = () => {
        if(!redirectEnabled)
        {
            setRedirectEnabled(true);
        }
    }

    const handleDisableRedirects = () => {
        if(redirectEnabled)
        {
            setRedirectEnabled(false);
        }
    }

    if(userData?.type === 'patient')
    {
        usePatientMainRedirections();
    }

    useEffect(() => {
        console.log("Redirect Enabled: ", redirectEnabled);
        if(redirectEnabled)
        {
            handleRouteNavigationRedirect();
        }
    }, [highestPriority, userData, redirectEnabled]);

    return (
        <RedirectContext.Provider value={{ handleEnableRedirects, handleDisableRedirects }}>
            {children}
        </RedirectContext.Provider>
    );
};

export const useRedirect = () => {
    const context = useContext(RedirectContext);
    if (!context) {
        throw new Error('context precisa ser dentro do provider! (useRedirect)');
    }
    return context;
};