import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Dimensions, ActivityIndicator} from "react-native";
import { observer } from "mobx-react-lite";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Video } from "expo-av";
import NoPic from '../icons/nopic.png'

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

 function deaduser2({ route }) {

    const { id } = route.params.parsedData
    const [revealText, setRevealText] = React.useState(true)
    const [data, setData] = useState([])
    const [uris, setUris] = useState([])
    const [pfpUri, setPfpUri] = useState()
    const [loading, setLoading] = React.useState({})
    const [error, setError] = useState()

    const handleLoadStart = (uri) => {
        setLoading(prevLoading => ({ ...prevLoading, [uri]: true }));
    };
    
    const handleLoadEnd = (uri) => {
        setLoading(prevLoading => ({ ...prevLoading, [uri]: false }));
    };

    useEffect(() => {
        const getDeadUser = async() => {
            try {
                const response = await axios.get('https://memorykeeper-backend-89433124d8be.herokuapp.com/api/getdeaduser', {params: {id: id}})
                if (response.status === 200) {
                    const data = response.data
                    console.log(data)
                    setData(data)
                    setUris(data.uris)
                    const pfp = data.uris[0].downloadURL
                    setPfpUri(pfp)
                } else if(response.status === 300) {
                    setError('Не найден')
                }
            } catch (error) {
                if (error.code || error.request) {
                    setError('Нет подключения')
                }
            }
        }
        getDeadUser()    
    }, [])

    async function getDeadUser() {
        const response = await axios.get('https://memorykeeper-backend-89433124d8be.herokuapp.com/api/getdeaduser', {params: {id: id}})
        if (response.status === 200) {
            const data = response.data
            console.log(data)
            setData(data)
            setUris(data.uris)
            const pfp = data.uris[0].downloadURL
            setPfpUri(pfp)
        }
    }    

    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.photocontainer}>
                <Image resizeMethod='resize' resizeMode='cover' source={data.uris && data.uris[0] === undefined? NoPic : {uri: pfpUri}} style={{width: SCREEN_WIDTH * 1.025, height: SCREEN_HEIGHT * 0.45023, borderBottomWidth: 2, borderColor: 'black', borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}></Image>
                <TouchableOpacity onPress={() => navigation.navigate('AuthorizedUser')} style={{width: 42, height: 42, position: 'absolute', top: SCREEN_HEIGHT * 0.07582, left: SCREEN_WIDTH * 0.041025, borderRadius: 200, backgroundColor: 'transparent', borderColor: 'white', borderWidth: 1, borderStyle: 'solid', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'white'}}>{'<'}</Text>
                </TouchableOpacity>
                <View style={styles.textcontainer}>
                    <Text style={styles.overlayRelationText}></Text>
                    <Text style={styles.overlayNameText}>{data.name}</Text>
                </View>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', height: 400}}>
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <TouchableHighlight>
                        <View style={styles.scrollViewContainer}>
                            <View style={styles.infocontainer}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View style={styles.borndate}>
                                        <Text style={styles.textBorndate}>Дата рождения</Text>
                                        <Text style={styles.textBorndate2}>{data.borndate}</Text>
                                    </View>
                                    <View style={styles.borndate}>
                                        <Text style={styles.textBorndate}>Дата смерти</Text>
                                        <Text style={styles.textBorndate2}>{data.deathdate}</Text>
                                    </View>
                                </View>      
                            </View>
                            {data.biography != '' && <View style={{ marginTop: 30, width: SCREEN_WIDTH * 0.92051282, height: 'auto', flexDirection: 'column', justifyContent: 'space-between'}}>
                                <Text style={{fontWeight: '400', fontSize: 28, lineHeight: 28, color: 'white'}}>Биография</Text>
                                <View style={{width: SCREEN_WIDTH * 0.92051282, height: 'auto', marginVertical: 10}}>
                                    {revealText? <Text ellipsizeMode="tail" numberOfLines={9} style={{color: '#949494', width: SCREEN_WIDTH * 0.92051282, height: 'auto', fontSize: 16, fontWeight: '400', lineHeight: 22.4, textAlign: 'auto'}}>
                                        {data.biography}
                                    </Text> :
                                    <Text style={{color: '#949494', width: SCREEN_WIDTH * 0.92051282, height: 'auto', fontSize: 16, fontWeight: '400', lineHeight: 22.4, textAlign: 'auto'}}>
                                        {data.biography}
                                    </Text>}
                                </View>
                                {data.biography && data.biography.length > 400? <TouchableOpacity onPress={() => setRevealText(prev => !prev)} style={{width: SCREEN_WIDTH * 0.92051282, height: 42, borderRadius: 200, backgroundColor: '#191919', alignSelf: 'center', paddingHorizontal: 28, paddingVertical: 14, alignItems:'center'}}>
                                    <Text style={{fontWeight: '500', fontSize: 14, width: 77, height: 13, color: 'white', lineHeight: 14, alignItems: 'center', textAlign: 'center'}}>
                                        {revealText? 'Читать все' : 'Скрыть'}
                                    </Text>
                                </TouchableOpacity> : ''}
                            </View>}
                            <View style={styles.gallery}>
                                <View style={styles.galleryheader}>
                                    <Text style={styles.galleryheaderText}>Галлерея</Text>
                                </View>
                                <View style={{ width: SCREEN_WIDTH * 0.9128, height: 'auto', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
                                {uris.length < 5 ? 
                                        uris.map((item, index) => (
                                            item.type === 'image/png' || item.type === 'image/jpeg' || item.type === 'image/webp' ? (
                                            <TouchableOpacity onPress={() => navigation.navigate('GalleryFlatlist', {uris: uris})} key={index}>
                                                {loading[item.downloadURL] && (
                                                    <ActivityIndicator size="small" color="grey" style={{position: 'absolute', top: SCREEN_HEIGHT * 0.0864928, left: SCREEN_WIDTH * 0.187179}}/>
                                                )}    
                                                <Image
                                                    resizeMethod='resize'
                                                    resizeMode='cover'
                                                    onLoadEnd={() => handleLoadEnd(item.downloadURL)} onLoadStart={() => handleLoadStart(item.downloadURL)}
                                                    key={index}
                                                    source={{ uri: item.downloadURL }}
                                                    style={{ width: SCREEN_WIDTH * 0.441025, height: SCREEN_HEIGHT * 0.203791, borderRadius: 5, marginTop: 8 }}
                                                />
                                            </TouchableOpacity>    
                                            ) : (
                                                <TouchableOpacity onPress={() => navigation.navigate('GalleryFlatlist', {uris: uris})} key={index} style={{width: SCREEN_WIDTH * 0.441025, height: SCREEN_HEIGHT * 0.203791}}>
                                                    <Video
                                                        onLoadEnd={() => handleLoadEnd(item.downloadURL)} onLoadStart={() => handleLoadStart(item.downloadURL)}
                                                        key={index}
                                                        source={{ uri: item.downloadURL }}
                                                        style={{ width: SCREEN_WIDTH * 0.441025, height: SCREEN_HEIGHT * 0.203791, borderRadius: 5, marginTop: 8}}
                                                        focusable={false}
                                                        resizeMode="cover"
                                                    />
                                                    <Image source={VideoPlay} style={{position: 'absolute', width: 40, height: 40, top: SCREEN_HEIGHT * 0.0864928, left: SCREEN_WIDTH * 0.187179}}/>
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
                                                    resizeMethod='resize'
                                                    resizeMode='cover'
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
                                                    <Image source={VideoPlay} style={{position: 'absolute', width: SCREEN_WIDTH * 0.102564, height: SCREEN_HEIGHT * 0.04739, top: SCREEN_HEIGHT * 0.08649, left: SCREEN_WIDTH * 0.187179}}/>
                                        </View>
                                    )
                                ))}
                                </View>
                                {uris.length >= 5 ?(
                                    <TouchableOpacity style={styles.watchall} onPress={() => navigation.navigate('GalleryFlatlist', {uris: uris})}>
                                        <Text style={{fontWeight: '500', textAlign: 'center', color: 'white', fontSize: 14}}>Смотреть все</Text>
                                    </TouchableOpacity>
                                ) : (
                                    ''
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
        width: '100%',
        height: SCREEN_HEIGHT * 0.03317,
        fontWeight: '400',
        lineHeight: 28,
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
        height: SCREEN_HEIGHT * 0.02962,
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
        fontSize: 28,
        color: 'white',
        fontWeight: '400',
        lineHeight: 28
    },
    scrollView: {
        flex: 1, flexDirection: 'column', 
    },
    scrollViewContainer: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.92307,
        height: 'auto',
        marginTop: 20
    },
    infocontainer: {
        width: SCREEN_WIDTH * 0.917948,
        height: SCREEN_HEIGHT * 0.118483,
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

export default observer(deaduser2);