import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { screenHeight, screenWidth } from '../../utils/layout/Screen_Size';
import { LinearGradient } from 'expo-linear-gradient';
import { UseAuth } from '../../features/root/providers/AuthenticationProvider';
import images from '@assets/images';
import { UseLoading } from '@hooks/loading/UseLoading';
import DefaultLoading from '@components/loading/DefaultLoading';

interface ErrorAppProps {
    error: string;
    reloadData?: React.Dispatch<React.SetStateAction<boolean>>;
    resolveError: () => void;
    loading: boolean;
    setTryConnection: React.Dispatch<React.SetStateAction<boolean>>;
}

function ErrorApp({ setTryConnection, loading, error, reloadData, resolveError }: ErrorAppProps) {
    const { signOut } = UseAuth();

    const backButtonImg = images.generic_images.back.arrow_back_patient;
    const logoError = images.generic_images.logo.logo_mobile_error;

    const handleResolveError = async () => {
        console.log("\nResolve Error\n")
        if (!reloadData) return console.log("Sem reload");
        reloadData(true);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerTouch} onPress={() => signOut()}>
                    <Image style={styles.icon} source={backButtonImg} />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <Image style={styles.logo} source={logoError} />
                <View style={styles.textContainer}>
                    {
                        !loading ?
                            <>
                                <Text style={styles.title}>Houve um erro ao conectar ao servidor</Text>
                                <Text style={styles.message}>{error ? `${error}` : "Erro desconhecido"}</Text>
                            </>
                            :
                            <>
                                <Text style={styles.title}>Tentando se reconectar</Text>
                                <Text style={styles.message}>Aguarde um momento...</Text>
                            </>
                    }
                </View>
                <LinearGradient colors={["rgba(162, 85, 173, 0.8)", "#5954b0"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0.05, y: 1 }} style={styles.buttonGradient}>
                    <TouchableOpacity style={styles.button} onPress={() => handleResolveError()}>
                        {
                            loading ?
                                <DefaultLoading size={30} color={'white'} />
                                :
                                <Text style={styles.buttonText}>Tentar novamente</Text>}
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: screenHeight,
        width: screenWidth,
        alignItems: 'center',
        display: 'flex',
        padding: 30,
    },
    header: {
        width: '100%',
        height: screenHeight * 0.1,
        justifyContent: 'center',
    },
    headerTouch: {
        width: '100%',
    },
    icon: {
        width: 40,
        height: 40,
    },
    content: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        gap: 20,
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 15,
        borderRadius: 100,
    },
    textContainer: {
        width: '100%',
        minHeight: screenHeight * 0.15,
        display: 'flex',
        gap: 10,
    },
    title: {
        fontSize: 22,
        textAlign: 'center',
        color: '#928ed1',
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        color: '#b7b6cf',
    },
    buttonGradient: {
        width: screenWidth * 0.75,
        borderRadius: 40,
        marginVertical: 15,

    },
    button: {
        width: '100%',
        minHeight: screenHeight * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 20,

        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: 'white',
    },
});

export default ErrorApp