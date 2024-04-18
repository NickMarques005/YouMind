import React, { useState, useEffect } from 'react'
import { View, Image, TextInput, TouchableOpacity, Text, StyleSheet, } from 'react-native';
import { screenHeight, screenWidth } from '../../../../../utils/layout/Screen_Size';
import { LinearGradient } from 'expo-linear-gradient';
import { UseNotepad } from '../../../../../providers/NotepadProvider';
import { NotepadType } from '../../../../../providers/NotepadProvider';
import Animated, { SharedValue, useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated';

interface NoteProps {
    content: string;
    index: number;
    totalLength: number;
    activeIndex: SharedValue<number>
}

function Note({ content, index, totalLength, activeIndex }: NoteProps) {
    const { notepadData, updateNotepad } = UseNotepad();
    const [currentNote, setCurrentNote] = useState(content);

    console.log("HELLO");

    const cardStyleProps = {
        cardGap: 15,
        maxVisibleCards: 4,
        cardWidth: screenWidth
    }

    const animatedStyleCard = useAnimatedStyle(() => {

        return {
            position: 'absolute',
            zIndex: totalLength - index,
            opacity: interpolate(
                activeIndex.value,
                [index - 1, index, index + 1],
                [0, 1, 1 - 1 / cardStyleProps.maxVisibleCards]
            ),
            transform: [
                {
                    translateX: interpolate(
                        activeIndex.value,
                        [index - 1, index, index + 1],
                        [cardStyleProps.cardWidth, 0, -(cardStyleProps.cardGap)],
                    )
                },
                {
                    scale: interpolate(
                        activeIndex.value,
                        [index - 1, index, index + 1],
                        [1.4, 1, 0.95]
                    )
                }]
        }
    })

    return (
        <Animated.View style={[{
            display: 'flex',
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderTopRightRadius: 5,
            height: screenHeight * 0.6,
            width: screenWidth * 0.78,
        }, animatedStyleCard]}>
            <LinearGradient colors={['#f7fafa', '#e4f0f2', '#cfe1e3']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.2, y: 1 }} style={[{ width: '100%', height: '100%', borderRadius: 10, }]}>
                <View style={{ paddingHorizontal: 30, paddingVertical: 30, }}>
                    <TextInput
                        style={{ fontSize: 18, height: '100%', textAlignVertical: 'top', lineHeight: 27, }}
                        value={currentNote}
                        onChangeText={(text) => setCurrentNote(text)}
                        multiline
                        maxLength={500}
                        
                    />
                </View>
            </LinearGradient>
        </Animated.View>
    )
}

export default Note;