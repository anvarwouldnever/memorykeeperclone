import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity, Image, Text } from "react-native"
import VectorBack from '../icons/angle-left (3).png';
import Trash from '../icons/trash.png'
import { useNavigation } from "@react-navigation/native";
import Plus from '../icons/pluswhite.png'
import { observer } from "mobx-react-lite";
import store from "../store/store";
import { Switch } from 'react-native-switch';
import Check from '../icons/check (2).png'

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

function AddCard() {

    const navigation = useNavigation();
    const [show, setShow] = React.useState(false)
    const [cards, setCards] = React.useState([]);

    const toggleCardsSelection = (uri) => {
        if (cards.includes(uri)) {
          setCards(cards.filter((item) => item !== uri));
        } else {
          setCards([...cards, uri]);
        }
    };

    async function deleteCard() {
        try {
            store.removeCards(cards)
            setCards([])
            setShow(false)
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <View style={{flex: 1, backgroundColor: 'black', flexDirection: 'column', alignItems: 'center'}}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{borderRadius: 200, width: SCREEN_WIDTH * 0.107692, height: SCREEN_HEIGHT * 0.04976, justifyContent: 'center', alignItems: 'center', backgroundColor: '#191919'}}>
                    <Image source={VectorBack} style={{width: 14, height: 14}}/>
                </TouchableOpacity>
                <Text style={{width: SCREEN_WIDTH * 0.7025641, height: 'auto', color: 'white', justifyContent: 'center', alignItems: 'center', textAlign: 'center', lineHeight: 28, fontSize: 28, fontWeight: 400}}>Мои карты</Text>
                <TouchableOpacity onPress={store.cards.length >= 1? () => setShow(prev => !prev) : () => {return}} style={{borderRadius: 200, width: SCREEN_WIDTH * 0.107692, height: SCREEN_HEIGHT * 0.04976, justifyContent: 'center', alignItems: 'center', backgroundColor: '#191919'}}>
                    <Image source={Trash} style={{width: 14, height: 14}}/>
                </TouchableOpacity>
            </View>
            <View style={{justifyContent: store.cards.length === 0? 'center' : '', width: SCREEN_WIDTH * 0.9179, height: SCREEN_HEIGHT * 0.580568, top: SCREEN_HEIGHT * 0.175355, left: SCREEN_WIDTH * 0.0410, position: 'absolute', alignItems: 'center'}}>
                {store.cards.length === 0? <Text style={{width: 'auto', height: 'auto', fontSize: 16, color: '#949494', fontWeight: '500', alignSelf: 'center'}}>Нет добавленных карт</Text> : store.cards.map((card, index) => {
                    return (
                        <View key={index} style={{marginBottom: 10, justifyContent: 'space-around', width: SCREEN_WIDTH * 0.9179, height: SCREEN_HEIGHT * 0.182464, paddingVertical: 18, paddingHorizontal: 18, position: 'relative', borderRadius: 14, backgroundColor: card.main? '#191919' : '#0A0A0A', borderColor: cards.includes(index) && show ? 'white' : '#191919', borderWidth: 2, borderStyle: 'solid'}}>
                            {show? <TouchableOpacity onPress={() => toggleCardsSelection(index)} style={cards.includes(index) ? styles.selectedButton : styles.unselectedButton}>
                                {cards.includes(index) ? <Image source={Check} style={{width: 12, height: 12, position: 'absolute', top: 6, left: 6}}/> : ''}
                            </TouchableOpacity> : ''}
                            <View style={{justifyContent: 'flex-end', alignItems: 'center', width: SCREEN_WIDTH * 0.846153, height: 28, flexDirection: 'row'}}>
                                <Text style={{alignItems: 'center', marginRight: 12, width: 59, height: 11, color: '#949494', fontSize: 12, fontWeight: '500', lineHeight: 13}}>Основная</Text>
                                <Switch value={card.main} onValueChange={() => store.setMainCard(index)} disabled={false} circleSize={24} barHeight={28} circleBorderWidth={0} backgroundActive={'white'} backgroundInactive={'black'} circleActiveColor={'#0A0A0A'} circleInActiveColor={'#949494'} changeValueImmediately={true} completeinnerCircleStyle={{ alignItems: "center", justifyContent: "center" }}  circleouterCircleStyle={{width: 45}} renderActiveText={false} renderInActiveText={false}switchLeftPx={2} sliderswitchRightPx={2} sliderswitchWidthMultiplier={2} SwitcswitchBorderRadius={200} />
                            </View>
                            <View style={{width: SCREEN_WIDTH * 0.846153, height: 20}}> 
                                <Text style={{fontSize: 20, fontWeight: '400', lineHeight: 20, color: 'white'}}>{card.cardnumber}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: SCREEN_WIDTH * 0.846153, height: 18}}>
                                <Text style={{fontSize: 14, fontWeight: '400', lineHeight: 18.2, width: 39, height: 18, color: '#949494'}}>{card.expire}</Text>
                            </View>
                        </View>
                    )
                })}
            </View>
            <TouchableOpacity onPress={show? () => deleteCard() : () => navigation.navigate('AddCard')} style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', position: 'absolute', bottom: 20, left: SCREEN_WIDTH * 0.041025, borderRadius: 200, width: SCREEN_WIDTH * 0.9179, height: SCREEN_HEIGHT * 0.06635, borderStyle: show? 'solid' : 'dashed', backgroundColor: show? 'white' : '#191919', borderColor: show? 'white' : '#949494', borderWidth: 2}}>
                <Image source={Plus} style={{width: 16, height: 16, marginRight: 5}}/>
                <Text style={{ width: 127, height: 14, fontWeight: '500', fontSize: 16, color: show? 'black' : 'white', lineHeight: 15, textAlign: 'center'}}>{show ? `Удалить (${cards.length})` : 'Добавить карту'}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        top: SCREEN_HEIGHT * 0.04739,
        left: SCREEN_WIDTH * 0.041025,
        position: 'absolute',
        width: SCREEN_WIDTH * 0.9179,
        height: SCREEN_HEIGHT * 0.09478,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    unselectedButton: {
        position: 'absolute', 
        top: SCREEN_HEIGHT * 0.01777, 
        left: SCREEN_WIDTH * 0.03846,
        width: SCREEN_WIDTH * 0.06410, 
        height: SCREEN_HEIGHT * 0.02962, 
        borderColor: 'white', 
        borderWidth: 1, 
        borderStyle: 'solid', 
        backgroundColor: 'transparent', 
        borderRadius: 6,
        alignItems: 'center'
    },
    selectedButton: {
        position: 'absolute', 
        top: SCREEN_HEIGHT * 0.01777, 
        left: SCREEN_WIDTH * 0.03846,
        width: SCREEN_WIDTH * 0.06410, 
        height: SCREEN_HEIGHT * 0.02962, 
        borderColor: 'white', 
        borderWidth: 1, 
        borderStyle: 'solid', 
        backgroundColor: 'white', 
        borderRadius: 6,
        alignItems: 'center'
    }
})

export default observer(AddCard)