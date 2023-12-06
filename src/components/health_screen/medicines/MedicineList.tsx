import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Medicine {
    id: number;
    type: string;
    name: string;
    start_period: string;
    final_period: string;
    last_period: string;
    frequency: string;
    quantity: number;
    value: number | null;
    checked: boolean;
}

interface MedicineListProps {
    medicines: Medicine[]
}

const MedicineList = ({ medicines }: MedicineListProps) => {

    return (
        <FlatList
            data={medicines}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={MedicineListStyle.medicines_list}
            renderItem={({ item }) => (
                <TouchableOpacity style={MedicineListStyle.MedicineTemplate_Button}>
                    <LinearGradient colors={['#eabbed', '#fcf5fc']}
                        start={{ x: 0.1, y: 0 }}
                        end={{ x: 1, y: 0.28 }} style={MedicineListStyle.MedicineTemplate_View}>
                        <View style={MedicineListStyle.MedicineContent_View}>
                            <View style={MedicineListStyle.MedicineImage_View}>
                                {
                                    item.type === 'pill' ?
                                        <Image source={require('../../../assets/health/medicines/medicine_pill_type.png')} />
                                        : item.type === 'pills' ?
                                            <Image source={require('../../../assets/health/medicines/medicine_pills_type.png')} />
                                            :
                                            item.type === 'bottle' ?
                                                <Image source={require('../../../assets/health/medicines/medicine_bottle_type.png')} />
                                                : ""

                                }

                            </View>
                            <View style={MedicineListStyle.MedicineInfo_View}>
                                <Text style={MedicineListStyle.MedicineName_Text}>
                                    {item.name}
                                </Text>
                                <View style={MedicineListStyle.MedicineNextPeriod_View}>
                                    <Text style={MedicineListStyle.MedicineNextPeriod_Text}>
                                        {item.last_period}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <LinearGradient colors={['transparent', 'rgba(141, 44, 148, 0.3)', '#8a4d88']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0.6, y: 0.7 }} style={MedicineListStyle.MedicineDosage_Container}>
                            
                            <View style={MedicineListStyle.MedicineChecked_View}>
                                <TouchableOpacity style={MedicineListStyle.MedicineChecked_Button}>
                                    {
                                        item.checked ?
                                        <Image style={MedicineListStyle.checkedImg} source={require('../../../assets/health/medicines/checkedMedicineIcon.png')} />
                                        : ""
                                    }
                                
                                </TouchableOpacity>
                            </View>
                            <View style={MedicineListStyle.MedicineDosage_View}>
                                <Text style={MedicineListStyle.MedicineDosage_Text}>
                                    {item.value !== null ? `${item.value * item.quantity}` : item.quantity} {`${item.type == "pill" || item.type == 'pills' ? "mg" : "ml"}`}
                                </Text>
                            </View>
                        </LinearGradient>
                    </LinearGradient>
                </TouchableOpacity>
            )}

        />

    )
}

const MedicineListStyle = StyleSheet.create({
    medicines_list: {
        height: 'auto',
        display: 'flex',
        gap: 10,
        paddingVertical: 30,
    },
    MedicineTemplate_Button: {
        width: '100%',
        height: 100,
        borderRadius: 60,
        
    },
    MedicineTemplate_View: {
        width: '100%',
        height: '100%',
        borderRadius: 60,
        borderBottomRightRadius: 40,
        borderBottomWidth: 1,
        borderColor: 'purple'
    },
    MedicineContent_View: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 18,
        height: '100%',
        gap: 15,
        zIndex: 2,
        alignItems: 'center'
    },
    MedicineImage_View: {

    },
    MedicineInfo_View: {
        gap: 5
    },
    MedicineName_Text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#421845'
    },
    MedicineNextPeriod_View: {

    },
    MedicineNextPeriod_Text: {
        fontSize: 14,
        color: "rgba(62, 36, 64, 0.7)"

    },
    MedicineChecked_View: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    MedicineChecked_Button: {
        width: 30,
        height: 30,
        backgroundColor: '#efe1f2',
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#d494d4'

    },
    checkedImg: {
        width: '100%',
        height: '100%',
    },
    MedicineDosage_Container: {
        position: 'absolute',
        height: '100%',
        width: '45%',
        borderTopLeftRadius: 70,
        borderBottomRightRadius: 60,
        borderTopRightRadius: 10,
        right: 0,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        borderRightWidth: 3,
        borderRightColor: '#d494d4'
    },
    MedicineDosage_View: {
        paddingHorizontal: 35,
        paddingBottom: 20,

    },
    MedicineDosage_Text: {
        fontSize: 18,
        color: '#ffd9e4',
        fontWeight: '600'
    },

});

export default MedicineList;