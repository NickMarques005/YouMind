import { usePriority } from "@features/app/providers/bridge/PriorityProvider";
import { UseBridgeNavigation } from "../navigation/UseBridgeNavigation";

export const useRouteRedirection = () => {
    const { 
        replaceNavigationToAppStackScreen,
        replaceNavigationToPriorityStackScreen
    } = UseBridgeNavigation();
    const { highestPriority, priorityList } = usePriority();

    // Efeito para navegar automaticamente baseado na prioridade mais alta
    const handlePriorityNavigationRedirect = () => {
        if (highestPriority) {
            switch (highestPriority) {
                case 'medicationPending':
                    replaceNavigationToPriorityStackScreen('alert_medication')
                    break;
                case 'voiceCall':
                    replaceNavigationToPriorityStackScreen('voice_call')
                    break;
                case 'motivationalPhrase':
                    replaceNavigationToPriorityStackScreen('motivational_phrase')
                    break;
                case 'questionnaireAnswer':
                    replaceNavigationToPriorityStackScreen('answer_questionnaire')
                    break;
                default:
                    replaceNavigationToAppStackScreen('main_page');
                    break;
            }
        }
    }

    const handleAppNavigationRedirect = () => {
        replaceNavigationToAppStackScreen('main_page');
    }

    const handleRouteNavigationRedirect = () => {
        if (priorityList.length === 0) {
            handleAppNavigationRedirect();
        }
        else {
            handlePriorityNavigationRedirect();
        }
    }

    return {
        handlePriorityNavigationRedirect,
        handleAppNavigationRedirect,
        handleRouteNavigationRedirect
    };
}