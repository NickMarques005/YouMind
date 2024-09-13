import { UseChat } from "@features/app/providers/bridge/ChatProvider";

const useTaggedMenuActions = () => {
    const { handleUnmarkAllMessages } = UseChat();

    const handleUnmarkAll = () => {
        handleUnmarkAllMessages();
    };

    return { handleUnmarkAll };
}

export default useTaggedMenuActions;