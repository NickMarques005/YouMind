import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Answer, FormattedAnswer } from 'types/app/patient/health/Question_Types';
import { UserType } from 'types/user/User_Types';
import { handleColorType } from '@utils/design/Color';

interface MetadataVisualizationProps {
    answers: Answer[];
    currentAnswer: FormattedAnswer;
    type: UserType;
}

const MetadataVisualization: React.FC<MetadataVisualizationProps> = ({ answers, currentAnswer, type }) => {
    const styles = createStyles(type);

    const hasMetadataAnswer = answers.some(answer =>
        answer.hasMetadata && answer.answer === currentAnswer.answer
    );

    if (hasMetadataAnswer && currentAnswer.metadata) {
        return (
            <View style={styles.metadataContainer}>
                <Text style={styles.metadataText}>
                    {currentAnswer.metadata}
                </Text>
            </View>
        );
    }

    return null;
};

const createStyles = (type: UserType) => StyleSheet.create({
    metadataContainer: {
        marginTop: '5%',
        borderRadius: 15,
        backgroundColor: handleColorType({ patientColor: '#f4f0f5', doctorColor: '#f0f2f5', userType: type }),
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: handleColorType({ patientColor: '#ad9eb0', doctorColor: '#9eadb0', userType: type }),
        alignItems: 'flex-start',
        padding: 10,
        minHeight: '25%',
    },
    metadataText: {
        flex: 1,
        fontSize: 17,
        color: handleColorType({ patientColor: '#4b2259', doctorColor: '#225059', userType: type }),
        overflow: 'scroll',
    },
});

export default MetadataVisualization;