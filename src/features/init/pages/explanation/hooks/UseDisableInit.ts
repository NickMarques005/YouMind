import { useState, useCallback } from 'react';

const UseDisableInit = () => {
    const [showDisableInitModal, setShowDisableInitModal] = useState<boolean>(false);

    const ShowDisableInitModal = useCallback(() => {
        setShowDisableInitModal(true);
    }, []);

    const HideDisableInitModal = useCallback(() => {
        setShowDisableInitModal(false);
    }, []);

    return {
        showDisableInitModal,
        ShowDisableInitModal,
        HideDisableInitModal,
    };
};

export default UseDisableInit;