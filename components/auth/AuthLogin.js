import React from "react";
import { Dimensions ,StyleSheet, TextInput, View, TouchableOpacity, Text, Image, ActivityIndicator } from "react-native";
import store from "../store/store";
import axios from "axios";

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

export default function AuthLogin() {

    const [color, setColor] = React.useState(true)
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)
    const [button1, setButton1] = React.useState(false)
    const [button2, setButton2] = React.useState(false)

    async function login(email, password) {
        try {
            setIsLoading(true)
            const response = await axios.post('https://memorykeeper-backend-89433124d8be.herokuapp.com/api/login', {email, password});
            if (response.status === 200) {
                const data = response.data;
                const userInfo = {
                    id: data._id,
                    name: data.name,
                    email: data.email,
                    age: data.age,
                    residence: data.residence
                };
                console.log(userInfo)
                store.setToken('logged');
                store.setUser(userInfo);
            } else {
                return;
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.message)
                setError(error.response.data.message)
            } else if (error.code === 'ECONNABORTED' || error.code === 'ENOTFOUND') {
                console.log(error.code)
                setError('Отсутствует подключение к интернету')
            } else if (error.request) {
                console.log(error.request)
                setError('Отсутствует подключение к интернету')
            } else {
                console.log(error)
            }
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <View style={styles.container}>
            {error != '' && <Text style={styles.error}>{error}</Text>}
            <View style={styles.inputs}>
                <View>
                <TextInput 
                    style={[styles.emailinput, {backgroundColor: button1? 'black' : "#0A0A0A", borderColor: button1? '#949494' : '#191919', borderWidth: 1 }]} 
                    placeholder={button1? '' : "Номер телефона/Эл.почта"}
                    placeholderTextColor="#949494"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    onPress={() => setButton1(true)}
                    onEndEditing={() => setButton1(prev => !prev)}
                >
                </TextInput>
                {button1 && <View style={{alignItems: 'center', flexDirection: 'row', position: 'absolute', top: -7, left: 20, width: 167, height: 16, borderRadius: 200, paddingHorizontal: 4, backgroundColor: 'black'}}>
                        <Text style={{color: 'white', fontWeight: '400', lineHeight: 15.6, fontSize: 12, width: 164, height: 16}}>Номер телефона/Эл-почта</Text>
                    </View>}
                </View>
                <View>
                <TextInput 
                    style={[styles.emailinput, {backgroundColor: button2? 'black' : "#0A0A0A", borderColor: button2? '#949494' : '#191919', borderWidth: 1}]} 
                    placeholder={button2? '' : "Пароль"}
                    placeholderTextColor="#949494"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    onPress={() => setButton2(true)}
                    onEndEditing={() => setButton2(prev => !prev)}
                >
                </TextInput>
                {button2 && <View style={{alignItems: 'center', flexDirection: 'row', position: 'absolute', top: -7, left: 20, width: 51, height: 16, borderRadius: 200, paddingHorizontal: 4, backgroundColor: 'black'}}>
                        <Text style={{color: 'white', fontWeight: '400', lineHeight: 15.6, fontSize: 12, width: 43, height: 16}}>Пароль</Text>
                    </View>}
                </View>
            </View>
            <View style={styles.rememberMe}>
                <TouchableOpacity 
                    style={{width: 24, height: 24, borderRadius: 6, backgroundColor: color? "white" : "#191919", borderWidth: 1, borderStyle: "solid", borderColor: "#191919", alignItems: 'center', justifyContent: 'center'}} 
                    onPress={() => setColor(prev => !prev)}
                >
                    {color && <Image source={require('../icons/Vector.png')} style={{width: 7.03, height: 5.11}}/>}
                </TouchableOpacity>
                <Text style={{color: color? "white" : '#949494', fontSize: 14, marginLeft: 12, fontWeight: '500'}} onPress={() => setColor(prev => !prev)}>Запомнить меня</Text>
            </View>
            {isLoading && <View style={styles.loading}><ActivityIndicator size="large" color="#949494"/></View>}
            <View style={styles.enter}>
                    <TouchableOpacity style={{alignItems: 'center'}} onPress={() => login(email, password)}>
                        <Text style={{color: "black", fontWeight: '500'}}>Войти</Text>
                    </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        marginVertical: 30,
        alignItems: 'center'
    },
    inputs: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.9179,
        height: SCREEN_HEIGHT * 0.1563,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    emailinput: {
        borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.9179,
        height: SCREEN_HEIGHT * 0.06635071,
        borderRadius: 200,
        paddingHorizontal: 16,
        color: '#949494',
        fontSize: 16
    },
    rememberMe: {
        width: SCREEN_WIDTH * 0.38717949,
        height: SCREEN_HEIGHT * 0.02843,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 40
    },
    enter: {
        borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.9179,
        height: SCREEN_HEIGHT * 0.06635071,
        justifyContent: 'center',
        borderRadius: 200,
        backgroundColor: 'white',
        marginTop: 35
    },
    loading: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)', // Полупрозрачный фон
        justifyContent: 'center',
        alignItems: 'center'
    },
    error: {
        color: "red",
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        position: "relative",
        marginBottom: 5,
        marginTop: -22
    }
})