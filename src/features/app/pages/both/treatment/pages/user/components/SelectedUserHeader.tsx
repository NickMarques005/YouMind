import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SearchUserData } from 'types/treatment/Search_Types';
import { LoadingStructure } from 'types/loading/Loading_Types';
import { screenHeight } from '@utils/layout/Screen_Size';

interface SelectedUserHeaderProps {
    selectedUser: SearchUserData;
    handleBackSearch: (selectedUserData: SearchUserData) => void;
    solicitationLoading: LoadingStructure;
    backIcon: number;
    backIconSize: number;
    iconUserSize: number;
    userIcon: number;
}

const SelectedUserHeader = ({
    selectedUser,
    handleBackSearch,
    solicitationLoading,
    backIcon,
    backIconSize,
    userIcon,
    iconUserSize
}: SelectedUserHeaderProps) => {

    return (
        <View style={styles.headerSelectedUser_View}>
            <View style={styles.backView}>
                <TouchableOpacity
                    disabled={solicitationLoading.loading}
                    onPress={() => {
                        handleBackSearch(selectedUser);
                    }}
                    style={[
                        styles.selectedUserTreatment_BackButton,
                        { width: backIconSize, height: backIconSize, opacity: solicitationLoading.loading ? 0.5 : 1 }
                    ]}
                >
                    <Image
                        style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
                        source={backIcon}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.selectedUserTreatmentImg_View}>
                <View
                    style={[
                        styles.selectedUserIcon_View,
                        {
                            width: iconUserSize,
                            height: iconUserSize,
                            borderRadius: iconUserSize,
                            backgroundColor: `${selectedUser.type === "doctor" ? "rgba(108, 181, 212, 0.2)" : "rgba(157, 108, 212, 0.2)"}`
                        }
                    ]}
                >
                    <Image
                        style={{ width: '100%', height: '100%' }}
                        source={selectedUser.avatar ? { uri: selectedUser.avatar } : userIcon}
                    />
                </View>
            </View>
        </View>
    );
}

export default SelectedUserHeader;

const styles = StyleSheet.create({
    headerSelectedUser_View: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: screenHeight * 0.3,
    },
    backView: {
        display: 'flex',
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: '6%',
    },
    selectedUserTreatment_BackButton: {},
    selectedUserTreatmentImg_View: {},
    selectedUserIcon_View: {
        overflow: 'hidden',
        elevation: 18,
    },
});