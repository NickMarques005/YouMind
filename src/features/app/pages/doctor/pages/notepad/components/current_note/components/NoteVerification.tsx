import React from 'react';
import DefaultModal from '@components/modals/default/DefaultModal';
import VerificationModalContent from '@components/modals/verification/VerificationModalContent';
import { UserData } from 'types/user/User_Types';

export type NoteBehavior = 'delete' | 'update' | 'update_exit';

interface NoteVerificationProps {
    userData: UserData;
    verificationMessage: string;
    handleVerificationAccept: () => void;
    handleVerificationDecline?: () => void;
    handleCloseVerification: () => void;
    acceptText?: string;
    declineText?: string;
    behavior?: NoteBehavior;
    loading?: boolean;
    notClose?: boolean;
}

const NoteVerification: React.FC<NoteVerificationProps> = ({
    userData, verificationMessage,
    acceptText, declineText, handleVerificationAccept,
    handleVerificationDecline,
    handleCloseVerification, behavior, loading, notClose }) => {

    const icon = behavior === 'update' ? 'edit'
        : behavior === 'delete' ? 'delete'
            : undefined;

    return (
        <DefaultModal
            disableGestures={loading}
            isVisible={!!verificationMessage}
            onClose={handleCloseVerification}
        >
            <VerificationModalContent
                message={verificationMessage}
                titleCancel={declineText || "Cancelar"}
                titleConfirm={acceptText || "Aceitar"}
                handleConfirm={handleVerificationAccept}
                handleDecline={handleVerificationDecline}
                icon={icon || 'description'}
                userType={userData.type}
                closeModal={handleCloseVerification}
                loading={loading}
                notClose={notClose}
            />
        </DefaultModal>
    );
};

export default NoteVerification;