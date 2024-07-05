import React from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, TouchableHighlight} from "react-native";
import { observer } from "mobx-react-lite";
import { useNavigation } from "@react-navigation/native";
import Planting from '../icons/planting.png'
import PlantingExample from '../icons/plantingexample.png'
import PlantingExample2 from '../icons/plantingexample2.png'
import PlantingExample3 from '../icons/plantingexample3.png'
import PlantingExample4 from '../icons/plantingexample4.png'
import Arrow from '../icons/angle-left (3).png'

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

 function Service({ route }) {


    const [revealText, setRevealText] = React.useState(true)
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.photocontainer}>
                <Image source={Planting} resizeMode='cover' style={{width: SCREEN_WIDTH * 1.0256, height: SCREEN_HEIGHT * 0.47023, borderBottomWidth: 2, borderColor: 'black', borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}></Image>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{width: SCREEN_WIDTH * 0.1076, height: SCREEN_HEIGHT * 0.04976, position: 'absolute', top: SCREEN_HEIGHT * 0.075829, left: SCREEN_WIDTH * 0.041025, borderRadius: 200, backgroundColor: 'transparent', borderColor: 'white', borderWidth: 1, borderStyle: 'solid', justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={Arrow} style={{width: 14, height: 14}}/>
                </TouchableOpacity>
                <Text style={{position: 'absolute', fontSize: 28, color: 'white', bottom: 35, left: SCREEN_WIDTH * 0.041025}}>Посадка цветов</Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', height: SCREEN_HEIGHT * 0.525}}>
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <TouchableHighlight>
                        <View style={styles.scrollViewContainer}>
                            <View style={styles.infocontainer}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View style={styles.borndate}>
                                        <Text style={styles.textBorndate}>Цена</Text>
                                        <Text style={styles.textBorndate2}>от-200 000 сум</Text>
                                    </View>
                                    <View style={styles.borndate}>
                                        <Text style={styles.textBorndate}>Срок</Text>
                                        <Text style={styles.textBorndate2}>от 2-4 дней</Text>
                                    </View>
                                </View>       
                            </View>
                            <View style={{ marginTop: 30, width: SCREEN_WIDTH * 0.917948, height: 'auto', flexDirection: 'column', justifyContent: 'space-between'}}>
                                <Text style={{fontWeight: '400', fontSize: 28, lineHeight: 28, color: 'white'}}>Описание услуги</Text>
                                <View style={{width: SCREEN_WIDTH * 0.917948, height: 'auto', marginVertical: 10}}>
                                    {revealText? <Text ellipsizeMode="tail" numberOfLines={9} style={{color: '#949494', width: SCREEN_WIDTH * 0.917948, height: 'auto', fontSize: 16, fontWeight: '400', lineHeight: 22.4, textAlign: 'auto'}}>
                                        Посадка цветов на кладбище — это не только способ украсить последний пристанище ушедших от нас близких, но и глубоко символический жест, отражающий нашу любовь, уважение и память о них. Это маленький островок жизни и красоты, который мы создаем в месте вечного покоя. Прежде всего, важно выбрать подходящие растения. Часто предпочтение отдается многолетним
                                    </Text> :
                                    <Text style={{color: '#949494', width: SCREEN_WIDTH * 0.917948, height: 'auto', fontSize: 16, fontWeight: '400', lineHeight: 22.4, textAlign: 'auto'}}>
                                        Посадка цветов на кладбище — это не только способ украсить последний пристанище ушедших от нас близких, но и глубоко символический жест, отражающий нашу любовь, уважение и память о них. Это маленький островок жизни и красоты, который мы создаем в месте вечного покоя. Прежде всего, важно выбрать подходящие растения. Часто предпочтение отдается многолетним цветам, которые будут радовать глаз год за годом, таким как розы, лилии, хризантемы или пионы. Однако можно также выбрать и сезонные цветы для разнообразия в разные времена года. Важно учитывать климатические условия региона, а также степень освещенности могилы.
                                    </Text>}
                                </View>
                                <TouchableOpacity onPress={() => setRevealText(prev => !prev)} style={{width: SCREEN_WIDTH * 0.917948, height: SCREEN_HEIGHT * 0.04976, borderRadius: 200, backgroundColor: '#191919', alignSelf: 'center', paddingHorizontal: 28, paddingVertical: 14, alignItems:'center', justifyContent: 'center'}}>
                                    <Text style={{fontWeight: '500', fontSize: 14, width: 'auto', height: 13, color: 'white', lineHeight: 14, alignItems: 'center'}}>
                                        {revealText? 'Читать все' : 'Скрыть'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.gallery}>
                                <View style={styles.galleryheader}>
                                    <Text style={styles.galleryheaderText}>Примеры работ</Text>
                                </View>
                                <View style={{width: SCREEN_WIDTH * 0.917948, height: SCREEN_HEIGHT * 0.4218, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 10}}>
                                     {[{img: PlantingExample}, {img: PlantingExample2}, {img: PlantingExample3}, {img: PlantingExample4}].map((image, index) => (
                                            <Image
                                                key={index}
                                                source={image.img}
                                                style={{ width: SCREEN_WIDTH * 0.4435, height: SCREEN_HEIGHT * 0.2037, borderRadius: 14, marginTop: 8}}
                                            />
                                        ))
                                    }
                                </View>
                                <TouchableOpacity style={styles.watchall}>
                                    <Text style={{fontWeight: '500', textAlign: 'center', color: 'white', fontSize: 14}}>Смотреть все</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate('ServiceDetails')} style={{ marginTop: 50, justifyContent: 'center', alignItems: 'center', borderColor: 'white', borderWidth: 1, borderStyle: 'solid', width: SCREEN_WIDTH * 0.917948, height: SCREEN_HEIGHT * 0.06635, borderRadius: 200, backgroundColor: 'white'}}>
                                <Text style={{fontSize: 16, fontWeight: '500'}}>{"Заказать услугу   >"}</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableHighlight>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
    },
    photocontainer: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT * 0.473933,
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    overlayRelationText: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        color: 'white',
        fontSize: 20,
        fontWeight: '400',
        width: SCREEN_WIDTH * 0.2487,
        height: SCREEN_HEIGHT * 0.026066,
        textAlign: 'left',
        lineHeight: 20,
        fontSize: 16,
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
    galleryheaderText3: {
        width: SCREEN_WIDTH * 0.2307,
        height: SCREEN_HEIGHT * 0.01540,
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 14,
        color: '#949494',
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid'
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
    galleryheaderText2: {
        width: SCREEN_WIDTH * 0.22564,
        height: SCREEN_HEIGHT * 0.04976,
        position: 'absolute',
        top: -9,
        left: SCREEN_WIDTH * 0.692307,
        borderRadius: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textcontainer: {
        position: 'absolute',
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.65128,
        height: SCREEN_HEIGHT * 0.06872,
        top: SCREEN_HEIGHT * 0.36729,
        left: SCREEN_WIDTH * 0.041025,
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    overlayNameText: {
        width: SCREEN_WIDTH * 1.0256,
        height: 'auto',
        fontSize: 28,
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        color: 'white',
        fontWeight: '400',
        lineHeight: 28
    },
    scrollView: {
        flex: 1, flexDirection: 'column'
    },
    scrollViewContainer: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.92307,
        height: 'auto',
        marginTop: 20,
        marginBottom: 10
    },
    infocontainer: {
        width: SCREEN_WIDTH * 0.917948,
        height: SCREEN_HEIGHT * 0.09952,
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        justifyContent: 'space-between',
        flexDirection: 'column',
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
    map: {
        width: SCREEN_WIDTH * 0.9179,
        height: SCREEN_HEIGHT * 0.18720,
        borderRadius: 14,
        marginTop: 15
    },
    snapshot: {
        width: SCREEN_WIDTH * 1.025,
        height: SCREEN_HEIGHT * 0.473933,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    textBorndate: {
        width: 'auto', 
        height: 'auto', 
        color: "#949494", 
        fontWeight: '400', 
        fontSize: 12, 
        lineHeight: 12
    },
    textBorndate2: {
        width: 'auto', 
        height: 'auto', 
        color: "white", 
        fontWeight: '500', 
        fontSize: 16, 
        lineHeight: 16
    },
    mapView: {
        width: SCREEN_WIDTH * 0.917948, 
        height: SCREEN_HEIGHT * 0.2381, 
        marginTop: 20, 
        flexDirection: 'column', 
        justifyContent: 'space-between'
    },
    mapView2: {
        width: SCREEN_WIDTH * 0.917948, 
        height: SCREEN_HEIGHT * 0.02962, 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid'
    },
    mapViewText: {
        width: SCREEN_WIDTH * 0.6076923, 
        height: SCREEN_HEIGHT * 0.03317, 
        color: '#FFFFFF', 
        fontSize: 25, 
        lineHeight: 28
    },
    mapViewTouchableopacity: {
        justifyContent: 'space-between', 
        flexDirection: 'row', 
        width: SCREEN_WIDTH * 0.212820,
        height: SCREEN_HEIGHT * 0.035545,
        alignItems: 'center', 
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
    },
    mapImage: {
        width: SCREEN_WIDTH * 0.03589, 
        height: SCREEN_HEIGHT * 0.01658
    },
    mapImageText: {
        width: SCREEN_WIDTH * 0.16153, 
        height: SCREEN_HEIGHT * 0.01540, 
        color: "#949494", 
        fontWeight: '500', 
        fontSize: 14, 
        lineHeight: 13
    },
    mapViewImage: {
        width: SCREEN_WIDTH * 0.04615,
        height: SCREEN_HEIGHT * 0.02132701
    }
})

export default observer(Service);