import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { responsiveSize } from '@utils/layout/Screen_Size';

interface NoTreatmentsProps {
    treatmentsType: 'ended' | 'current';
}

const NoTreatments: React.FC<NoTreatmentsProps> = ({ treatmentsType }) => {
    const isCurrent = treatmentsType === 'current';
    const iconSize = responsiveSize * 0.2;
    const IconComponent = isCurrent ? MaterialIcons : MaterialCommunityIcons;
    const iconName = isCurrent ? 'history' : 'archive';
    const message = isCurrent ? 'Não há tratamentos sendo executados por você no momento' : 'Parece que não há tratamentos encerrados anteriormente. Quando seus tratamentos acabarem, irão aparecer aqui!';
    const noTreatmentsStyle = styles(iconSize);

    return (
        <View style={noTreatmentsStyle.container}>
            <View style={noTreatmentsStyle.iconContainer}>
                <IconComponent name={iconName} size={iconSize} color="#3277a8" />
            </View>

            <View style={noTreatmentsStyle.messageContainer}>
                <Text style={noTreatmentsStyle.text}>
                    {message}
                </Text>
            </View>
        </View>
    );
};

const styles = (iconSize: number) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    iconContainer: {
        width: iconSize * 2,
        height: iconSize * 2,
        borderRadius: iconSize,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 18,
        color: 'rgba(255, 255, 255, 0.7)',
        marginTop: 10,
        textAlign: 'center',
    },
    messageContainer: {
        width: '80%',

    }
});

export default NoTreatments;