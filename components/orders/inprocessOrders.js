import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, Dimensions } from "react-native";
import Clock from '../icons/clock-nine.png'
import Arrow from '../icons/angle-right-b.png'
import { useNavigation } from "@react-navigation/native";

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

export default function InProcessOrders({ orders }) {

    const navigation = useNavigation()
    const InProcessOrders = orders.filter(order => order.type === 'inprogress')

    return (
        <View style={styles.container}>
            <View style={{alignItems: 'center', width: SCREEN_WIDTH * 0.917948, height: SCREEN_HEIGHT * 0.687203}}>
                <ScrollView style={{flex: 1, flexDirection: 'column'}} showsVerticalScrollIndicator={false}>
                    <TouchableHighlight>
                        <View style={{ alignItems: 'center', width: SCREEN_WIDTH * 0.917948, height: 'auto'}}>
                                {InProcessOrders? InProcessOrders.length >= 1 && InProcessOrders.map((order, index) => {
                                    return (
                                        <TouchableOpacity style={styles.order} key={index} onPress={() => navigation.navigate('OrderDetails', {type: order.type, name: order.name, date: order.date, price: order.price, deadusers: order.deadUsers})}>
                                            <View style={styles.ordermaininfo}>
                                                <View style={styles.circle}>
                                                    <Image source={Clock} style={{width: 16, height: 16}}/>
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
        height: SCREEN_HEIGHT * 0.1066,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        marginVertical: 5,
        backgroundColor: '#191919',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    ordermaininfo: {
        width: SCREEN_WIDTH * 0.61025,
        height: SCREEN_HEIGHT * 0.07345,
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    circle: {
        width: 56,
        height: 56,
        borderRadius: 200,
        padding: 20,
        backgroundColor: 'white'
    },
    orderinfo: {
        width: SCREEN_WIDTH * 0.430769,
        height: SCREEN_HEIGHT * 0.07345,
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        justifyContent: 'space-between',
        flexDirection: 'column'
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
        lineHeight: 14,
        color: 'white'
    },
    ordernametext: {
        fontWeight: "500",
        fontSize: 16, 
        lineHeight: 16,
        color: 'white'
    },
    pricetext: {
        width: SCREEN_WIDTH * 0.430769,
        height: 18,
        lineHeight: 18.2,
        color: '#757575'
    },
    arrow: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        alignItems: 'center',
        justifyContent: 'center'
    }
})