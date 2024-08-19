import React, { useState, useEffect } from 'react';
import { View, Image, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList, Platform, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { UserData } from 'types/user/User_Types';
import NoSearch from './components/NoSearch';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { UseUserService } from '@hooks/api/UseUserService';
import { UseLoading } from '@hooks/loading/UseLoading';
import { SearchUserData } from 'types/treatment/Search_Types';
import UserTypeSolicitationTemplate from './components/UserTypeSolicitationTemplate';
import StartTreatment from './components/StartTreatment';
import images from '@assets/images';
import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';
import DefaultLoading from '@components/loading/DefaultLoading';

interface SearchUsersProps {
    visible: boolean;
    onClose: () => void;
    userData?: UserData;
    userType?: string;
}

const SearchUsers = ({ visible, onClose, userData, userType }: SearchUsersProps) => {
    const { loading, setLoading } = UseLoading();
    const { performFilterUsers } = UseUserService(setLoading);
    const { HandleResponseAppError } = UseGlobalResponse();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchUserData[]>([]);
    const [userPage, setUserPage] = useState(false);
    const [selectedUser, setSelectedUser] = useState<SearchUserData | null>(null);

    const handleChooseUser = (userData: SearchUserData) => {
        if (userPage && userData) {
            setSelectedUser(null);
            setUserPage(false);
            return;
        }
        console.log("Choose User: ", userData.name);
        setSelectedUser(userData);
        setUserPage(true);
    }

    const handleTypingSearch = async (data: string) => {

        const searchData = {
            search: data
        }

        console.log(searchData);

        try {

            if (!userType) {
                console.log("Erro: tipo de usuário não especificado");
                return;
            }

            const response = await performFilterUsers(searchData, userType);

            if (response.success) {
                console.log(response.data);
                setSearchResults(response.data || []);
            }
            else {

                if (response.error) {
                    console.error('Erro ao buscar usuários: ', response.error);
                    HandleResponseAppError(response.error);
                }
            }
        }
        catch (err) {
            const error = err as Error;
            console.error("Erro ao buscar usuários: ", err);
            HandleResponseAppError(error.message);
        }
    };

    useEffect(() => {
        if (!visible) {
            setSearchQuery('');
            setSearchResults([]);
        }
    }, [visible]);

    const backIcon = images.generic_images.back.arrow_back_white;

    return (
        <Modal transparent={true} visible={visible} animationType='fade'>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <LinearGradient colors={[`${userType == "doctor" ? "rgba(87, 39, 76, 0.85)" : "rgba(40, 61, 82, 0.85)"}`, `${userType == "patient" ? 'rgba(100, 36, 107, 0.85)' : "rgba(24, 63, 71, 0.9)"}`]}
                    start={{ x: 0, y: 0.4 }}
                    end={{ x: 0, y: 1 }} style={styleSearchUsers.backgroundSearchView}>
                    <View style={styleSearchUsers.screen_Search}>
                        {
                            userPage && selectedUser ?
                                <StartTreatment userSearch={selectedUser} handleBackSearch={handleChooseUser} userData={userData} />
                                :
                                <>
                                    <View style={styleSearchUsers.headerSearch}>
                                        <TouchableOpacity onPress={() => onClose()} style={styleSearchUsers.exitSearch_Button}>
                                            <Image style={{ height: '100%', width: '100%', resizeMode: 'contain' }} source={backIcon} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styleSearchUsers.searchContent}>
                                        <View style={styleSearchUsers.textInputSearch_View}>
                                            <FontAwesome name="search" size={screenHeight * ((22 + 5) / 1000)} color="white" />
                                            <TextInput
                                                placeholder={`Digite o nome do seu ${userData?.type === "patient" ? 'médico' : "paciente"}`}
                                                value={searchQuery}
                                                placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                                                onChangeText={(text) => {
                                                    setSearchQuery(text);
                                                    handleTypingSearch(text);
                                                }}
                                                style={styleSearchUsers.textInputSearch}
                                            />
                                        </View>

                                        <View style={styleSearchUsers.searchContentContainer}>

                                            {
                                                searchResults.length != 0 && searchQuery ?
                                                    <FlatList
                                                        data={searchResults}
                                                        keyExtractor={(item) => item.email}
                                                        contentContainerStyle={{ flexGrow: 1 }}
                                                        renderItem={({ item }) => (
                                                            <UserTypeSolicitationTemplate userSearch={item} userData={userData} selectUser={handleChooseUser} />
                                                        )}
                                                    />
                                                    :
                                                    loading ?
                                                        <DefaultLoading size={35} color={'#ffffff'} />
                                                        :
                                                        <NoSearch />
                                            }
                                        </View>
                                    </View>
                                </>
                        }
                    </View>
                </LinearGradient>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styleSearchUsers = StyleSheet.create({
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
    headerSearch: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        paddingVertical: 25,
    },
    searchContent: {
        display: 'flex',
        gap: 35,
        width: '100%',
        alignItems: 'center',
    },
    exitSearch_Button: {
        width: 30,
        height: 30,
        alignItems: 'center',
    },
    textInputSearch_View: {
        display: 'flex',
        flexDirection: 'row',
        width: '80%',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: 'white',
        borderBottomWidth: 1,
        paddingVertical: 8,
    },
    textInputSearch: {
        width: '88%',
        fontSize: 18,
        color: 'white',
        height: '100%',
    },
    searchContentContainer: {
        display: 'flex',
        width: '100%',
        height: '82.3%',
    },
});

export default SearchUsers;