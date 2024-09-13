import DraggableModal, { RedirectModalTypes } from '@components/modals/draggable/DraggableModal';
import { useMedicationPending } from '@features/app/providers/patient/MedicationPendingProvider';
import React, { useMemo, useState } from 'react';
import VoiceCallRedirectModal from './voiceCall/VoiceCallRedirectModal';
import MedicationPendingRedirectModal from './medicationPending/MedicationPendingRedirectModal';
import { useRedirectModalBehavior } from './hooks/useRedirectModalBehavior';
import { UseForm } from '@features/app/providers/sub/UserProvider';

const RedirectModalManager = () => {
    const { userData } = UseForm();
    const [voiceCall, setVoiceCall] = useState(false);

    const { handleRedirectTo } = useRedirectModalBehavior();

    // Só utilizar o useMedicationPending se o userData.type for 'patient'
    const medicationData = userData?.type === 'patient' ? useMedicationPending() : null;

    // Configurações dos modais
    const modalConfigs = useMemo(() => {
        const configs = [];

        if (userData?.type === 'patient' && medicationData) {
            const { medicationPending, declined } = medicationData;

            configs.push({
                id: RedirectModalTypes.MEDICATION_PENDING,
                component: <MedicationPendingRedirectModal disabledMainAction={declined} />,
                isVisible: !!medicationPending,
                onClick: () => handleRedirectTo(RedirectModalTypes.MEDICATION_PENDING),
                disabledMainAction: declined,
            });
        }

        configs.push({
            id: RedirectModalTypes.VOICE_CALL,
            component: <VoiceCallRedirectModal />,
            isVisible: voiceCall,
            onClick: () => handleRedirectTo(RedirectModalTypes.VOICE_CALL),
            disabledMainAction: false,
        });

        return configs;
    }, [userData?.type, medicationData, voiceCall, handleRedirectTo]);

    return (
        <>
            {modalConfigs.map((modal, index) =>
                modal.isVisible && (
                    <DraggableModal
                        key={modal.id}
                        id={modal.id}
                        index={index}
                        children={modal.component}
                        onClick={modal.onClick}
                        isVisible={modal.isVisible}
                        disabledMainAction={modal.disabledMainAction}
                    />
                )
            )}
        </>
    );
};

export default RedirectModalManager;
