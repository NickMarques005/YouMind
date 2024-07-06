import { ReactNode } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from "react-native";
import { explanation_content_style } from "../styles/ExplanationContent";

const ExplanationContent = ({ }) => {

    const styles = explanation_content_style();

    return (
        <>
            <LinearGradient colors={['#ab32a5', '#8f228a', 'rgba(113, 46, 158, 0.2)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }} style={styles.containerFuncionamento}>
                <Text style={styles.textFuncionamento}>Funcionamento</Text>
            </LinearGradient>

            <View style={styles.containerLongText}>
                <Text style={[styles.longText, { fontWeight: 'bold', color: '#6e2e82' }]}>Olá, bem-vindo ao YouMind!</Text>
                <Text numberOfLines={6} style={styles.longText}>Esse aplicativo foi criado pela FWT, com a intenção de ajudar você, que enfrenta o transtorno de ansiedade e depressão, a vencer com o tratamento médico adequado. </Text>
                <Text numberOfLines={7} style={styles.longText}>Aqui você pode ter uma melhor visualização do seu desempenho, sendo feito questionários de como você está se sentindo.</Text>
                <Text numberOfLines={9} style={styles.longText}>Utilizando a parte de anotações, você pode marcar como você se sente a cada dia com cada etapa de tratamento e na função do medicamento registrador poderá ser adicionado horários para remédios, se você faz o uso de algum, sendo assim alertado para evitar que você esqueça. O intuito é que você consiga obter o melhor resultado para a melhora da sua saúde.</Text>
                <Text numberOfLines={6} style={styles.longText}>Para garantir a obtenção desses resultados, é solicitado que se inscreva e responda com sinceridade ao breve questionário, para que assim seja possível ter uma melhor precisão de cada resultado.</Text>
            </View>
        </>
    )
}

export default ExplanationContent;


