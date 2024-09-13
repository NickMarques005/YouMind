import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { UserData, UserType } from 'types/user/User_Types';
import { FontAwesome5, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';
import DefaultLoading from '@components/loading/DefaultLoading';
import { HandleProfileRestrictionChangeParams } from '../hooks/useProfileRestrictionsHandling';

interface ChangeProfileToPublicProps {
    handleProfileRestrictionChange: ({ private_treatment, onSuccess }: HandleProfileRestrictionChangeParams) => Promise<void>;
    userType: UserType;
    userData: UserData;
    treatmentLoading: boolean;
    publicLoading: boolean;
    avatarIconSize: number;
    buttonIconSize: number;
    explanationIconSize: number;
    handleGoBack: () => void;
}

const ChangeProfileToPublic = ({
    handleProfileRestrictionChange,
    handleGoBack, userType, publicLoading,
    treatmentLoading, userData,
    avatarIconSize, buttonIconSize,
    explanationIconSize }: ChangeProfileToPublicProps) => {
    console.log(userData.private_treatment);
    return (
        <View style={styles.container}>
            <View style={[styles.header, { borderColor: userType === 'doctor' ? 'rgba(139, 113, 150, 0.3)' : 'rgba(139, 113, 150, 0.3)' }]}>
                <View style={styles.avatarContainer}>
                    <View style={[styles.avatarWrapper, { width: avatarIconSize, height: avatarIconSize, borderRadius: avatarIconSize / 2, left: avatarIconSize * 0.9, backgroundColor: '#e9f0f2' }]}>
                        {userData.avatar ? (
                            <Image source={{ uri: userData.avatar }} style={[styles.avatar, { width: avatarIconSize, height: avatarIconSize, borderRadius: avatarIconSize / 2 }]} />
                        ) : (
                            <FontAwesome5 name={userType === 'doctor' ? "user-md" : 'user-alt'} size={avatarIconSize * 0.4} color={userType === 'doctor' ? '#5ba4ba' : '#9e5bba'} />
                        )}
                    </View>
                    <LinearGradient
                        colors={userData?.type === 'doctor' ? ['#2f7570', '#5ba4ba'] : ['#682f75', '#9f5bba']}
                        style={[styles.lockIconContainer, { width: avatarIconSize, height: avatarIconSize, borderRadius: avatarIconSize / 2, right: avatarIconSize * 0.9 }]}
                    >
                        <MaterialCommunityIcons name={"shield-lock"} size={avatarIconSize * 0.5} color="white" />
                    </LinearGradient>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.titleText}>{`Você restringiu seu perfil ${userData.private_treatment ? "para todos" : ''}`}</Text>
                    <Text style={[styles.subTitleText, { color: userType === 'doctor' ? '#5d7173' : '#66647d' }]}>
                        {`Seus dados pessoais estão privados para outros usuários ${userType === 'doctor' && userData.private_treatment ? "e seus pacientes" : ''}`}
                    </Text>
                </View>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <View style={styles.buttonContainer}>
                        <View style={[styles.buttonIconWrapper, { width: buttonIconSize, height: buttonIconSize, backgroundColor: userType === 'doctor' ? 'rgba(157, 175, 191, 0.7)' : 'rgba(181, 157, 191, 0.7)', borderRadius: buttonIconSize / 2 }]}>
                            <TouchableOpacity
                                disabled={publicLoading || treatmentLoading}
                                style={[styles.touchableOpacity, { opacity: publicLoading || treatmentLoading ? 0.8 : 1 }]}
                                onPress={() => handleProfileRestrictionChange({ onSuccess: handleGoBack })}
                            >
                                {
                                    publicLoading ?
                                        <DefaultLoading size={buttonIconSize * 0.5} color="white" />
                                        :
                                        <FontAwesome name="unlock" size={buttonIconSize * 0.5} color="white" />
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={{ maxWidth: buttonIconSize * 2 }}>
                            <Text style={[styles.buttonText, { color: userType === 'doctor' ? '#628485' : '#7a6285' }]}>
                                Remover restrição
                            </Text>
                        </View>
                    </View>
                    {
                        userType === 'doctor' &&
                        <View style={styles.buttonContainer}>
                            <View style={[styles.buttonIconWrapper, { width: buttonIconSize, height: buttonIconSize, backgroundColor: userType === 'doctor' ? 'rgba(157, 175, 191, 0.7)' : 'rgba(181, 157, 191, 0.7)', borderRadius: buttonIconSize / 2 }]}>
                                <TouchableOpacity
                                    disabled={publicLoading || treatmentLoading}
                                    style={[styles.touchableOpacity, { opacity: publicLoading || treatmentLoading ? 0.8 : 1 }]}
                                    onPress={() => handleProfileRestrictionChange({ private_treatment: !userData.private_treatment, onSuccess: handleGoBack })}
                                >
                                    {
                                        treatmentLoading ?
                                            <DefaultLoading size={buttonIconSize * 0.5} color="white" />
                                            :
                                            <MaterialCommunityIcons name={userData.private_treatment ? "account-lock-open" : "account-lock"} size={buttonIconSize * 0.5} color="white" />
                                    }
                                </TouchableOpacity>
                            </View>
                            <View style={{ maxWidth: buttonIconSize * 2 }}>
                                <Text style={[styles.buttonText, { color: userType === 'doctor' ? '#628485' : '#7a6285' }]}>
                                    {userData.private_treatment ? "Remover restrição de seus pacientes" : "Restringir seus pacientes"}
                                </Text>
                            </View>
                        </View>
                    }
                </View>
            </View>
            <View style={styles.explanationContainer}>
                <View style={styles.explanationRow}>
                    <View style={[styles.explanationIconWrapper, { width: explanationIconSize, height: explanationIconSize }]}>
                        {
                            userType === 'doctor' ?
                                <FontAwesome5 name="users" size={explanationIconSize * 0.7} color={'#5d7173'} />
                                :
                                <FontAwesome5 name="user-md" size={explanationIconSize * 0.7} color={'#66647d'} />
                        }
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: userType === 'doctor' ? '#5d7173' : '#66647d' }}>
                            {`${userType === 'patient' ? `${userData.private_treatment ? "Ninguém além de você poderá" : "Somente seu doutor enquanto estiver em tratamento"} poderá visualizar suas informações pessoais.` :

                                `${userData.private_treatment ? "Ninguém além de você poderá" : "Somente seus pacientes enquanto estiverem em tratamento poderão"} visualizar suas informações pessoais.`
                                }`}
                        </Text>
                    </View>
                </View>
                {
                    userType === 'doctor' &&
                    <View style={styles.explanationRow}>
                        <View style={[styles.explanationIconWrapper, { width: explanationIconSize, height: explanationIconSize }]}>
                            <MaterialCommunityIcons name="magnify" size={explanationIconSize * 0.7} color="#5d7173" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: '#5d7173' }}>
                                {`${userType === 'doctor' ? 'Novos pacientes' : 'Doutores'} ainda poderão procurar você e enviar uma solicitação para iniciar um novo tratamento.`}
                            </Text>
                        </View>
                    </View>
                }
            </View>
        </View>
    )
}

export default ChangeProfileToPublic;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        paddingVertical: '6%',
        borderBottomWidth: 1.5,
        gap: 10,
        alignItems: 'center',
        width: '100%',
    },
    avatarContainer: {
        paddingVertical: '5%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    avatarWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        elevation: 5,
    },
    avatar: {
        borderRadius: 50,
    },
    lockIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        elevation: 5,
        zIndex: 2,
        borderWidth: 6,
        borderColor: '#f5f0fc',
    },
    textContainer: {
        paddingVertical: '5%',
        gap: 10,
    },
    titleText: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: '700',
        color: 'black',
    },
    subTitleText: {
        fontSize: 15,
        textAlign: 'center',
    },
    buttonContainer: {
        gap: 5,
        alignItems: 'center',
    },
    buttonIconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    touchableOpacity: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center'
    },
    explanationContainer: {
        paddingVertical: '5%',
        width: '100%',
        gap: 10,
    },
    explanationRow: {
        flexDirection: 'row',
        width: '100%',
        gap: 10,
        alignItems: 'center',
    },
    explanationIconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});