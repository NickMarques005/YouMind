import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Animated, Easing } from 'react-native';

interface TextAnimatorProps {
    content: string; 
    durationForEachWord: number; 
    style?: object;
    textStyle?: object; 
    onFinish?: () => void;
}

const TextAnimator: React.FC<TextAnimatorProps> = ({ content, durationForEachWord, 
    style, textStyle, onFinish }) => {
    const [textPhrase, setTextPhrase] = useState<string[]>([]);
    const [animatedValues, setAnimatedValues] = useState<Animated.Value[]>([]);

    // Atualizar o estado da frase e dos valores de animação
    useEffect(() => {
        const newTextPhrase = content.trim().split(' ');
        const newAnimatedValues = newTextPhrase.map(() => new Animated.Value(0));

        setTextPhrase(newTextPhrase);
        setAnimatedValues(newAnimatedValues);
    }, [content]);

    // Iniciar a animação após a atualização de `animatedValues`
    useEffect(() => {
        if (animatedValues.length === textPhrase.length && animatedValues.length > 0) {
            animateWords(animatedValues);
        }
    }, [animatedValues]);

    // Função para animar as palavras
    const animateWords = (values: Animated.Value[]) => {
        const animations = values.map((_, index) =>
            Animated.timing(values[index], {
                toValue: 1, // Anima até o valor 1 (opacidade total)
                duration: durationForEachWord,
                delay: index * (durationForEachWord / 2), // Delay para animar uma palavra de cada vez
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            })
        );

        // Executa as animações com um pequeno intervalo entre elas
        Animated.stagger(15, animations).start(() => {
            if (onFinish) {
                onFinish();
            }
        });
    };

    return (
        <View style={[style, styles.textWrapper]}>
            {animatedValues.length === textPhrase.length && textPhrase.map((word, index) => {
                const animatedStyle = {
                    opacity: animatedValues[index],
                    transform: [
                        {
                            translateY: animatedValues[index].interpolate({
                                inputRange: [0, 1],
                                outputRange: [20, 0],
                            }),
                        },
                    ],
                };

                return (
                    <Animated.Text key={`${word}-${index}`} style={[textStyle, animatedStyle]}>
                        {word}
                        {index < textPhrase.length - 1 ? ' ' : ''}
                    </Animated.Text>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    textWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
});

export default TextAnimator;