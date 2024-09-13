import React from 'react';
import DefaultModal from '@components/modals/default/DefaultModal';
import VerificationModalContent from '@components/modals/verification/VerificationModalContent';
import { UserData } from 'types/user/User_Types';

interface CloseTreatmentVerificationProps {
    userData: UserData;
    verificationMessage: string;
    handleVerificationAccept: () => void;
    handleCloseVerification: () => void;
    acceptText?: string;
}

const CloseTreatmentVerification: React.FC<CloseTreatmentVerificationProps> = ({ userData, verificationMessage, acceptText, handleVerificationAccept, handleCloseVerification }) => {
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
                icon={"completed"}
                userType={userData.type}
                closeModal={handleCloseVerification}
            />
        </DefaultModal>
    );
};

export default CloseTreatmentVerification;