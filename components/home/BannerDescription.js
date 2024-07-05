import React from "react";
import { Image, Text, ScrollView, TouchableHighlight, TouchableOpacity, View, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Banner from '../icons/bannerNoDate2.png'
import AngleLeft from '../icons/angle-left (3).png'

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

export default function BannerDescription() {

    const navigation = useNavigation()

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black'}}>
            <View style={{position: 'absolute', top: SCREEN_HEIGHT * 0.06398, left: 16, height: SCREEN_HEIGHT * 0.82938389, width: SCREEN_WIDTH * 0.917948}}>
                <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                    <TouchableHighlight>
                        <View style={{height: 'auto', alignItems: 'center'}}>
                            <View style={{width: 'auto', height: 'auto'}}>
                                <Image source={Banner} style={{width: SCREEN_WIDTH * 0.917948, height: SCREEN_HEIGHT * 0.264218, borderRadius: 14}}/>
                                <TouchableOpacity onPress={() => navigation.goBack()} style={{borderColor: 'white', borderWidth: 1, borderStyle: 'solid', width: SCREEN_WIDTH * 0.10769, height: SCREEN_HEIGHT * 0.04976, position: 'absolute', top: SCREEN_HEIGHT * 0.01895735, left: SCREEN_WIDTH * 0.03076923, borderRadius: 200, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}>
                                    <Image source={AngleLeft} style={{width: 14, height: 14}}/>
                                </TouchableOpacity>
                            </View>
                            <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column', marginVertical: 18, height: 'auto', width: SCREEN_WIDTH * 0.917948}}>
                                <View style={{width: SCREEN_WIDTH * 0.917948, height: 'auto', alignItems: 'center'}}>
                                    <Text style={{color: 'white', fontWeight: '400', fontSize: 28, lineHeight: 28, alignSelf: 'flex-start'}}>
                                        {'Вечная Память: Оживите Воспоминания с QR-Кодом на Могильном Камне'}
                                    </Text>
                                </View>
                                <View style={{width: SCREEN_WIDTH * 0.917948, height: 'auto', alignItems: 'center', marginTop: 5}}>
                                    <Text style={{color: '#949494', fontWeight: '400', fontSize: 16, lineHeight: 22.4, alignSelf: 'flex-start'}}>
                                        {'В нашем стремлении сохранить память о любимых, которые нас покинули, мы предлагаем уникальную услугу – вечную связь между прошлым и настоящим с помощью QR-кода на могильном камне. "Вечная Память" предоставляет возможность собрать все самые дорогие воспоминания, фотографии и информацию о жизни усопшего в одном месте, доступном всем, кто желает вспомнить и почтить его память.'}
                                    </Text>
                                </View>
                            </View>
                            <View style={{width: SCREEN_WIDTH * 0.917948, height: 'auto', justifyContent: 'space-between'}}>
                                <Text style={{fontSize: 20, color: 'white', fontWeight: '400', lineHeight: 20, marginBottom: 7}}>Как это работает?</Text>
                                <View style={{width: SCREEN_WIDTH * 0.917948, flexDirection: 'row'}}>
                                    <Text style={{color: '#949494', fontSize: 16, fontWeight: '400', lineHeight: 22.4}}>1.  </Text>
                                    <Text style={{color: '#949494', fontSize: 16, fontWeight: '400', lineHeight: 22.4, width: 'auto', flexShrink: 1}}>Создание Истории: Мы помогаем вам собрать фотографии, воспоминания, истории и даже видеозаписи, чтобы создать полную биографию усопшего</Text>
                                </View>
                                <View style={{width: SCREEN_WIDTH * 0.917948, flexDirection: 'row', marginVertical: 5}}>
                                    <Text style={{color: '#949494', fontSize: 16, fontWeight: '400', lineHeight: 22.4}}>2.  </Text>
                                    <Text style={{ color: '#949494', fontSize: 16, fontWeight: '400', lineHeight: 22.4, width: 'auto', flexShrink: 1}}>Генерация QR-Кода: На основе собранных данных мы создаем индивидуальный QR-код, который будет нанесен на могильный камень.</Text>
                                </View>
                                <View style={{width: SCREEN_WIDTH * 0.917948, flexDirection: 'row'}}>
                                    <Text style={{color: '#949494', fontSize: 16, fontWeight: '400', lineHeight: 22.4}}>3.  </Text>
                                    <Text style={{color: '#949494', fontSize: 16, fontWeight: '400', lineHeight: 22.4, width: 'auto', flexShrink: 1}}>Увековечивание Памяти: Посетители могут сканировать QR-код с помощью своего смартфона и мгновенно получить доступ ко всей информации, оживляя память о усопшем.</Text>
                                </View>
                            </View>
                            <View style={{marginVertical: 14, width: SCREEN_WIDTH * 0.917948, height: 'auto', justifyContent: 'space-between'}}>
                                <Text style={{fontSize: 20, color: 'white', fontWeight: '400', lineHeight: 20, marginBottom: 7}}>Почему это важно?</Text>
                                <View style={{width: SCREEN_WIDTH * 0.917948, flexDirection: 'row'}}>
                                    <Text style={{color: '#949494', fontSize: 16, fontWeight: '400', lineHeight: 16}}>.    </Text>
                                    <Text style={{color: '#949494', fontSize: 16, fontWeight: '400', lineHeight: 22.4, width: 'auto', flexShrink: 1}}>Личная Связь: Дает возможность близким и друзьям в любой момент почувствовать связь, вспоминая об усопшем через фотографии и истории.</Text>
                                </View>
                                <View style={{width: SCREEN_WIDTH * 0.917948, flexDirection: 'row', marginVertical: 5}}>
                                    <Text style={{color: '#949494', fontSize: 16, fontWeight: '400', lineHeight: 16}}>.    </Text>
                                    <Text style={{color: '#949494', fontSize: 16, fontWeight: '400', lineHeight: 22.4, width: 'auto', flexShrink: 1}}>Доступность Информации: Посетители могут узнать о жизни усопшего, даже если раньше не знали его лично.</Text>
                                </View>
                                <View style={{width: SCREEN_WIDTH * 0.917948, flexDirection: 'row'}}>
                                    <Text style={{color: '#949494', fontSize: 16, fontWeight: '400', lineHeight: 16}}>.    </Text>
                                    <Text style={{color: '#949494', fontSize: 16, fontWeight: '400', lineHeight: 22.4, width: 'auto', }}>Наследие: Создает цифровой памятник, который может передаваться из поколения в поколение.</Text>
                                </View>
                            </View>
                            <View style={{width: SCREEN_WIDTH * 0.917948, height: 'auto', justifyContent: 'space-between'}}>
                                <Text style={{fontWeight: '400', fontSize: 20, color: 'white', lineHeight: 20}}>Как заказать?</Text>
                                <Text style={{color: '#949494', fontSize: 16, fontWeight: '400', lineHeight: 22.4, marginTop: 7}}>
                                    {'Свяжитесь с нами через наш веб-сайт или по телефону, чтобы обсудить детали вашего заказа. Мы будем работать с вами на каждом шагу, чтобы увековечить память о вашем близком так, как вы это видите.'}
                                </Text>
                            </View>
                            <View style={{width: SCREEN_WIDTH * 0.917948, height: 100, marginVertical: 20}}>
                                <Text style={{color: '#949494', fontSize: 20, fontWeight: '400', lineHeight: 20}}>{'"Вечная Память" – это не просто услуга. Это способ сохранить историю, любовь и память о тех, кого мы потеряли, доступной и живой для будущих поколений.'}</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                </ScrollView>
            </View>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', borderColor: 'white', borderWidth: 1, borderStyle: 'solid', top: SCREEN_HEIGHT * 0.438388, width: SCREEN_WIDTH * 0.917948, height: SCREEN_HEIGHT * 0.06635, borderRadius: 200, backgroundColor: 'white'}}>
                <Text style={{fontSize: 16, fontWeight: '500'}}>{"Заказать услугу   >"}</Text>
            </TouchableOpacity>
        </View>
    )
}