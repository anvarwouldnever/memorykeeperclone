import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, ScrollView, TouchableHighlight, Image, TouchableOpacity, Text, ActivityIndicator, Dimensions } from "react-native";
import Vector from '../icons/angle-left.png'
import { useNavigation } from "@react-navigation/native";
import { Video } from 'expo-av';
import VideoPlay from '../icons/play-circle.png'

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

export default function GalleryFlatlist({ route }) {

    const { index, uris } = route.params
    const [currentPage, setCurrentPage] = useState(index);
    const scrollViewRef = useRef(null);
    const navigation = useNavigation()
    const [loading, setLoading] = useState({})

    const handleLoadStart = (uri) => {
        setLoading(prevLoading => ({ ...prevLoading, [uri]: true }));
    };
    
    const handleLoadEnd = (uri) => {
        setLoading(prevLoading => ({ ...prevLoading, [uri]: false }));
    };
    
    const handleThumbnailPress = (index) => {
        scrollViewRef.current.scrollTo({ x: index * SCREEN_WIDTH * 0.917948, animated: true });
        setCurrentPage(index);
    }; 
    
    useEffect(() => {
        scrollViewRef.current.scrollTo({ x: index * SCREEN_WIDTH * 0.917948, animated: true });
        setCurrentPage(index);
    }, [index])

    return (
        <View style={styles.container}>
            <View style={{alignItems: 'center', justifyContent: 'space-between', width: SCREEN_WIDTH * 0.917948, height: 80, position: 'absolute', top: 40, left: 16, flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{width: SCREEN_WIDTH * 0.1076, height: SCREEN_HEIGHT * 0.04976, borderRadius: 200, borderColor: "#949494", borderWidth: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={Vector} style={{width: 14, height: 14}}></Image>
                </TouchableOpacity>
                <Text style={{fontWeight: '400', fontSize: 28, textAlign: 'center', color: '#949494'}}>Просмотр</Text>
                <View style={{width: SCREEN_WIDTH * 0.1076, height: SCREEN_HEIGHT * 0.04976,}}></View>
            </View>
            <View style={styles.slideshow}>
                <ScrollView style={styles.scrollview} horizontal scrollEnabled={false} pagingEnabled showsHorizontalScrollIndicator={false} scrollEventThrottle={16} ref={scrollViewRef}>
                    <TouchableHighlight>
                        <View style={{width: 'auto', height: 'auto', flexDirection: 'row'}}>
                            {uris.map((uri, index) => (
                                uri.type === 'image/png' || uri.type === 'image/jpeg' || uri.type === 'image/webp' ? (
                                    <Image source={{ uri: uri.downloadURL }} resizeMethod='resize' style={{width: SCREEN_WIDTH * 0.917948, height: SCREEN_HEIGHT * 0.454976, borderRadius: 16}} key={index} resizeMode="contain"/>
                                ) : (
                                    <Video resizeMode="contain" source={{ uri: uri.downloadURL }} style={{width: SCREEN_WIDTH * 0.917948, height: SCREEN_HEIGHT * 0.454976, borderRadius: 16}} key={index} useNativeControls={true}/>
                                )
                            ))}
                        </View>
                    </TouchableHighlight>
                </ScrollView>
            </View>
            <View style={styles.thumbnailSlideshow}>
                <ScrollView style={styles.scrollview2} horizontal={true} showsHorizontalScrollIndicator={false}>
                    <TouchableHighlight>
                        <View style={{width: 'auto', height: SCREEN_HEIGHT * 0.207345, flexDirection: 'row'}}>
                            {uris.map((uri, index) => (
                                uri.type === 'image/png' || uri.type === 'image/jpeg' || uri.type === 'image/webp' ? (
                                    <TouchableOpacity style={[styles.imageView, index === currentPage && styles.imageViewChosen]} key={index} onPress={() => handleThumbnailPress(index)}>
                                        {loading[uri.downloadURL] && (
                                                <ActivityIndicator size="small" color="grey" style={{position: 'absolute', top: SCREEN_HEIGHT * 0.08649, left: SCREEN_WIDTH * 0.1871}}/>
                                            )}  
                                        <Image source={{ uri: uri.downloadURL }} resizeMethod='resize' resizeMode='cover' style={styles.image} key={index} onLoadEnd={() => handleLoadEnd(uri.downloadURL)} onLoadStart={() => handleLoadStart(uri.downloadURL)}/>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity style={[styles.imageView, index === currentPage && styles.imageViewChosen]} key={index} onPress={() => handleThumbnailPress(index)}>  
                                        <Video source={{ uri: uri.downloadURL }} style={styles.image} key={index} resizeMode="cover" onLoadEnd={() => handleLoadEnd(uri.downloadURL)} onLoadStart={() => handleLoadStart(uri.downloadURL)}/>
                                        <Image source={VideoPlay} style={{position: 'absolute', width: 40, height: 40, top: '40%', left: '40%'}}/>
                                    </TouchableOpacity>
                                ) 
                            ))}
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
        backgroundColor: 'black'
    },
    slideshow: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.917948,
        height: SCREEN_HEIGHT * 0.454976,
        top: SCREEN_HEIGHT * 0.161137,
        left: SCREEN_WIDTH * 0.041025,
        position: 'absolute',
    },
    scrollview: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        flex: 1,
        flexDirection: 'row',
        width: SCREEN_WIDTH * 0.917948,
        height: SCREEN_HEIGHT * 0.221563
    },
    scrollview2: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        flex: 1,
        flexDirection: 'row',
        width: SCREEN_WIDTH * 0.917948,
        height: SCREEN_HEIGHT * 0.207345
    },
    thumbnailSlideshow: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.917948,
        height: SCREEN_HEIGHT * 0.213270,
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.635071,
        left: SCREEN_WIDTH * 0.041025,
        alignItems: 'center'
    },
    image: {
        width: SCREEN_WIDTH * 0.443589, 
        height: SCREEN_HEIGHT * 0.204976, 
        borderRadius: 14, 
        marginRight: 12
    },
    imageView: {
        width: SCREEN_WIDTH * 0.44871795, 
        height: SCREEN_HEIGHT * 0.207345, 
        flexDirection: 'row',
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        marginRight: 15,
        borderRadius: 14
    },
    imageViewChosen: {
        width: SCREEN_WIDTH * 0.44871795, 
        height: SCREEN_HEIGHT * 0.207345, 
        flexDirection: 'row',
        borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        marginRight: 15,
        borderRadius: 14
    }
})