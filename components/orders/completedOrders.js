import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, Dimensions } from "react-native";
import Check from '../icons/check.png'
import Arrow from '../icons/angle-right-b.png'
import { useNavigation } from "@react-navigation/native";

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

export default function CompletedOrders({ orders, error }) {

    const navigation = useNavigation()
    const completedOrders = orders.filter(order => order.type === 'completed');

    return (
        <View style={styles.container}>
            <View style={{alignItems: 'center', width: SCREEN_WIDTH * 0.917948, height: SCREEN_HEIGHT * 0.687203}}>
                <ScrollView style={{flex: 1, flexDirection: 'column'}} showsVerticalScrollIndicator={false}>
                    <TouchableHighlight>
                        <View style={{alignItems: 'center', width: SCREEN_WIDTH * 0.917948, height: 'auto'}}>
                                {completedOrders? completedOrders.length >= 1 && completedOrders.map((order, index) => {
                                    return (
                                        <TouchableOpacity style={styles.order} key={index} onPress={() => navigation.navigate('OrderDetails', {uris: order.uris, type: order.type, name: order.name, date: order.date, price: order.price, deadusers: order.deadUsers})}>
                                            <View style={styles.ordermaininfo}>
                                                <View style={styles.circle}>
                                                    <Image source={Check} style={{width: 16, height: 16}}/>
                                                </View>
                                                <View style={styles.orderinfo}>
                                                    <View style={styles.orderdateandname}>
                                                        <Text style={styles.orderdatetext}>{order.date}</Text>
                                                        <Text style={styles.ordernametext}>{order.name}</Text>
                                                    </View>
                                                    <Text style={styles.pricetext}>Сумма-{order.price} сум</Text>
                                                </View>
                                            </View>
                                            <View style={styles.arrow}>
                                                <Image source={Arrow} style={{width: 16, height: 16}}/>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                    }) : ''}
                        </View>
                    </TouchableHighlight>
                </ScrollView>
            </View>    
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.917948,
        height: SCREEN_HEIGHT * 0.71090,
        top: SCREEN_HEIGHT * 0.220379,
        left: SCREEN_WIDTH * 0.0410,
        position: 'absolute'
    },
    order: {
        width: SCREEN_WIDTH * 0.917948,
        height: 'auto',
        borderRadius: 12,
        paddingHorizontal: 16,
        borderColor: '#191919', borderWidth: 2, borderStyle: 'solid',
        marginVertical: 5,
        backgroundColor: '#0A0A0A',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    ordermaininfo: {
        width: SCREEN_WIDTH * 0.6102564,
        height: 'auto',
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    circle: {
        width: 56,
        height: 56,
        borderRadius: 200,
        padding: 20,
        backgroundColor: '#191919'
    },
    orderinfo: {
        width: SCREEN_WIDTH * 0.430769,
        height: 'auto',
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignSelf: 'flex-start'
    },
    orderdateandname: {
        width: SCREEN_WIDTH * 0.430769,
        height: 34,
        justifyContent: 'space-between',
        flexDirection: 'column',
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid'
    },
    orderdatetext: {
        fontWeight: "400",
        fontSize: 12,
        lineHeight: 15.6,
        color: '#949494'
    },
    ordernametext: {
        fontWeight: "500",
        fontSize: 16, 
        lineHeight: 16,
        color: '#949494'
    },
    pricetext: {
        width: 'auto',
        height: 'auto',
        lineHeight: 14,
        color: '#949494',
        fontSize: 14,
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        marginTop: 7
    },
    arrow: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        alignItems: 'center',
        justifyContent: 'center'
    }
})