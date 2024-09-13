import React from 'react';
import { View, StyleSheet, Modal, Platform, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { UserData, UserType } from 'types/user/User_Types';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { UseLoading } from '@hooks/loading/UseLoading';
import images from '@assets/images';
import SelectedUserToStartTreatment from '../../../user/SelectedUserToStartTreatment';
import { useSearchUserBehavior } from './hooks/UseSearchUserBehavior';
import { UseSearchUserHandling } from './hooks/UseSearchUserHandling';
import SearchContainer from './components/search_session/SearchContainer';
import Animated from 'react-native-reanimated';
import useFunctionalityModalAnimation from '@hooks/animation/UseFunctionalityModalAnimation';
import { useSearchAnimation } from './hooks/useSearchAnimation';

interface SearchUsersProps {
    visible: boolean;
    onClose: () => void;
    userData?: UserData;
    userType: UserType;
}

const SearchUsers = ({ visible, onClose, userData, userType }: SearchUsersProps) => {
    const { loading, setLoading } = UseLoading();
    const { opacity, closeAnimation } = useFunctionalityModalAnimation({ isVisible: visible, onClose });
    const { animatedStyle } = useSearchAnimation( { opacity });
    const { searchQueryText, searchResults, handleSearchResults,
        handleChooseUser, handleSearchQueryText
    } = useSearchUserBehavior({ visible });

    const { } = UseSearchUserHandling({ setLoading, userType, searchQueryText, handleSearchResults });

    const backIcon = images.generic_images.back.arrow_back_white;

    return (
        <Animated.View style={[styleSearchUsers.mainContainer, animatedStyle]}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <LinearGradient colors={[`${userType == "doctor" ? "rgba(87, 39, 76, 0.85)" : "rgba(40, 61, 82, 0.85)"}`, `${userType == "patient" ? 'rgba(100, 36, 107, 0.85)' : "rgba(24, 63, 71, 0.9)"}`]}
                    start={{ x: 0, y: 0.4 }}
                    end={{ x: 0, y: 1 }} style={styleSearchUsers.backgroundSearchView}>
                    <View style={styleSearchUsers.screen_Search}>
                        <SearchContainer
                            searchQueryText={searchQueryText}
                            searchResults={searchResults}
                            handleChooseUser={handleChooseUser}
                            handleSearchQueryText={handleSearchQueryText}
                            backIcon={backIcon}
                            loading={loading}
                            onClose={closeAnimation}
                            userData={userData}
                        />
                    </View>
                </LinearGradient>
            </KeyboardAvoidingView>
        </Animated.View>
    );
};

const styleSearchUsers = StyleSheet.create({
    mainContainer: {
        position: 'absolute', 
        height: screenHeight, 
        width: screenWidth, 
        zIndex: 10
    },
    backgroundSearchView: {
        flex: 1,
        width: screenWidth,
    },
    screen_Search: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        flex: 1,
        gap: 20,
    },
});

export default SearchUsers;