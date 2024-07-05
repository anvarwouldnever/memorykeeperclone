import React, { useState } from 'react'
import { ScrollView, StyleSheet, TouchableHighlight, View, Image, TouchableOpacity, Text, ActivityIndicator, Modal, Dimensions } from 'react-native'
import Vector from '../icons/angle-left (3).png'
import Trash from '../icons/trash.png'
import { useNavigation } from '@react-navigation/native'
import { Video } from 'expo-av';
import VideoPlay from '../icons/play-circle.png'
import axios from 'axios'
import store from '../store/store'
import { observer } from 'mobx-react-lite'
import TrashBlack from '../icons/trash-black.png'
import { ref, uploadBytesResumable, listAll, getDownloadURL, getMetadata, deleteObject } from "firebase/storage";
import { storage } from '../firebase/firebase'
import * as ImagePicker from 'expo-image-picker';

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height


function Gallery({ route }) {

    const uris = route.params.uris
    const id = route.params.id
    const [selectedImages, setSelectedImages] = useState([]);
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState({})
    const [loadingIndicator, setLoadingIndicator] = useState(false)
    const [blobs, setBlobs] = useState([])
    const [newUris, setNewUris] = useState([])
    const [modal, setModal] = useState(false)
    const [errorModal, setErrorModal] = useState(false)
    const [modalCompleted, setModalCompleted] = useState(false)
    const [modalCompletedMessage, setModalCompletedMessage] = useState('Успешно добавлено!')
    const [error, setError] = useState('Для внесения изменений требуется подключение к интернету')
    const navigation = useNavigation()

    const toggleImageSelection = (uri) => {
        if (selectedImages.includes(uri)) {
          setSelectedImages(selectedImages.filter((item) => item !== uri));
        } else {
          setSelectedImages([...selectedImages, uri]);
        }
    };
 
    async function deleteFiles() {
        try {
            setModal(false)
            setLoadingIndicator(true)
            const response = await axios.post('https://memorykeeper-backend-89433124d8be.herokuapp.com/api/deleterelativephotos', {uris: selectedImages, id: id})
            if (response.status === 200) {
                setModalCompletedMessage('Успешно удалено!')
                setModalCompleted(true)
                await Promise.all(selectedImages.map(async (selectedImages) => {
                    const fileRef = ref(storage, selectedImages);
                    await deleteObject(fileRef);
                }));
            } else if (response.status === 500) {
                setError('Произошла непредвиденная ошибка при изменении данных, приносим извинения за причиненные неудобства')
            }
        } catch (error) {
            if (error.code || error.request) {
                setErrorModal(true)
                console.log(error)  
            } else {
                console.log(error)
                setErrorModal(true)
            }
        } finally {
            setLoadingIndicator(false)
        }
    }

    const handleLoadStart = (uri) => {
        setLoading(prevLoading => ({ ...prevLoading, [uri]: true }));
    };
    
    const handleLoadEnd = (uri) => {
        setLoading(prevLoading => ({ ...prevLoading, [uri]: false }));
    };

    const pickImage = async() => {
       try {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspect: [3, 4],
            quality: 0.7,
            allowsMultipleSelection: true,
        });
    
        if (!result.canceled) {

            const blobsArray = [...blobs];
            const uriArray = [...newUris];

            async function processAsset(asset) {
                const response = await fetch(asset.uri);
                const blob = await response.blob();
                blobsArray.push(blob);
                uriArray.push({uri: asset.uri, type: asset.type});
            }

            await Promise.all(result.assets.map(processAsset));

            setBlobs(blobsArray)
            setNewUris(uriArray)
        }
       } catch (error) {
            console.log(error)
       }
    };

    async function firebaseFilesUpload(id) {
        const uploadPromises = blobs.map(async (blob) => {
            const storageRef = ref(storage, `${id}/${id}` + generateUniqueFileName());
            await uploadBytesResumable(storageRef, blob);
        });
    
        await Promise.all(uploadPromises);
    
        try {
            const files = [];
            const userFolderRef = ref(storage, `${id}/`);
            const filesList = await listAll(userFolderRef); 
    
            for (const fileRef of filesList.items) {
                const downloadURL = await getDownloadURL(fileRef);
                const metadata = await getMetadata(fileRef);
                const type = metadata.contentType;
                files.push({ downloadURL, type });
            }
            return files;
        } catch (error) {
            return setErrorModal(true)
        }
    }

    const generateUniqueFileName = () => {
        const timestamp = new Date().getTime(); 
        const randomString = Math.random().toString(36).substring(2, 8);
        return `file_${timestamp}_${randomString}`;
    };

    async function addPhotos() {
        try {
            setLoadingIndicator(true)
            const uris = await firebaseFilesUpload(id)
            const response = await axios.post('https://memorykeeper-backend-89433124d8be.herokuapp.com/api/changerelative', {data: id, uris})
            if (uris && response.status === 200) {
            setModalCompleted(true)
            } else if (response.status === 500) {
                setError('Произошла непредвиденная ошибка при изменении данных, приносим извинения за причиненные неудобства')
            } else {
                setErrorModal(true)
            }
        } catch (error) {
            if (error.code || error.request) {
                setErrorModal(true)
                console.log(error)   
            } else {
                console.log(error)
                setErrorModal(true)
            }
        } finally {
            setLoadingIndicator(false)
        }
    }

    function cancelDelete() {
        setSelectedImages([])
        setModal(false)
        setShow(false)
    }

    function CompleteAction() {
        const prev = store.callFunction
        store.setCallFunction(!prev)
        setModalCompleted(false)
        navigation.navigate('AuthorizedUser')
    }

    return (
        <View style={styles.container}>
            {loadingIndicator && 
            <Modal transparent={true} visible={loadingIndicator}>
                <View style={{width: SCREEN_WIDTH * 0.38461538, height: SCREEN_HEIGHT * 0.11848, position: 'absolute', top: SCREEN_HEIGHT * 0.438388, left: SCREEN_WIDTH * 0.30769, borderRadius: 20, justifyContent: 'center'}}>
                    <ActivityIndicator size='large' color="#949494"/>
                </View>
            </Modal>
            }
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{borderRadius: 200, width: SCREEN_WIDTH * 0.1076, height: SCREEN_HEIGHT * 0.04976, justifyContent: 'center', alignItems: 'center', backgroundColor: '#191919'}}>
                    <Image source={Vector} style={{width: 14, height: 14}}/>
                </TouchableOpacity>
                <Text style={{width: SCREEN_WIDTH * 0.7025641, height: 'auto', color: 'white', justifyContent: 'center', alignItems: 'center', textAlign: 'center', lineHeight: 28, fontSize: 28, fontWeight: 400}}>Галлерея</Text>
                <TouchableOpacity style={{borderRadius: 200, width: SCREEN_WIDTH * 0.1076, height: SCREEN_HEIGHT * 0.04976, justifyContent: 'center', alignItems: 'center', backgroundColor: '#191919'}} onPress={() => setShow(prev => !prev)}>
                    <Image source={Trash} style={{width: 14, height: 14}}/>
                </TouchableOpacity>
            </View>
            <Modal visible={errorModal} transparent={true} animationType='slide'>
                <View style={{alignItems: 'center', justifyContent: 'space-evenly', position: 'absolute', bottom: 0, backgroundColor: '#191919', width: SCREEN_WIDTH, height: 220, borderTopRightRadius: 40, borderTopLeftRadius: 40}}>
                    <Text style={{width: 'auto', height: 'auto', textAlign: 'center', color: 'white', fontSize: 20}}>{error}</Text>
                    <TouchableOpacity onPress={() => setErrorModal(false)} style={{backgroundColor: 'white', width: 358, height: 56, borderRadius: 200, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>Ок</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <Modal visible={modalCompleted} transparent={true} animationType='slide'>
                <View style={{position: 'absolute', backgroundColor: '#191919', width: SCREEN_WIDTH, bottom: 0, height: SCREEN_HEIGHT * 0.2035278154, alignItems: 'center', justifyContent: 'space-between', borderTopRightRadius: 40, borderTopLeftRadius: 40}}>
                    <Text style={{color: 'white', fontWeight: '400', fontSize: 26, marginTop: 20}}>{modalCompletedMessage}</Text>
                    <TouchableOpacity onPress={() => CompleteAction()} style={{width: SCREEN_WIDTH * 0.917948, height: SCREEN_HEIGHT * 0.06635, backgroundColor: 'white', borderRadius: 200, marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: 'black', fontWeight: '500', fontSize: 16}}>Ок</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <View style={styles.gallerycontainer}>
                <ScrollView style={{flex: 1, flexDirection: 'column'}} showsVerticalScrollIndicator={false}>
                    <TouchableHighlight>
                        <View style={styles.photoscontainer}>
                            <View style={{width: 'auto', height: 'auto', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between'}}>
                                {uris === null? <Text style={{color: '#949494', position: 'absolute', top: SCREEN_HEIGHT * 0.27251185, left: SCREEN_WIDTH * 0.102564, fontSize: 20}}>Нет добавленных фото/видео</Text> : uris.map((uri, index) => (
                                        uri.type === 'image/png' || uri.type === 'image/jpeg' || uri.type === 'image/webp' ? (
                                        <TouchableOpacity key={index} style={{height: 'auto', width: 'auto', position: 'relative'}} onPress={show? () => toggleImageSelection(uri.downloadURL) : () => navigation.navigate('GalleryFlatlist', {uris: uris, index: index})}>
                                            {loading[uri.downloadURL] && (
                                                <ActivityIndicator size="small" color="grey" style={{position: 'absolute', top: SCREEN_HEIGHT * 0.08649, left: SCREEN_WIDTH * 0.1871}}/>
                                            )}
                                            <Image onLoadEnd={() => handleLoadEnd(uri.downloadURL)} onLoadStart={() => handleLoadStart(uri.downloadURL)} key={index} source={{ uri: uri.downloadURL }} style={{ width: SCREEN_WIDTH * 0.443589, height: SCREEN_HEIGHT * 0.203791, borderRadius: 14, marginTop: 8}}/>
                                            {show? <TouchableOpacity onPress={() => toggleImageSelection(uri.downloadURL)} style={selectedImages.includes(uri.downloadURL) ? styles.selectedButton : styles.unselectedButton}/> : ''}
                                        </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity key={index} style={{height: 'auto', width: 'auto', position: 'relative'}} onPress={show? () => toggleImageSelection(uri.downloadURL) : () => navigation.navigate('GalleryFlatlist', {uris: uris, index: index})}>
                                                <Video onLoadEnd={() => handleLoadEnd(uri.downloadURL)} onLoadStart={() => handleLoadStart(uri.downloadURL)} key={index} source={{ uri: uri.downloadURL }} style={{ width: SCREEN_WIDTH * 0.443589, height: SCREEN_HEIGHT * 0.203791, borderRadius: 14, marginTop: 8}} resizeMode='cover'/>
                                                {show? <TouchableOpacity onPress={() => toggleImageSelection(uri.downloadURL)} style={selectedImages.includes(uri.downloadURL) ? styles.selectedButton : styles.unselectedButton}/> : ''}
                                                <Image source={VideoPlay} style={{position: 'absolute', width: 40, height: 40, top: '40%', left: '40%'}}/>
                                            </TouchableOpacity>
                                        )    
                                ))}
                            </View>
                        </View>
                    </TouchableHighlight>
                </ScrollView>
            </View>
            <TouchableOpacity style={styles.action} onPress={show? () => setModal(true) : newUris.length > 0? () => addPhotos() : () => pickImage()}>
                <Text style={{color: 'black', fontSize: 16, fontWeight: '500', lineHeight: 20}}>{show? `Удалить (${selectedImages.length})` : newUris.length > 0? `Добавить (${newUris.length})` : '+ Добавить фото/видео'}</Text>
                {show && <Image source={TrashBlack} style={{width: 16, height: 16, marginRight: 5}}/>}
            </TouchableOpacity>
            <Modal visible={modal} transparent={true} animationType='slide'>
                <View style={{alignItems: 'center', width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.272511, position: 'absolute', top: SCREEN_HEIGHT * 0.734597, backgroundColor: '#0A0A0A', borderTopLeftRadius: 40, borderTopRightRadius: 40}}>
                      <View style={{justifyContent: 'space-around', alignItems: 'center', width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.241706, position: 'absolute', bottom: 35}}>
                            <View style={{width: 79, height: 6, borderRadius: 200, backgroundColor: '#191919'}}></View>
                            <Text style={{width: 271, height: 28, fontSize: 28, lineHeight: 28, letterSpacing: -2, textAlign: 'center', fontWeight: '400', color: 'white'}}>Вы уверенны удалить?</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: SCREEN_WIDTH * 0.917948, height: 56}}>
                                <TouchableOpacity onPress={() => deleteFiles()} style={{width: SCREEN_WIDTH * 0.441025, height: SCREEN_HEIGHT * 0.06635, borderRadius: 200, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{width: 22, height: 14, fontWeight: '500', fontSize: 16, lineHeight: 15, color: '#0A0A0A'}}>Да</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => cancelDelete()} style={{width: SCREEN_WIDTH * 0.441025, height: SCREEN_HEIGHT * 0.06635, borderRadius: 200, backgroundColor: '#191919', justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{width: 30, height: 14, fontWeight: '500', fontSize: 16, lineHeight: 15, color: '#949494'}}>Нет</Text>    
                                </TouchableOpacity>  
                            </View>
                      </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black',
        alignItems: 'center'
    },
    action: {
        //borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.917948,
        height: SCREEN_HEIGHT * 0.06635,
        backgroundColor: 'white',
        borderRadius: 200,
        position: 'absolute',
        bottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row-reverse'
    },
    header: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        top: SCREEN_HEIGHT * 0.04739,
        position: 'absolute',
        width: SCREEN_WIDTH * 0.917948,
        height: SCREEN_HEIGHT * 0.09478,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    gallerycontainer: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.923076,
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.154028,
        left: SCREEN_WIDTH * 0.03589744,
        height: 710
    },
    photoscontainer: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: '100%',
        height: 'auto',
        flexDirection: 'column'
    },
    unselectedButton: {
        position: 'absolute', 
        top: '7%', 
        right: '4%',
        width: 24, 
        height: 24, 
        borderColor: 'white', 
        borderWidth: 1, 
        borderStyle: 'solid', 
        backgroundColor: 'transparent', 
        borderRadius: 200
    },
    selectedButton: {
        position: 'absolute', 
        top: '7%', 
        right: '4%',
        width: 24, 
        height: 24, 
        borderColor: 'white', 
        borderWidth: 1, 
        borderStyle: 'solid', 
        backgroundColor: 'white', 
        borderRadius: 200
    }
})

export default observer(Gallery)