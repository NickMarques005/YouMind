import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { Text } from 'react-native';
import images from '@assets/images';
import { responsiveSize } from '@utils/layout/Screen_Size';
import { MessageSelected } from 'types/chat/Chat_Types';

interface SelectedTaggedMessagesHeaderProps {
    handleBack: () => void;
    handleRemove: (selectedMessages: MessageSelected[]) => void;
    handleMark: (selectedMessages: MessageSelected[], isMarked: boolean) => void;
    selectedMessages: MessageSelected[];
}

const SelectedTaggedMessagesHeader: React.FC<SelectedTaggedMessagesHeaderProps> = ({
    handleBack,
    handleRemove,
    handleMark,
    selectedMessages,
}) => {
    const [markMessages, setMarkMessages] = useState<boolean>(selectedMessages.some(message => message.isMarked === true));
    const iconSize = responsiveSize * 0.07;
    const backIcon = images.generic_images.back.arrow_back_white;

    const allMessagesOwn = selectedMessages.every(message => message.ownMessage);

    useEffect(() => {
        if (selectedMessages.length > 0) {
            const hasUnmarkedMessages = selectedMessages.some(message => !message.isMarked);
            setMarkMessages(hasUnmarkedMessages);
        } else {
            setMarkMessages(false);
        }
    }, [selectedMessages]);

    return (
        <View style={styles.header_container}>
            <View style={{ gap: 20, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={handleBack}>
                    <Image style={{ width: iconSize, height: iconSize }} source={backIcon} />
                </TouchableOpacity>
                <Text style={{ fontSize: 25, fontWeight: '500', color: 'white'}}>
                    {selectedMessages.length}
                </Text>
            </View>

            <View style={styles.actionsContainer}>
                {allMessagesOwn && (
                    <TouchableOpacity onPress={() => handleRemove(selectedMessages)}>
                        <MaterialIcons name="delete" size={iconSize} color="white" />
                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => handleMark(selectedMessages, markMessages)}>
                    {markMessages ? (
                        <MaterialIcons name="star" size={iconSize} color="white" />
                    ) : (
                        <MaterialCommunityIcons name="star-off" size={iconSize} color="white" />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
    },
    actionsContainer: {
        flexDirection: 'row',
        gap: 20,
    },
});

export default SelectedTaggedMessagesHeader;