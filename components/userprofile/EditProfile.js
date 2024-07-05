import React, { useState } from "react";
import { Text, View, Dimensions, TouchableOpacity, StyleSheet, Image, TextInput, Modal, ActivityIndicator } from "react-native";
import Arrow from '../icons/angle-left.png';
import { useNavigation } from "@react-navigation/native";
import store from "../store/store";
import Edit from "../icons/pen.png"
import Save from "../icons/save.png"
import axios from "axios";
import { observer } from "mobx-react-lite";

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

function EditInfo() {

    const navigation = useNavigation()
    const [modal, setModal] = useState(false)
    const [error, setError] = useState('Для внесения изменений требуется подключение к интернету')
    const [button1, setButton1] = useState(false);
    const [button2, setButton2] = useState(false);
    const [button3, setButton3] = useState(false);
    const [loadingIndicator, setLoadingIndicator] = useState(false)
    const [name, setName] = useState(store.name);
    const [residence, setResidence] = useState(store.residence);
    const [age, setAge] = useState(store.age);
    const [modalCompleted, setModalCompleted] = useState(false)

    async function editUserInfo() {
        try {
            setLoadingIndicator(true)
            const response = await axios.post('https://memorykeeper-backend-89433124d8be.herokuapp.com/api/edituserinfo', {id: store.userid, name: name, residence: residence, age: age})
            if (response.status === 200) {
                const data = response.data
                userUpdatedInfo = {
                    id: store.userid,
                    email: store.email,
                    name: data.name,
                    age: data.age,
                    residence: data.residence,
                }
                await store.setUser(userUpdatedInfo)
                setModalCompleted(true)
            } else if (response.status === 500) {
                setError('Произошла непредвиденная ошибка при изменении личных данных, приносим извинения за причиненные неудобства')
                setModal(true)
            }
        } catch (error) {
            if (error.request) {
                setModal(true)
            } else if (error.code) {
                setModal(true)
            } else {
                console.log(error)
            }
        } finally {
            setLoadingIndicator(false)
        }
    }

    function CompleteAction() {
        setModalCompleted(false)
        navigation.goBack()
    }

    return (
        <View style={{flex: 1, backgroundColor: 'black'}}>
            {loadingIndicator && 
            <Modal transparent={true} visible={loadingIndicator}>
                <View style={{width: SCREEN_WIDTH * 0.384615, height: SCREEN_HEIGHT * 0.11848, position: 'absolute', top: SCREEN_HEIGHT * 0.438388, left: SCREEN_WIDTH * 0.3076923, borderRadius: 20, justifyContent: 'center'}}>
                    <ActivityIndicator size='large' color="#949494"/>
                </View>
            </Modal>
            }
            <View style={styles.header}>
                <Text style={{color: 'white', fontSize: 28, width: SCREEN_WIDTH * 0.7025641, height: 'auto', textAlign: 'center', lineHeight: 28, fontWeight: '400'}}>Личные данные</Text>
                <TouchableOpacity style={{width: SCREEN_WIDTH * 0.1076, height: SCREEN_HEIGHT * 0.04976, borderRadius: 200, padding: 14, backgroundColor: '#191919', alignItems: 'center', justifyContent: 'center'}} onPress={() => navigation.goBack()}><Image source={Arrow} style={{width: 14, height: 14}}/></TouchableOpacity>
            </View>
            <Modal visible={modal} transparent={true} animationType='slide'>
                    <View style={{alignItems: 'center', justifyContent: 'space-evenly', position: 'absolute', bottom: 0, backgroundColor: '#191919', width: SCREEN_WIDTH, height: 220, borderTopRightRadius: 40, borderTopLeftRadius: 40}}>
                        <Text style={{width: 358, height: 'auto', textAlign: 'center', color: 'white', fontSize: 20}}>{error}</Text>
                        <TouchableOpacity onPress={() => setModal(false)} style={{backgroundColor: 'white', width: 358, height: 56, borderRadius: 200, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>Ок</Text>
                        </TouchableOpacity>
                    </View>
            </Modal>
            <Modal visible={modalCompleted} transparent={true} animationType='slide'>
                <View style={{position: 'absolute', backgroundColor: '#191919', width: SCREEN_WIDTH, bottom: 0, height: SCREEN_HEIGHT * 0.2035278154, alignItems: 'center', justifyContent: 'space-between', borderTopRightRadius: 40, borderTopLeftRadius: 40}}>
                    <Text style={{color: 'white', fontWeight: '400', fontSize: 26, marginTop: 20}}>Изменения внесены!</Text>
                    <TouchableOpacity onPress={() => CompleteAction()} style={{width: SCREEN_WIDTH * 0.917948, height: SCREEN_HEIGHT * 0.06635, backgroundColor: 'white', borderRadius: 200, marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: 'black', fontWeight: '500', fontSize: 16}}>Ок</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column', width: SCREEN_WIDTH * 0.91794872, height: 'auto', position: 'absolute', top: SCREEN_HEIGHT * 0.175355, left: SCREEN_WIDTH * 0.0410}}>
                <View style={{width: SCREEN_WIDTH * 0.91794872, height: SCREEN_HEIGHT * 0.0663507, alignItems: 'center', justifyContent: 'center', marginVertical: 10}}>
                    <View style={[styles.input, {backgroundColor: button1 ? 'black' : '#0A0A0A', borderColor: button1? '#949494' : '#191919', flexDirection: 'row', alignItems: 'center'}]}>
                        <TextInput onEndEditing={() => setButton1(prev => (!prev))} maxLength={40} onChangeText={(text) => setName(text)} value={name} placeholder={button1? '' : 'Укажите Ф.И.О'} placeholderTextColor={'#949494'} style={{color: button1? 'white' : '#949494', fontWeight: '400', fontSize: 16, width: 300, height: 40, lineHeight: 19, marginLeft: 7}} editable={true} onPress={() => setButton1(true)}/>
                    </View>
                    <View style={{borderRadius: 200, backgroundColor: button1 ? 'black' : '#191919',  position: 'absolute', width: 40, height: 16, top: -6, left: 20}}>
                        <Text style={{color: 'white', fontWeight: '400', fontSize: 12, textAlign: 'center'}}>Ф.И.О</Text>
                    </View>
                </View>
                <View style={{width: SCREEN_WIDTH * 0.91794872, height: SCREEN_HEIGHT * 0.0663507, alignItems: 'center', justifyContent: 'center', marginVertical: 10}}>
                    <View style={[styles.input, {backgroundColor: button2 ? 'black' : '#0A0A0A', borderColor: button2? '#949494' : '#191919', flexDirection: 'row', alignItems: 'center'}]}>
                        <TextInput value={age} keyboardType='numeric' onEndEditing={() => setButton2(prev => (!prev))} maxLength={19} onChangeText={(text) => setAge(text)} placeholder={button2? '' : 'Укажите возраст'} placeholderTextColor={'#949494'} style={{color: button2? 'white' : '#949494', fontWeight: '400', fontSize: 16, width: 300, height: 40, lineHeight: 19, marginLeft: 7}} editable={true} onPress={() => setButton2(true)}/>
                    </View>
                    <View style={{borderRadius: 200, backgroundColor: button2 ? 'black' : '#191919',  position: 'absolute',  width: 55, height: 16, top: -6, left: 20}}>
                        <Text style={{color: 'white', fontWeight: '400', fontSize: 12, textAlign: 'center'}}>Возраст</Text>
                    </View>
                </View>
                <View style={{width: SCREEN_WIDTH * 0.91794872, height: SCREEN_HEIGHT * 0.0663507, alignItems: 'center', justifyContent: 'center', marginVertical: 10}}>
                    <View style={[styles.input, {backgroundColor: button3 ? 'black' : '#0A0A0A', borderColor: button3? '#949494' : '#191919', flexDirection: 'row', alignItems: 'center'}]}>
                        <TextInput onEndEditing={() => setButton3(prev => (!prev))} maxLength={19} value={residence} onChangeText={(text) => setResidence(text)} placeholder={button3? '' : 'Укажите город'} placeholderTextColor={'#949494'} style={{color: button3? 'white' : '#949494', fontWeight: '400', fontSize: 16, width: 300, height: 40, lineHeight: 19, marginLeft: 7}} editable={true} onPress={() => setButton3(true)}/>
                    </View>
                    <View style={{borderRadius: 200, backgroundColor: button3 ? 'black' : '#191919',  position: 'absolute',  width: 120, height: 16, top: -6, left: 20,}}>
                        <Text style={{color: 'white', fontWeight: '400', fontSize: 12, textAlign: 'center'}}>Город проживания</Text>
                    </View>
                </View>
                {store.phone === ''? '' : <View style={{width: SCREEN_WIDTH * 0.91794872, height: 56, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginVertical: 5}}>
                    <View style={[styles.input, {backgroundColor: button3 ? 'black' : '#191919', borderColor: button3? '#949494' : ''}]}>
                        <TextInput value={number} onChangeText={(text) => setNumber(text)} style={{ textAlign: 'left', color: button3 ? 'white' : '#949494', fontWeight: '400', fontSize: 16, width: 300, height: 22, lineHeight: 22.4}} editable={button3}></TextInput>
                        <TouchableOpacity style={{width: 16, height: 16, justifyContent: 'center', alignItems: 'center', opacity: button3? 0 : 1}} onPress={() => setButton3(true)}>
                            <Image source={Edit} style={{width: 16, height: 16}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{borderRadius: 200, backgroundColor: button3 ? 'black' : '#191919',  position: 'absolute', width: 108, height: 16, top: -6, left: 20,}}>
                        <Text style={{color: 'white', fontWeight: '400', fontSize: 12, textAlign: 'center'}}>Номер телефона</Text>
                    </View>
                </View>}
            </View>
            {name != store.name || residence != store.residence || age != store.age? <TouchableOpacity onPress={() => editUserInfo()} style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: SCREEN_WIDTH * 0.91794872, height: SCREEN_HEIGHT * 0.0663507, position: 'absolute', bottom: 15, left: SCREEN_WIDTH * 0.041025, backgroundColor: 'white', borderRadius: 200}}>
                <Image source={Save} style={{width: 16, height: 16}}/>
                <Text style={{color: '#0A0A0A', fontWeight: '500', fontSize: 16, width: 87, height: 17, textAlign: 'center', marginLeft: 5, lineHeight: 18}}>Сохранить</Text>
            </TouchableOpacity> : ''}
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
        height: SCREEN_HEIGHT * 0.0663507,
        borderRadius: 200,
        padding: 16, 
        borderWidth: 1, 
        borderStyle: 'solid',
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

export default observer(EditInfo)