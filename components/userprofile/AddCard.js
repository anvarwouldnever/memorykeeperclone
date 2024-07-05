import React, { useState } from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Image, TextInput } from "react-native";
import Arrow from '../icons/angle-left.png';
import { useNavigation } from "@react-navigation/native";
import Card from '../icons/card-atm.png'
import Calendar from '../icons/calendar-alt.png'
import Plus from '../icons/plusblack.png'
import axios from "axios";

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

const formatCardNumber = (text) => {
    if (typeof text !== 'string') {
        return '';
    }
    // Удаляем все пробелы и разбиваем строку на группы по 4 цифры
    return text.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
};

const formatExpirationDate = (text) => {
    if (typeof text !== 'string') {
        return '';
    }
    // Удаляем все пробелы и разбиваем строку на группы по 4 цифры
    return text.replace(/\s?/g, '').replace(/(\d{2})/g, '$1 ').trim();
};

export default function AddCard() {

    const [button1, setButton1] = useState(false);
    const [button2, setButton2] = useState(false);
    const [cardnumber, setCardNumber] = useState()
    const [expiredate, setExpireDate] = useState('')
    const [error, setError] = useState('')

    const navigation = useNavigation()

    async function cardCreate(cardnumber, expiredate) {
        try {
            const response = await axios.post('https://memorykeeper-backend-89433124d8be.herokuapp.com/api/cardCreate', {cardnumber: cardnumber, expiredate: expiredate})
            if (response.data.data.result.sent === true) {
                const token = response.data.token
                const phone= response.data.data.result.phone
                navigation.navigate('VerifyCard', {token: token, phone: phone})
            } else {
                console.log('Ошибка')
            }
        } catch (error) {
            if (error.response.data.message) {
                setError(error.response.data.message)
            } else if (error.response.status === 500) {
                setError('Непредвиденная ошибка')
            } else {
                setError('Непредвиденная ошибка')
            }
        }
    }

    const handleChange1 = (text) => {
        const formattedText = formatCardNumber(text);
        setCardNumber(formattedText);
    };

    const handleChange2 = (text) => {
        const formattedText = formatExpirationDate(text);
        setExpireDate(formattedText);
    };

    return (
        <View style={{flex: 1, backgroundColor: 'black'}}>
            <View style={styles.header}>
                <Text style={{color: 'white', fontSize: 28, width: SCREEN_WIDTH * 0.7025641, height: 'auto', textAlign: 'center', lineHeight: 28, fontWeight: '400', marginLeft: 4}}>Добавить карту</Text>
                <TouchableOpacity style={{width: SCREEN_WIDTH * 0.1076, height: SCREEN_HEIGHT * 0.04976, borderRadius: 200, padding: 14, backgroundColor: '#191919', alignItems: 'center', justifyContent: 'center'}} onPress={() => navigation.goBack()}>
                    <Image source={Arrow} style={{width: 14, height: 14}}/>
                </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center', width: SCREEN_WIDTH * 0.91794872, height: SCREEN_HEIGHT * 0.232227, position: 'absolute', top: SCREEN_HEIGHT * 0.175355, left: SCREEN_WIDTH * 0.041025}}>
                {error != '' && <Text style={{color: 'red', textAlign: 'center', width: '80%', fontSize: 16, marginBottom: 10}}>{error}</Text>}
                <View style={{width: SCREEN_WIDTH * 0.91794872, height: SCREEN_HEIGHT * 0.06635, alignItems: 'center', justifyContent: 'center'}}>
                    <View style={[styles.input, {backgroundColor: button1 ? 'black' : '#0A0A0A', borderColor: button1? '#949494' : '#191919', flexDirection: 'row', alignItems: 'center'}]}>
                        {button1? '' : <Image source={Card} style={{width: 16, height: 16}}/>}
                        <TextInput onEndEditing={() => setButton1(prev => (!prev))} maxLength={19} caretHidden={true} onChangeText={(text) => handleChange1(text)} textContentType="creditCardNumber" keyboardType="number-pad" value={cardnumber} placeholder={button1? '' : 'Номер карты'} placeholderTextColor={'#949494'} style={{color: button1? 'white' : '#949494', fontWeight: '400', fontSize: 16, width: 300, height: 40, lineHeight: 19, marginLeft: 7}} editable={true} onPress={() => setButton1(true)}/>
                    </View>
                    {button1? <View style={{borderRadius: 200, backgroundColor: button1 ? 'black' : '#191919',  position: 'absolute',  width: 85, height: 16, top: -6, left: 25,}}>
                        <Text style={{color: 'white', fontWeight: '400', fontSize: 12, textAlign: 'center'}}>Номер карты</Text>
                    </View> : ''}
                </View>
                <View style={{width: SCREEN_WIDTH * 0.91794872, height: SCREEN_HEIGHT * 0.06635, alignItems: 'center', justifyContent: 'center', marginTop: 15}}>
                    <View style={[styles.input, {backgroundColor: button2 ? 'black' : '#0A0A0A', borderColor: button2? '#949494' : '#191919', flexDirection: 'row', alignItems: 'center'}]}>
                        {button2? '' : <Image source={Calendar} style={{width: 16, height: 16}}/>}
                        <TextInput onEndEditing={() => setButton2(prev => (!prev))} maxLength={5} caretHidden={true} onChangeText={(text) => handleChange2(text)} textContentType="creditCardExpiration" keyboardType="number-pad" value={expiredate} placeholder={button2? '' : 'Срок действия'} placeholderTextColor={'#949494'} style={{color: button2? 'white' : '#949494', fontWeight: '400', fontSize: 16, width: 300, height: 40, lineHeight: 19, marginLeft: 7}} editable={true} onPress={() => setButton2(true)}/>
                    </View>
                    {button2? <View style={{borderRadius: 200, backgroundColor: button2 ? 'black' : '#191919',  position: 'absolute',  width: 95, height: 16, top: -6, left: 25}}>
                        <Text style={{color: 'white', fontWeight: '400', fontSize: 12, textAlign: 'center'}}>Срок действия</Text>
                    </View> : ''}
                </View>
            </View>
            <TouchableOpacity onPress={() => cardCreate(cardnumber, expiredate)} style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', position: 'absolute', bottom: 20, left: SCREEN_WIDTH * 0.041025, borderRadius: 200, width: SCREEN_WIDTH * 0.917948, height: SCREEN_HEIGHT * 0.066350, backgroundColor: 'white', }}>
                <Image source={Plus} style={{width: 16, height: 16, marginRight: 5}}/>
                <Text style={{ width: 'auto', height: 'auto', fontWeight: '500', fontSize: 16, color: 'black', lineHeight: 16}}>Добавить карту</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.91794872, 
        height: SCREEN_HEIGHT * 0.09478,
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.0473933,
        left: SCREEN_WIDTH * 0.041025,
        alignItems: 'center',
        justifyContent: "flex-end",
        flexDirection: 'row-reverse'
    },
    input: {
        width: SCREEN_WIDTH * 0.91794872,
        height: SCREEN_HEIGHT * 0.06635,
        borderRadius: 200,
        padding: 16, 
        borderWidth: 1, 
        borderStyle: 'solid',
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
    }
})