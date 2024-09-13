import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SearchUserTemplateItem from './components/SearchUserTemplateItem'
import DefaultLoading from '@components/loading/DefaultLoading'
import NoSearch from './components/NoSearch'
import { FontAwesome } from '@expo/vector-icons';
import { SearchUserData } from 'types/treatment/Search_Types'
import { responsiveSize, screenHeight } from '@utils/layout/Screen_Size'
import { UserData } from 'types/user/User_Types'

interface SearchContainerProps {
    searchResults: SearchUserData[];
    searchQueryText: string;
    handleSearchQueryText: (text: string) => void;
    onClose: () => void;
    userData?: UserData;
    handleChooseUser: (searchUserData: SearchUserData) => void;
    loading: boolean;
    backIcon: any;
}

const SearchContainer = ({ 
    searchResults, onClose, 
    searchQueryText, handleSearchQueryText,
    userData, handleChooseUser,
    loading, backIcon
}: SearchContainerProps) => {
    const iconSearchSize = responsiveSize * 0.05;
    const iconBackSize = responsiveSize * 0.08;
    const searchContainerStyles = styles(iconBackSize);

    return (
        <>
            <View style={searchContainerStyles.headerSearch}>
                <TouchableOpacity onPress={() => onClose()} style={searchContainerStyles.exitSearch_Button}>
                    <Image style={{ height: '100%', width: '100%', resizeMode: 'contain' }} source={backIcon} />
                </TouchableOpacity>
            </View>
            <View style={searchContainerStyles.searchContent}>
                <View style={searchContainerStyles.textInputSearch_View}>
                    <FontAwesome name="search" size={iconSearchSize} color="white" />
                    <TextInput
                        placeholder={`Digite o nome do seu ${userData?.type === "patient" ? 'médico' : "paciente"}`}
                        value={searchQueryText}
                        placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                        onChangeText={handleSearchQueryText}
                        style={searchContainerStyles.textInputSearch}
                    />
                </View>

                <View style={searchContainerStyles.searchContentContainer}>
                    {
                        searchResults.length != 0 && searchQueryText ?
                            <FlatList
                                data={searchResults}
                                keyExtractor={(item) => item._id}
                                contentContainerStyle={{ flexGrow: 1 }}
                                renderItem={({ item }) => (
                                    <SearchUserTemplateItem
                                        userSearch={item}
                                        userData={userData}
                                        handleChooseUser={handleChooseUser} />
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
    )
}

export default SearchContainer

const styles = (iconBackSize: number) => StyleSheet.create({
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
        width: iconBackSize,
        height: iconBackSize,
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