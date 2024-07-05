import React, { useState } from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Arrow from '../icons/angle-left.png';
import store from "../store/store";
import Check from '../icons/check (1).png'
import NoPic from '../icons/download (2).jpg'
import Angle from '../icons/angle-right-b (1).png'

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

export default function ServiceChoice({ route }) {

    const provenRelatives = store.relatives.filter(relative => relative.isProven === true);
    const chosenOption = route.params.chosenOption
                                        
    const [selectedRelatives, setSelectedRelatives] = useState([]);
    const navigation = useNavigation();

    const handleSelectRelative = (relative) => {
        if (selectedRelatives.includes(relative)) {
            setSelectedRelatives(selectedRelatives.filter(item => item !== relative));
        } else {
            setSelectedRelatives([...selectedRelatives, relative]);
        }
    };

    return (
        <View style={{flex: 1, backgroundColor: 'black'}}>
            <View style={styles.header}>
                <Text style={{color: 'white', fontSize: 28, width: SCREEN_WIDTH * 0.7025641, height: 'auto', textAlign: 'center', lineHeight: 28, fontWeight: '400'}}>Для кого?</Text>
                <TouchableOpacity style={{width: SCREEN_WIDTH * 0.1076, height: SCREEN_HEIGHT * 0.04976, borderRadius: 200, padding: 14, backgroundColor: '#191919', alignItems: 'center', justifyContent: 'center'}} onPress={() => navigation.goBack()}><Image source={Arrow} style={{width: 14, height: 14}}/></TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: SCREEN_WIDTH * 0.91794872, height: 'auto', position: 'absolute', top: SCREEN_HEIGHT * 0.16350711, left: SCREEN_WIDTH * 0.0410}}>
                {provenRelatives && provenRelatives.length >= 1 && provenRelatives.map((relative, index) => {

                    const uris = relative.uris
                    const isSelected = selectedRelatives.includes(relative);

                    return (
                        <TouchableOpacity onPress={() => handleSelectRelative(relative)} style={[styles.relativeobject, {backgroundColor: "#191919"}]} key={index}>
                            <View style={{width: SCREEN_WIDTH * 0.77435, height: SCREEN_HEIGHT * 0.05687, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Image source={uris[0] === undefined? NoPic : uris[0].type === 'video/mp4'? NoPic : {uri: uris[0].downloadURL}} style={{width: 48, height: 48, borderRadius: 200}}></Image>
                                <View style={{flexDirection: 'column', justifyContent: 'space-between', width: SCREEN_WIDTH * 0.620512, height: SCREEN_HEIGHT * 0.04620}}>
                                    <Text style={{color: '#949494', fontWeight: '500', fontSize: 12}}>{relative.borndate}</Text>
                                    <Text style={{color: '#FFFFFF', fontWeight: '400', fontSize: 16}}>{relative.name}</Text>
                                </View>
                            </View>
                            <View style={{backgroundColor: isSelected ? 'white' : 'black', borderRadius: 6, width: 24, height: 24, alignItems: 'center', justifyContent: 'center'}}>
                                {isSelected && <Image source={Check} style={{width: 12, height: 12}}/>}
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
            <View style={{alignItems: 'center', width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.331753, position: 'absolute', bottom: 0, backgroundColor: '#191919', borderTopLeftRadius: 40, borderTopRightRadius: 40}}>
                <View style={{width: SCREEN_WIDTH * 0.917948, height: SCREEN_HEIGHT * 0.13033, marginTop: 30, flexDirection: 'column', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', width: SCREEN_WIDTH * 0.917948, height: 'auto', justifyContent: 'space-between'}}>
                        <Text style={{color: '#949494', fontSize: 14, fontWeight: '400'}}>Цена услуги</Text>
                        <Text style={{fontWeight: '500', fontSize: 14, color: 'white'}}>{chosenOption} 000 сум</Text>
                    </View>
                    <View style={{borderWidth: 0.7, borderColor: 'black', borderStyle: 'solid'}}/>
                    <View style={{flexDirection: 'row', width: SCREEN_WIDTH * 0.917948, height: 'auto', justifyContent: 'space-between'}}>
                        <Text style={{color: '#949494', fontSize: 14, fontWeight: '400'}}>Количество</Text>
                        <Text style={{fontWeight: '500', fontSize: 14, color: 'white'}}>{selectedRelatives.length}x</Text>
                    </View>
                    <View style={{borderWidth: 0.6, borderColor: 'black', borderStyle: 'solid'}}/>
                    <View style={{flexDirection: 'row', width: SCREEN_WIDTH * 0.917948, height: 'auto', justifyContent: 'space-between'}}>
                        <Text style={{color: '#949494', fontSize: 16, fontWeight: '400'}}>Общая сумма</Text>
                        <Text style={{fontWeight: '500', fontSize: 16, color: 'white'}}>{selectedRelatives.length * chosenOption > 0? selectedRelatives.length * chosenOption : ''} 000 сум</Text>
                    </View>
                    <View style={{borderWidth: 0.6, borderColor: 'black', borderStyle: 'solid'}}/>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('ServicePay', {chosenOption: chosenOption, selectedRelatives: selectedRelatives})} style={{flexDirection: 'row-reverse', marginTop: 40, justifyContent: 'center', alignItems: 'center', borderColor: 'white', borderWidth: 1, borderStyle: 'solid', width: SCREEN_WIDTH * 0.917948, height: SCREEN_HEIGHT * 0.06635, borderRadius: 200, backgroundColor: 'white'}}>
                    <Image source={Angle} style={{width: 16, height: 16, marginLeft: 5, marginTop: 2}}/>
                    <Text style={{fontSize: 16, fontWeight: '500'}}>Перейти к оплате</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.91794872, 
        height: SCREEN_HEIGHT * 0.09478,
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.0473933,
        left: SCREEN_WIDTH * 0.041025,
        alignItems: 'center',
        justifyContent: "flex-end",
        flexDirection: 'row-reverse'
    },
    relativeobject: {
        width: SCREEN_WIDTH * 0.9179,
        height: SCREEN_HEIGHT * 0.09004739,
        borderRadius: 12,
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 16,
        marginTop: 10
    }
})