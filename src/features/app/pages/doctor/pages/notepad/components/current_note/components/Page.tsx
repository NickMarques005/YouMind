import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Keyboard, TextInput, Text } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle, interpolate, withTiming, runOnJS, Easing } from 'react-native-reanimated';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { LinearGradient } from 'expo-linear-gradient';

interface PageProps {
    content: string[];
    setContent: React.Dispatch<React.SetStateAction<string[]>>;
    index: number;
    totalLength: number;
    activeIndex: SharedValue<number>;
}

const Page = ({ setContent, content, index, totalLength, activeIndex }: PageProps) => {
    const textInputRef = useRef<TextInput>(null);

    const handlePageTextChange = (text: string) => {
        console.log('changeText: ', text.length);
        const normalizedText = text.replace(/\r\n|\r/g, "\n");
        const lines = normalizedText.split('\n');
        if (lines.length > 10) {
            text = lines.slice(0, 10).join('\n');
        }

        if (normalizedText.length > 250) {
            text = normalizedText.substring(0, 250);
            console.log("Max text");
        }
        setContent(oldContent => {
            const newContent = [...oldContent];
            newContent[index] = text;
            return newContent;
        });
    };

    useEffect(() => {
        const showSub = Keyboard.addListener("keyboardDidShow", () => {
            console.log("Teclado exibido");

        });
        const hideSub = Keyboard.addListener("keyboardDidHide", () => {
            console.log("Teclado ocultado");

            if (textInputRef.current) {
                textInputRef.current.blur();
            }
        });

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

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
                },

            ]
        }
    });


    return (
        <Animated.View style={[styles.pageContainer, animatedStyleCard]}>
            <LinearGradient colors={['#f7fafa', '#e4f0f2', '#cfe1e3']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.2, y: 1 }} style={[styles.gradient]}>
                <View style={{ width: '100%', alignItems: 'flex-end' }}>
                    <Text style={styles.labelInput}>{index + 1}</Text>
                </View>
                <TextInput
                    ref={textInputRef}
                    style={styles.textInput}
                    multiline={true}
                    numberOfLines={10}
                    keyboardType={'default'}
                    onChangeText={handlePageTextChange}
                    value={content[index]}
                    placeholder={`Página ${index + 1}`}
                    onFocus={() => console.log("TextInput focado")}
                    onBlur={() => console.log("TextInput desfocado")}
                />
            </LinearGradient>
        </Animated.View>
    )
};

const styles = StyleSheet.create({
    pageContainer: {
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderTopRightRadius: 5,
        height: screenHeight * 0.55,
        width: screenWidth * 0.8,
    },
    gradient: {
        width: '100%',
        height: '100%',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
    },
    textInput: {
        width: '100%',
        flex: 1,
        textAlignVertical: 'top',
        fontSize: 18,
        color: '#1f2830',
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#326161'
    },
    labelInput: {
        fontSize: 20,
        color: 'rgba(50, 97, 97, 0.6)'
    }
});

export default Page;