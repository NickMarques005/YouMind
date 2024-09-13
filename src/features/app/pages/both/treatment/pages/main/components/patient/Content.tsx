import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { screenHeight } from '@utils/layout/Screen_Size'
import { FontAwesome } from '@expo/vector-icons';

interface ContentProps {
    handleSearch: () => void;
}

const Content = ({ handleSearch }: ContentProps) => {

    const iconSize = 26;

    return (
        <View style={styles.messagesContent_Container}>
            <LinearGradient colors={[`#c48fb9`, '#854ba6', `#342954`]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }} style={styles.treatment_View}>
                <View style={styles.treatmentContentTemplate_View}>
                    <Text style={[styles.treatmentContentTemplate_Text]}>
                        Comece seu tratamento e cultive uma mente saudável!
                    </Text>
                </View>
                <View style={styles.treatmentInfo_View}>
                    <View style={styles.treatmentUserPatientView}>
                        <Text style={styles.treatmentUserPatientText}>
                            Em nosso espaço dedicado à saúde mental, acreditamos que cada passo em direção ao autocuidado é uma vitória. Se você ainda não está envolvido em um tratamento, procure por seu médico na barra de pesquisa abaixo.
                            O tratamento pode oferecer melhores insights, estratégias de enfrentamento e um espaço seguro para compartilhar seus pensamentos e sentimentos.
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => handleSearch()} style={styles.searchIcon_Button}>
                        <LinearGradient colors={[`#d683c5`, '#8e4d94', `#7685b3`,]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }} style={styles.startSearch_View}>
                            <FontAwesome name="search" size={screenHeight * ((iconSize + 5) / 1000)} color="white" />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    )
}

export default Content

const styles = StyleSheet.create({
    messagesContent_Container: {
        height: screenHeight,
        width: '100%',
    },
    treatment_View: {
        paddingTop: screenHeight * 0.2,
        height: '100%',
        width: '100%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingBottom: 20,
        gap: 20,
    },
    treatmentUserPatientView: {
        width: '100%',
        paddingHorizontal: 35,
    },
    treatmentContentTemplate_Text: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 24,
        width: '80%',
        textTransform: 'uppercase',
        textAlign: 'auto'
    },
    treatmentContentTemplate_View: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',

    },
    treatmentInfo_View: {
        display: 'flex',
        alignItems: 'center',
        gap: 15,
    },
    treatmentUserPatientText: {
        fontSize: 18,
        color: 'rgba(212, 184, 203, 0.9)',
        textAlign: 'justify',
        lineHeight: 25
    },
    startSearch_View: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        borderRadius: 50,
        justifyContent: 'center'
    },
    searchIcon_Button: {
        marginVertical: 20,
        width: 70,
        height: 70,
        borderRadius: 50,
        elevation: 12,
    },
});