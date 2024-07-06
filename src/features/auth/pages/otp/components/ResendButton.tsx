import React, { useEffect, useRef } from 'react';
import { Animated, TouchableOpacity, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { resend_button_style } from '../styles/ResendButton';
import DefaultLoading from '@components/loading/DefaultLoading';

interface ResendButtonProps {
    onPress: () => void;
    loading: boolean;
    visible: boolean;
    validateLoading: boolean;
}

const ResendButton: React.FC<ResendButtonProps> = ({ onPress, loading, validateLoading, visible }) => {

    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(30)).current;

    const styles = resend_button_style();
    console.log(visible);

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                }),
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true
                })
            ]).start();
        }
        else{
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true
                }),
                Animated.timing(translateY, {
                    toValue: 30,
                    duration: 500,
                    useNativeDriver: true
                })
            ]).start();
        }
    }, [visible]);

    return (
        <Animated.View style={[styles.container, { opacity, transform: [{ translateY }] }]}>
            <TouchableOpacity disabled={validateLoading ? validateLoading : loading} onPress={onPress}>
                {
                    <LinearGradient
                        colors={['#823d94', '#4d2448']}
                        style={[styles.gradient, { opacity: loading ? 0.8 : validateLoading ? 0.8 : 1 }]}
                    >
                        {
                            loading ?
                                <DefaultLoading color={"white"} size={30} />
                                :
                                <Text style={styles.text}>REENVIAR CÓDIGO</Text>
                        }
                    </LinearGradient>
                }
            </TouchableOpacity>
        </Animated.View>
    );
};

export default ResendButton;