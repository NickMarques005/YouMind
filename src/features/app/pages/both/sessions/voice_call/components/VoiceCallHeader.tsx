import React from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface VoiceCallHeaderProps {
    onBackPress: () => void;
    backIconSize: number;
}

const VoiceCallHeader = ({ onBackPress, backIconSize }: VoiceCallHeaderProps) => {
    return (
        <View style={{ height: '10%', width: '100%', paddingHorizontal: 10 }}>
            <TouchableOpacity onPress={onBackPress}>
                <MaterialCommunityIcons
                    name="chevron-left"
                    size={backIconSize}
                    color="white"
                    style={{ width: backIconSize, height: backIconSize }}
                />
            </TouchableOpacity>
        </View>
    );
};

export default VoiceCallHeader;