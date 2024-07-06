import { useState } from "react";

export const UseRememberMe = () => {
    const [rememberMe, setRememberMe] = useState(false);

    const HandleRememberMe = () => {
        setRememberMe(prev => !prev);
    }

    return { rememberMe, HandleRememberMe }
}