import React, { useState } from "react";
import { Text, TouchableOpacity, View, Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { OtpInput } from "react-native-otp-entry";
import { observer } from "mobx-react-lite";
import store from "../store/store";

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

function VerifyCard({ route }) {

    const { token, phone } = route.params
    const [code, setCode] = useState('')
    const [error, setError] = useState('')

    const navigation = useNavigation()

    async function fetch() {
        try {
            const responseCode = await axios.post(`https://memorykeeper-backend-89433124d8be.herokuapp.com/api/cardVerify`, {token, code})
            const data = responseCode.data
            if (data.result.card.verify) {
                store.addCard({
                    cardnumber: `${data.result.card.number}`,
                    expire: `${data.result.card.expire}`,
                    token: `${data.result.card.token}`,
                    main: false
                })
                navigation.navigate('Cards')
            } else {
                setError('Ошибка')
            }
        } catch (error) {
            if (error.response.data.message) {
                setError(error.response.data.message)
            } else if(error.response.status === 500) {
                setError('Непредвиденная ошибка')
            }
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                <Text style={{color: "#949494", textAlign: 'center', justifyContent: 'center'}}>{'<'}</Text>
            </TouchableOpacity>
            <View style={styles.logo}>
                <Text style={{color: 'white', fontSize: 21, textAlign: 'center', lineHeight: 21}}>MEMORY KEEPER</Text>
            </View>
            <View style={styles.verification}>
                    <View style={styles.text}>
                        <Text style={{color: 'white', fontSize: 28}}>Верификация</Text>
                        <View style={{justifyContent: 'center', width: SCREEN_WIDTH * 0.82564103, alignItems: 'center', flexDirection: 'row'}}>
                            <Text style={{color: '#949494', fontSize: 14, fontWeight: '400', lineHeight: 18.2}}>Пароль отправлен на</Text>
                            <Text style={{color: 'white', fontSize: 14, fontWeight: '500', lineHeight: 14, marginLeft: 6}}>+{phone}</Text>
                        </View>
                    </View>
                    {error != '' && <Text style={{width: '80%', textAlign: 'center', color: 'red', fontSize: 15, marginTop: 15}}>{error}</Text>}
                    <View style={styles.codecontainer}>
                        <OtpInput 
                            numberOfDigits={6}
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
                    <TouchableOpacity style={styles.confirm} onPress={() => fetch()}>
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
        width: SCREEN_WIDTH * 0.441025,
        height: SCREEN_HEIGHT * 0.02369,
        alignSelf: "auto",
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.09123223,
        left: SCREEN_WIDTH * 0.279487
    },
    back: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.07582,
        left: SCREEN_WIDTH * 0.041025,
        width: 42,
        height: 42,
        padding: 12,
        borderRadius: 200,
        backgroundColor: "#191919"
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
        height: SCREEN_HEIGHT * 0.06635071,
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    codeinput: {
        borderColor: '#191919', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_HEIGHT * 0.12820,
        height: 30,
        borderRadius: 200,
        padding: 20,
        color: "white",
        backgroundColor: "#0A0A0A",
        textAlign: 'center',
        fontSize: 16,
    },
    confirm: {
        width: SCREEN_WIDTH * 0.917948,
        height: SCREEN_HEIGHT * 0.06635,
        borderRadius: 200,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40 
    }
});

export default observer(VerifyCard)