import React from "react";
import { View, Text, Image } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UserData } from "types/user/User_Types";

interface VoiceCallUserDetailsProps {
    avatar: any;
    avatarOtherUserIconSize: number;
    userData?: UserData;
}

const VoiceCallUserDetails = ({ avatar, avatarOtherUserIconSize, userData }: VoiceCallUserDetailsProps) => {
    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <View style={{
                width: '100%',
                height: avatarOtherUserIconSize * 2.1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <View style={{
                    position: 'absolute',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    width: avatarOtherUserIconSize * 2.1,
                    height: avatarOtherUserIconSize * 2.1,
                    borderRadius: (avatarOtherUserIconSize * 2.1) / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                }} />
                <View style={{
                    position: 'absolute',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    width: avatarOtherUserIconSize * 1.575,
                    height: avatarOtherUserIconSize * 1.575,
                    borderRadius: (avatarOtherUserIconSize * 1.575) / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                }} />
                <View style={{
                    backgroundColor: '#dadbe3',
                    width: avatarOtherUserIconSize,
                    height: avatarOtherUserIconSize,
                    borderRadius: avatarOtherUserIconSize / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 25,
                    overflow: 'hidden',
                    borderColor: 'white',
                    borderWidth: 10,
                }}>
                    {
                        avatar ? (
                            <Image source={{ uri: avatar }} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                        ) :
                            userData?.type === 'doctor' ? (
                                <MaterialCommunityIcons name="account" size={avatarOtherUserIconSize * 0.8} color="rgba(120, 122, 128, 0.7)" />
                            ) : (
                                <MaterialCommunityIcons name="account" size={avatarOtherUserIconSize * 0.8} color="rgba(120, 122, 128, 0.7)" />
                            )
                    }
                </View>
            </View>
            <View style={{
                marginTop: 20,
                width: '90%',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 5,
            }}>
                <Text style={{
                    fontSize: 28,
                    fontWeight: '700',
                    color: 'white',
                    textAlign: 'center'
                }}
                    ellipsizeMode={'tail'}
                    numberOfLines={2}
                >
                    {`Usuário`}
                </Text>
                <Text style={{
                    fontSize: 16,
                    color: '#8b8a96'
                }}>
                    {
                        `Chamando`
                    }
                </Text>
            </View>
        </View>
    );
};

export default VoiceCallUserDetails;