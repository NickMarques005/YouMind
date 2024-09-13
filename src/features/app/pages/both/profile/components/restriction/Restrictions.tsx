import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import { responsiveSize, screenHeight } from '@utils/layout/Screen_Size';
import LinearGradient from 'react-native-linear-gradient';
import ChangeProfileToPublic from './components/ChangeProfileToPublic';
import ChangeProfileToPrivate from './components/ChangeProfileToPrivate';
import { useProfileRestrictionsHandling } from './hooks/useProfileRestrictionsHandling';
import { UseLoading } from '@hooks/loading/UseLoading';
import { UserData, UserType } from 'types/user/User_Types';
import { useProfileRestrictionsBehavior } from './hooks/useProfileRestrictionsBehavior';

const ProfileRestrictions = () => {

    const { userData, UpdateSpecificDataInUser } = UseForm();
    const restrictionsLoading = UseLoading();
    const treatmentRestrictionsLoading = UseLoading();
    const avatarIconSize = responsiveSize * 0.25;
    const buttonIconSize = responsiveSize * 0.17;
    const explanationIconSize = responsiveSize * 0.08;

    const { handleGoBack } = useProfileRestrictionsBehavior();
    const { handleProfileRestrictionChange } = useProfileRestrictionsHandling({ restrictionsLoading, treatmentRestrictionsLoading, updateUserData: UpdateSpecificDataInUser });

    return (
        <View style={{ height: screenHeight * 0.9, width: '100%' }}>
            <LinearGradient
                colors={userData?.type === 'doctor' ? ['#d3e9eb', 'rgba(191, 172, 143, 0.1)'] : ['#ebd3eb', 'rgba(191, 143, 179, 0.1)']}
                style={{ width: '100%', flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ width: '100%', minHeight: screenHeight * 0.9, gap: 20, padding: 20, justifyContent: 'space-between'}}>
                        {
                            userData?.private ?
                                <ChangeProfileToPublic
                                    handleGoBack={handleGoBack}
                                    handleProfileRestrictionChange={handleProfileRestrictionChange}
                                    userType={userData?.type as UserType}
                                    treatmentLoading={treatmentRestrictionsLoading.loading}
                                    publicLoading={restrictionsLoading.loading}
                                    userData={userData as UserData}
                                    avatarIconSize={avatarIconSize}
                                    buttonIconSize={buttonIconSize}
                                    explanationIconSize={explanationIconSize}
                                />
                                :
                                <ChangeProfileToPrivate
                                    handleGoBack={handleGoBack}
                                    handleProfileRestrictionChange={handleProfileRestrictionChange}
                                    userType={userData?.type as UserType}
                                    loading={restrictionsLoading.loading}
                                    userData={userData as UserData}
                                    avatarIconSize={avatarIconSize}
                                    buttonIconSize={buttonIconSize}
                                    explanationIconSize={explanationIconSize}

                                />
                        }
                        <View style={{ width: '100%', height: screenHeight * 0.08 }}>
                            <LinearGradient
                                colors={userData?.type === 'doctor' ? ['#42959e', '#5ba4ba']
                                    : ['#8a42ad', '#9f5bba']}
                                style={{ borderRadius: 10, flex: 1, }}
                            >
                                <TouchableOpacity disabled={restrictionsLoading.loading} onPress={handleGoBack} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', opacity: restrictionsLoading.loading ? 0.5 : 1 }}>
                                    <Text style={{ fontSize: 16, fontWeight: '500', color: 'rgba(255, 255, 255, 0.8)' }}>
                                        {`Voltar`}
                                    </Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </View>
    )
}

export default ProfileRestrictions

const styles = StyleSheet.create({

});