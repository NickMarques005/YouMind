import { screenHeight } from "@utils/layout/Screen_Size";
import { useRef, useState } from "react";
import { FlatList, NativeScrollEvent, NativeSyntheticEvent } from "react-native";

export const useMessageListBehavior = () => {

    const [showScrollToBottom, setShowScrollToBottom] = useState(false);
    const flatListRef = useRef<FlatList>(null);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setShowScrollToBottom(offsetY > screenHeight);
    };

    const scrollToBottom = () => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
    };

    return {
        handleScroll,
        flatListRef,
        showScrollToBottom,
        scrollToBottom,
    }
}