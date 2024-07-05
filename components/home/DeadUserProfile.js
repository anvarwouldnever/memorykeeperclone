import React from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, ActivityIndicator} from "react-native";
import MapView, { Marker } from 'react-native-maps';
import Pin from '../icons/Frame 73.png'
import NoPic from '../icons/nopic.png'
import Map from '../icons/map.png'
import { observer } from "mobx-react-lite";
import { useNavigation } from "@react-navigation/native";
import Pen from '../icons/pen.png'
import Plus from '../icons/pluswhite.png'
import VideoPlay from '../icons/play-circle.png'
import { Video } from 'expo-av';
import Arrow from '../icons/angle-left (3).png'
import PlusGrey from '../icons/plusgrey.png'

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

 function DeadUserProfile({ route }) {

    const { name, borndate, deathdate, location, uris, biography, id, relation } = route.params
    const [revealText, setRevealText] = React.useState(true)
    const [loading, setLoading] = React.useState({})

    const mainUri = uris[0]

    const navigation = useNavigation()

    const handleLoadStart = (uri) => {
        setLoading(prevLoading => ({ ...prevLoading, [uri]: true }));
    };
    
    const handleLoadEnd = (uri) => {
        setLoading(prevLoading => ({ ...prevLoading, [uri]: false }));
    };

    return (
        <View style={styles.container}>
            <View style={styles.photocontainer}>
                <Image source={uris[0] === undefined? NoPic : {uri: mainUri.downloadURL}} resizeMethod='resize' resizeMode='cover' style={{width: SCREEN_WIDTH * 1.0256, height: SCREEN_HEIGHT * 0.45023, borderBottomWidth: 2, borderColor: 'black', borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}></Image>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{width: SCREEN_WIDTH * 0.1076, height: SCREEN_HEIGHT * 0.04976, position: 'absolute', top: SCREEN_HEIGHT * 0.0758, left: SCREEN_WIDTH * 0.041025, borderRadius: 200, backgroundColor: 'transparent', borderColor: 'white', borderWidth: 1, borderStyle: 'solid', justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={Arrow} style={{width: 14, height: 14}}/>
                </TouchableOpacity>
                <View style={styles.textcontainer}>
                    <Text style={styles.overlayRelationText}></Text>
                    <Text style={styles.overlayNameText}>{name}</Text>
                </View>
                {uris[0] === undefined && <TouchableOpacity onPress={() => navigation.navigate('Gallery', {uris: null, id: id})} style={{position: 'absolute', top: '45%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', width: 154, height: 42, borderRadius: 200, borderWidth: 1, borderStyle: 'solid', borderColor: 'white'}}>
                        <Image source={Plus} style={{width: 14, height: 14, marginRight: 5}}/>
                        <Text style={{fontWeight: '500', fontSize: 14, color: 'white', height: 'auto'}}>Добавить</Text>
                </TouchableOpacity>}
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', height: SCREEN_HEIGHT * 0.546163849}}>
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <TouchableHighlight>
                        <View style={styles.scrollViewContainer}>
                            <View style={styles.infocontainer}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View style={styles.borndate}>
                                        <Text style={styles.textBorndate}>Дата рождения</Text>
                                        <Text style={styles.textBorndate2}>{borndate}</Text>
                                    </View>
                                    <View style={styles.borndate}>
                                        <Text style={styles.textBorndate}>Дата смерти</Text>
                                        <Text style={styles.textBorndate2}>{deathdate}</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}> 
                                    <View style={styles.borndate}>
                                        <Text style={styles.textBorndate}>Город погребения</Text>
                                        <Text style={styles.textBorndate2}>Ташкент</Text>
                                    </View>
                                    <View style={styles.borndate}>
                                        <Text style={styles.textBorndate}>Кем является?</Text>
                                        <Text style={styles.textBorndate2}>{relation}</Text>
                                    </View>
                                </View>         
                            </View>
                            <View style={{marginTop: 30, width: SCREEN_WIDTH * 0.92051282, height: 'auto', flexDirection: 'column', justifyContent: 'space-between'}}>
                                <View style={{width: SCREEN_WIDTH * 0.92051282, height: 'auto', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                                    <Text style={{fontWeight: '400', fontSize: 28, lineHeight: 28, color: 'white'}}>Биография</Text>
                                    {biography.length !== 0 && <TouchableOpacity onPress={() => navigation.navigate('EditBiographyDeadUser', {biography: biography, id: id, relation: relation})} style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: 'auto', height: 'auto'}}>
                                        <Image source={Pen} style={{width: 14, height: 14, marginRight: 5, marginBottom: 2}}/>
                                        <Text style={{width: 'auto', height: 'auto', fontWeight: '500', fontSize: 14, lineHeight: 14, color: '#949494'}}>Редактировать</Text>
                                    </TouchableOpacity>}
                                </View>
                                {biography.length != '' && <View style={{width: SCREEN_WIDTH * 0.92051282, height: 'auto'}}>
                                    {revealText? <Text ellipsizeMode="tail" numberOfLines={9} style={{color: '#949494', width: SCREEN_WIDTH * 0.92051282, height: 'auto', fontSize: 16, fontWeight: '400', lineHeight: 22.4, textAlign: 'auto'}}>
                                        {biography}
                                    </Text> :
                                    <Text style={{color: '#949494', width: SCREEN_WIDTH * 0.92051282, height: 'auto', fontSize: 16, fontWeight: '400', lineHeight: 22.4, textAlign: 'auto'}}>
                                        {biography}
                                    </Text>}
                                </View>}
                                {biography.length == 0 || biography == null ? <TouchableOpacity onPress={() => navigation.navigate('EditBiographyDeadUser', {biography: biography, id: id, relation: relation})} style={{width: SCREEN_WIDTH * 0.92051282, height: SCREEN_HEIGHT * 0.04976303, borderRadius: 200, backgroundColor: '#191919', alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{fontWeight: '500', fontSize: 14, lineHeight: 14, width: 85, height: 13, color: 'white'}}>+  Добавить</Text>
                                </TouchableOpacity> : biography.length > 400? <TouchableOpacity onPress={() => setRevealText(prev => !prev)} style={{width: SCREEN_WIDTH * 0.92051282, height: SCREEN_HEIGHT * 0.04976303, borderRadius: 200, backgroundColor: '#191919', alignSelf: 'center', paddingHorizontal: 28, paddingVertical: 14, alignItems:'center', marginTop: 5}}>
                                    <Text style={{fontWeight: '500', fontSize: 14, width: 77, height: 13, color: 'white', lineHeight: 14, alignItems: 'center', textAlign: 'center'}}>
                                        {revealText? 'Читать все' : 'Скрыть'}
                                    </Text>
                                </TouchableOpacity> : ''}  
                            </View>
                            <View style={styles.mapView}>
                                <View style={[styles.mapView2, {marginBottom: location[0].latitude == null || location[0].latitude == null || location == null? 10 : '' }]}>
                                        <Text style={styles.mapViewText}>Место захоронения</Text>
                                        {location[0].latitude != null && <TouchableOpacity style={styles.mapViewTouchableopacity} onPress={() => navigation.navigate('MapDeadUser', {longitude: location[0].longitude, latitude: location[0].latitude, id: id})}>
                                            <Image source={Map} style={styles.mapImage}></Image>
                                            <Text style={styles.mapImageText}>На картe</Text>
                                        </TouchableOpacity>}
                                </View>
                                {location[0].latitude == null || location[0].latitude == null || location == null? <TouchableOpacity onPress={() => navigation.navigate('MapAddDeadUser', {id: id})} style={{width: SCREEN_WIDTH * 0.92051282, height: SCREEN_HEIGHT * 0.04976303, borderRadius: 200, backgroundColor: '#191919', alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{fontWeight: '500', fontSize: 14, lineHeight: 14, width: 85, height: 13, color: 'white'}}>+  Добавить</Text>
                                </TouchableOpacity> : 
                                <MapView style={styles.map} initialRegion={{ latitude: location[0].latitude, longitude: location[0].longitude, latitudeDelta: 0.02, longitudeDelta: 0.02}} scrollEnabled={false} zoomEnabled={false}> 
                                        <Marker coordinate={{ latitude: location[0].latitude, longitude: location[0].longitude }}>
                                        <Image 
                                            source={Pin}
                                            style={styles.mapViewImage}
                                        />
                                        </Marker>
                                </MapView>}
                            </View>
                            <View style={styles.gallery}>
                                <View style={styles.galleryheader}>
                                    <Text style={styles.galleryheaderText}>Галлерея</Text>
                                    {uris.length != 0 && <TouchableOpacity style={styles.galleryheaderText2} onPress={() => navigation.navigate('Gallery', {uris: uris, id: id})}>
                                        <Image source={PlusGrey} style={{width: 14, height: 14, marginRight: 5, marginBottom: 2}}/>
                                        <Text style={styles.galleryheaderText3}>Добавить</Text>
                                    </TouchableOpacity>}
                                </View>
                                <View style={{width: SCREEN_WIDTH * 0.917948, height: 'auto', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 15}}>
                                {uris.length === 0? <TouchableOpacity onPress={() => navigation.navigate('Gallery', {uris: null, id: id})} style={{width: SCREEN_WIDTH * 0.917948, height: SCREEN_HEIGHT * 0.04976303, borderRadius: 200, backgroundColor: '#191919', alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{fontWeight: '500', fontSize: 14, lineHeight: 14, width: 85, height: 13, color: 'white'}}>+  Добавить</Text>
                                </TouchableOpacity> : uris.length < 5 ? 
                                        uris.map((item, index) => (
                                            item.type === 'image/png' || item.type === 'image/jpeg' || item.type === 'image/webp' ? (
                                            <TouchableOpacity onPress={() => navigation.navigate('Gallery', {uris: uris, id: id})} key={index}>
                                                {loading[item.downloadURL] && (
                                                    <ActivityIndicator size="small" color="grey" style={{position: 'absolute', top: SCREEN_HEIGHT * 0.0864928, left: SCREEN_WIDTH * 0.187179}}/>
                                                )}    
                                                <Image
                                                    resizeMode='cover'
                                                    resizeMethod='resize'
                                                    onLoadEnd={() => handleLoadEnd(item.downloadURL)} onLoadStart={() => handleLoadStart(item.downloadURL)}
                                                    key={index}
                                                    source={{ uri: item.downloadURL }}
                                                    style={{ width: SCREEN_WIDTH * 0.441025, height: SCREEN_HEIGHT * 0.203791, borderRadius: 5, marginTop: 8 }}
                                                />
                                            </TouchableOpacity>    
                                            ) : (
                                                <TouchableOpacity onPress={() => navigation.navigate('Gallery', {uris: uris, id: id})} key={index} style={{width: SCREEN_WIDTH * 0.441025, height: SCREEN_HEIGHT * 0.203791}}>
                                                    <Video
                                                        onLoadEnd={() => handleLoadEnd(item.downloadURL)} onLoadStart={() => handleLoadStart(item.downloadURL)}
                                                        key={index}
                                                        source={{ uri: item.downloadURL }}
                                                        style={{ width: SCREEN_WIDTH * 0.441025, height: SCREEN_HEIGHT * 0.203791, borderRadius: 5, marginTop: 8}}
                                                        focusable={false}
                                                        resizeMode="cover"
                                                    />
                                                    <Image source={VideoPlay} style={{position: 'absolute', width: 40, height: 40, top: '40%', left: '40%'}}/>
                                                </TouchableOpacity>
                                            )
                                        ))
                                : uris.slice(0, 4).map((item, index) => (
                                    item.type === 'image/png' || item.type === 'image/jpeg' || item.type === 'image/webp' ? (
                                        <View key={index}>
                                                {loading[item.downloadURL] && (
                                                    <ActivityIndicator size="small" color="grey" style={{position: 'absolute', top: SCREEN_HEIGHT * 0.08649, left: SCREEN_WIDTH * 0.187179}}/>
                                                )}    
                                                <Image
                                                    resizeMode='cover'
                                                    resizeMethod='resize'
                                                    onLoadEnd={() => handleLoadEnd(item.downloadURL)} onLoadStart={() => handleLoadStart(item.downloadURL)}
                                                    key={index}
                                                    source={{ uri: item.downloadURL }}
                                                    style={{ width: SCREEN_WIDTH * 0.441025, height: SCREEN_HEIGHT * 0.203791, borderRadius: 5, marginTop: 8 }}
                                                />
                                        </View> 
                                    ) : (
                                        <View key={index} style={{width: SCREEN_WIDTH * 0.441025, height: SCREEN_HEIGHT * 0.203791}}>
                                                    <Video
                                                        onLoadEnd={() => handleLoadEnd(item.downloadURL)} onLoadStart={() => handleLoadStart(item.downloadURL)}
                                                        key={index}
                                                        source={{ uri: item.downloadURL }}
                                                        style={{ width: SCREEN_WIDTH * 0.441025, height: SCREEN_HEIGHT * 0.203791, borderRadius: 5, marginTop: 8}}
                                                        focusable={false}
                                                        resizeMode="cover"
                                                    />
                                                    <Image source={VideoPlay} style={{position: 'absolute', width: SCREEN_WIDTH * 0.102564, height: SCREEN_HEIGHT * 0.04739, top: '40%', left: '40%'}}/>
                                        </View>
                                    )
                                ))}
                                </View>
                                {uris && uris.length >= 5 && (
                                    <TouchableOpacity style={styles.watchall} onPress={() => navigation.navigate('Gallery', {uris: uris, id: id})}>
                                        <Text style={{fontWeight: '500', textAlign: 'center', color: 'white', fontSize: 14}}>Смотреть все</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
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
        lineHeight: 28,
        color: 'white',
        fontSize: 28
    },
    watchall: {
        width: SCREEN_WIDTH * 0.92307,
        height: SCREEN_HEIGHT * 0.04976303,
        borderRadius: 200,
        backgroundColor: '#191919',
        justifyContent: 'center',
        alignItems: 'center',
    },
    galleryheaderText3: {
        width: 'auto',
        height: 'auto',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 14,
        color: '#949494',
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid'
    },
    gallery: {
        marginTop: 20,
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
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: 'auto',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
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
        width: 'auto',
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
        marginBottom: 30
    },
    infocontainer: {
        width: SCREEN_WIDTH * 0.917948,
        height: SCREEN_HEIGHT * 0.20616,
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
        height: 'auto', 
        marginTop: 20, 
        flexDirection: 'column',
    },
    mapView2: {
        width: SCREEN_WIDTH * 0.917948, 
        height: 'auto', 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid'
    },
    mapViewText: {
        width: 'auto', 
        height: 'auto', 
        color: '#FFFFFF', 
        fontSize: 25, 
        lineHeight: 25
    },
    mapViewTouchableopacity: {
        justifyContent: 'center', 
        flexDirection: 'row', 
        width: 'auto',
        height: SCREEN_HEIGHT * 0.035545,
        alignItems: 'center', 
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
    },
    mapImage: {
        width: 14, 
        height: 14,
        marginRight: 5,
        marginBottom: 3
    },
    mapImageText: {
        width: 'auto', 
        height: 'auto', 
        color: "#949494", 
        fontWeight: '500', 
        fontSize: 14, 
        lineHeight: 14,
    },
    mapViewImage: {
        width: SCREEN_WIDTH * 0.04615,
        height: SCREEN_HEIGHT * 0.02132701
    }
})

export default observer(DeadUserProfile);