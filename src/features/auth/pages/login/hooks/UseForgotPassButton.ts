import { useState } from "react";

export const UseForgotPassButton = () => {
    const [forgotPassModal, setForgotPassModal] = useState(false);

    const HandleForgotPassModalVisibility = () => {
        setForgotPassModal(prev => !prev);
    }

    return { forgotPassModal, HandleForgotPassModalVisibility }
}