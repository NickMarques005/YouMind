import { Menu } from "@hooks/menu/Menu";
import { ChatMenuOptionNames, MenuOptionDetails } from "./ChatMenuOptions";
import useChatMenuActions from "./ChatMenuActions";
import { UseForm } from "@features/app/providers/sub/UserProvider";

const useChatMenuBehavior = () => {
    const chatMenuActions = useChatMenuActions();
    const { userData } = UseForm();

    const chatMenu = new Menu(MenuOptionDetails);
    //chatMenu.addOption(ChatMenuOptionNames.CALL, chatMenuActions.handleCall);
    //chatMenu.addOption(ChatMenuOptionNames.APPOINTMENTS, chatMenuActions.handleAppointments);
    if(userData?.type === 'doctor') {
        chatMenu.addOption(ChatMenuOptionNames.SEND_TO_NOTES, chatMenuActions.handleSendToNotes);
    }
    
    chatMenu.addOption(ChatMenuOptionNames.STARRED_MESSAGES, chatMenuActions.handleMarkedMessages);

    return { options: chatMenu.getOptions() };
}

export default useChatMenuBehavior;