import React, { useEffect, useRef } from "react";
import { View, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Platform, Image, TouchableHighlight, Text, ActivityIndicator, Alert} from "react-native";
import Banner from '../icons/баннер.png';
import QR from '../icons/qrcode-scan.png';
import Chat from '../icons/comment-alt-message (1).png';
import Bell from '../icons/bell.png';
import Plus from '../icons/plus.png';
import Vector from '../icons/Vector (2).png';
import Clock from '../icons/clock.png';
import { useNavigation } from "@react-navigation/native";
import store from "../store/store";
import { observer } from "mobx-react-lite";
import Banner2 from '../icons/banner2.png';
import axios from "axios";
import NoPic from '../icons/download (2).jpg'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

function Home() {
   
    const [currentPage, setCurrentPage] = React.useState(0);
    const [relatives, setRelatives] = React.useState()
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState('')
    const [notifications, setNotifications] = React.useState([])
    const notificationListener = useRef();
    const responseListener = useRef();
    
    const images = [Banner, Banner];
    const navigation = useNavigation()

    const handleScroll = (event) => {
        const { x } = event.nativeEvent.contentOffset;
        const index = Math.round(x / (SCREEN_WIDTH * 0.6794871));
        setCurrentPage(index);
      };

      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      }) 

      async function registerForPushNotificationsAsync() {
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      
        if (Device.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            return;
          }
          const projectId =
            Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
          if (!projectId) {
            return
          }
          try {
            const pushTokenString = (
              await Notifications.getExpoPushTokenAsync({
                projectId,
              })
            ).data;
            console.log(pushTokenString);
            return pushTokenString;
          } catch (e) {
            handleRegistrationError(`${e}`);
          }
        } else {
            return
        }
      }

      async function IsNewMessage() {
        try {
            const hasNewMessage = await axios.get('https://memory-keeper-websocket-d3c6b3f6cfe9.herokuapp.com/userHasNewMessage', {params: {room: store.userid}})
            if (hasNewMessage.data.hasNewMessage) {
                store.setMessages(true)
            } else {
                return
            }
        } catch (error) {
            console.log(error)
        }
      }

      useEffect(() => {
        registerForPushNotificationsAsync()
          .then((token) => {
            if (token != undefined) {
                axios.post('https://memorykeeper-backend-89433124d8be.herokuapp.com/api/setuserexpotoken', { id: store.userid, expoToken: token })
            } else {
                return
            }
            })
          .catch((error) => console.log(error));
    
        notificationListener.current = Notifications.addNotificationReceivedListener(() => 
          store.setCallFunction(!store.callFunction));
    
        responseListener.current = Notifications.addNotificationResponseReceivedListener(() => 
            store.setCallFunction(!store.callFunction));
    
        return () => {
          notificationListener.current &&
            Notifications.removeNotificationSubscription(notificationListener.current);
          responseListener.current &&
            Notifications.removeNotificationSubscription(responseListener.current);
        };
      }, []);      

      async function fetchNotifications() {
        const response = await axios.post('https://memorykeeper-websocket-fd450cafb943.herokuapp.com/notifications', { id: store.userid });
        const fetchedNotifications = response.data
        if (JSON.stringify(fetchedNotifications) !== JSON.stringify(notifications)) {
            setNotifications(fetchedNotifications);
        const unseennotifications = fetchedNotifications.filter(notification => notification.seen === false);
        if (unseennotifications.length > 0) {
            store.setNotifications(true);
            return
        } else if (unseennotifications.length === 0) {
            store.setNotifications(false);
        }
        }
    }

    async function getRelatives() {
        try {
            setLoading(true)
            const response = await axios.get('https://memorykeeper-backend-89433124d8be.herokuapp.com/api/getrelatives', {params: {id: store.userid}})
            if (response.status === 200) {
            const data = response.data
            if (JSON.stringify(data) !== JSON.stringify(relatives)) {
                setRelatives(data);
                store.addRelative(data)
            } else {
                return;
            }
        } else {
            return;
        }
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.message)
                setError('Произошла непредвиденная ошибка')
            } else if (error.code === 'ECONNABORTED' || error.code === 'ENOTFOUND') {
                console.log(error.code)
                setError('Отсутствует подключение к интернету')
            } else if (error.request) {
                console.log(error.code)
                setError('Отсутствует подключение к интернету')
            } else {
                console.log(error)
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchNotifications()
        getRelatives()
        IsNewMessage()
    }, [store.userid, store.callFunction])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                    <Text style={{color: 'white', width: 170, height: 'auto', fontSize: 20, lineHeight: 20}}>MEMORY KEEPER</Text>
                <View style={{ width: SCREEN_WIDTH * 0.374358, height: SCREEN_HEIGHT * 0.04976, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity style={styles.imageholder} onPress={() => navigation.navigate('QrScanner')}>
                        <Image source={QR} style={{width: 14, height: 14}}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageholder} onPress={() => navigation.navigate('Chat')}>
                        {store.seenMessages && <View style={{position: 'absolute', width: 10, height: 10, backgroundColor: 'red', borderRadius: 200, top: 0, left: 30}}/>}
                        <Image source={Chat} style={{width: 14, height: 14}}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageholder} onPress={() => navigation.navigate('Notifications', { notifications })}>
                        {store.seenNotifications && <View style={{position: 'absolute', width: 10, height: 10, backgroundColor: 'red', borderRadius: 200, top: 0, left: 30}}/>}
                        <Image source={Bell} style={{width: 14, height: 14}}></Image>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.slideshow}>
                <ScrollView style={styles.scrollview} horizontal={true} onScroll={handleScroll} scrollEventThrottle={16} showsHorizontalScrollIndicator={false}>
                    {[{banner: Banner}, {banner: Banner2}].map((item, index) => {
                        
                        return (
                            <TouchableOpacity style={styles.slide} key={index} onPress={() => navigation.navigate(index === 0? 'BannerDescription' : 'BannerDescription2')}>
                                <Image source={item.banner} style={{width: SCREEN_WIDTH * 0.67948717, height: SCREEN_HEIGHT * 0.19549763033}}></Image>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
                <View style={styles.pagination}>
                    <View style={{width: 'auto', height: SCREEN_HEIGHT * 0.00473934, flexDirection: 'row', justifyContent: 'space-between'}}>
                    {images.map((_, index) => (
                            <View key={index} style={index === currentPage ? styles.textActive : styles.text}></View>
                    ))}
                    </View>
                </View>
            </View>
            <View style={styles.relatives}>
                <View style={styles.relativesheader}>
                    <Text style={{color: 'white', width: 'auto', height: 'auto', lineHeight: 26, fontSize: 26, fontWeight: 400}}>Мои близкие</Text>
                    <TouchableOpacity style={styles.addrelatives} onPress={() => navigation.navigate('AddRelative')}>
                        <Text style={{fontSize: 14, color: '#949494', fontWeight: '500', textAlign: 'center', lineHeight: 14}}>Добавить</Text>
                        <Image source={Plus} style={{width: 14, height: 14, marginRight: 5}}></Image>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{flex: 1, flexDirection: 'column'}} showsVerticalScrollIndicator={false}>
                    <TouchableHighlight>
                        <View style={{width: 'auto', height: 'auto'}}>
                            <View style={styles.relativeslist}>
                               {relatives? relatives.length >= 1? relatives.sort((a, b) => (a.isProven === b.isProven ? 0 : a.isProven ? -1 : 1)).map((member, index) => {
                                    
                                    const uris = member.uris

                                    return (
                                        <TouchableOpacity onPress={member.isProven? () => navigation.navigate('DeadUserProfile', {name: member.name, deathdate: member.deathdate, borndate: member.borndate, location: member.location, biography: member.biography, uris: member.uris, id: member._id, relation: member.relation}) : () => console.log('not rpoven')} style={[styles.relativeobject, {opacity: loading? 0 : 1, backgroundColor: member.isProven? "#191919" : "#0A0A0A", borderColor: member.isProven? "" : "#191919", borderWidth: 1, borderStyle: 'solid'}]} key={index}>
                                            <View style={{width: SCREEN_WIDTH * 0.77435, height: SCREEN_HEIGHT * 0.05687, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                                <Image source={uris[0] === undefined? NoPic : uris[0].type === 'video/mp4'? NoPic : {uri: uris[0].downloadURL}} style={{width: 48, height: 48, borderRadius: 200}}></Image>
                                                <View style={{flexDirection: 'column', justifyContent: 'space-between', width: SCREEN_WIDTH * 0.620512, height: SCREEN_HEIGHT * 0.04620}}>
                                                    <Text style={{color: '#949494', fontWeight: '500', fontSize: 12}}>{member.relation}</Text>
                                                    <Text style={{color: '#FFFFFF', fontWeight: '400', fontSize: 16}}>{member.name}</Text>
                                                </View>
                                            </View>
                                            <View style={{width: SCREEN_WIDTH * 0.06153, height: SCREEN_HEIGHT * 0.02843, alignItems: 'center', justifyContent: 'center'}}>
                                                <Image source={member.isProven? Vector : Clock} style={ member.isProven? {width: 7.69, height: 13.37} : {width: 24, height: 24}}></Image>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                    }) : <Text style={{color: '#949494', fontWeight: '500', fontSize: 16, alignSelf: 'center', marginVertical: 150}}>Нет добавленных близких</Text>
                                : <Text style={{color: '#949494', fontWeight: '500', fontSize: 16, alignSelf: 'center', marginVertical: 150}}>{error}</Text>} 
                            </View>
                        </View>
                    </TouchableHighlight>
                </ScrollView>
            </View>
            {loading && 
                <ActivityIndicator size='large' color="#949494" style={{position: 'absolute', top: SCREEN_HEIGHT * 0.59241706, left: SCREEN_WIDTH * 0.453846}}/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'center',
    },
    scrollview: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        flex: 1,
        flexDirection: 'row',
        width: SCREEN_WIDTH * 0.9179,
        height: 'auto'
    },
    slideshow: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.9179,
        height: SCREEN_HEIGHT * 0.22156,
        top: SCREEN_HEIGHT * 0.1469,
        left: SCREEN_WIDTH * 0.041025,
        position: 'absolute',
    },
    slide: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.67948717, height: SCREEN_HEIGHT * 0.19549763033,
        backgroundColor: 'gray',
        borderRadius: 14,
        marginHorizontal: 5,
        borderRadius: 200
    },
    textActive: {
        width: SCREEN_WIDTH * 0.07179,
        height:SCREEN_HEIGHT * 0.004739,
        backgroundColor: '#949494',
        // borderColor: 'white', borderWidth: 5, borderStyle: 'solid',
        borderRadius: 200,
        marginRight: 4,
        marginLeft: 4
    },
    text: {
        width: SCREEN_WIDTH * 0.07179,
        height: SCREEN_HEIGHT * 0.00473934,
        backgroundColor: '#191919',
        // borderColor: 'white', borderWidth: 5, borderStyle: 'solid',
        borderRadius: 200,
        marginLeft: 4,
        marginRight: 4
    },
    pagination: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        height: SCREEN_HEIGHT * 0.02606635,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderRadius: 200,
        alignItems: 'flex-end'
    },
    header: {
        width: SCREEN_WIDTH * 0.9179,
        height: SCREEN_HEIGHT * 0.04976303,
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.06872038,
        left: SCREEN_WIDTH * 0.0410256,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    imageholder: {
        backgroundColor: '#191919', 
        width: SCREEN_WIDTH * 0.1076, 
        height: SCREEN_HEIGHT * 0.04976, 
        borderRadius: 200, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    relatives: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.9179,
        height: SCREEN_HEIGHT * 0.497630,
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.4063981,
        left: SCREEN_WIDTH * 0.041025
    },
    relativeslist: {
        // borderColor: 'red', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.9179,
        justifyContent: 'flex-start',
        flexGrow: 1
    },
    relativesheader: {
        // borderColor: 'red', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.9179,
        height: 'auto',
        marginBottom: 10,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    viewall: {
        width: SCREEN_WIDTH * 0.9179,
        height: SCREEN_HEIGHT * 0.04976303,
        marginTop: 15,
        backgroundColor: '#191919',
        borderRadius: 200,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40
    },
    addrelatives: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: 'auto',
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row-reverse'
    },
    relativeobject: {
        width: SCREEN_WIDTH * 0.9179,
        height: SCREEN_HEIGHT * 0.09004739,
        borderRadius: 12,
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 16,
        marginTop: 10
    }
})

export default observer(Home)