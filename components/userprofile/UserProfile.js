import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, TouchableHighlight, Dimensions} from "react-native";
import { StyleSheet } from "react-native";
import Info from '../icons/file-info-alt.png'
import Card from '../icons/card-atm.png'
import Chat from '../icons/comment-alt-message.png'
import Vector from '../icons/angle-right-b.png'
import { useNavigation } from "@react-navigation/native";
import store from "../store/store";
import { observer } from "mobx-react-lite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Angle from '../icons/angle-right-b.png'

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

function UserProfile() {

    const navigation = useNavigation()

    const handleLogout = async () => {
        await AsyncStorage.clear()
        store.setToken(null)
        await GoogleSignin.signOut()
      };

    return (
        <View style={styles.container}>
                <Text style={{position: 'absolute', top: SCREEN_HEIGHT * 0.0687, width: 170, height: 170, color: '#FFFFFF', fontSize: 28, fontWeight: '400', textAlign: 'center', lineHeight: 28}}>Мой аккаунт</Text>
            <ScrollView scrollEnabled={true} style={{flexDirection: 'column', position: 'absolute', top: SCREEN_HEIGHT * 0.1184, height: 'auto'}}>
                <TouchableHighlight style={{alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.9478, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={styles.userinfo}>
                            <View style={styles.username}>
                                    {store.name === '' || store.name === undefined? 
                                        <TouchableOpacity onPress={() => navigation.navigate('EditInfo')} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 'auto', height: 'auto'}}>
                                            <Text style={{color: '#949494', fontSize: 18, fontWeight: '500'}}>Ф.И.О</Text>
                                            <Image source={Angle} style={{width: 18, height: 18, marginLeft: 7}}/>
                                        </TouchableOpacity> 
                                            : 
                                        <>
                                            <Text style={[styles.textDarkAge, {width: '90%'}]}>Ф.И.О</Text>
                                            <Text style={[styles.textLightAge, {width: '90%'}]}>{store.name}</Text>
                                        </>
                                    }
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={styles.age}>
                                    {store.age === '' || store.age === undefined? 
                                        <TouchableOpacity onPress={() => navigation.navigate('EditInfo')} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 'auto', height: 'auto'}}>
                                            <Text style={{color: '#949494', fontSize: 18, fontWeight: '500'}}>Возраст</Text>
                                            <Image source={Angle} style={{width: 18, height: 18, marginLeft: 7}}/>
                                        </TouchableOpacity> 
                                        : 
                                        <>
                                            <Text style={styles.textDarkAge}>Возраст</Text>
                                            <Text style={styles.textLightAge}>{store.age}</Text>
                                        </>
                                    }
                                </View>
                                <View style={styles.age}>
                                    {store.residence === '' || store.residence === undefined? 
                                        <TouchableOpacity onPress={() => navigation.navigate('EditInfo')} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 'auto', height: 'auto'}}>
                                            <Text style={{color: '#949494', fontSize: 18, fontWeight: '500'}}>Город</Text>
                                            <Image source={Angle} style={{width: 18, height: 18, marginLeft: 7}}/>
                                        </TouchableOpacity> 
                                        : 
                                        <>
                                        <Text style={styles.textDarkAge}>Место жительства</Text>
                                        <Text style={styles.textLightAge}>{store.residence}</Text>
                                    </>
                                    }
                                </View>
                            </View>
                            <View style={styles.phone}>
                                    <Text style={styles.textDark}>Контакты/Эл-почта</Text>
                                    <Text style={styles.textLight}>{store.email}</Text>
                            </View>
                        </View>
                            <View style={styles.list}>
                                <TouchableOpacity style={styles.object} onPress={() => navigation.navigate('EditInfo')}>
                                    <View style={styles.personalinfo}>
                                        <View style={styles.imageholder}>
                                            <Image source={Info} style={styles.image} />
                                        </View>
                                        <Text style={{color: '#FFFFFF', marginLeft: 10, fontSize: 14, fontWeight: '500', lineHeight: 14}}>Личные данные</Text>
                                    </View>
                                    <Image source={Vector} style={{width: 20, height: 20}}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.object} onPress={() => navigation.navigate('Cards')}>
                                    <View style={styles.personalinfo}>
                                        <View style={styles.imageholder}>
                                            <Image source={Card} style={styles.image} />
                                        </View>
                                        <Text style={{color: '#FFFFFF', marginLeft: 10, fontSize: 14, fontWeight: '500', lineHeight: 14}}>Мои карты</Text>
                                    </View>
                                    <Image source={Vector} style={{width: 20, height: 20}}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.object} onPress={() => navigation.navigate('Chat')}>
                                    <View style={styles.personalinfo}>
                                        <View style={styles.imageholder}>
                                            <Image source={Chat} style={styles.image} />
                                        </View>
                                        <Text style={{color: '#FFFFFF', marginLeft: 10, fontSize: 14, fontWeight: '500', lineHeight: 14}}>Поддержка</Text>
                                    </View>
                                    <Image source={Vector} style={{width: 20, height: 20}}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.logout} underlayColor="transparent" onPress={() => handleLogout()}>
                                    <Text style={{fontSize: 14, color: '#949494', fontWeight: '500'}}>Выйти из аккаунта</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                </TouchableHighlight>
            </ScrollView>
        </View>          
    )
}

const styles = StyleSheet.create({
    container: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        backgroundColor: 'black', 
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    userinfo: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.9179,
        height: SCREEN_HEIGHT * 0.312796,
        top: SCREEN_HEIGHT * 0.03554,
        left: SCREEN_WIDTH * 0.041025,
        position: 'absolute',
        justifyContent: 'space-between'
    },
    username: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width:  SCREEN_WIDTH * 0.9179,
        height: SCREEN_HEIGHT * 0.0995,
        borderRadius: 12,
        backgroundColor: '#191919',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    age: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.45128,
        height: SCREEN_HEIGHT * 0.0995,
        borderRadius: 12,
        backgroundColor: '#191919',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    phone: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width:  SCREEN_WIDTH * 0.9179,
        height: SCREEN_HEIGHT * 0.0995,
        borderRadius: 12,
        backgroundColor: '#191919',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    list: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.3909,
        left: SCREEN_WIDTH * 0.0410,
        width: SCREEN_WIDTH * 0.9179,
        height: 'auto',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    object: {
        borderColor: '#191919', borderWidth: 1, borderStyle: 'solid',
        width:  SCREEN_WIDTH * 0.9179,
        height: SCREEN_HEIGHT * 0.0829,
        backgroundColor: '#0A0A0A',
        borderRadius: 12,
        marginVertical: 10,
        paddingHorizontal: 16,
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center'
    },
    logout: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#191919',
        width: SCREEN_WIDTH * 0.4846,
        height: SCREEN_HEIGHT * 0.0497,
        marginTop: 10,
        borderRadius: 200
    },
    textLight: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.8358,
        height: 'auto',
        fontSize: 16,
        fontWeight: '500',
        color: '#FFFFFF',
        lineHeight: 16,
    },
    textDark: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.8358,
        height: 'auto',
        fontWeight: '400',
        fontSize: 12,
        color: '#949494'
    },
    textLightAge: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.3692,
        height: 'auto',
        fontSize: 16,
        fontWeight: '500',
        color: '#FFFFFF',
        lineHeight: 16,
    },
    textDarkAge: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.3692,
        height: '',
        fontWeight: '400',
        fontSize: 12,
        color: '#949494'
    },
    personalinfo: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.7846,
        height: SCREEN_HEIGHT * 0.04976,
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageholder: {
        backgroundColor: '#191919', 
        width: 42, 
        height: 42, 
        borderRadius: 200, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    image: {
        width: 14,
        height: 14
    }
})

export default observer(UserProfile)