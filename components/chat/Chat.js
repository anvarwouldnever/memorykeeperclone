import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Keyboard, Dimensions, Image, KeyboardAvoidingView, ScrollView, TouchableHighlight, StyleSheet, ActivityIndicator } from 'react-native';
import VectorBack from '../icons/angle-left (3).png';
import Vector from '../icons/arrow-up.png';
import Phone from '../icons/phone.png';
import io from 'socket.io-client';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import store from '../store/store';

const socket = io.connect("https://memory-keeper-websocket-d3c6b3f6cfe9.herokuapp.com", {
    secure: true,
    rejectUnauthorized: false
})

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

const ChatScreen = () => {

    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([{author: 'admin', text: 'Здравствуйте! Чем можем помочь?'}]);
    const [error, setError] = useState('')
    const [modal, setModal] = useState(false)

    const room = `${store.userid}`;
    const username = `${store.name}`;

    const navigation = useNavigation();

    useFocusEffect(() => {
        if (store.seenMessages === true) {
            store.setMessages(false)
        } else {
            return
        }
    })

    useEffect(() => {
            const joinRoom = (room) => {
                try {
                    socket.emit("join_room", {room: room, username: username, isAdmin: false});
                } catch (error) {
                    setError('Отсутствует подключение к интернету')
                }
            }

            joinRoom(room);
    }, [])

    const sendMessage = () => {
        try {
            Keyboard.dismiss()
            socket.emit("send_message", { author: 'user', message: inputText, room: room, seen: 'admin-unseen'});
            setInputText('')
            setMessages(prevMessages => [...prevMessages, { author: 'user', text: inputText }]);
        } catch (error) {
            console.log(error)
            setError('Отсутствует подключение к интернету')   
        }
    };

    useEffect(() => {
        try {
            socket.on('fetch_messages', (data) => {
                const transformedData = data.map(item => ({
                    author: item.author,
                    text: item.text
                }));
                setMessages(prevMessages => [...prevMessages, ...transformedData])
            })
            socket.on("receive_message", (data) => {
                setMessages(prevMessages => [...prevMessages, { author: 'admin', text: data.message }]);
                store.setMessages(true)
            })
        } catch (error) {
            console.log(error)
            setError('Отсутствует подключение к интернету')   
        }
    }, [socket])

    return (
       <View style={{flex: 1, backgroundColor: 'black', flexDirection: 'column', alignItems: 'center'}}>
        <View style={{position: 'absolute', top: '15%', width: SCREEN_WIDTH * 0.917948, height: SCREEN_HEIGHT * 0.76072821846}}>
            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                <TouchableHighlight>
                    <View style={{marginTop: 30, justifyContent: error != ''? 'center' : '', width: SCREEN_WIDTH * 0.917948, height: 'auto', marginBottom: 300}}>
                        {
                            messages.map((message, index) => (
                                <View key={index} style={{alignSelf: message.author === 'user'? 'flex-end' : 'flex-start', height: 'auto', width: 'auto', backgroundColor: message.author === 'user'? 'white' : '#191919', justifyContent: 'flex-end', flexDirection: 'row', borderTopRightRadius: 20, borderTopLeftRadius: 20, borderBottomLeftRadius: message.author === 'admin'? 0 : 20, borderBottomRightRadius: message.author === 'admin'? 20 : 0, paddingVertical: 20, paddingHorizontal: 22, marginVertical: 7}}>
                                    <Text style={{color: message.author === 'user' ? 'black' : 'white', width: 'auto', height: 'auto', fontWeight: '400', fontSize: 16, textAlign: 'left'}}>{message.text}</Text>
                                </View>
                            ))
                        }
                    </View>
                </TouchableHighlight>
            </ScrollView>
        </View>
        <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{borderRadius: 200, width: SCREEN_WIDTH * 0.107692, height: SCREEN_HEIGHT * 0.04976, justifyContent: 'center', alignItems: 'center', backgroundColor: '#191919'}}>
                    <Image source={VectorBack} style={{width: 14, height: 14}}/>
                </TouchableOpacity>
                <Text style={{width: SCREEN_WIDTH * 0.7025641, height: 'auto', color: 'white', justifyContent: 'center', alignItems: 'center', textAlign: 'center', lineHeight: 28, fontSize: 28, fontWeight: 400}}>Поддержка</Text>
                <TouchableOpacity onPress={() => setModal(true)} style={{borderRadius: 200, width: SCREEN_WIDTH * 0.107692, height: SCREEN_HEIGHT * 0.04976, justifyContent: 'center', alignItems: 'center', backgroundColor: '#191919'}}>
                    <Image source={Phone} style={{width: 14, height: 14}}/>
                </TouchableOpacity>
        </View>
        <KeyboardAvoidingView style={{position: 'absolute', bottom: SCREEN_HEIGHT * 0.0158061116965227, left: SCREEN_WIDTH * 0.03333, width: SCREEN_WIDTH * 0.92564103, height: SCREEN_HEIGHT * 0.06635071}} behavior='height'>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                <View style={{width: SCREEN_WIDTH * 0.75641026, height: SCREEN_HEIGHT * 0.06635, borderRadius: 200, borderColor: '#191919', borderWidth: 1, borderStyle: 'solid', padding: 20, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', backgroundColor: '#0A0A0A'}}>
                    <TextInput keyboardAppearance="dark" value={inputText} onChangeText={(text) => setInputText(text)} style={{width: SCREEN_WIDTH * 0.4358, height: SCREEN_HEIGHT * 0.06635, color: 'white', flexGrow: 1}} placeholder='Введите текст' placeholderTextColor={'#949494'}/>
                </View>
                <TouchableOpacity onPress={inputText === ''? () => console.log('пусто') : () => sendMessage()} style={{width: SCREEN_WIDTH * 0.1435, height: SCREEN_HEIGHT * 0.06635, borderRadius: 200, backgroundColor: inputText === ''? '#191919' : 'white', justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={Vector} style={{width: 16, height: 16}}/>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
        <Modal transparent visible={modal} animationType='fade'>
            <View style={{justifyContent: 'space-between', alignItems: 'center', position: 'absolute', bottom: 0, backgroundColor: '#0A0A0A', width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.35587188612099, borderTopLeftRadius: 40, borderTopRightRadius: 40}}>
                <View style={{borderRadius: 200, backgroundColor: '#191919', width: SCREEN_WIDTH * 0.202564102564, height: 6, marginTop: 15, borderColor: '#191919', borderWidth: 1, borderStyle: 'solid'}}/>
                <Text style={{color: 'white', fontSize: 26}}>Наши контакты</Text>
                <Text style={{color: 'white', fontSize: 26}}>+ 998 90 999 99 99</Text>
                <Text style={{color: 'white', fontSize: 26}}>+ 998 90 999 99 99</Text>
                <TouchableOpacity onPress={() => setModal(false)} style={{justifyContent: 'center', alignItems: 'center', marginBottom: 15, width: SCREEN_WIDTH * 0.9179, height: SCREEN_HEIGHT * 0.06635071090, backgroundColor: 'white', borderRadius: 200}}>
                        <Text style={{fontSize: 16, color: 'black', fontWeight: '500'}}>Ок</Text>
                </TouchableOpacity>
            </View>
        </Modal>
       </View>   
    );
};

const styles = StyleSheet.create({
    header: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        top: SCREEN_HEIGHT * 0.04739,
        position: 'absolute',
        width: SCREEN_WIDTH * 0.9179,
        height: SCREEN_HEIGHT * 0.09478,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'black'
    },

})

export default ChatScreen;