import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import AuthLogin from "./AuthLogin";
import AuthRegister from "./AuthRegister";
import Icon from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import store from "../store/store";

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

export default function Auth() {

    const [color, setColor] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const navigation = useNavigation()

    const configureGoggleSignin = () => {
        GoogleSignin.configure({
            webClientId: '463744698419-l472qcgtf79oj20eshdcaa0nv84k2458.apps.googleusercontent.com',
            iosClientId: '463744698419-uck43fr2qfth5jcd3ao7p4tb69dgbtfp.apps.googleusercontent.com',
        })
    }

    useEffect(() => {
        configureGoggleSignin();
    }, []);

    async function signUp() {
        try {
            setError('')
            setIsLoading(true)
            const userInfo = await GoogleSignin.signIn()
            if (userInfo.idToken) {
                const response = await axios.post('https://memorykeeper-backend-89433124d8be.herokuapp.com/api/registerWithGoogle', {email: userInfo.user.email, name: userInfo.user.name})
                if (response.status === 300) {
                    await GoogleSignin.signOut()
                    return setError('Пользователь существует. Войдите')
                } else if (response.status === 200) {
                    const user = {
                        id: response.data.id,
                        name: response.data.name,
                        email: response.data.email,
                        age: response.data.age,
                        residence: response.data.residence
                    }
                    store.setToken('logged')
                    store.setUser(user)
                }
            }
        } catch (error) {
            await GoogleSignin.signOut()
            if (error.response === undefined) {
                return
            }
            if (error.response.status && error.response.status === 300) {
                setError('Пользователь существует. Войдите')
                await GoogleSignin.signOut()
            } else if (error.response.status && error.response.status === 500) {
                setError('Произошла непредвиденная ошибка')
                await GoogleSignin.signOut()
            }
        } finally {
            setIsLoading(false)
        }
    }

    async function signIn() {
        try {
            setError('')
            setIsLoading(true)
            const userInfo = await GoogleSignin.signIn()
            if (userInfo.idToken) {
                const response = await axios.post('https://memorykeeper-backend-89433124d8be.herokuapp.com/api/loginWithGoogle', {email: userInfo.user.email})
                if (response.status === 200) {
                    const user = {
                        id: response.data.id,
                        name: response.data.name,
                        email: response.data.email,
                        age: response.data.age,
                        residence: response.data.residence
                    }
                    store.setToken('logged')
                    store.setUser(user)
                }
            }
        } catch (error) {
                await GoogleSignin.signOut()
                if (error.response === undefined) {
                    return
                }
                if (error.response.status === 300) {
                    setError('Пользователь не существует. Зарегистрируйтесь')
                    await GoogleSignin.signOut()
                } else if (error.response.status === 500) {
                    setError('Произошла непредвиденная ошибка')
                    await GoogleSignin.signOut()
                }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <View style={{alignItems: 'center', width: SCREEN_WIDTH * 0.9179, height: SCREEN_HEIGHT * 0.7002, position: 'absolute', top: SCREEN_HEIGHT * 0.1718}}>
                <Text style={styles.logo}>MEMORY KEEPER</Text>
                    <View style={styles.authcontainer}>
                        <View style={styles.buttonscontainer}>
                            <TouchableOpacity style={color? styles.buttonWhite : styles.buttonBlack} onPress={() => setColor(true)} underlayColor="transparent">
                                <Text style={{textAlign: 'center', color: color? 'black' : "#949494", fontWeight: '500'}}>Вход</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={color? styles.buttonBlack : styles.buttonWhite} onPress={() => setColor(false)} underlayColor="transparent">
                                <Text style={{textAlign: 'center', color: color? "#949494" : 'black', fontWeight: '500'}}>Регистрация</Text>
                            </TouchableOpacity>
                        </View>
                    {error != '' && <Text style={{position: 'absolute', color: 'red', top: 50}}>{error}</Text>}
                    {color? <AuthLogin /> : <AuthRegister />}
                    <TouchableOpacity style={styles.error} onPress={color? () => navigation.navigate('ResetPassword') : () => {return}}>
                        <Text style={{color: "white", lineHeight: 16, fontSize: 16, fontWeight: "500"}}>{color? 'Забыли пароль?' : 'Проблемы с регистрацией?'}</Text>
                    </TouchableOpacity>
                        <View style={styles.authmethod}>
                            <Text style={{fontSize: 13, lineHeight: 18, color: "#949494", textAlign: 'center', fontWeight: '400'}}>{color? "Или войдите с помощью" : "Или зарегистрируйтесь с помощью"}</Text>
                            <TouchableOpacity onPress={color? () => signIn() : () => signUp()}>
                                <Icon name="google" size={32} color="white" />
                            </TouchableOpacity>
                        </View>
                        {isLoading && <View style={styles.loading}><ActivityIndicator size="large" color="#949494"/></View>}    
                    </View>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        flex: 1,
        alignItems: 'center'
    },
    logo: {
        color: 'white',
        width: 'auto',
        height: 'auto', 
        fontSize: 32,
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        textAlign: 'center',
        
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
    authcontainer: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.9179,
        height: SCREEN_HEIGHT * 0.4644,
        marginTop: SCREEN_HEIGHT * 0.04146,
        alignItems: 'center'
    },
    buttonscontainer: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.9179,
        height: 46,
        flexDirection: "row",
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 200,
        backgroundColor: "#191919"
    },
    buttonWhite: {
        backgroundColor: 'white',
        width: SCREEN_WIDTH * 0.4538,
        borderRadius: 200,
        height: "100%",
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonBlack: {
        backgroundColor: '#191919',
        width: SCREEN_WIDTH * 0.4538,
        borderRadius: 200,
        height: "100%",
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    error: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: 'auto',
        height: 'auto',
        alignItems: 'center',
        marginTop: 5
    },
    authmethod: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.4282,
        height: SCREEN_HEIGHT * 0.1113,
        marginTop: SCREEN_HEIGHT * 0.02369,
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})