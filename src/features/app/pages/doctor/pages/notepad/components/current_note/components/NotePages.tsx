import React, { useEffect, useState } from 'react';
import { FlatList, Animated, View, Image, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Directions, FlingGestureHandler, State } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SharedValue } from 'react-native-reanimated';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import Page from './Page';
import images from '@assets/images';

const SPACING = 10;
const ITEM_WIDTH = screenWidth * 0.76;
const VISIBLE_ITEMS = 3;

interface NotePagesProps {
    content: string[];
    setContent: React.Dispatch<React.SetStateAction<string[]>>;
    activeIndex: SharedValue<number>;
}


const NotePages = ({ content, activeIndex, setContent }: NotePagesProps) => {
    const reversedContentData = content.slice().reverse();
    const dragIcon = images.app_doctor_images.notepad.drag_up;

    const renderPage = ({ item, index }: { item: string; index: number }) => {
        return (
            <Page
                setContent={setContent}
                content={content}
                activeIndex={activeIndex}
                index={index}
                totalLength={content.length - 1}
            />
        );
    };

    return (
        <SafeAreaView style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            {
                reversedContentData.length === 0 ?
                    <View style={{ width: '50%', alignItems: 'center', gap: 15, }}>
                        <View style={{width: screenWidth*0.3, height: screenWidth * 0.3}}>
                            <Image style={{ width: '100%', height: '100%' }} source={dragIcon} />
                        </View>

                        <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>Arraste para cima para adicionar nova página ao seu bloco de anotações</Text>
                    </View>
                    :
                    <FlatList
                        data={reversedContentData}
                        keyExtractor={(_, index) => String(index)}
                        horizontal
                        contentContainerStyle={{
                            flex: 1,
                            padding: 40,
                        }}
                        scrollEnabled={true}
                        renderItem={renderPage}
                    />
            }
        </SafeAreaView>

    );
};

export default NotePages;




