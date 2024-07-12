import React from 'react';
import DefaultModal from '@components/modals/default/DefaultModal';
import VerificationModalContent from '@components/modals/verification/VerificationModalContent';
import { UserData } from 'types/user/User_Types';

export type NoteBehavior = 'delete' | 'update';

interface NoteVerificationProps {
    userData: UserData;
    verificationMessage: string;
    handleVerificationAccept: () => void;
    handleCloseVerification: () => void;
    acceptText?: string;
    behavior?: NoteBehavior;
}

const NoteVerification: React.FC<NoteVerificationProps> = ({
    userData, verificationMessage,
    acceptText, handleVerificationAccept,
    handleCloseVerification, behavior }) => {

    const icon = behavior === 'update' ? 'edit'
        : behavior === 'delete' ? 'delete'
            : undefined;

    return (
        <DefaultModal
            disableGestures={false}
            isVisible={!!verificationMessage}
            onClose={handleCloseVerification}
        >
            <VerificationModalContent
                message={verificationMessage}
                titleCancel="Cancelar"
                titleConfirm={acceptText || "Aceitar"}
                handleConfirm={handleVerificationAccept}
                icon={icon || 'description'}
                userType={userData.type}
                closeModal={handleCloseVerification}
            />
        </DefaultModal>
    );
};

export default NoteVerification;