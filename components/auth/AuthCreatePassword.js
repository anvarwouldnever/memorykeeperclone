import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, ActivityIndicator, Dimensions} from "react-native";
import store from "../store/store";
import axios from "axios";
import { observer } from "mobx-react-lite";
import Arrow from '../icons/angle-left (3).png'

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

function AuthCreatepassword({ route }) {

    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState('')
    const [password, setPassword] = React.useState()
    const [password2, setPassword2] = React.useState()
    const navigation = useNavigation();
    const { email, name } = route.params

    async function register() {
        try {
            setIsLoading(true)
            if(password == password2) {
                const response = await axios.post('https://memorykeeper-backend-89433124d8be.herokuapp.com/api/registration', {email, password, name})
                const data = response.data
                if(response.status === 200) {
                    store.setToken('logged')
                    const userInfo = {
                        id: data._id,
                        name: data.name,
                        email: data.email,
                        age: data.age,
                        residence: data.residence
                    }
                    store.setUser(userInfo)
                } else if (response.status === 300) {
                    return 
                }
            } 
            if (password != password2) {
                setError('Пароли не совпадают')
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.message)
                setError(error.response.data.message)
            } else if (error.code === 'ECONNABORTED' || error.code === 'ENOTFOUND') {
                console.log(error.code)
                setError('Отсутствует подключение к интернету')
            } else if (error.request) {
                console.log(error.code)
                setError('Произошла непредвиденная ошибка')
            } else {
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
                        <Text style={{color: 'white', fontSize: 28, lineHeight: 28}}>Создание пароля</Text>
                    </View>
                    {error != '' && <Text style={styles.error}>{error}</Text>}
                <TextInput 
                        style={styles.emailinput} 
                        placeholder="Создайте пароль" 
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
                <TouchableOpacity style={styles.confirm} onPress={() => register()}>
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        borderRadius: 200,
        backgroundColor: "#191919"
    },
    logo: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: 'auto',
        height: 'auto',
        alignSelf: 'center',
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.09123,
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
        paddingHorizontal: 16,
        color: '#949494',
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
    }
})

export default observer(AuthCreatepassword)