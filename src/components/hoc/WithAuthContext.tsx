//HOC (Higher-Order Component) para permitir acesso ao AuthContext fora da árvore de renderização do componente

import React, { ComponentType } from 'react';
import { UseAuth, AuthContextData } from '../../features/root/providers/AuthenticationProvider';

interface WithAuthContextProps {
    AuthContext: AuthContextData;
}

const WithAuthContext = <P extends object>(
    AuthComponent: ComponentType<P & WithAuthContextProps> | React.FC<P & WithAuthContextProps>
) => {
    return (props: P) => {
        const AuthContext = UseAuth();
        return <AuthComponent {...props as P} AuthContext={AuthContext} />;
    };
};

export default WithAuthContext;
