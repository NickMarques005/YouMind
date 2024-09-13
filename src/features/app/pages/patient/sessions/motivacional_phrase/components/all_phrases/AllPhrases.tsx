import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DailyMotivationalPhrase } from 'types/motivational_phrase/MotivationalPhrase_Types';
import PhraseItem from './components/PhraseItem';
import { responsiveSize, screenHeight } from '@utils/layout/Screen_Size';

interface AllPhrasesProps {
    closeModal: () => void;
    phrases: DailyMotivationalPhrase[];
    handleCurrentPhrase: (selectedPhrase: DailyMotivationalPhrase) => void;
}

const AllPhrases = ({ closeModal, phrases, handleCurrentPhrase }: AllPhrasesProps) => {
    const backIconSize = responsiveSize * 0.08;
    const phraseIconSize = responsiveSize * 0.07;
    const viewedIconSize = responsiveSize * 0.06;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={closeModal}>
                    <Icon name="close" size={backIconSize} color={'rgba(234, 221, 237, 0.8)'} />
                </TouchableOpacity>
            </View>
            <View style={{ width: '100%', marginVertical: '8%' }}>
                <Text style={styles.title}>Minhas frases</Text>
            </View>

            <View style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)'}}>
                <FlatList
                    data={phrases}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) =>
                    (
                        <PhraseItem item={item}
                            phraseIconSize={phraseIconSize}
                            viewedIconSize={viewedIconSize}
                            handleCurrentPhrase={handleCurrentPhrase}
                            closeModal={closeModal}
                        />
                    )
                    }
                    keyExtractor={(item) => item._id.toString()}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: screenHeight * 0.75,
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    },
    phraseContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    phraseText: {
        fontSize: 18,
        marginBottom: 8,
    },
    phraseFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    phraseDate: {
        fontSize: 14,
        color: '#999',
    },
    icon: {
        marginLeft: 10,
    },
});

export default AllPhrases;