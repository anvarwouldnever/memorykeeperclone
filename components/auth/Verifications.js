import React, { useEffect } from "react";
import { Text, TouchableOpacity, View, Image, Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { OtpInput } from "react-native-otp-entry";
import Arrow from '../icons/angle-left (3).png'

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

export default function Verification({ route }) {

    const [seconds, setSeconds] = React.useState();
    const [isActive, setIsActive] = React.useState(true);
    const [error, setError] = React.useState(false)
    const { email, name } = route.params
    const [code, setCode] = React.useState('')
    const [userCode, setUserCode] = React.useState()
    const navigation = useNavigation()

    async function fetch() {
        try {
            const response = await axios.get(`https://memorykeeper-backend-89433124d8be.herokuapp.com/api/verification`, {params: { email: email }})
            console.log(response.data)
            setUserCode(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
            fetch()
    }, [])

    async function verificate() {
        try {
            console.log(code)
            if(userCode == code) {
                navigation.navigate('CreatePassword', {email, name})
                console.log("success")
            }
            if (userCode != code) {
                setError(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    function startTimer(duration) {
        setIsActive(false)
        fetch()
        let timer = duration, minutes, seconds;
        let interval = setInterval(() => {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
    
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
    
            setSeconds(minutes + ":" + seconds);
    
            if (--timer < 0) {
                clearInterval(interval);
                setIsActive(true)
            }
        }, 1000);
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
                        <Text style={{color: 'white', fontSize: 28}}>Верификация</Text>
                        <View style={{justifyContent: 'center', width: SCREEN_WIDTH * 0.825641, alignItems: 'center', flexDirection: 'row'}}>
                            <Text style={{color: '#949494', fontSize: 14, fontWeight: '400', lineHeight: 18.2}}>Пароль отправлен на</Text>
                            <Text style={{color: 'white', fontSize: 14, fontWeight: '500', lineHeight: 18.2, marginLeft: 6}}>{email}</Text>
                        </View>
                    </View>
                    <View style={styles.codecontainer}>
                            <OtpInput 
                            numberOfDigits={4}
                            focusColor="#949494"
                            hideStick={true}
                            theme={{
                                pinCodeContainerStyle: {borderColor: '#191919', borderRadius: 200, width: 50, height: 55},
                                pinCodeTextStyle: {color: 'white'},
                            }}
                            onFilled={(text) => setCode(text)}
                            textInputProps={{
                                accessibilityLabel: "One-Time Password",
                              }}
                        />
                    </View>
                    <View style={{flexDirection: 'row'}}>
                    <Text style={{color: isActive? '#949494' : 'white', lineHeight: 22, fontWeight: '500', fontSize: 16, marginVertical: 30, margin: 5}}>{seconds}</Text>
                    {isActive? <Text style={{color: 'white', lineHeight: 22, fontWeight: '500', fontSize: 16, marginVertical: 30}} onPress={() => {startTimer(30)}}>Переотправить</Text> : <Text style={{color: '#949494', lineHeight: 22, fontWeight: '500', fontSize: 16, marginVertical: 30}}>Переотправить</Text>}
                    </View>
                    <TouchableOpacity style={styles.confirm} onPress={verificate}>
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
    logo: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: 'auto',
        height: 'auto',
        alignSelf: 'center',
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.0912322,
    },
    back: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.07582,
        left: SCREEN_WIDTH * 0.041025,
        width: SCREEN_WIDTH * 0.1076, 
        height: SCREEN_HEIGHT * 0.04976,
        borderRadius: 200,
        backgroundColor: "#191919",
        justifyContent: 'center',
        alignItems: 'center'
    },
    verification: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.917948,
        height: SCREEN_HEIGHT * 0.351895,
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.324052,
        left: SCREEN_WIDTH * 0.041025,
        alignItems: 'center'
    },
    text: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.825641,
        height: SCREEN_HEIGHT * 0.084123,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    codecontainer: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.917948,
        height: SCREEN_HEIGHT * 0.06635,
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    codeinput: {
        borderColor: '#949494', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.205128,
        height: SCREEN_HEIGHT * 0.06635071,
        borderRadius: 200,
        padding: 20,
        color: "white",
        backgroundColor: "#0A0A0A",
        textAlign: 'center',
        fontSize: 16,
    },
    confirm: {
        width: SCREEN_WIDTH * 0.917948,
        height: SCREEN_HEIGHT * 0.06635071,
        borderRadius: 200,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center' 
    }
})