import { useEffect, useState } from 'react';
import { SharedValue, withTiming, Easing, useSharedValue } from 'react-native-reanimated';
import { NoteTemplate } from 'types/app/doctor/notepad/Notepad_Types';

interface UsePageHandlingProps {
    initialContent: string[];
    handleUpdateNewContent: (updatedContent: string[]) => void;
    newNote: NoteTemplate;
}

export const usePageHandling = ({ initialContent, handleUpdateNewContent, newNote }: UsePageHandlingProps) => {
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

    useEffect(() => {
        if(newNote.content !== editContent)
        {
            handleUpdateNewContent(editContent);
        }
    }, [editContent]);

    return {
        editContent,
        activeIndex,
        addPage,
        deletePage,
        setEditContent
    };
}