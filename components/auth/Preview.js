import React, { useState, useRef, useCallback } from "react";
import { View, Text, Image, Dimensions, Modal, TouchableOpacity, ScrollView, TouchableHighlight, StyleSheet } from "react-native";
import Pic from '../icons/og.jpg'
import Angle from '../icons/angle-right-b (1).png'
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

export default function Preview() {

    const [currentPage, setCurrentPage] = useState(0);
    const scrollViewRef = useRef();
    const navigation = useNavigation()

    const handlePageChange = () => {
        const nextPage = (currentPage + 1) % 3;
        setCurrentPage(nextPage);
        scrollViewRef.current.scrollTo({ x: nextPage * (SCREEN_WIDTH * 0.9179), animated: true });
    };

    useFocusEffect(
        useCallback(() => {
            const timeout = setTimeout(handlePageChange, 3000); // Change page every 3 seconds
            return () => clearTimeout(timeout); // Cleanup timeout on unmount or page change
        }, [currentPage])
    );

    return (
        <View style={{flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}}>
            <Image resizeMode='cover' source={Pic} style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}/>
            <Text style={{color: 'white', top: '40%', position: 'absolute', fontSize: 36}}>MEMORY KEEPER</Text>
            <View style={{justifyContent: 'space-between', alignItems: 'center', position: 'absolute', backgroundColor: '#0A0A0A', bottom: 0, width: SCREEN_WIDTH, borderTopLeftRadius: 40, borderTopRightRadius: 40,  height: SCREEN_HEIGHT * 0.3080568720379147}}>
                <View style={{borderRadius: 200, backgroundColor: '#191919', width: SCREEN_WIDTH * 0.202564102564, height: 6, marginTop: 15, borderColor: '#191919', borderWidth: 1, borderStyle: 'solid'}}/>
                <View style={{width: SCREEN_WIDTH * 0.9179, height: 'auto', alignItems: 'center'}}>
                    <ScrollView ref={scrollViewRef} scrollEnabled={false} horizontal={true} scrollEventThrottle={16} showsHorizontalScrollIndicator={false}>
                        <TouchableHighlight>
                            <View style={{width: 'auto', height: 'auto', flexDirection: 'row', alignItems: 'center'}}>
                                {[{text: "Сохраните светлую память о ваших близких"}, {text: "Ухаживайте за их местами последнего упокоения"}, {text: "Почтите их память пользуясь нашими услугами"}].map((text, index) => {
                                    
                                    return (
                                        <View key={index} style={{width: SCREEN_WIDTH * 0.9179, height: 'auto', alignItems: 'center', justifyContent: 'center'}}>
                                            <Text style={{letterSpacing: -1, fontSize: 28, lineHeight: 28, color: 'white', width: SCREEN_WIDTH * 0.7384615384615385, textAlign: 'center', textAlignVertical: 'center'}}>{text.text}</Text> 
                                        </View>
                                    )
                                })}
                            </View>
                        </TouchableHighlight>
                    </ScrollView>
                </View>
                <View style={styles.pagination}>
                    {[{}, {}, {}].map((_, index) => (
                                <View key={index} style={index === currentPage ? styles.textActive : styles.text}></View>
                    ))}
                </View>
                <TouchableOpacity onPress={currentPage === 2? () => navigation.navigate('Home') : () => handlePageChange()} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', width: SCREEN_WIDTH * 0.9179, height: SCREEN_HEIGHT * 0.06635071090, borderRadius: 200, marginBottom: 15}}>
                    <Text style={{fontSize: 16, fontWeight: '500', color: 'black'}}>Далее</Text>
                    <Image style={{width: 16, height: 16, marginLeft: 5}} source={Angle}/>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{right: 22, alignItems: 'center', justifyContent: 'center', top: SCREEN_HEIGHT * 0.0758293838862559, height: 'auto', width: 83, position: 'absolute'}}>
                <Text style={{color: '#191919', fontWeight: '500', fontSize: 14, textAlign: 'center'}}>Пропустить</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    textActive: {
        width: SCREEN_WIDTH * 0.07179,
        height:SCREEN_HEIGHT * 0.004739,
        backgroundColor: '#949494',
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        borderRadius: 200
    },
    text: {
        width: SCREEN_WIDTH * 0.07179,
        height: SCREEN_HEIGHT * 0.00473934,
        backgroundColor: '#191919',
        // borderColor: 'white', borderWidth: 5, borderStyle: 'solid',
        borderRadius: 200
    },
    pagination: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        height: SCREEN_HEIGHT * 0.02606635,
        width: SCREEN_WIDTH * 0.2564102564,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
})