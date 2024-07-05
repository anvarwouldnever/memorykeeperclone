import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, TextInput, TouchableOpacity, Image, Dimensions, Modal, ActivityIndicator} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";
import { observer } from 'mobx-react-lite';
import store from "../store/store";
import { ref, uploadBytesResumable, listAll, getDownloadURL, getMetadata } from "firebase/storage";
import { storage } from "../firebase/firebase";
import axios from "axios"
import buttonBlack from '../icons/buttonBlack.png'
import buttonWhite from '../icons/buttonWhite.png'
import Paperclip from '../icons/paperclip.png'
import Arrow from '../icons/angle-left.png'
import ArrowDown from '../icons/angle-down.png'
import Pin from '../icons/Frame 73.png'
import MapView, { Marker } from 'react-native-maps';
import { Video } from 'expo-av';

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

 function AddRelative() {

    const [name, setName] = useState("")
    const [biography, setBiography] = useState("")
    const [relation, setRelation] = useState(null)
    const [height, setHeight] = useState(SCREEN_HEIGHT * 0.04976)
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [modal1, setModal1] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [errorModal, setErrorModal] = useState(false)
    const [error, setError] = useState('Для добавления близких требуется подключение к интернету')
    const [blobs, setBlobs] = useState([])
    const [passportblobs, setPassportBlobs] = useState([])
    const [uri, setUris] = useState([])
    const [passportFilenames, setPassportFilenames] = useState({
        firstFilename: '',
        secondFilename: '',
        thirdFilename: ''
    })

    const navigation = useNavigation();
    const location = store.location
    const id = store.userid

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspect: [3, 4],
            quality: 0.5,
            allowsMultipleSelection: true,
        });
    
        if (!result.canceled) {

            const blobsArray = [...blobs];
            const uriArray = [...uri];

            async function processAsset(asset) {
                const response = await fetch(asset.uri);
                const blob = await response.blob();
                blobsArray.push(blob);
                uriArray.push({uri: asset.uri, type: asset.type});
            }

            await Promise.all(result.assets.map(processAsset));

            setBlobs(blobsArray)
            setUris(uriArray)
        }
    };

    const pickImagePassport = async(Filenamenumber) => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [3, 4],
            quality: 0.5,
            allowsMultipleSelection: false,
        });
        if(result.canceled) {
            return;
        } else {
            const asset = result.assets[0]
            const response = await fetch(asset.uri);
            const blob = await response.blob();
            setPassportBlobs(prevBlobs => [...prevBlobs, blob]);
            setPassportFilenames(prevstate => ({
                ...prevstate,
                [Filenamenumber]: asset.fileName
            }))
        }
    }
    
    const generateUniqueFileName = () => {
        const timestamp = new Date().getTime(); 
        const randomString = Math.random().toString(36).substring(2, 8);
        return `file_${timestamp}_${randomString}`;
    };

    async function send() {
        try {
            if (passportFilenames.firstFilename === '' || passportFilenames.secondFilename === '' || passportFilenames.thirdFilename === '') {
                setError('Пожалуйста, заполните все необходимые поля.');
                setErrorModal(true);
                return
            }
            setModal1(false)
            setLoading(true)
            const response = await axios.post('https://memorykeeper-backend-89433124d8be.herokuapp.com/api/addrelative', {id, name, location, biography, relation})
            if (response.status === 200) {
                const data = response.data
                const uris = await firebaseFilesUpload(data)
                await axios.post('https://memorykeeper-backend-89433124d8be.herokuapp.com/api/changerelative', {data, uris})
                setLoading(false)
                setModal2(true)
                await firebasePassportUpload(data)
            } else if (response.status === 500) {
                setError('Произошла непредвиденная ошибка при изменении данных, приносим извинения за причиненные неудобства')
            }
        } catch (error) {
            if(error.code || error.request) {
                setErrorModal(true)
                console.log(error)
            } else {
                setError(error.message)
                setErrorModal(true)
            }
        } finally {
            setLoading(false)
        }
    }

    function finishUpload() {
        const prev = store.callFunction
        store.setCallFunction(!prev)
        store.setLocation({})
        setModal2(false)
        navigation.goBack()
    }

    async function firebaseFilesUpload(data) {
        const uploadPromises = blobs.map(async (blob) => {
            const storageRef = ref(storage, `${data}/${data}` + generateUniqueFileName());
            await uploadBytesResumable(storageRef, blob);
        });

        await Promise.all(uploadPromises);
    
        try {
            const files = [];
            const userFolderRef = ref(storage, `${data}/`);
            const filesList = await listAll(userFolderRef); 
    
            for (const fileRef of filesList.items) {
                const downloadURL = await getDownloadURL(fileRef);
                const metadata = await getMetadata(fileRef);
                const type = metadata.contentType;
                files.push({ downloadURL, type });
            }
            return files;
        } catch (error) {
            console.error('Ошибка при получении списка файлов:', error);
        }
    }

    async function firebasePassportUpload(data) {
        for (const blob of passportblobs) {
            const storageRef = ref(storage, `${data}/passports/${data}` + generateUniqueFileName());
            await uploadBytesResumable(storageRef, blob);
        }
        try {
            const files = []
            const userFolderRef = ref(storage, `${data}/passports`);
            const filesList = await listAll(userFolderRef); 

            for (const fileRef of filesList.items) {
                const downloadURL = await getDownloadURL(fileRef);
                const metadata = await getMetadata(fileRef);
                const type = metadata.contentType;
                files.push({ downloadURL, type });
            }
            return files
        } catch (error) {
            console.error('Ошибка при получении списка файлов:', error);
        }
    }

    function goBack() {
        store.setLocation({})
        navigation.goBack()
    }
    
    function cancelPassport() {
        setModal1(false)
        setPassportBlobs([])
        setPassportFilenames({
            firstFilename: '',
            secondFilename: '',
            thirdFilename: ''
        })
    }

    return (
        <View style={styles.container}>
            {loading && 
            <Modal transparent={true} visible={loading}>
                <View style={{width: 150, height: 100, position: 'absolute', top: SCREEN_HEIGHT * 0.438388, left: SCREEN_WIDTH * 0.30769, borderRadius: 20, justifyContent: 'center'}}>
                    <ActivityIndicator size='large' color="#949494"/>
                </View>
            </Modal>
            }
            <View style={styles.header}>
                <Text style={styles.headertext}>Заполните анкету</Text>
                <TouchableOpacity style={styles.headertopacity} onPress={() => goBack()}>
                    <Image source={Arrow} style={{width: 14, height: 14}}/>
                </TouchableOpacity>
            </View>
            <View style={styles.form}> 
                <ScrollView style={styles.formscrollview} showsVerticalScrollIndicator={false}>
                    <TouchableHighlight>
                        <View style={styles.formcontainer}>
                            <View style={styles.generalinfocontainer}>
                                <TextInput style={styles.inputs} placeholder="Ф.И.О усопшего" keyboardAppearance="dark" placeholderTextColor={'#949494'} value={name} onChangeText={(text) => setName(text)}></TextInput>
                                <TouchableOpacity style={styles.input} onPress={() => setModal(true)}>
                                    <Text style={styles.inputtext}>{relation? relation : 'Кем для вас является?'}</Text>
                                    <Image source={ArrowDown} style={{width: 14, height: 14}}/>
                                </TouchableOpacity>
                            </View>
                            <Modal visible={errorModal} transparent={true} animationType='slide'>
                                <View style={{alignItems: 'center', justifyContent: 'space-evenly', position: 'absolute', bottom: 0, backgroundColor: '#191919', width: SCREEN_WIDTH, height: 220, borderTopRightRadius: 40, borderTopLeftRadius: 40}}>
                                    <Text style={{width: 358, height: 'auto', textAlign: 'center', color: 'white', fontSize: 20}}>{error}</Text>
                                    <TouchableOpacity onPress={() => setErrorModal(false)} style={{backgroundColor: 'white', width: 358, height: 56, borderRadius: 200, alignItems: 'center', justifyContent: 'center'}}>
                                        <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>Ок</Text>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                            <Modal visible={modal} transparent={true} style={styles.modal} animationType='slide'>
                                <View style={styles.modalview}>
                                        <View style={styles.modalview2}></View>
                                        <View style={styles.modalview3}>
                                                <Text style={styles.modalview3text}>Кем для вас является?</Text>  
                                                <TextInput keyboardAppearance="dark" style={styles.modalview3textinput} placeholder="Выберите свой вариант" placeholderTextColor={"#949494"} onChangeText={(text) => setRelation(text)} />                                                                                  
                                            <View style={styles.modalview4}>
                                                <TouchableOpacity style={styles.chooserelative} onPress={() => setRelation('Дядя')}><Image source={relation === 'Дядя' ? buttonWhite : buttonBlack} style={{ width: 20, height: 20 }}/><Text style={styles.modalview4topacity}>Дядя</Text></TouchableOpacity>
                                                <TouchableOpacity style={styles.chooserelative} onPress={() => setRelation('Тетя')}><Image source={relation === 'Тетя' ? buttonWhite : buttonBlack} style={{ width: 20, height: 20 }}/><Text style={styles.modalview4topacity}>Тетя</Text></TouchableOpacity>
                                                <TouchableOpacity style={styles.chooserelative} onPress={() => setRelation('Мама')}><Image source={relation === 'Мама' ? buttonWhite : buttonBlack} style={{ width: 20, height: 20 }}/><Text style={styles.modalview4topacity}>Мама</Text></TouchableOpacity>
                                                <TouchableOpacity style={styles.chooserelative} onPress={() => setRelation('Папа')}><Image source={relation === 'Папа' ? buttonWhite : buttonBlack} style={{ width: 20, height: 20 }}/><Text style={styles.modalview4topacity}>Папа</Text></TouchableOpacity>
                                                <TouchableOpacity style={styles.chooserelative} onPress={() => setRelation('Брат')}><Image source={relation === 'Брат' ? buttonWhite : buttonBlack} style={{ width: 20, height: 20 }}/><Text style={styles.modalview4topacity}>Брат</Text></TouchableOpacity>
                                                <TouchableOpacity style={styles.chooserelative} onPress={() => setRelation('Сестра')}><Image source={relation === 'Сестра' ? buttonWhite : buttonBlack} style={{ width: 20, height: 20 }}/><Text style={styles.modalview4topacity}>Сестра</Text></TouchableOpacity>
                                            </View>
                                            <View style={styles.modalview5}>
                                                <TouchableOpacity style={styles.modalview5topacity} onPress={() => setModal(false)}><Text style={{color: '#0A0A0A', fontWeight: '500', fontSize: 16}}>Добавить</Text></TouchableOpacity>
                                                <TouchableOpacity style={styles.modalview5topacity2} onPress={() => {setModal(false), setRelation(null)}}><Text style={{color: '#949494', fontWeight: '500', fontSize: 16}}>Отмена</Text></TouchableOpacity>
                                            </View>
                                        </View>
                                        
                                </View>
                            </Modal>
                            <Modal transparent={true} style={styles.modal1} visible={modal1} animationType='slide'>
                                <View style={styles.modal1view}>
                                    <View style={styles.modal1view2}>
                                        <View style={styles.modal1view3}>
                                            <Text style={styles.modal1view3text}>Верификация</Text>
                                            <Text style={styles.modal1view3text2}>Для верификации и проверки достоверности необходимы документы</Text>
                                        </View>
                                        <View style={styles.modal1view4}>
                                            <TouchableOpacity style={styles.modal1view4topacity} onPress={() => pickImagePassport('firstFilename')}><Image source={Paperclip} style={{width: 16, height: 16}}/><Text style={styles.modal1view4topacitytext}>{passportFilenames.firstFilename === ''? 'Паспорт успошего' : passportFilenames.firstFilename}</Text></TouchableOpacity>
                                            <TouchableOpacity style={styles.modal1view4topacity} onPress={() => pickImagePassport('secondFilename')}><Image source={Paperclip} style={{width: 16, height: 16}}/><Text style={styles.modal1view4topacitytext}>{passportFilenames.secondFilename === ''? 'Свидетельство о смерти' : passportFilenames.secondFilename}</Text></TouchableOpacity>
                                            <TouchableOpacity style={styles.modal1view4topacity} onPress={() => pickImagePassport('thirdFilename')}><Image source={Paperclip} style={{width: 16, height: 16}}/><Text style={styles.modal1view4topacitytext}>{passportFilenames.thirdFilename === ''? 'Ваш паспорт' : passportFilenames.thirdFilename}</Text></TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={styles.modal1view5}>
                                            <TouchableOpacity style={styles.modal1view5topacity}  onPress={() => send()}><Text style={{color: '#0A0A0A', fontWeight: '500', fontSize: 16}}>Отправить</Text></TouchableOpacity>
                                            <TouchableOpacity style={styles.modal1view5topacity2} onPress={() => cancelPassport()}><Text style={{color: '#949494', fontWeight: '500', fontSize: 16}}>Отмена</Text></TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                            <Modal visible={modal2} transparent={true} style={styles.modal} animationType='slide'>
                                <View style={{alignItems: 'center', width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.43838863, position: 'absolute', top: SCREEN_HEIGHT * 0.56161137, backgroundColor: '#0A0A0A', borderTopLeftRadius: 40, borderTopRightRadius: 40 }}>
                                    <View style={{alignItems: 'center', width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.438388, justifyContent: 'space-around', position: 'absolute', bottom: 10}}>
                                        <View style={{width: 79, height: 6, borderRadius: 200, backgroundColor: '#191919'}}/>
                                        <View style={{alignItems: 'center', justifyContent: 'space-between', width: SCREEN_WIDTH * 0.882051, height: SCREEN_HEIGHT * 0.20616}}>
                                            <Text style={{width: SCREEN_WIDTH * 0.6564, height: SCREEN_HEIGHT * 0.03317, fontWeight: '400', fontSize: 28, lineHeight: 28, letterSpacing: -2, textAlign: 'center', color: 'white'}}>Вы отправили запрос</Text>
                                            <Text style={{marginTop: 5, width: SCREEN_WIDTH * 0.820512, height: 'auto', fontWeight: '400', fontSize: 15, lineHeight: 18.2, letterSpacing: -1, textAlign: 'center', color: '#949494'}}>Мы ценим вас и ваших близких, для того что бы удостовериться в причастности вас к усопшему мы тщательно проверим всю информацию и в случае положительного ответа добавим вашего близкого человека в приложение, статус заявки вы можете отслеживать на “Главном экране” запрос обрабатывается в течении (7 раб. дней)</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => finishUpload()} style={{alignItems: 'center', width: 358, height: 56, borderRadius: 200, flexDirection: 'row', justifyContent: 'center', backgroundColor: 'white'}}>
                                            <Text style={{width: 122, height: 14, fontWeight: '500', fontSize: 16, lineHeight: 15, color: '#0A0A0A'}}>Понял, хорошо</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                            <View style={styles.biography}>
                                <Text style={styles.biographytopacity}>Биография <Text style={{color: '#949494', fontSize: 18, fontWeight: 400}}>(по желанию)</Text></Text>
                                <TextInput keyboardAppearance="dark" onChangeText={(text) => setBiography(text)} maxLength={1000} onContentSizeChange={(event) => {setHeight(event.nativeEvent.contentSize.height + SCREEN_HEIGHT * 0.0331753)}} placeholder="Напишите о вашем близком" placeholderTextColor={'#949494'} multiline={true} style={[styles.biographytextinput, { height }]}/>
                            </View>
                            <View style={styles.gravelocation}>
                                <View style={styles.gravelocationtopacity}>
                                    <Text style={styles.gravelocationtext}>Место захоронения <Text style={{flexShrink: 1, color: '#949494', fontSize: 14, fontWeight: 400}}>(по желанию)</Text></Text>
                                </View>
                                <TouchableOpacity style={styles.gravelocationtopacity2} onPress={() => {navigation.navigate('Map'), store.setLocation(false)}}>
                                    <Text style={styles.gravelocationtopacity2text}>{'+  Добавить'}</Text>
                                </TouchableOpacity>
                            </View>
                            {location.latitude && <MapView style={styles.map} initialRegion={{ latitude: location.latitude, longitude: location.longitude, latitudeDelta: 0.02, longitudeDelta: 0.02}} scrollEnabled={false}> 
                                        <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }}>
                                        <Image 
                                            source={Pin}
                                            style={styles.mapViewImage}
                                        />
                                        </Marker>
                            </MapView>}
                            <View style={styles.biography}>
                                <Text style={styles.biography2topacity}>Галерея <Text style={{color: '#949494', fontSize: 18, fontWeight: 400}}>(по желанию)</Text></Text>
                                <TouchableOpacity style={{backgroundColor: '#191919', width: SCREEN_WIDTH * 0.91282051, height: SCREEN_HEIGHT * 0.04976, borderRadius: 200, justifyContent: 'center'}} onPress={() => pickImage()}>
                                    <Text style={{color: 'white', fontWeight: '500', fontSize: 14, textAlign: 'center'}}>+  Добавить</Text>
                                </TouchableOpacity>
                            </View>
                                <View style={{width: SCREEN_WIDTH * 0.91282051, height: 'auto', flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 60, flexWrap: 'wrap', justifyContent: 'space-between'}}>
                                        {uri.map((item, index) => (
                                            item.type === 'image' ? (
                                                <Image
                                                  key={index}
                                                  source={{ uri: item.uri }}
                                                  style={{ width: SCREEN_WIDTH * 0.441025, height: SCREEN_HEIGHT * 0.203791, borderRadius: 5, marginTop: 8 }}
                                                />
                                              ) : (
                                                <Video
                                                  key={index}
                                                  source={{ uri: item.uri }}
                                                  style={{ width: SCREEN_WIDTH * 0.441025, height: SCREEN_HEIGHT * 0.203791, borderRadius: 5, marginTop: 8 }}
                                                  useNativeControls
                                                  focusable={false}
                                                />
                                              )
                                        ))}
                                </View>
                        </View>
                    </TouchableHighlight>
                </ScrollView>
            </View>
            <TouchableOpacity onPress={() => setModal1(true)} style={{width: SCREEN_WIDTH * 0.91282051, height: SCREEN_HEIGHT * 0.06635, backgroundColor: 'white', position: 'absolute', top: SCREEN_HEIGHT * 0.916754478398314, borderRadius: 200, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'black', fontWeight: '500', fontSize: 16}}>Отправить запрос</Text>
            </TouchableOpacity>
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
    form: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.91794872,
        height: SCREEN_HEIGHT * 0.7327001356852103,
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.1729,
        left: SCREEN_WIDTH * 0.0410256,
        justifyContent: 'center',
        alignItems: 'center'
    },
    formcontainer: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.91282051,
        height: 'auto',
    },
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
    },
    generalinfocontainer: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.91282051,
        height: 'auto',
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'center'
    },
    inputs: {
        width: SCREEN_WIDTH * 0.91282051,
        height: SCREEN_HEIGHT * 0.06635071,
        borderRadius: 200,
        backgroundColor: '#191919',
        paddingHorizontal: 15,
        color: 'white',
        fontSize: 16,
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
    },
    input: {
        width: SCREEN_WIDTH * 0.91282051,
        height: SCREEN_HEIGHT * 0.06635071,
        borderRadius: 200,
        backgroundColor: '#0A0A0A',
        borderWidth: 1, borderColor: '#191919', borderStyle: 'solid',
        paddingHorizontal: 15,
        color: 'white',
        fontWeight: '400',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15
    },
    biography: {
        width: 'auto',
        height: 'auto',
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        marginTop: 35,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    gravelocation: {
        width: SCREEN_WIDTH * 0.91282051,
        height: 'auto',
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        marginTop: 35,
        alignItems: 'center'
    },
    chooserelative: {
        width: SCREEN_WIDTH * 0.91794872, 
        height: SCREEN_HEIGHT * 0.05213, 
        borderRadius: 10, 
        borderColor: "#191919", 
        borderWidth: 1, 
        borderStyle: 'solid',
        alignItems: 'center',
        flexDirection: 'row-reverse',
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    },
    mapView2: {
        width: SCREEN_WIDTH * 0.91794872, 
        height: SCREEN_HEIGHT * 0.02962, 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid'
    },
    mapViewText: {
        width: SCREEN_WIDTH * 0.60769, 
        height: SCREEN_HEIGHT * 0.03317, 
        color: '#FFFFFF', 
        fontSize: 25, 
        lineHeight: 28
    },
    mapViewTouchableopacity: {
        justifyContent: 'space-between', 
        flexDirection: 'row', 
        width: SCREEN_WIDTH * 0.21282, 
        height: SCREEN_HEIGHT * 0.03554,
        alignItems: 'center', 
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
    },
    mapImage: {
        width: 14, 
        height: 14
    },
    mapImageText: {
        width: SCREEN_WIDTH * 0.161558, 
        height: SCREEN_HEIGHT * 0.01540, 
        color: "#949494", 
        fontWeight: '500', 
        fontSize: 14, 
        lineHeight: 15
    },
    mapViewImage: {
        width: SCREEN_WIDTH * 0.046153,
        height: SCREEN_HEIGHT * 0.02132
    },
    map: {
        width: '100%',
        height: SCREEN_HEIGHT * 0.187203,
        borderRadius: 25,
        marginTop: 15
    },
    headertext: {
        color: 'white', 
        fontSize: 28, 
        width: SCREEN_WIDTH * 0.7025641, 
        height: 'auto', 
        textAlign: 'center', 
        lineHeight: 28, 
        fontWeight: '400'
    },
    headertopacity: {
        width: SCREEN_WIDTH * 0.1076, 
        height: SCREEN_HEIGHT * 0.04976, 
        borderRadius: 200, padding: 14, 
        backgroundColor: '#191919', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    formscrollview: {
        flex: 1, 
        flexDirection: 'column'
    },
    inputtext: {
        color: '#949494', 
        fontSize: 16, 
        fontWeight: '400', 
        width: 'auto', 
        height: 'auto',
    },
    modal: {
        alignItems: 'center', 
        justifyContent: 'center'
    },
    modalview: {
        width: SCREEN_WIDTH, 
        height: SCREEN_HEIGHT * 0.752369, 
        backgroundColor: "#0A0A0A", 
        top: SCREEN_HEIGHT * 0.26343519, 
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,  
        alignItems: "center",
        position: 'absolute',
        borderColor: '#191919', 
        borderWidth: 1, 
        borderStyle: 'solid',
    },
    modalview2: {
        width: SCREEN_WIDTH * 0.2025641, 
        height: SCREEN_HEIGHT * 0.007109, 
        borderRadius: 200, 
        backgroundColor: "#191919", 
        marginTop: 10
    },
    modalview3: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH, 
        height: SCREEN_HEIGHT * 0.50947, 
        marginTop: SCREEN_HEIGHT * 0.01184, 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        position: 'absolute',
        top: 50
    },
    modalview3text: {
        color: 'white', 
        fontSize: 26, 
        width: 'auto', 
        height: 'auto', 
        lineHeight: 28,
    },
    modalview3textinput: {
        width: SCREEN_WIDTH * 0.9179, 
        height: SCREEN_HEIGHT * 0.06635,
        marginVertical: 10, 
        backgroundColor: '#0A0A0A', 
        borderColor: '#191919', 
        borderWidth: 1, 
        borderStyle: 'solid', 
        borderRadius: 200, 
        paddingHorizontal: 15, 
        color: 'white'
    },
    modalview4: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.9179, 
        height: SCREEN_HEIGHT * 0.37796209, 
        marginTop: SCREEN_HEIGHT * 0.005924, 
        justifyContent: 'space-between'
    },
    modalview4topacity: {
        color: 'white', 
        fontWeight: '500', 
        fontSize: 16,
    },
    modalview5: {
        width: SCREEN_WIDTH * 0.9179, 
        height: SCREEN_HEIGHT * 0.06635071, 
        marginTop: SCREEN_HEIGHT * 0.01777, 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    modalview5topacity: {
        width: SCREEN_WIDTH * 0.441025, 
        height: SCREEN_HEIGHT * 0.06635, 
        borderRadius: 200, 
        backgroundColor: 'white', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    modalview5topacity2: {
        width: SCREEN_WIDTH * 0.441025, 
        height: SCREEN_HEIGHT * 0.06635, 
        borderRadius: 200, 
        backgroundColor: '#191919', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    modal1: {
        alignItems: 'center', 
        justifyContent: 'center', 
        width: 'auto'
    },
    modal1view: {
        width: SCREEN_WIDTH, 
        height: SCREEN_HEIGHT * 0.870885, 
        backgroundColor: '#0A0A0A', 
        alignItems: 'center', 
        top: SCREEN_HEIGHT * 0.473933, 
        borderRadius: 40, 
        paddingHorizontal: 16, 
        paddingBottom: 28, 
        paddingTop: 14, 
        borderColor: '#191919', 
        borderWidth: 1, 
        borderStyle: 'solid', 
        position: 'absolute'
    },
    modal1view2: {
        width: SCREEN_WIDTH * 0.91282051, 
        height: SCREEN_HEIGHT * 0.331753, 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        flexDirection: 'column', 
        position: 'absolute', 
        top: SCREEN_HEIGHT * 0.02962
    },
    modal1view3: {
        width: SCREEN_WIDTH * 0.91282051, 
        height: SCREEN_HEIGHT * 0.09715, 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    modal1view3text: {
        width: SCREEN_WIDTH * 0.91282051, 
        height: SCREEN_HEIGHT * 0.033175, 
        fontSize: 28, 
        lineHeight: 28, 
        color: 'white', 
        fontWeight: '400', 
        textAlign: 'center'
    },
    modal1view3text2: {
        width: 'auto', 
        height: 'auto', 
        fontWeight: '400', 
        fontSize: 16, 
        lineHeight: 22.4, 
        color: '#949494', 
        textAlign: 'center', 
        flexWrap: 'wrap', 
        flexShrink: 1
    },
    modal1view4: {
        width: SCREEN_WIDTH * 0.9179, 
        height: SCREEN_HEIGHT * 0.2251, 
        justifyContent: 'space-between', 
        flexDirection: 'column'
    },
    modal1view4topacity: {
        width: SCREEN_WIDTH * 0.91282051,
        height: SCREEN_HEIGHT * 0.06635,
        borderRadius: 200, 
        paddingHorizontal: 15, 
        backgroundColor: "#0A0A0A", 
        borderColor: "#191919", 
        borderWidth: 1, 
        borderStyle: 'solid', 
        flexDirection: 'row-reverse', 
        justifyContent: 'space-between', 
        alignItems: "center"
    },
    modal1view4topacitytext: {
        width: 'auto', 
        height: 'auto', 
        color: '#6F6F6F',  
        fontWeight: '400', 
        fontSize: 16
    },
    modal1view4topacitytext2: {
        width: 'auto', 
        height: 'auto', 
        color: '#6F6F6F', 
        lineHeight: 16, 
        fontWeight: '400', 
        fontSize: 16
    },
    modal1view5: {
        width: SCREEN_WIDTH * 0.91794872, 
        height: SCREEN_HEIGHT * 0.06635, 
        marginTop: 25, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        position: 'absolute', 
        top: SCREEN_HEIGHT * 0.379146
    },
    modal1view5topacity: {
        width: SCREEN_WIDTH * 0.4410, 
        height: SCREEN_HEIGHT * 0.06635, 
        borderRadius: 200, 
        backgroundColor: 'white',
        alignItems: 'center', 
        justifyContent: 'center'
    },
    modal1view5topacity2: {
        width: SCREEN_WIDTH * 0.4410, 
        height: SCREEN_HEIGHT * 0.06635, 
        borderRadius: 200, 
        backgroundColor: '#191919', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    biographytopacity: {
        width: SCREEN_WIDTH * 0.91282051, 
        height: 35, 
        color: '#949494', 
        fontWeight: '400', 
        fontSize: 28, 
        lineHeight: 28, 
        marginBottom: 5
    },
    gravelocationtopacity: {
        width: SCREEN_WIDTH * 0.91282051, 
        height: 'auto', 
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        marginBottom: 10,
        flexDirection: 'row'
    },
    biographytextinput: {
        alignItems: 'center', 
        backgroundColor: '#191919', 
        width: SCREEN_WIDTH * 0.91282051, 
        borderRadius: 40, 
        justifyContent: 'center', 
        paddingHorizontal: 15, 
        paddingVertical: 1, 
        color: 'white', 
        fontWeight: "400", 
        fontSize: 16
    },
    biographytext2: {
        color: '#949494', 
        fontWeight: '400', 
        fontSize: 16
    },
    gravelocationtext: {
        color: '#949494', 
        fontWeight: '400', 
        fontSize: 28, 
        lineHeight: 28
    },
    gravelocationtext2: {
        color: 'white', 
        fontWeight: '400', 
        fontSize: 16, 
        lineHeight: 22.4
    },
    gravelocationtopacity2: {
        backgroundColor: '#191919',
        width: SCREEN_WIDTH * 0.912820, 
        height: SCREEN_HEIGHT * 0.04976, 
        borderRadius: 200, 
        justifyContent: 'center'
    },
    gravelocationtopacity2text: {
        color: 'white', 
        fontWeight: '500', 
        fontSize: 14, 
        textAlign: 'center'
    },
    biography2topacity: {
        width: SCREEN_WIDTH * 0.91282051, 
        height: 'auto', 
        color: '#949494', 
        fontWeight: '400', 
        fontSize: 28, 
        lineHeight: 28, 
        marginBottom: 10
    }
})

export default observer(AddRelative);