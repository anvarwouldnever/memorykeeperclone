import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions} from "react-native";
import Service3 from '../icons/serviceimage3.png'
import Service4 from '../icons/serviceimage4.png'
import Service5 from '../icons/serviceimage5.png'
import Service6 from '../icons/serviceimage6.png'
import Service7 from '../icons/serviceimage7.png'
import Service8 from '../icons/serviceimage8.png'
import Vector from '../icons/angle-right-b.png'
import { useNavigation } from "@react-navigation/native";

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

export default function Services() {

    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.headerview}>
                <Text style={styles.headertext}>Все услуги</Text>
            </View>
            <View style={styles.srvicescontainer}>
                <TouchableOpacity style={styles.service} onPress={() => navigation.navigate('Service')}>
                    <View style={styles.serviceinfoholder}>
                        <Image source={Service3} style={{width: SCREEN_WIDTH * 0.14871, height: SCREEN_HEIGHT * 0.06872038, borderRadius: 10}}/>
                        <View style={{width: SCREEN_WIDTH * 0.589743, height: SCREEN_HEIGHT * 0.0473933, justifyContent: 'space-between'}}>
                            <Text style={{fontWeight: '500', fontSize: 16, color: 'white', }}>Посадка цветов</Text>
                            <Text style={{fontWeight: '400', fontSize: 14, lineHeight: 18.2, color: '#949494'}}>от-200 000 сум</Text>
                        </View>
                    </View>
                    <View style={styles.navigator}>
                        <Image source={Vector} style={{width: 24, height: 24}}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.service} onPress={() => navigation.navigate('Service')}>
                    <View style={styles.serviceinfoholder}>
                        <Image source={Service4} style={{width: SCREEN_WIDTH * 0.14871, height: SCREEN_HEIGHT * 0.06872038, borderRadius: 10}}/>
                        <View style={{width: SCREEN_WIDTH * 0.589743, height: SCREEN_HEIGHT * 0.0473933, justifyContent: 'space-between'}}>
                            <Text style={{fontWeight: '500', fontSize: 16, color: 'white', }}>QR-страницу</Text>
                            <Text style={{fontWeight: '400', fontSize: 14, lineHeight: 18.2, color: '#949494'}}>от-200 000 сум</Text>
                        </View>
                    </View>
                    <View style={styles.navigator}>
                        <Image source={Vector} style={{width: 24, height: 24}}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.service} onPress={() => navigation.navigate('Service')}>
                    <View style={styles.serviceinfoholder}>
                        <Image source={Service5} style={{width: SCREEN_WIDTH * 0.14871, height: SCREEN_HEIGHT * 0.06872038, borderRadius: 10}}/>
                        <View style={{width: SCREEN_WIDTH * 0.589743, height: SCREEN_HEIGHT * 0.0473933, justifyContent: 'space-between'}}>
                            <Text style={{fontWeight: '500', fontSize: 16, color: 'white', }}>Поставить цветы</Text>
                            <Text style={{fontWeight: '400', fontSize: 14, lineHeight: 18.2, color: '#949494'}}>от-200 000 сум</Text>
                        </View>
                    </View>
                    <View style={styles.navigator}>
                        <Image source={Vector} style={{width: 24, height: 24}}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.service} onPress={() => navigation.navigate('Service')}>
                    <View style={styles.serviceinfoholder}>
                        <Image source={Service6} style={{width: SCREEN_WIDTH * 0.14871, height: SCREEN_HEIGHT * 0.06872038, borderRadius: 10}}/>
                        <View style={{width: SCREEN_WIDTH * 0.589743, height: SCREEN_HEIGHT * 0.0473933, justifyContent: 'space-between'}}>
                            <Text style={{fontWeight: '500', fontSize: 16, color: 'white', }}>Религиозные служения</Text>
                            <Text style={{fontWeight: '400', fontSize: 14, lineHeight: 18.2, color: '#949494'}}>от-200 000 сум</Text>
                        </View>
                    </View>
                    <View style={styles.navigator}>
                        <Image source={Vector} style={{width: 24, height: 24}}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.service} onPress={() => navigation.navigate('Service')}>
                    <View style={styles.serviceinfoholder}>
                        <Image source={Service7} style={{width: SCREEN_WIDTH * 0.14871, height: SCREEN_HEIGHT * 0.06872038, borderRadius: 10}}/>
                        <View style={{width: SCREEN_WIDTH * 0.589743, height: SCREEN_HEIGHT * 0.0473933, justifyContent: 'space-between'}}>
                            <Text style={{fontWeight: '500', fontSize: 16, color: 'white', }}>Рестоврация</Text>
                            <Text style={{fontWeight: '400', fontSize: 14, lineHeight: 18.2, color: '#949494'}}>от-200 000 сум</Text>
                        </View>
                    </View>
                    <View style={styles.navigator}>
                        <Image source={Vector} style={{width: 24, height: 24}}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.service} onPress={() => navigation.navigate('Service')}>
                    <View style={styles.serviceinfoholder}>
                        <Image source={Service8} style={{width: SCREEN_WIDTH * 0.148717, height: SCREEN_HEIGHT * 0.06872038, borderRadius: 10}}/>
                        <View style={{width: SCREEN_WIDTH * 0.589743, height: SCREEN_HEIGHT * 0.04739, justifyContent: 'space-between'}}>
                            <Text style={{fontWeight: '500', fontSize: 16, color: 'white', }}>Фото отчеты</Text>
                            <Text style={{fontWeight: '400', fontSize: 14, lineHeight: 18.2, color: '#949494'}}>от-200 000 сум</Text>
                        </View>
                    </View>
                    <View style={styles.navigator}>
                        <Image source={Vector} style={{width: 24, height: 24}}/>
                    </View>
                </TouchableOpacity>
            </View> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        backgroundColor: 'black',
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    headerview: {
        width: 'auto', 
        height: 'auto', 
        position: 'absolute', 
        top: SCREEN_HEIGHT * 0.0687203, 
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid'
    },
    headertext: {
        color: 'white', 
        fontWeight: '400', 
        fontSize: 28, 
        lineHeight: 28, 
        textAlign: 'center'
    },
    srvicescontainer: {
        width: SCREEN_WIDTH * 0.917948, 
        height: SCREEN_HEIGHT * 0.682464, 
        position: 'absolute', 
        top: SCREEN_HEIGHT * 0.165876, 
        left: SCREEN_WIDTH * 0.041025, 
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    service: {
        width: SCREEN_WIDTH * 0.917948, 
        height: SCREEN_HEIGHT * 0.1018957, 
        borderRadius: 13, 
        backgroundColor: '#191919', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'row'
    },
    serviceinfoholder: {
        width: SCREEN_WIDTH * 0.77435, 
        height: SCREEN_HEIGHT * 0.06872038, 
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    navigator: {
        width: SCREEN_WIDTH * 0.0615384, 
        height: SCREEN_HEIGHT * 0.02843, 
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
    }
})