import React from "react";
import { Image, Text, ScrollView, TouchableHighlight, TouchableOpacity, View, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Banner2 from '../icons/bannerNoDate.png'
import AngleLeft from '../icons/angle-left (3).png'

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height
console.log({SCREEN_HEIGHT, SCREEN_WIDTH})

export default function BannerDescription2() {

    const navigation = useNavigation()

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black'}}>
            <View style={{position: 'absolute', top: SCREEN_HEIGHT * 0.06398, left: 16, height: SCREEN_HEIGHT * 0.8293, width: SCREEN_WIDTH * 0.9179}}>
                <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                    <TouchableHighlight>
                        <View style={{height: 'auto', alignItems: 'center'}}>
                            <View style={{width: SCREEN_WIDTH * 0.9179, height: 'auto'}}>
                                <Image source={Banner2} style={{width: SCREEN_WIDTH * 0.9179, height: SCREEN_HEIGHT * 0.2642, borderRadius: 14}}/>
                                <TouchableOpacity onPress={() => navigation.goBack()} style={{borderColor: 'white', borderWidth: 1, borderStyle: 'solid', width: SCREEN_WIDTH * 0.10769, height: SCREEN_HEIGHT * 0.04976, position: 'absolute', top: SCREEN_HEIGHT * 0.01895735, left: SCREEN_WIDTH * 0.03076923, borderRadius: 200, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}>
                                    <Image source={AngleLeft} style={{width: 14, height: 14}}/>
                                </TouchableOpacity>
                            </View>
                            <View style={{alignItems: 'center', flexDirection: 'column', height: 'auto', width: SCREEN_WIDTH * 0.917987, marginVertical: 18}}>
                                <View style={{width: SCREEN_WIDTH * 0.9179, height: 'auto'}}>
                                    <Text style={{color: 'white', fontWeight: '400', fontSize: 28, lineHeight: 28}}>
                                        {'"Вечный Цвет": Услуга Доставки и Ухода за Могилами'}
                                    </Text>
                                </View>
                                <View style={{width: SCREEN_WIDTH * 0.9179, height: 'auto', alignItems: 'center', marginTop: 5}}>
                                    <Text style={{color: '#949494', fontWeight: '400', fontSize: 16, lineHeight: 22.4, alignSelf: 'flex-start'}}>
                                        {'В те моменты, когда вы не можете лично посетить могилы ваших близких, наша услуга "Вечный Цвет" предлагает надежное и чуткое решение для выражения вашей любви и уважения. Мы заботимся о том, чтобы места последнего упокоения ваших родных всегда выглядели ухоженными и наполненными красотой.'}
                                    </Text>
                                </View>
                            </View>
                            <View style={{width: SCREEN_WIDTH * 0.9179, height: 'auto', justifyContent: 'space-between'}}>
                                <Text style={{fontSize: 20, color: 'white', fontWeight: '400', lineHeight: 20, marginBottom: 7}}>Наши услуги включают:</Text>
                                <View style={{width: SCREEN_WIDTH * 0.9179, flexDirection: 'row'}}>
                                    <Text style={{color: '#949494', fontSize: 16, fontWeight: '400', lineHeight: 16 }}>.    </Text>
                                    <Text style={{color: '#949494', fontSize: 16, fontWeight: '400', lineHeight: 22.4, width: SCREEN_WIDTH * 0.9179, flexShrink: 1}}>Регулярная Доставка Цветов: Выберите план доставки – еженедельно, ежемесячно или в важные даты, и мы обеспечим, чтобы на могиле всегда были свежие цветы.</Text>
                                </View>
                                <View style={{width: SCREEN_WIDTH * 0.9179, flexDirection: 'row', marginVertical: SCREEN_HEIGHT * 0.00592417}}>
                                    <Text style={{color: '#949494', fontSize: 16, fontWeight: '400', lineHeight: 16, }}>.    </Text>
                                    <Text style={{color: '#949494', fontSize: 16, fontWeight: '400', lineHeight: 22.4, width: SCREEN_WIDTH * 0.9179, flexShrink: 1}}>Уход за Могилой: Наша команда не только доставит цветы, но и позаботится о том, чтобы могила оставалась в идеальном состоянии – очистит памятник, удалит сорняки, и при необходимости, проведет небольшую реставрацию.</Text>
                                </View>
                                <View style={{width: SCREEN_WIDTH * 0.9179, flexDirection: 'row'}}>
                                    <Text style={{color: '#949494', fontSize: 16, fontWeight: '400', lineHeight: 16, }}>.    </Text>
                                    <Text style={{color: '#949494', fontSize: 16, fontWeight: '400', lineHeight: 22.4, width: SCREEN_WIDTH * 0.9179, flexShrink: 1}}>Персонализированные Составы: Сообщите нам о предпочтениях вашего близкого, и мы подберем цветы и композиции, отражающие его или ее душу и характер.</Text>
                                </View>
                                <View style={{width: SCREEN_WIDTH * 0.9179, flexDirection: 'row', marginTop: 5}}>
                                    <Text style={{color: '#949494', fontSize: 16, fontWeight: '400', lineHeight: 16 }}>.    </Text>
                                    <Text style={{color: '#949494', fontSize: 16, fontWeight: '400', lineHeight: 22.4, width: SCREEN_WIDTH * 0.9179, flexShrink: 1}}>Фотоотчет: После каждого нашего визита вы получите фотографии могилы, чтобы убедиться в качестве выполненных работ.</Text>
                                </View>
                            </View>
                            <View style={{marginVertical: 14, width: SCREEN_WIDTH * 0.9179, height: 'auto', justifyContent: 'space-between'}}>
                                <Text style={{fontSize: 20, color: 'white', fontWeight: '400', lineHeight: 20, marginBottom: 7}}>Почему "Вечный Цвет"?</Text>
                                <View style={{width: SCREEN_WIDTH * 0.9179, flexDirection: 'row'}}>
                                    <Text style={{color: '#949494', fontSize: 16, fontWeight: '400', lineHeight: 16}}>.    </Text>
                                    <Text style={{color: '#949494', fontSize: 16, fontWeight: '400', lineHeight: 22.4, width: SCREEN_WIDTH * 0.9179, flexShrink: 1}}>Уважение и Память: Мы понимаем значение символического жеста в виде цветов на могиле и стремимся выполнять нашу работу с максимальной отдачей и чувством.</Text>
                                </View>
                                <View style={{width: SCREEN_WIDTH * 0.9179, flexDirection: 'row', marginVertical: 5}}>
                                    <Text style={{color: '#949494', fontSize: 16, fontWeight: '400', lineHeight: 16}}>.    </Text>
                                    <Text style={{color: '#949494', fontSize: 16, fontWeight: '400', lineHeight: 22.4, width: SCREEN_WIDTH * 0.9179, flexShrink: 1}}>Без Забот: Находясь далеко или в силу обстоятельств не имея возможности посетить кладбище, вы можете быть уверены, что могила вашего близкого находится в хороших руках.</Text>
                                </View>
                                <View style={{width: SCREEN_WIDTH * 0.9179, flexDirection: 'row'}}>
                                    <Text style={{color: '#949494', fontSize: 16, fontWeight: '400', lineHeight: 16}}>.    </Text>
                                    <Text style={{color: '#949494', fontSize: 16, fontWeight: '400', lineHeight: 22.4, width: SCREEN_WIDTH * 0.9179, flexShrink: 1}}>Персонализация: Каждый человек уникален, и мы стремимся отразить это в наших цветочных композициях, подбирая растения и украшения с учетом индивидуальных предпочтений.</Text>
                                </View>
                            </View>
                            <View style={{width: SCREEN_WIDTH * 0.9179, height: 'auto', justifyContent: 'space-between'}}>
                                <Text style={{fontWeight: '400', fontSize: 20, color: 'white', lineHeight: 20, marginBottom: SCREEN_HEIGHT * 0.01184}}>Как заказать?</Text>
                                <Text style={{color: '#949494', fontSize: 16, fontWeight: '400', lineHeight: 22.4}}>
                                    {'Зайдите на наш сайт или позвоните нам, чтобы обсудить все детали и выбрать наиболее подходящий план услуг. Наша команда готова ответить на любые ваши вопросы и помочь сделать процесс заказа максимально простым и понятным.'}
                                </Text>
                            </View>
                            <View style={{width: SCREEN_WIDTH * 0.9179, height: 'auto', marginVertical: 20}}>
                                <Text style={{color: '#949494', fontSize: 20, fontWeight: '400', lineHeight: 20}}>{'"Вечный Цвет" гарантирует, что память о ваших близких будет уважаема и сохранена через заботу и красоту цветов.'}</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                </ScrollView>
            </View>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', borderColor: 'white', borderWidth: 1, borderStyle: 'solid', top: SCREEN_HEIGHT * 0.4383, width: SCREEN_WIDTH * 0.9179, height: SCREEN_HEIGHT * 0.0663, borderRadius: 200, backgroundColor: 'white'}}>
                <Text style={{fontSize: 16, fontWeight: '500'}}>{"Заказать услугу   >"}</Text>
            </TouchableOpacity>
        </View>
    )
}