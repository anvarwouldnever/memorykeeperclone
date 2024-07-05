import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Dimensions, TextInput, Image, ActivityIndicator } from "react-native";
import Arrow from '../icons/angle-left (3).png'

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

export default function ResetPassword() {

    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)
    const [EmailOrPhone, setEmailOrPhone] = useState('')
    const [error, setError] = useState()

    async function CheckIfExists() {
        try {
            setIsLoading(true)
            const response = await axios.post('https://memorykeeper-backend-89433124d8be.herokuapp.com/api/checkBeforeRegistration', {email: EmailOrPhone})
            if (response.status === 202) {
                setError()
                navigation.navigate('ResetVerification', {email: EmailOrPhone})
            } else if (response.status === 200) {
                setError('Пользователь не найден')
            }
        } catch (error) {
            if (error.code || error.request) {
                setError('Нет подключения к интернету')
                console.log(error)
            } else {
                setError('Произошла непредвиденная ошибка')
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
            <View style={{justifyContent: 'space-between', flexDirection: 'column', width: SCREEN_WIDTH * 0.9179487179487179, height: SCREEN_HEIGHT * 0.248815165, position: 'absolute', top: SCREEN_HEIGHT * 0.375, left: SCREEN_WIDTH * 0.0410}}>
                <Text style={{fontWeight: '400', fontSize: 28, lineHeight: 28, letterSpacing: -2, textAlign: 'center', width: 'auto', height: 'auto', color: 'white'}}>Восстановление пароля</Text>
                <View style={{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: SCREEN_WIDTH * 0.9179487179487179, height: SCREEN_HEIGHT * 0.168246445}}>
                    <TextInput onChangeText={(text) => setEmailOrPhone(text)} placeholder="Номер телефона/Эл-почта" placeholderTextColor="#949494" style={{color: 'white', fontSize: 16, padding: 16, width: SCREEN_WIDTH * 0.9179487179487179, height: SCREEN_HEIGHT * 0.0663507109004739, backgroundColor: '#0A0A0A', borderWidth: 1, borderStyle: 'solid', borderColor: '#191919', borderRadius: 200}}></TextInput>
                    <TouchableOpacity onPress={EmailOrPhone != ''? () => CheckIfExists() : () => {return}} style={{borderRadius: 200, backgroundColor: 'white', width: SCREEN_WIDTH * 0.9179487179487179, height: SCREEN_HEIGHT * 0.0663507109004739, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'black', fontWeight: '500', fontSize: 16, height: 'auto'}}>Отправить проверочный код</Text>
                    </TouchableOpacity>
                </View>
                <View style={{position: 'absolute', top: SCREEN_HEIGHT * 0.0414691, width: SCREEN_WIDTH * 0.9179487179487179, alignItems: 'center'}}>
                    <Text style={{color: 'red', fontSize: 16}}>{error}</Text>
                </View>
            </View>
            {isLoading && <ActivityIndicator size="large" color="#949494" style={{position: 'absolute', top: '50%'}}/>}
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
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 200,
        backgroundColor: "#191919"
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
    logo: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: 'auto',
        height: 'auto',
        alignSelf: 'center',
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.09123,
        left: SCREEN_WIDTH * 0.279487,
    },
})