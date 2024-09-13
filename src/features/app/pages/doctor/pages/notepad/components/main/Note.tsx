import { screenHeight } from "@utils/layout/Screen_Size";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { NoteTemplate } from "types/app/doctor/notepad/Notepad_Types";

interface NoteProps {
    item: NoteTemplate;
    handleSelectedNote: (note: NoteTemplate) => void;
    notePart: any;
}


const Note = ({ item, handleSelectedNote, notePart }: NoteProps) => {

    return (
        <TouchableOpacity
            onPress={() => {
                handleSelectedNote(item)
            }}
            style={styles.noteContainer}
            activeOpacity={0.9}
        >
            <View style={styles.shadowNote} />
            <LinearGradient colors={['#76a1ab', '#155a6b']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.2, y: 1 }} style={{ display: 'flex', flex: 1, width: '100%', borderTopRightRadius: 30, borderBottomRightRadius: 20, alignItems: 'center', elevation: 5, height: '100%' }}>
                <View style={{ position: 'absolute', left: '-30%', bottom: '10%' }}>
                    <Image source={notePart} style={{ height: screenHeight * 0.2, width: 100 }} />
                </View>
                <View style={{ paddingRight: 20, paddingLeft: 30, paddingVertical: 20 }}>
                    <View style={{ width: '100%', height: '100%', paddingLeft: 3, gap: 15, }}>
                        <View style={styles.noteTitleView}>
                            <Text style={styles.noteTitle}>{item.title}</Text>
                        </View>
                        <Text style={styles.noteDescription}>{item.description}</Text>
                    </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    noteContainer: {
        height:screenHeight * 0.27,
        maxWidth: '50%',
        flex: 1,
        padding: '3%',
    },
    shadowNote: {
        position: 'absolute',
        left: 2,
        bottom: 12,
        right: 13,
        top: 5,
        backgroundColor: '#ced6db',
        borderTopRightRadius: 25,
        borderBottomRightRadius: 22,
        zIndex: -1,
    },
    gradient: {
        flex: 1,
        width: '100%',
        borderTopRightRadius: 30,
        borderBottomRightRadius: 20,
        alignItems: 'center',
        elevation: 5,
        height: '100%',
    },
    noteTouch: {
        paddingRight: 20,
        paddingLeft: 30,
        paddingVertical: 20,
    },
    noteInner: {
        width: '100%',
        height: '100%',
        paddingLeft: 3,
        gap: 15,
    },
    noteTitleView: {
        borderWidth: 1,
        borderColor: '#c0ccd1',
        borderRadius: 5,
        padding: 3,
    },
    noteTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#fafeff',
        textAlign: 'center'
    },
    noteDescription: {
        fontSize: 8,
        color: '#c0ccd1',
        textAlign: 'left'
    },
    emptyContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 15
    },
    emptyText: {
        fontSize: 18,
        color: 'rgba(117, 143, 156, 1)'
    }
});

export default Note;