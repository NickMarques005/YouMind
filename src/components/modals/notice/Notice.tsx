import React from 'react';
import DefaultModal from '@components/modals/default/DefaultModal';
import NoticeContent from './NoticeModalContent';
import { Notice } from 'types/notice/Notice_Types';

interface NoticeProps {
    userType: string;
    selectedNotice: Notice | null;
    noticeLoading: boolean;
    handleClearSelectedNotice: () => void;
    handleNoticeAccept: (notice: Notice) => Promise<void>;
    handleDontShow: (notice: Notice, dontShowState: boolean) => Promise<void>;
}

const NoticeModal: React.FC<NoticeProps> = ({ 
    userType, selectedNotice, 
    noticeLoading, handleClearSelectedNotice, 
    handleNoticeAccept, handleDontShow }) => {
    
    return (
        <DefaultModal
            disableGestures={noticeLoading}
            isVisible={!!selectedNotice}
            onClose={handleClearSelectedNotice}
        >
            {
            selectedNotice && (
                <NoticeContent
                    notice={selectedNotice}
                    closeModal={handleClearSelectedNotice}
                    handleConfirm={handleNoticeAccept}
                    userType={userType}
                    noticeLoading={noticeLoading}
                    handleDontShow={handleDontShow}
                />
            )}
        </DefaultModal>
    );
};

export default NoticeModal;