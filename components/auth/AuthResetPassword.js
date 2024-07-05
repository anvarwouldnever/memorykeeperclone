import React, { useState } from "react";
import { View, TouchableOpacity, Text, TextInput, StyleSheet, Dimensions, Image, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Arrow from '../icons/angle-left (3).png'
import store from "../store/store";
import { observer } from "mobx-react-lite";

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

function ChangePassword({ route }) {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [password, setPassword] = useState()
    const [password2, setPassword2] = useState()
    const navigation = useNavigation();
    const { email } = route.params

    async function ChangePassword() {
        try {
            setIsLoading(true)
            if (password != password2) {
                return setError('Пароли должны совпадать')
            }
            const response = await axios.post('https://memorykeeper-backend-89433124d8be.herokuapp.com/api/changeUserPassword', {email: email, password: password})
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
            } else if (response.status === 500) {
                setError('Произошла непредвиденная ошибка, приносим извинения за неудобства')
            }
        } catch (error) {
            if (error.code || error.request) {
                console.log(error)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                <Image source={Arrow} style={{width: 14, height: 14}}/>
            </TouchableOpacity>
            <View style={styles.logo}>
                <Text style={{color: 'white', fontSize: 21, textAlign: 'center', lineHeight: 21}}>MEMORY KEEPER</Text>
            </View>
            <View style={styles.verification}>
                    <View style={styles.text}>
                        <Text style={{color: 'white', fontSize: 28, lineHeight: 28}}>Создание нового пароля</Text>
                    </View>
                    {error != '' && <Text style={styles.error}>{error}</Text>}
                <TextInput 
                        style={styles.emailinput} 
                        placeholder="Создайте новый пароль" 
                        placeholderTextColor="#949494"
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                />
                <TextInput 
                        style={styles.emailinput} 
                        placeholder="Повторите новый пароль" 
                        placeholderTextColor="#949494"
                        onChangeText={(text) => setPassword2(text)}
                        value={password2}
                />
                {isLoading && <View style={styles.loading}><ActivityIndicator size="large" color="#949494"/></View>}
                <TouchableOpacity style={styles.confirm} onPress={() => ChangePassword()}>
                        <Text style={{fontSize: 16, fontWeight: '500'}}>Подтвердить</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        alignItems: 'center',
        justifyContent: 'center',
    },
    back: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.07582,
        left: SCREEN_WIDTH * 0.04102564,
        width: SCREEN_WIDTH * 0.107692,
        height: SCREEN_HEIGHT * 0.049763,
        borderRadius: 200,
        backgroundColor: "#191919",
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: 'auto',
        height: 'auto',
        alignSelf: 'center',
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.09123,
        left: SCREEN_WIDTH * 0.279487
    },
    verification: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.917948,
        height: SCREEN_HEIGHT * 0.332938,
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.324052,
        left: SCREEN_WIDTH * 0.04102564,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    emailinput: {
        borderColor: '#191919', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.917948,
        height: SCREEN_HEIGHT * 0.06635,
        borderRadius: 200,
        backgroundColor: "#0A0A0A",
        padding: 16,
        color: 'white',
        fontSize: 16
    },
    text: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: 'auto',
        height: 'auto',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    confirm: {
        width: SCREEN_WIDTH * 0.917948,
        height: SCREEN_HEIGHT * 0.06635971,
        borderRadius: 200,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center' 
    },
    loading: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    error: {
        color: "red",
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        position: "relative",
        marginBottom: -10,
        marginTop: -10
    }
})

export default observer(ChangePassword)