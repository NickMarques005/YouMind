import React from 'react';
import { View, FlatList } from 'react-native';
import { Directions, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import QuestionaireCard from './QuestionaireCard';
import { SharedValue } from 'react-native-reanimated';


type Questionaire = {
    id: number;
    name: string;
    date: string;
    expired: boolean;
    checked: boolean;
    new: boolean;
    total_questions: number;
    positive_questions: number;
};

type QuestionaireListProps = {
    questionaires: Questionaire[];
    activeIndex: SharedValue<number>;
};

const QuestionaireList: React.FC<QuestionaireListProps> = ({ questionaires, activeIndex }) => {
    
    
    
    return (
        <>
            {
                questionaires.map((questionaire, index) => {
                    return (
                        <QuestionaireCard 
                            questionaire={questionaire}
                            key={questionaire.id.toString()}
                            activeIndex={activeIndex}
                            index={index}
                            totalLength={questionaires.length - 1}
                            />
                    )
                })
            }
        </>
    )
};

export default QuestionaireList;