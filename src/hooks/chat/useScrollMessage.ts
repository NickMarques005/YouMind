import { useState } from "react"

export const useScrollMessage = () => {
    const [currentMessageScrollingId, setCurrentMessageScrollingId] = useState<string | undefined>(undefined);

    const clearCurrentMessageScrolling = () => {
        setCurrentMessageScrollingId(undefined);
    }

    const handleCurrentMessageScrolling = (id: string) => {
        setCurrentMessageScrollingId(id);
    }

    return { 
        currentMessageScrollingId,
        clearCurrentMessageScrolling,
        handleCurrentMessageScrolling
    }
}