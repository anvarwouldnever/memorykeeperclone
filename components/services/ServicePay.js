import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, ScrollView, TouchableHighlight, Modal, ActivityIndicator } from "react-native";
import Arrow from '../icons/angle-left.png'
import { useNavigation } from "@react-navigation/native";
import Plus from '../icons/plus.png'
import { Switch } from 'react-native-switch';
import store from "../store/store";
import { observer } from "mobx-react-lite";
import MoneyBill from '../icons/money-bill.png'
import axios from "axios";
import React, { useState } from "react";

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

function ServicePay({ route }) {

    const navigation = useNavigation()
    const chosenOption = route.params.chosenOption
    const selectedRelatives = route.params.selectedRelatives
    const deadusersid = selectedRelatives.map(relative => relative._id);
    const [errorModal, setErrorModal] = useState(false)
    const [loadingIndicator, setLoadingIndicator] = useState(false)
    const date = new Date();
    const formattedDate = date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });

    async function Pay() {
        try {
            // setLoadingIndicator(true)
            // const response = await axios.post('https://memorykeeper-backend-89433124d8be.herokuapp.com/api/receiptPay', {price: chosenOption * selectedRelatives.length, token: store.cards[0].token})
            // if (response.data.result.receipt.pay_time) {
                await axios.post('https://memorykeeper-backend-89433124d8be.herokuapp.com/api/createorder', {id: store.userid, name: 'Посадка цветов', price: `${chosenOption * selectedRelatives.length} 000`, type: 'inprogress', date: formattedDate, deadusersid: deadusersid })
                const prev = !store.callFunctionOrders
                store.setCallFunctionOrders(prev)
                navigation.navigate('Заказы')
            // } else if (response.data.error.message) {
            //     console.log(response.data.error.message)
            // }
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingIndicator(false)
        }
    }

    return (
        <View style={{flex: 1, backgroundColor: 'black'}}>
            {loadingIndicator && 
            <Modal transparent={true} visible={loadingIndicator}>
                <View style={{width: SCREEN_WIDTH * 0.384615, height: SCREEN_HEIGHT * 0.11848, position: 'absolute', top: SCREEN_HEIGHT * 0.438388, left: SCREEN_WIDTH * 0.307692, borderRadius: 20, justifyContent: 'center'}}>
                    <ActivityIndicator size='large' color="#949494"/>
                </View>
            </Modal>
            }
            <View style={styles.header}>
                <Text style={styles.headertext}>Оплата</Text>
                <TouchableOpacity style={styles.headertopacity} onPress={() => navigation.goBack()}>
                    <Image source={Arrow} style={{width: 14, height: 14}}/>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'column', justifyContent: 'space-between', position: 'absolute', width: SCREEN_WIDTH * 0.917948, height: SCREEN_HEIGHT * 0.261848, top: SCREEN_HEIGHT * 0.280805, left: SCREEN_WIDTH * 0.0410}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: SCREEN_WIDTH * 0.917948, height: 'auto'}}>
                    <Text style={{width: 'auto', height: 'auto', color: '#FFFFFF', fontSize: 28, lineHeight: 28, fontWeight: '400', letterSpacing: -2}}>Выберите карту</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('AddCard')} style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', height: 'auto'}}>
                        <Image source={Plus} style={{width: 14, height: 14, marginRight: 5}}/>
                        <Text style={{color: '#949494', fontSize: 14, width: 'auto', height: 'auto', fontWeight: '500', lineHeight: 14}}>Добавить</Text>
                    </TouchableOpacity>
                </View>
                <View style={{height: SCREEN_HEIGHT * 0.182464, width: SCREEN_WIDTH * 0.917948}}>
                    <ScrollView horizontal={true} >
                        <TouchableHighlight>
                            <View style={{width: 'auto', height: SCREEN_HEIGHT * 0.182464, flexDirection: 'row'}}>
                            {store.cards.map((card, index) => {
                                return (
                                    <View key={index} style={{ marginRight: 14, borderColor: card.main? 'white' : '#191919', borderWidth: 1, borderStyle: 'solid', justifyContent: 'space-around', width: SCREEN_WIDTH * 0.679487, height: SCREEN_HEIGHT * 0.182464, paddingVertical: 18, paddingHorizontal: 18, borderRadius: 14, backgroundColor: card.main? '#191919' : '#0A0A0A', position: 'relative'}}>
                                        <View style={{justifyContent: 'flex-end', alignItems: 'center', width: SCREEN_WIDTH * 0.607692, height: SCREEN_HEIGHT * 0.03317, flexDirection: 'row'}}>
                                            <Text style={{alignItems: 'center', marginRight: 12, width: SCREEN_WIDTH * 0.151282, height: 'auto', color: '#949494', fontSize: 12, fontWeight: '500', lineHeight: 12}}>Основная</Text>
                                            <Switch value={card.main} onValueChange={() => store.setMainCard(index)} disabled={false} circleSize={24} barHeight={28} circleBorderWidth={0} backgroundActive={'white'} backgroundInactive={'black'} circleActiveColor={'#0A0A0A'} circleInActiveColor={'#949494'} changeValueImmediately={true} completeinnerCircleStyle={{ alignItems: "center", justifyContent: "center" }}  circleouterCircleStyle={{width: 45}} renderActiveText={false} renderInActiveText={false}switchLeftPx={2} sliderswitchRightPx={2} sliderswitchWidthMultiplier={2} SwitcswitchBorderRadius={200} />
                                        </View>
                                        <View style={{width: SCREEN_WIDTH * 0.607692, height: SCREEN_HEIGHT * 0.0236966}}> 
                                            <Text style={{fontSize: 20, fontWeight: '400', lineHeight: 20, color: 'white'}}>{card.cardnumber}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: SCREEN_WIDTH * 0.60769231, height: SCREEN_HEIGHT * 0.0213270}}>
                                            <Text style={{fontSize: 14, fontWeight: '400', lineHeight: 18.2, width: SCREEN_WIDTH * 0.1, height: SCREEN_HEIGHT * 0.02132, color: '#949494'}}>{card.expire}</Text>
                                        </View>
                                    </View>
                                )
                            })}
                            </View>
                        </TouchableHighlight>
                    </ScrollView>
                </View>
                <View>

                </View>
            </View>
            <View style={{alignItems: 'center', width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.331753, position: 'absolute', bottom: 0, backgroundColor: '#191919', borderTopLeftRadius: 40, borderTopRightRadius: 40}}>
                    <View style={{width: SCREEN_WIDTH * 0.917948, height: SCREEN_HEIGHT * 0.13033, marginTop: 30, flexDirection: 'column', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', width: SCREEN_WIDTH * 0.917948, height: 'auto', justifyContent: 'space-between'}}>
                            <Text style={{color: '#949494', fontSize: 14, fontWeight: '400'}}>Цена услуги</Text>
                            <Text style={{fontWeight: '500', fontSize: 14, color: 'white'}}>{chosenOption} 000 сум</Text>
                        </View>
                        <View style={{borderWidth: 0.7, borderColor: 'black', borderStyle: 'solid'}}/>
                        <View style={{flexDirection: 'row', width: SCREEN_WIDTH * 0.917948, height: 'auto', justifyContent: 'space-between'}}>
                            <Text style={{color: '#949494', fontSize: 14, fontWeight: '400'}}>Количество</Text>
                            <Text style={{fontWeight: '500', fontSize: 14, color: 'white'}}>{selectedRelatives.length}x</Text>
                        </View>
                        <View style={{borderWidth: 0.6, borderColor: 'black', borderStyle: 'solid'}}/>
                        <View style={{flexDirection: 'row', width: SCREEN_WIDTH * 0.917948, height: 'auto', justifyContent: 'space-between'}}>
                            <Text style={{color: '#949494', fontSize: 16, fontWeight: '400'}}>Общая сумма</Text>
                            <Text style={{fontWeight: '500', fontSize: 16, color: 'white'}}>{selectedRelatives.length * chosenOption > 0? selectedRelatives.length * chosenOption : ''} 000 сум</Text>
                        </View>
                        <View style={{borderWidth: 0.6, borderColor: 'black', borderStyle: 'solid'}}/>
                    </View>
                    <TouchableOpacity onPress={() => Pay()} style={{flexDirection: 'row', marginTop: 40, justifyContent: 'center', alignItems: 'center', borderColor: 'white', borderWidth: 1, borderStyle: 'solid', width: SCREEN_WIDTH * 0.917948, height: SCREEN_HEIGHT * 0.06635, borderRadius: 200, backgroundColor: 'white'}}>
                        <Image source={MoneyBill} style={{width: 16, height: 16, marginRight: 7}}/>
                        <Text style={{fontSize: 16, fontWeight: '500'}}>{"Оплатить"}</Text>
                    </TouchableOpacity>
            </View>
            <Modal transparent={true} animationType='fade' visible={errorModal}>
                <View style={{borderWidth: 2, borderColor: '#191919', borderStyle: 'solid', flexDirection: 'column', alignItems: 'center', backgroundColor: '#0A0A0A', alignSelf: 'center', width: 300, height: 200, position: 'absolute', top: '30%', borderRadius: 40}}>
                    <Text style={{position: 'absolute', top: '25%', height: 'auto', color: 'white', textAlign: 'center', fontSize: 22, width: '80%', }}>Недостаточно средств на счету!</Text>
                    <TouchableOpacity onPress={() => setErrorModal(false)} style={{alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 15, backgroundColor: 'white', width: '90%', height: 40, borderRadius: 200}}>
                        <Text style={{color: 'black', fontSize: 16, fontWeight: '500', height: 'auto', width: 'auto'}}>Ок</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
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
    headertext: {
        color: 'white', 
        fontSize: 28, 
        width: SCREEN_WIDTH * 0.7025641, 
        height: 'auto', 
        textAlign: 'center', 
        lineHeight: 30, 
        fontWeight: '400'
    },
    headertopacity: {
        width: SCREEN_WIDTH * 0.1076, 
        height: SCREEN_HEIGHT * 0.04976, 
        borderRadius: 200, 
        padding: 14, 
        backgroundColor: '#191919', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
})

export default observer(ServicePay)