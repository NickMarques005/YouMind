import React, { useEffect, useState } from 'react';
import { View, Text, FlatList,Animated } from 'react-native';
import { Directions, FlingGestureHandler, State } from 'react-native-gesture-handler';
import { screenWidth, screenHeight } from '../../../../../utils/layout/Screen_Size';
import Note from './Note';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SharedValue } from 'react-native-reanimated';

const SPACING = 10;
const ITEM_WIDTH = screenWidth * 0.76;
const VISIBLE_ITEMS = 3;

interface CarouselNotesProps {
    content_data: string[];
    activeIndex: SharedValue<number>;
}


const CarouselNotes = ({ content_data, activeIndex }: CarouselNotesProps) => {
    const scrollXIndex = React.useRef(new Animated.Value(0)).current;
    const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
    const [index, setIndex] = React.useState(0);
    const [currentNote, setCurrentNote] = useState<string[]>(content_data);
    const [note, setNote] = useState('');
    const reversedContentData = content_data.slice().reverse();

    useEffect(() => {
        const handleCurrentNoteChange = (text: string, index: number) => {
            const truncatedText = text.slice(0, 500);
            const updatedCurrentNote = [...currentNote];
            updatedCurrentNote[index] = truncatedText;
            setCurrentNote(updatedCurrentNote);
            console.log(currentNote);
        }

        handleCurrentNoteChange(note, index);

    }, [note]);


    const renderNoteItem = ({ item, index }: { item: string; index: number }) => {

        return (
            <Note  
            content={item}
            activeIndex={activeIndex}
            index={index}
            totalLength={content_data.length - 1}
            />
        );
    };

    return (

        <SafeAreaView style={{ height: screenHeight, width: '100%', justifyContent: 'center' }}>
            <FlatList
                data={reversedContentData}
                keyExtractor={(_, index) => String(index)}
                horizontal
                contentContainerStyle={{
                    flex: 1,
                    padding: 40,
                }}
                scrollEnabled={false}
                renderItem={renderNoteItem}
            />
        </SafeAreaView>

    );
};

export default CarouselNotes;




