import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { SharedValue } from 'react-native-reanimated';
import { NoteTemplate } from 'types/app/doctor/notepad/Notepad_Types';
import { GestureDetector, PanGesture } from 'react-native-gesture-handler';

interface HeaderProps {
    currentNote: NoteTemplate;
    headerHeight: SharedValue<number>;
    handleBackNotePress: () => void;
    handleHeaderDragging: PanGesture;
    backIcon: any;
}

const Header: React.FC<HeaderProps> = ({
    currentNote,
    headerHeight,
    handleBackNotePress,
    handleHeaderDragging,
    backIcon
}) => {
    return (
        <GestureDetector gesture={handleHeaderDragging}>
            <LinearGradient colors={['#246e6d', '#429aa6', '#87b9cc']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }} style={styles.headerGradient}>
                <View style={styles.header}>
                    <View style={styles.titleView}>
                        <Text style={styles.title}>
                            {currentNote.title}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={handleBackNotePress} style={styles.backButton}>
                        <Image style={styles.backIcon} source={backIcon} />
                    </TouchableOpacity>
                </View>

                <Animated.View style={[styles.descriptionView, {
                    height: headerHeight
                }]}>
                    <Text style={styles.description}>
                        {currentNote.description}
                    </Text>
                </Animated.View>
            </LinearGradient>
        </GestureDetector>
    );
};

const styles = StyleSheet.create({
    headerGradient: {
        position: 'absolute',
        width: '100%',
        padding: 40,
        minHeight: '20%',
        display: 'flex',
        borderBottomRightRadius: 40,
        gap: 20,
        zIndex: 2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleView: {
        width: '80%',
    },
    title: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    backButton: {
        padding: 5
    },
    backIcon: {
        width: 45,
        height: 45,
    },
    descriptionView: {
        width: '100%',
        
    },
    description: {
        color: '#e1e8eb',
        fontSize: 16,
        width: '75%'
    }
});

export default Header;