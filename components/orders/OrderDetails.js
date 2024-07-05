import { ScrollView, Text, TouchableHighlight, View, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Planting from '../icons/planting.png'
import { useNavigation } from "@react-navigation/native";
import Vector from '../icons/Vector (2).png';
import React from "react";
import Chat from '../icons/comment-alt-message (2).png'
import File from '../icons/file-download-alt.png'
import NoPic from '../icons/download (2).jpg'
import Arrow from '../icons/angle-left (3).png'

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

export default function OrderDetails({ route }) {

    const [revealText, setRevealText] = React.useState(true)
    const { date, type, name, price, deadusers, uris } = route.params
    const navigation = useNavigation()

    return (
        <View style={{flex: 1, backgroundColor: 'black', alignItems: 'center'}}>
            <View style={styles.photocontainer}>
                <Image source={Planting} resizeMode='cover' style={{width: SCREEN_WIDTH * 1.0256, height: SCREEN_HEIGHT * 0.45023, borderBottomWidth: 2, borderColor: 'black', borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}></Image>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{width: SCREEN_WIDTH * 0.1076, height: SCREEN_HEIGHT * 0.04976, position: 'absolute', top: SCREEN_HEIGHT * 0.07582, left: SCREEN_WIDTH * 0.0410, borderRadius: 200, backgroundColor: 'transparent', borderColor: 'white', borderWidth: 1, borderStyle: 'solid', justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={Arrow} style={{width: 14, height: 14}}/>
                </TouchableOpacity>
                <Text style={{position: 'absolute', fontSize: 28, color: 'white', bottom: 35, left: SCREEN_WIDTH * 0.0410}}>Посадка цветов</Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', height: SCREEN_HEIGHT * 0.525}}>
                <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
                        <TouchableHighlight>
                            <View style={{marginBottom: 10, height: 'auto', width: 'auto', flexDirection: 'column', alignItems: 'center'}}>
                                <View style={styles.infocontainer}>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <View style={styles.borndate}>
                                            <Text style={styles.textBorndate}>Статус</Text>
                                            <Text style={styles.textBorndate2}>{type === 'inprogress'? "В процессе" : "Заказ выполнен"}</Text>
                                        </View>
                                        <View style={styles.borndate}>
                                            <Text style={styles.textBorndate}>Дата заказа</Text>
                                            <Text style={styles.textBorndate2}>{date}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}> 
                                        <View style={styles.borndate}>
                                            <Text style={styles.textBorndate}>Срок</Text>
                                            <Text style={styles.textBorndate2}>от 2-4 дней</Text>
                                        </View>
                                        <View style={styles.borndate}>
                                            <Text style={styles.textBorndate}>Был выполнен</Text>
                                            <Text style={styles.textBorndate2}>{date}</Text>
                                        </View>
                                    </View>
                                    <View style={{width: SCREEN_WIDTH * 0.917948, height: SCREEN_HEIGHT * 0.09952, borderRadius: 12, backgroundColor: '#191919', paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center'}}>
                                        <View style={[styles.borndate, {paddingHorizontal: 0}]}>
                                            <Text style={styles.textBorndate}>Сумма</Text>
                                            <Text style={styles.textBorndate2}>{price} сум</Text>
                                        </View>
                                        <TouchableOpacity style={{marginLeft: 20, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', width: SCREEN_WIDTH * 0.307692, height: 35, borderRadius: 200, backgroundColor: 'white'}}>
                                            <Image source={File} style={{width: 10, height: 10, marginRight: 7}}/>
                                            <Text style={{fontSize: 12, width: 74, height: 11, fontWeight: '500', color: '#0A0A0A', lineHeight: 12}}>Скачать чек</Text>
                                        </TouchableOpacity>
                                    </View>         
                                </View>
                                <View style={{flexDirection: 'column', justifyContent: 'space-between', marginTop: 35, width: SCREEN_WIDTH * 0.917948, height: 'auto'}}>
                                    <Text style={{width: SCREEN_WIDTH * 0.917948, height: 'auto', fontSize: 28, fontWeight: '400', letterSpacing: -1, color: 'white', lineHeight: 28}}>Кому?</Text>
                                    <View style={styles.relativeslist}>
                                        {deadusers && deadusers.map((member, index) => {
                                            
                                            const uris = member.uris

                                            return (
                                                <View style={[styles.relativeobject, {backgroundColor: member.isProven? "#191919" : "#0A0A0A", borderColor: member.isProven? "" : "#191919", borderWidth: 1, borderStyle: 'solid'}]} key={index}>
                                                    <View style={{width: SCREEN_WIDTH * 0.77435, height: SCREEN_HEIGHT * 0.05687, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                                        <Image source={uris[0] === undefined? NoPic : uris[0].type === 'video/mp4'? NoPic : {uri: uris[0].downloadURL}} style={{width: 48, height: 48, borderRadius: 200}}></Image>
                                                        <View style={{flexDirection: 'column', justifyContent: 'space-between', width: SCREEN_WIDTH * 0.620512, height: SCREEN_HEIGHT * 0.04620}}>
                                                            <Text style={{color: '#949494', fontWeight: '500', fontSize: 12}}>{member.name === 'Виктор Смирнов'? 'Дядя' : 'Мама'}</Text>
                                                            <Text style={{color: '#FFFFFF', fontWeight: '400', fontSize: 16}}>{member.name}</Text>
                                                        </View>
                                                    </View>
                                                    <TouchableOpacity style={{width: SCREEN_WIDTH * 0.06153, height: SCREEN_HEIGHT * 0.02843, alignItems: 'center', justifyContent: 'center'}} onPress={member.isProven? () => navigation.navigate('DeadUserProfile', {name: member.name, deathdate: member.deathdate, borndate: member.borndate, location: member.location, biography: member.biography, uris: member.uris}) : () => console.log('not rpoven')}>
                                                        <Image source={member.isProven? Vector : Clock} style={ member.isProven? {width: 7.69, height: 13.37} : {width: 24, height: 24}}></Image>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        })} 
                                    </View>
                                </View>
                                {uris && <View style={styles.gallery}>
                                    <View style={styles.galleryheader}>
                                        <Text style={styles.galleryheaderText}>Фото-отчет</Text>
                                    </View>
                                    <View style={{width: SCREEN_WIDTH * 0.917948, height: 'auto', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 10}}>
                                        {uris.length < 5 ? uris.map((uri, index) => (
                                            <TouchableOpacity key={index} onPress={() => navigation.navigate('GalleryFlatlist', {uris: uris})} style={{width: 'auto', height: 'auto'}}>
                                                <Image
                                                    resizeMode='cover'
                                                    resizeMethod='resize'
                                                    source={{ uri: uri.downloadURL }}
                                                    style={{ width: SCREEN_WIDTH * 0.4435, height: SCREEN_HEIGHT * 0.2037, borderRadius: 14, marginTop: 8}}
                                                />
                                            </TouchableOpacity>    
                                            ))
                                        : uris.slice(0, 4).map((uri, index) => {
                                            return (
                                                    <Image
                                                        resizeMode='cover'
                                                        resizeMethod='resize'
                                                        key={index}
                                                        source={{ uri: uri.downloadURL }}
                                                        style={{ width: SCREEN_WIDTH * 0.4435, height: SCREEN_HEIGHT * 0.2037, borderRadius: 14, marginTop: 8}}
                                                    />
                                            )
                                        })}
                                    </View>
                                    {uris.length >= 5 && <TouchableOpacity style={styles.watchall} onPress={() => navigation.navigate('GalleryFlatlist', {uris: uris})}>
                                        <Text style={{fontWeight: '500', textAlign: 'center', color: 'white', fontSize: 14}}>Смотреть все</Text>
                                    </TouchableOpacity>}
                                </View>}
                                <View style={{ marginTop: 30, width: SCREEN_WIDTH * 0.917948, height: 'auto', flexDirection: 'column', justifyContent: 'space-between'}}>
                                    <Text style={{fontWeight: '400', fontSize: 28, lineHeight: 28, color: 'white'}}>Описание услуги</Text>
                                    <View style={{width: SCREEN_WIDTH * 0.917948, height: 'auto', marginTop: 10}}>
                                        {revealText? <Text numberOfLines={8} ellipsizeMode="tail" style={{color: '#949494', width: 'auto', height: 'auto', fontSize: 16, fontWeight: '400', lineHeight: 22.4, textAlign: 'auto'}}>
                                            Посадка цветов на кладбище — это не только способ украсить последний пристанище ушедших от нас близких, но и глубоко символический жест, отражающий нашу любовь, уважение и память о них. Это маленький островок жизни и красоты, который мы создаем в месте вечного покоя. Прежде всего, важно выбрать подходящие растения. Часто предпочтение отдается многолетним цветам, которые будут радовать глаз год за годом, таким как розы, лилии, хризантемы или пионы. Однако можно также выбрать и сезонные цветы для разнообразия в разные времена года. Важно учитывать климатические условия региона, а также степень освещенности могилы.
                                        </Text> :
                                        <Text style={{color: '#949494', width: 'auto', height: 'auto', fontSize: 16, fontWeight: '400', lineHeight: 22.4, textAlign: 'auto'}}>
                                            Посадка цветов на кладбище — это не только способ украсить последний пристанище ушедших от нас близких, но и глубоко символический жест, отражающий нашу любовь, уважение и память о них. Это маленький островок жизни и красоты, который мы создаем в месте вечного покоя. Прежде всего, важно выбрать подходящие растения. Часто предпочтение отдается многолетним цветам, которые будут радовать глаз год за годом, таким как розы, лилии, хризантемы или пионы. Однако можно также выбрать и сезонные цветы для разнообразия в разные времена года. Важно учитывать климатические условия региона, а также степень освещенности могилы.
                                        </Text>}
                                    </View>
                                    <TouchableOpacity onPress={() => setRevealText(prev => !prev)} style={{marginTop: 10, width: SCREEN_WIDTH * 0.917948, height: SCREEN_HEIGHT * 0.04976, borderRadius: 200, backgroundColor: '#191919', alignSelf: 'center', justifyContent: 'center', alignItems:'center'}}>
                                        <Text style={{fontWeight: '500', fontSize: 14, width: 77, height: 13, color: 'white', lineHeight: 14, alignItems: 'center', textAlign: 'center'}}>
                                            {revealText? 'Читать все' : 'Скрыть'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={() => navigation.navigate('Chat')} style={{flexDirection: 'row', marginTop: 50, justifyContent: 'center', alignItems: 'center', borderColor: 'white', borderWidth: 1, borderStyle: 'solid', width: SCREEN_WIDTH * 0.917948, height: SCREEN_HEIGHT * 0.06635071090, borderRadius: 200, backgroundColor: 'white'}}>
                                    <Image source={Chat} style={{width: 16, height: 16, marginRight: 7}}/>
                                    <Text style={{fontSize: 16, fontWeight: '500'}}>{"Чат поддержки"}</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableHighlight>
                    </ScrollView>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    photocontainer: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT * 0.473933,
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    infocontainer: {
        width: SCREEN_WIDTH * 0.917948,
        height: SCREEN_HEIGHT * 0.312796,
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    gallery: {
        marginTop: 30,
        width: SCREEN_WIDTH * 0.92307,
        height: 'auto',
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    galleryheader: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        width: SCREEN_WIDTH * 0.917948,
        height: 'auto',
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid'
    },
    galleryheaderText: {
        width: 'auto',
        height: 'auto',
        fontWeight: '400',
        lineHeight: 26,
        color: 'white',
        fontSize: 26
    },
    watchall: {
        width: SCREEN_WIDTH * 0.92307,
        height: SCREEN_HEIGHT * 0.04976303,
        borderRadius: 200,
        backgroundColor: '#191919',
        justifyContent: 'center',
        alignItems: 'center'
    },
    borndate: {
        width: SCREEN_WIDTH * 0.446153,
        height: SCREEN_HEIGHT * 0.09952,
        borderRadius: 12,
        backgroundColor: '#191919',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        paddingHorizontal: 16,
    },
    textBorndate: {
        width: SCREEN_WIDTH * 0.3692, 
        height: 'auto', 
        color: "#949494", 
        fontWeight: '400', 
        fontSize: 12, 
        lineHeight: 12
    },
    textBorndate2: {
        width: SCREEN_WIDTH * 0.3692, 
        height: 'auto', 
        color: "white", 
        fontWeight: '500', 
        fontSize: 16, 
        lineHeight: 16
    },
    relativeslist: {
        // borderColor: 'red', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.9179,
        justifyContent: 'flex-start',
        flexGrow: 1,
        marginTop: 10,
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