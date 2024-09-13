import { Priority, usePriority } from "@features/app/providers/bridge/PriorityProvider"

export const useRedirectModalBehavior = () => {
    const { addPriority } = usePriority();

    const handleRedirectTo = (priority: Priority) => {
        console.log("Go To Medication Pending!");
        addPriority(priority);
    }

    return {
        handleRedirectTo,
    }
}