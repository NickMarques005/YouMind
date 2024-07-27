import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FormatISOToStringDate } from '@utils/date/DateFormatting';
import { SearchUserData } from 'types/treatment/Search_Types';

interface SearchUserInfoProps {
    userSearch: SearchUserData;
    userType?: string;
    iconInfoSize: number;
    iconTreatmentUserSize: number;
    treatmentUserIcon: any;
    iconSearchEmail: any;
    iconSearchBirth: any;
    iconSearchGender: any;
    iconSearchPhone: any;
    iconTreatments: any;
    handlePress: () => void;
}

const SearchUserInfo = ({
    userSearch,
    userType,
    iconInfoSize,
    iconTreatmentUserSize,
    treatmentUserIcon,
    iconSearchEmail,
    iconSearchBirth,
    iconSearchGender,
    iconSearchPhone,
    iconTreatments,
    handlePress }: SearchUserInfoProps) => {

    return (
        <View style={styles.SearchUserInfoTreatment_View}>
            <View style={styles.SearchUserInfoTemplateContainer}>
                <Image style={{ width: iconInfoSize, height: iconInfoSize }} source={iconSearchEmail} />
                <Text style={styles.userSearchTextTemplate}>
                    {userSearch.email}
                </Text>
            </View>
            <View style={styles.SearchUserInfoTemplateContainer}>
                <Image style={{ width: iconInfoSize, height: iconInfoSize }} source={iconSearchPhone} />
                <Text style={styles.userSearchTextTemplate}>
                    {userSearch.phone}
                </Text>
            </View>
            <View style={styles.SearchUserInfoTemplateContainer}>
                <Image style={{ width: iconInfoSize, height: iconInfoSize }} source={iconSearchBirth} />
                <Text style={styles.userSearchTextTemplate}>
                    {userSearch.birth ? FormatISOToStringDate(userSearch.birth) : "Não informado"}
                </Text>
            </View>
            <View style={styles.SearchUserInfoTemplateContainer}>
                <Image style={{ width: iconInfoSize, height: iconInfoSize }} source={iconSearchGender} />
                <Text style={styles.userSearchTextTemplate}>
                    {userSearch.gender ? userSearch.gender : "Não informado"}
                </Text>
            </View>
            {
                userSearch.total_treatments ?
                    <View style={styles.SearchUserInfoTemplateContainer}>
                        <Image style={{ width: iconInfoSize, height: iconInfoSize }} source={iconTreatments} />
                        <TouchableOpacity activeOpacity={0.6} onPress={handlePress} style={styles.treatmentButton}>
                            <Text style={styles.treatmentName}>
                                {userSearch.total_treatments && "Tratamentos"}
                            </Text>
                            <View style={styles.treatmentList}>
                                {
                                    userSearch.total_treatments && (
                                        userSearch.total_treatments.map((treatment, index) => (
                                            <View key={index} style={styles.treatmentItem}>
                                                <Image
                                                    style={{
                                                        height: iconTreatmentUserSize,
                                                        width: iconTreatmentUserSize,
                                                        borderRadius: iconTreatmentUserSize,
                                                        borderWidth: 2,
                                                        borderColor: userType === 'patient' ? '#43264a' : '#417c91'
                                                    }}
                                                    source={treatment.avatar ? { uri: treatment.avatar } : treatmentUserIcon}
                                                />
                                            </View>
                                        ))
                                    )
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                    : ""
            }
        </View>
    );
};

const styles = StyleSheet.create({
    SearchUserInfoTreatment_View: {
        width: '100%',
        flex: 1,
        justifyContent: 'space-evenly',
    },
    SearchUserInfoTemplateContainer: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingBottom: '1.5%',
    },
    userSearchTextTemplate: {
        fontSize: 16,
        color: 'rgba(197, 203, 209, 0.8)',
    },
    treatmentButton: {
        paddingVertical: '2%',
        paddingHorizontal: '4%',
        borderRadius: 10,
        flex: 1,
        backgroundColor: 'rgba(40, 26, 46, 0.3)',
    },
    treatmentName: {
        color: 'white',
        fontSize: 12,
        marginBottom: '3%',
    },
    treatmentList: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 5,
        width: '100%',
        overflow: 'hidden',
    },
    treatmentItem: {
        alignItems: 'center',
    }
});

export default SearchUserInfo;