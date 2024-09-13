import { FormatISOToStringDate } from '@utils/date/DateFormatting';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DailyMotivationalPhrase } from 'types/motivational_phrase/MotivationalPhrase_Types';

interface PhraseItemProps {
    item: DailyMotivationalPhrase;
    phraseIconSize: number;
    viewedIconSize: number;
    handleCurrentPhrase: (selectedPhrase: DailyMotivationalPhrase) => void;
    closeModal: () => void;
}

const PhraseItem = ({ item, phraseIconSize,
    viewedIconSize, handleCurrentPhrase, closeModal }: PhraseItemProps) => {
    return (
        <TouchableOpacity onPress={() => {
            handleCurrentPhrase(item)
            closeModal();
        }} style={styles.phraseContainer}>
            <View style={[{
                width: phraseIconSize,
                height: phraseIconSize,
                borderRadius: phraseIconSize / 2,
            }, styles.phraseContainerIcon]}>
                <Icon name="format-quote" size={phraseIconSize * 0.6} color="#fff" style={{ transform: [{ scaleX: -1 }] }} />
            </View>
            <View style={styles.phraseContainerText}>
                <Text
                    numberOfLines={1}
                    style={styles.phraseText}>{item.text}</Text>
            </View>
            <View style={[{
                width: phraseIconSize,
                height: phraseIconSize,
                borderRadius: phraseIconSize / 2,
                alignSelf: 'flex-end'
            }, styles.phraseContainerIcon]}>
                <Icon name="format-quote" size={phraseIconSize * 0.6} color="#fff"  />
            </View>
            <View style={styles.phraseFooter}>
                <Text style={styles.phraseDate}>{item.usedAt && FormatISOToStringDate(item.usedAt)}</Text>
                <View style={{ gap: 10, flexDirection: 'row' }}>
                    {
                        item.viewed &&
                        <Text style={{ fontSize: 15, color: 'rgba(255, 255, 255, 0.8)' }}>
                            {"Visualizada"}
                        </Text>
                    }
                    <Icon
                        name={item.viewed ? 'visibility' : 'visibility-off'}
                        size={viewedIconSize}
                        color={item.viewed ? '#4CAF50' : '#BDBDBD'}
                        style={styles.icon}
                    />
                </View>

            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    phraseContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.4)',
    },
    phraseContainerIcon: {
        backgroundColor: '#200926',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5
    },
    phraseContainerText: {
    },
    phraseText: {
        fontSize: 18,
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: '600'
    },
    phraseFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15
    },
    phraseDate: {
        fontSize: 14,
        color: '#dfcfe3',
    },
    icon: {
        color: '#dfcfe3'
    },
});

export default PhraseItem;