import { Menu } from "@hooks/menu/Menu";
import { ChatMenuOptionNames, MenuOptionDetails } from "./ChatMenuOptions";
import useChatMenuActions from "./ChatMenuActions";

const useChatMenuBehavior = () => {
    const chatMenuActions = useChatMenuActions();

    const chatMenu = new Menu(MenuOptionDetails);
    chatMenu.addOption(ChatMenuOptionNames.CALL, chatMenuActions.handleCall);
    chatMenu.addOption(ChatMenuOptionNames.APPOINTMENTS, chatMenuActions.handleAppointments);
    chatMenu.addOption(ChatMenuOptionNames.SEND_TO_NOTES, chatMenuActions.handleSendToNotes);
    chatMenu.addOption(ChatMenuOptionNames.STARRED_MESSAGES, chatMenuActions.handleStarredMessages);

    return { options: chatMenu.getOptions() };
}

export default useChatMenuBehavior;