import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { responsiveSize, screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import useMenuAnimation from '@hooks/animation/UseMenuAnimation';
import { UserType } from 'types/user/User_Types';
import DefaultTaggedMessagesHeader from './DefaultTaggedMessagesHeader';
import SelectedTaggedMessagesHeader from './SelectedTaggedMessagesHeader';
import Animated from 'react-native-reanimated';
import { MessageSelected } from 'types/chat/Chat_Types';
import { useHeaderAnimation } from '@hooks/animation/useHeaderAnimation';
import { useTaggedMessageMainHeaderManager } from './hooks/useMainTaggedMessageHeaderManager';
import { TaggedHeaderType } from '@utils/header/chatTypes';
import TaggedMenu from '../menu/TaggedMenu';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

interface MainTaggedMessagesHeaderProps {
    userType: UserType;
    taggedMenu: boolean;
    isSelecting: boolean;
    selectedMessages: MessageSelected[];
    handleTaggedMenu: () => void;
    handleBackToChat: () => void;
    clearSelection: () => void;
    deleteSelectedMessages: (selectedMessages: MessageSelected[]) => void;
    unmarkSelectedMarkedMessages: (selectedMessages: MessageSelected[], isMarked: boolean) => void;
}

const MainTaggedMessagesHeader = ({
    userType,
    taggedMenu,
    isSelecting,
    selectedMessages,
    handleBackToChat,
    handleTaggedMenu,
    clearSelection,
    deleteSelectedMessages,
    unmarkSelectedMarkedMessages
}: MainTaggedMessagesHeaderProps) => {

    const [currentHeader, setCurrentHeader] = useState<TaggedHeaderType>(TaggedHeaderType.DEFAULT);
    const { opacity, translateY, closeMenu } = useMenuAnimation({ isVisible: taggedMenu, onClose: handleTaggedMenu });
    const { switchHeader, headerAnimatedStyle } = useHeaderAnimation({ currentHeader, setCurrentHeader });

    const vertMenuIconSize = responsiveSize * 0.08;

    useTaggedMessageMainHeaderManager({
        isSelecting,
        switchHeader
    });

    return (
        <>
            <View style={[{ backgroundColor: userType === 'doctor' ? '#3a94a6' : '#9b3aa6' }, styles.mainContainer]}>
                <Animated.View style={[{ flex: 1 }, headerAnimatedStyle]}>
                    {
                        currentHeader === TaggedHeaderType.DEFAULT ? (
                            <DefaultTaggedMessagesHeader
                                userType={userType}
                                handleBackToChat={handleBackToChat}
                            />
                        ) : (
                            <SelectedTaggedMessagesHeader
                                handleBack={clearSelection}
                                handleRemove={deleteSelectedMessages}
                                handleMark={unmarkSelectedMarkedMessages}
                                selectedMessages={selectedMessages}
                            />
                        )
                    }
                </Animated.View>
                <View style={{ paddingLeft: 20}}>
                    <TouchableOpacity onPress={() => { taggedMenu ? closeMenu() : handleTaggedMenu() }} style={styles.menuButton}>
                        <MaterialIcon name="more-vert" size={vertMenuIconSize} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            {taggedMenu && (
                <TaggedMenu
                    opacity={opacity}
                    translateY={translateY}
                    closeTaggedMenu={closeMenu}
                    userType={userType as UserType}
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        width: screenWidth,
        height: screenHeight * 0.12,
        top: 0,
        zIndex: 1,
        paddingLeft: 15,
        paddingRight: 20,
        elevation: 80,
        alignItems: 'center',
    },
    menuButton: {
        alignItems: 'center',
    },
});

export default MainTaggedMessagesHeader;