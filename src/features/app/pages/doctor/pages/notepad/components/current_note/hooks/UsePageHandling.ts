import { useState } from 'react';
import { SharedValue, withTiming, Easing, useSharedValue } from 'react-native-reanimated';

interface UsePageHandlingProps {
    initialContent: string[];
}

export const usePageHandling = ({ initialContent }: UsePageHandlingProps) => {
    const [editContent, setEditContent] = useState<string[]>(initialContent);
    const activeIndex = useSharedValue(0);

    const addPage = (index: number) => {
        setEditContent(prev => {
            const newPages = [...prev];
            newPages.splice(index + 1, 0, "");
            return newPages;
        });
        if (activeIndex.value === 0 && editContent.length === 0) return;
        activeIndex.value = withTiming(activeIndex.value + 1, { duration: 400, easing: Easing.ease });
    };

    const deletePage = (index: number) => {
        setEditContent(prev => {
            const newPages = [...prev];
            if (newPages.length > 0) {
                newPages.splice(index, 1);
            }
            return newPages;
        });
        activeIndex.value = withTiming(Math.max(0, activeIndex.value - 1), { duration: 400, easing: Easing.ease });
    };

    return {
        editContent,
        activeIndex,
        addPage,
        deletePage,
        setEditContent
    };
}