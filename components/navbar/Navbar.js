import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../home/Home.js";
import UserProfile from "../userprofile/UserProfile.js";
import Services from "../services/Services.js";
import Orders from "../orders/Order.js";
import HomeIcon from "../icons/home-alt (1).png"
import UserIcon from "../icons/user (2).png"
import CartIcon from "../icons/apps (1).png"
import OrdersIcon from "../icons/file-alt (2).png"
import { Image, Text, Dimensions} from "react-native";
import { View } from "react-native";

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

const Tab = createBottomTabNavigator()

export default function Navbar() {
    return (
            <Tab.Navigator screenOptions={({route}) => ({headerShown: false, tabBarStyle: {backgroundColor: '#0A0A0A', height: SCREEN_HEIGHT * 0.08886256, width: SCREEN_WIDTH, borderTopWidth: 0, }, tabBarItemStyle: {flexDirection: 'column', width: 100, height: 60}, tabBarIcon: ({ focused, color, size }) => {
                let icon;

                    if (route.name === 'Главная') {
                        icon = focused ? HomeIcon : HomeIcon; // Иконка для экрана Home
                    } else if (route.name === 'Услуги') {
                        icon = focused ? CartIcon : CartIcon; // Иконка для экрана UserProfile
                    } else if (route.name === 'Заказы') {
                        icon = focused ? OrdersIcon : OrdersIcon; // Иконка для экрана Services
                    } else if (route.name === 'Аккаунт') {
                        icon = focused ? UserIcon : UserIcon; // Иконка для экрана Orders
                    }

          return <Image source={icon} style={{width: 24, height: 24, tintColor: focused ? 'white' : '#949494', marginTop: 6}} />
            }, tabBarLabel: ({ focused, color }) => {
                    let label;
        
                    if (route.name === 'Главная') {
                    label = 'Главная'; // Текст для экрана Home
                    } else if (route.name === 'Аккаунт') {
                    label = 'Аккаунт'; // Текст для экрана UserProfile
                    } else if (route.name === 'Услуги') {
                    label = 'Услуги'; // Текст для экрана Services
                    } else if (route.name === 'Заказы') {
                    label = 'Заказы'; // Текст для экрана Orders
                    }
        
                    return <Text style={{marginBottom: 10, color: focused ? 'white' : '#949494', fontSize: 12, fontWeight: '400', lineHeight: 12 }}>{label}</Text>;
              },
              })} >
                <Tab.Screen name="Главная" component={Home}/>
                <Tab.Screen name="Услуги" component={Services}/>
                <Tab.Screen name="Заказы" component={Orders}/>
                <Tab.Screen name="Аккаунт" component={UserProfile}/>
            </Tab.Navigator>
    )
}