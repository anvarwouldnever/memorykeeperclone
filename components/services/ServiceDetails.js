import React from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Image, TouchableHighlight } from "react-native";
import Arrow from '../icons/angle-left.png';
import { useNavigation } from "@react-navigation/native";
import PlantingCircle from '../icons/plantingcircle.png'
import PlantingCircle2 from '../icons/plantingcircle2.png'
import PlantingCircle3 from '../icons/plantingcircle3.png'
import Angle from '../icons/angle-right-b (1).png'

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

export default function ServiceDetails() {

    const [chosenOption, setChosenOption] = React.useState('200');
    const navigation = useNavigation();

    return (
        <View style={{flex: 1, backgroundColor: 'black'}}>
            <View style={styles.header}>
                <Text style={{color: 'white', fontSize: 28, width: SCREEN_WIDTH * 0.7025641, height: 'auto', textAlign: 'center', lineHeight: 28, fontWeight: '400'}}>Выберите тариф</Text>
                <TouchableOpacity style={{width: SCREEN_WIDTH * 0.1076, height: SCREEN_HEIGHT * 0.04976, borderRadius: 200, padding: 14, backgroundColor: '#191919', alignItems: 'center', justifyContent: 'center'}} onPress={() => navigation.goBack()}><Image source={Arrow} style={{width: 14, height: 14}}/></TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: SCREEN_WIDTH * 0.917948, height: SCREEN_HEIGHT * 0.334123, position: 'absolute', top: SCREEN_HEIGHT * 0.1635, left: SCREEN_WIDTH * 0.041025}}>
                <TouchableOpacity onPress={() => setChosenOption('200')} style={{alignItems: 'center', flexDirection: 'row', borderRadius: 12, width: SCREEN_WIDTH * 0.917948, height: SCREEN_HEIGHT * 0.10189, paddingHorizontal: 16, paddingVertical: 14, backgroundColor: '#191919'}}>
                    <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: SCREEN_WIDTH * 0.774358, height: SCREEN_HEIGHT * 0.068720}}>
                        <Image source={PlantingCircle} style={{width: 58, height: 58, alignSelf: 'center'}}/>
                        <View style={{flexDirection: 'column', justifyContent: 'space-between', width: SCREEN_WIDTH * 0.589743, height: SCREEN_HEIGHT * 0.04739}}>
                            <Text style={{fontWeight: '500', fontSize: 16, width: SCREEN_WIDTH * 0.589743, height: 14, color: 'white', lineHeight: 16}}>100 цветов</Text>
                            <Text style={{fontWeight: '400', fontSize: 14, lineHeight: 18.2, color: '#949494'}}>от-200 000 сум</Text>
                        </View>
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center', width: 24, height: 24, backgroundColor: 'black', borderRadius: 200}}>
                        {chosenOption === '200' && <View style={{backgroundColor: 'white', width: 17, height: 17, borderRadius: 200}} />}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setChosenOption('350')} style={{alignItems: 'center', flexDirection: 'row', borderRadius: 12, width: SCREEN_WIDTH * 0.917948, height: SCREEN_HEIGHT * 0.10189, paddingHorizontal: 16, paddingVertical: 14, backgroundColor: '#191919'}}>
                    <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: SCREEN_WIDTH * 0.774358, height: SCREEN_HEIGHT * 0.068720}}>
                        <Image source={PlantingCircle2} style={{width: 58, height: 58, alignSelf: 'center'}}/>
                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', width: SCREEN_WIDTH * 0.589743, height: SCREEN_HEIGHT * 0.04739}}>
                            <Text style={{fontWeight: '500', fontSize: 16, width: SCREEN_WIDTH * 0.589743, height: 14, color: 'white', lineHeight: 16}}>200 цветов</Text>
                            <Text style={{fontWeight: '400', fontSize: 14, lineHeight: 18.2, color: '#949494'}}>от-350 000 сум</Text>
                        </View>
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'black', alignItems: 'center', width: 24, height: 24, borderRadius: 200}}>
                        {chosenOption === '350' && <View style={{backgroundColor: 'white', width: 17, height: 17, borderRadius: 200}} />}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setChosenOption('450')} style={{alignItems: 'center', flexDirection: 'row', borderRadius: 12, width: SCREEN_WIDTH * 0.917948, height: SCREEN_HEIGHT * 0.10189, paddingHorizontal: 16, paddingVertical: 14, backgroundColor: '#191919'}}>
                    <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: SCREEN_WIDTH * 0.774358, height: SCREEN_HEIGHT * 0.068720}}>
                        <Image source={PlantingCircle3} style={{width: 58, height: 58, alignSelf: 'center'}}/>
                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', width: SCREEN_WIDTH * 0.589743, height: SCREEN_HEIGHT * 0.04739}}>
                            <Text style={{fontWeight: '500', fontSize: 16, width: SCREEN_WIDTH * 0.589743, height: 14, color: 'white', lineHeight: 16}}>300 цветов</Text>
                            <Text style={{fontWeight: '400', fontSize: 14, lineHeight: 18.2, color: '#949494'}}>от-450 000 сум</Text>
                        </View>
                    </View>
                    <View style={{backgroundColor: 'black', alignItems: 'center', width: 24, height: 24, borderRadius: 200, justifyContent: 'center'}}>
                        {chosenOption === '450' && <View style={{backgroundColor: 'white', width: 17, height: 17, borderRadius: 200}}/>}
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center', width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.225118, position: 'absolute', bottom: 0, backgroundColor: '#191919', borderTopLeftRadius: 40, borderTopRightRadius: 40}}>
                <View style={{width: SCREEN_WIDTH * 0.917948, height: 'auto', marginTop: 30, flexDirection: 'column', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', width: SCREEN_WIDTH * 0.917948, height: 'auto', justifyContent: 'space-between'}}>
                        <Text style={{color: '#949494', fontSize: 14, fontWeight: '400'}}>Цена услуги</Text>
                        <Text style={{fontWeight: '500', fontSize: 14, color: 'white'}}>{chosenOption} 000 сум</Text>
                    </View>
                    <View style={{borderWidth: 0.6, borderColor: 'black', borderStyle: 'solid'}}/>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('ServiceChoice', {chosenOption: chosenOption})} style={{flexDirection: 'row-reverse', marginTop: 40, justifyContent: 'center', alignItems: 'center', borderColor: 'white', borderWidth: 1, borderStyle: 'solid', width: SCREEN_WIDTH * 0.917948, height: SCREEN_HEIGHT * 0.06635, borderRadius: 200, backgroundColor: 'white'}}>
                    <Image source={Angle} style={{width: 16, height: 16, marginLeft: 5, marginTop: 2}}/>
                    <Text style={{fontSize: 16, fontWeight: '500'}}>Далее</Text>
                </TouchableOpacity>
            </View>
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
    }
})