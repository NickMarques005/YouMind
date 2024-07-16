import React from 'react';
import DefaultModal from '@components/modals/default/DefaultModal';
import VerificationModalContent from '@components/modals/verification/VerificationModalContent';
import { UserData } from 'types/user/User_Types';
import { SelectedNotification } from '../hooks/UseNotificationManager';
import { NotificationData } from 'types/notification/Notification_Types';

interface SolicitationProps {
    userData: UserData;
    selectedNotification: SelectedNotification;
    modalLoading: { loading: boolean };
    handleClearSelectedNotification: () => void;
    handleNotificationAccept: (notification: NotificationData, removeNotification?: () => void) => Promise<void>;
}

const Solicitation: React.FC<SolicitationProps> = ({ userData, selectedNotification, modalLoading, handleClearSelectedNotification, handleNotificationAccept }) => {
    return (
        <DefaultModal
            disableGestures={modalLoading.loading}
            isVisible={!!selectedNotification}
            onClose={handleClearSelectedNotification}
        >
            <VerificationModalContent
                message={selectedNotification.notification.body}
                titleCancel={selectedNotification.notification.titleCancel || 'Cancelar'}
                titleConfirm={selectedNotification.notification.titleAccept || 'Aceitar'}
                handleConfirm={() => handleNotificationAccept(selectedNotification.notification, selectedNotification.removeNotification)}
                icon={selectedNotification.notification.icon}
                userType={userData.type}
                closeModal={handleClearSelectedNotification}
            />
        </DefaultModal>
    );
};

export default Solicitation;