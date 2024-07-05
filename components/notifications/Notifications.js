import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text, ScrollView, TouchableHighlight, Dimensions } from "react-native";
import VectorBack from '../icons/angle-left.png';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Bell from '../icons/bell (1).png'
import Bell2 from '../icons/bell (2).png'
import store from "../store/store";
import { observer } from "mobx-react-lite";

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

function Notifications({ route }) {

    const notifications = route.params.notifications


    useEffect(() => {
        store.setNotifications(false)
        seeNotifications()
     }, []);

    async function seeNotifications () {
            try {
                await axios.post('https://memory-keeper-websocket-d3c6b3f6cfe9.herokuapp.com/seenotifications', { id: store.userid });
            } catch (error) {
                console.log(error)   
            }
    }

    const navigation = useNavigation()

    return (
        <View style={{flex: 1, backgroundColor: 'black', alignItems: 'center'}}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('AuthorizedUser')} style={{borderRadius: 200, width: SCREEN_WIDTH * 0.1076, height: SCREEN_HEIGHT * 0.04976, justifyContent: 'center', alignItems: 'center', backgroundColor: '#191919'}}>
                    <Image source={VectorBack} style={{width: 14, height: 14}}/>
                </TouchableOpacity>
                <Text style={{width: 'auto', height: 'auto', color: 'white', justifyContent: 'center', alignItems: 'center', textAlign: 'center', lineHeight: 28, fontSize: 28, fontWeight: 400}}>Уведомления</Text>
                <TouchableOpacity style={{width: SCREEN_WIDTH * 0.1076, height: SCREEN_HEIGHT * 0.04976,}} />
            </View>
            <View style={{width: SCREEN_WIDTH * 0.917948, height: SCREEN_HEIGHT * 0.829383, position: 'absolute', top: SCREEN_HEIGHT * 0.16587, left: SCREEN_WIDTH * 0.0410256, flexDirection: 'column'}}>
                <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                    <TouchableHighlight>
                        <View style={{width: SCREEN_WIDTH * 0.917948, height: 'auto'}}>
                            {notifications.slice().reverse().map((notification, index) => (
                                <View key={index} style={{width: SCREEN_WIDTH * 0.917948, height: 'auto', borderRadius: 12, backgroundColor: notification.seen? '#0A0A0A' : '#191919', marginVertical: 5, paddingHorizontal: 16, paddingVertical: 14, alignItems: 'center', justifyContent: 'center'}}>
                                    <View style={{width: SCREEN_WIDTH * 0.835897, height: 'auto', flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <View style={{width: 42, height: 42, borderRadius: 200, padding: 14, backgroundColor: notification.seen? '#191919' : 'white'}}>
                                            <Image source={notification.seen? Bell2 : Bell} style={{width: 14, height: 14}}></Image>
                                        </View>
                                        <View style={{width: SCREEN_WIDTH * 0.697435, height: 'auto', flexDirection: 'column', justifyContent: 'space-between'}}>
                                            <Text style={{width: SCREEN_WIDTH * 0.697435, height: 'auto', color: '#949494', fontWeight: '400', fontSize: 12}}>
                                                {notification.title}
                                            </Text>
                                            <Text style={{width: SCREEN_WIDTH * 0.697435, height: 'auto', fontSize: 16, fontWeight: '400', color: 'white', marginBottom: 5, marginTop: 3}}>
                                                {notification.body} 
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </TouchableHighlight>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: SCREEN_WIDTH * 0.917948,
        height: SCREEN_HEIGHT * 0.04976,
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.06872,
        left: SCREEN_WIDTH * 0.041025,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})

export default observer(Notifications)