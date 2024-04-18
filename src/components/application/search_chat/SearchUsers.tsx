import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { screenHeight, screenWidth } from '../../../utils/layout/Screen_Size';
import { AuthData } from '../../../providers/AuthenticationProvider';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { ApiRequest } from '../../../services/APIService';
import UserTypesChat from './UserTypesChat';
import StartTreatment from './StartTreatment';
import NoUsersSearch from './NoUsersSearch';
import USE_ENV from '../../../services/server_url/ServerUrl';
import { FetchData } from '../../../services/fetchUtils/APIUtils';

export interface SearchUserData {
    name: string;
    phone: number;
    email: string;
    type: string;
    total_treatments?: string[];
    is_treatment_running?: boolean;
}

interface SearchUsersProps {
    visible: boolean;
    onClose: () => void;
    authData: AuthData
}

const SearchUsers = ({ visible, onClose, authData }: SearchUsersProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchUserData[]>([]);
    const [userPage, setUserPage] = useState(false);
    const [selectedUser, setSelectedUser] = useState<SearchUserData | null>(null);
    const { fullApiServerUrl } = USE_ENV();

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

        const data_user_search = {
            searchData: data,
            type: authData.type
        }

        console.log(data_user_search);

        try {
            const requestSearch = {
                route: `filterUsers`,
                method: "POST",
                data: data_user_search
            };

            const response = await FetchData(requestSearch, {accessToken: authData.accessToken, refreshToken: authData.refreshToken}, fullApiServerUrl);

            if (response.success) {
                console.log(response.data);
                setSearchResults(response.data || []);
            }
            else {
                console.error('Erro ao buscar usuários: ');
            }
        }
        catch (err) {
            console.error("Erro ao buscar usuários: ", err);
        }
    };

    

    return (
        <Modal transparent={true} visible={visible} animationType='fade'>
            <LinearGradient colors={[`${authData.type == "patient" ? "rgba(87, 39, 76, 0.85)" : "rgba(40, 61, 82, 0.85)"}`, `${authData.type == "patient" ? 'rgba(100, 36, 107, 0.85)' : "rgba(24, 63, 71, 0.9)"}`]}
                start={{ x: 0, y: 0.4 }}
                end={{ x: 0, y: 1 }} style={styleSearchUsers.backgroundSearchView}>

                <View style={styleSearchUsers.screen_Search}>

                    {
                        userPage && selectedUser ?
                            <StartTreatment user={selectedUser} handleBackSearch={handleChooseUser} authData={authData} />
                            :
                            <>
                                <View style={styleSearchUsers.headerSearch}>
                                    <TouchableOpacity onPress={() => onClose()} style={styleSearchUsers.exitSearch_Button}>
                                        <Image style={{ height: 50, width: 50 }} source={require("../../../assets/init/back/default_back_white.png")} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styleSearchUsers.searchContent}>
                                    <View style={styleSearchUsers.textInputSearch_View}>
                                        <FontAwesome name="search" size={screenHeight * ((22 + 5) / 1000)} color="white" />
                                        <TextInput
                                            placeholder={`Digite o nome do seu ${authData.type === "patient" ? 'médico' : "paciente"}`}
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
                                                        <UserTypesChat user={item} authData={authData} chooseUser={handleChooseUser} />
                                                    )}
                                                />
                                                :

                                                <NoUsersSearch />

                                        }
                                    </View>
                                </View>
                            </>
                    }

                </View>

            </LinearGradient>
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
        display: 'flex',
        width: '100%',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        paddingVertical: 25,
    },
    searchContent: {
        display: 'flex',
        gap: 35,
        width: '100%',
        alignItems: 'center',
    },
    exitSearch_Button: {
        width: 40,
        height: 40,
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