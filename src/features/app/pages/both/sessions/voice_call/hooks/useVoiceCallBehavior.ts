import { Priority } from "@features/app/providers/bridge/PriorityProvider";
import { CallStatus } from "@utils/design/Color";
import { useState } from "react";

interface UseVoiceCallBehaviorParams {
    removePriority: (priority: Priority) => void;
}


const useVoiceCallBehavior = ({ removePriority }: UseVoiceCallBehaviorParams) => {

    const [callStatus, setCallStatus] = useState<CallStatus>('waiting');

    const handleCallStatus = (status: CallStatus) => {
        setCallStatus(status);
    }

    const handleLeaveCall = () => {
        removePriority('voiceCall');
    }

    return {callStatus, handleCallStatus, handleLeaveCall }
}

export default useVoiceCallBehavior;