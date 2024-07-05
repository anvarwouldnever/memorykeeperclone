import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator } from "react-native";
import InProcessOrders from "./inprocessOrders";
import CompletedOrders from "./completedOrders.js";
import axios from "axios";
import store from "../store/store";
import { observer } from "mobx-react-lite";

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

function Orders() {

    const [color, setColor] = useState(true)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const getOrders = useCallback(async () => {
        try {
            setLoading(true)
            const response = await axios.get('https://memorykeeper-backend-89433124d8be.herokuapp.com/api/getorders', { params: { id: store.userid } });
            if (response.status === 200) {
                setOrders(response.data)
            } else if(response.status === 300) {
                setOrders(null)
            }
        } catch (error) {
            if (error.request) {
                console.log(error.request)
                setError('Отсутствует подключение к интернету')
            } else if (error.code === 'ECONNABORTED' || error.code === 'ENOTFOUND') {
                console.log(error.code)
                setError('Отсутствует подключение к интернету')
            } else if (error.response.data.message) {
                console.log(error.response.data.message)
                setError('Произошла непредвиденная ошибка')
            } else {
                setError('Произошла непредвиденная ошибка')
            }
        } finally {
            setLoading(false)
        }
    }, []);

    useEffect(() => {
        getOrders();
    }, []);

    useEffect(() => {
        getOrders();
    }, [store.callFunctionOrders])

    return (
        <View style={styles.container}>
            <Text style={styles.headertext}>
                    Мои заказы
            </Text>
            <View style={styles.buttonscontainer}>
                <TouchableOpacity style={color? styles.buttonWhite : styles.buttonBlack} onPress={() => setColor(true)} underlayColor="transparent">
                    <Text style={{textAlign: 'center', color: color? 'black' : "#949494", fontWeight: '500'}}>В процессе</Text>
                </TouchableOpacity>
                <TouchableOpacity style={color? styles.buttonBlack : styles.buttonWhite} onPress={() => setColor(false)} underlayColor="transparent">
                    <Text style={{textAlign: 'center', color: color? "#949494" : 'black', fontWeight: '500'}}>Выполнены</Text>
                </TouchableOpacity>
            </View>
            {color? <InProcessOrders orders={orders} error={error}/> : <CompletedOrders orders={orders} error={error} />}
            {loading && 
                <ActivityIndicator size='large' color="#949494" style={{position: 'absolute', top: SCREEN_HEIGHT * 0.473933, left: SCREEN_WIDTH * 0.453846}}/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black', 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    buttonscontainer: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.917948,
        height: SCREEN_HEIGHT * 0.05450,
        flexDirection: "row",
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 200,
        backgroundColor: "#191919",
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.135071,
        left: SCREEN_WIDTH * 0.041025
    },
    headertext: {
        fontSize: 28,
        fontWeight: "400",
        alignItems: 'center',
        color: 'white',
        width: 'auto',
        height: 'auto',
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.0687203,
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        lineHeight: 28
    },
    buttonBlack: {
        backgroundColor: '#191919',
        width: SCREEN_WIDTH * 0.453846,
        borderRadius: 200,
        height: "100%",
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonWhite: {
        backgroundColor: 'white',
        width: SCREEN_WIDTH * 0.453846,
        borderRadius: 200,
        height: "100%",
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default observer(Orders)