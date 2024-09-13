import { useCallback, useState } from 'react';
import { Notice, NoticeType } from 'types/notice/Notice_Types';
import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';
import { UserData } from 'types/user/User_Types';
import { UseAppNavigation } from '../navigation/UseAppNavigation';
import { UseTreatmentService } from '@hooks/api/UseTreatmentService';

export interface UseNoticeManagerProps {
    setNoticeLoading: React.Dispatch<React.SetStateAction<boolean>>;
    userData?: UserData;
}

export const useNoticeManager = ({ setNoticeLoading, userData }: UseNoticeManagerProps) => {
    const { HandleResponseAppError } = UseGlobalResponse();
    const { performRemoveWelcomeTreatment } = UseTreatmentService(setNoticeLoading);
    const { navigateToAppScreen } = UseAppNavigation();

    const handleDontShow = useCallback(async (notice: Notice, dontShowState: boolean) => {
        if(!dontShowState)
        {
            return;
        }
        
        const noticeType = notice.type;
        
        switch (noticeType) {
            case 'welcome':
                if (userData) {
                    console.log("Não mostrar o aviso novamente");
                    await performRemoveWelcomeTreatment(userData?.type);
                }
            break;
            case 'questionary':
                break;
            case 'medicine':
                break;
            case 'update':
                break;
            default:
                console.log("Tipo de aviso desconhecido");
                break;
        }
        
        
    }, [userData]);

    const handleNoticeAccept = useCallback(async (notice: Notice) => {
        const noticeType = notice.type;
        
        try {
            switch (noticeType) {
                case 'welcome':
                    navigateToAppScreen('welcome');
                    break;
                case 'questionary':
                    console.log("Aviso de questionário");
                    break;
                case 'medicine':
                    console.log("Aviso de Medicamento");
                    break;
                case 'update':
                    console.log("Aviso de Atualização");
                    break;
                default:
                    console.log("Tipo de aviso desconhecido");
                    break;
            }

        } catch (err) {
            const error = err as Error;
            HandleResponseAppError(error.message);
        }
    }, [userData]);

    return {
        handleNoticeAccept,
        handleDontShow
    };
};