import { useEffect, useState } from "react";
import { runOnJS, useAnimatedStyle, useSharedValue, withTiming, Easing } from "react-native-reanimated";
import { Question } from "types/app/patient/health/Question_Types";

interface UseAnswerQuestionnaireAnimationsProps{
    questions?: Question[];
}

export const useAnswerQuestionnaireAnimations = ({ questions }:UseAnswerQuestionnaireAnimationsProps) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const fadeAnim = useSharedValue(0);

    const questionnaireAnimatedStyle = useAnimatedStyle(() => ({
        opacity: fadeAnim.value,
    }));

    useEffect(() => {
        fadeAnim.value = withTiming(1, { duration: 700, easing: Easing.ease });
    }, [currentQuestionIndex]);

    const updateQuestionIndex = (newIndex: number) => {
        setCurrentQuestionIndex(newIndex);
    };

    const HandleSpecificQuestion = (index: number) => {
        fadeAnim.value = withTiming(0, { duration: 500, easing: Easing.ease }, () => {
            runOnJS(updateQuestionIndex)(index);
        });
    }

    const handleNextQuestion = () => {
        if (questions && currentQuestionIndex < questions.length - 1) {
            fadeAnim.value = withTiming(0, { duration: 500, easing: Easing.ease }, () => {
                runOnJS(updateQuestionIndex)(currentQuestionIndex + 1);
            });
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            fadeAnim.value = withTiming(0, { duration: 500, easing: Easing.ease }, () => {
                console.log(currentQuestionIndex);
                runOnJS(updateQuestionIndex)(currentQuestionIndex - 1);
            });
        }
    };

    return {
        currentQuestionIndex,
        handleNextQuestion,
        handlePreviousQuestion,
        HandleSpecificQuestion,
        fadeAnim,
        questionnaireAnimatedStyle
    };
}