import React, { useState } from "react";
import { View, Modal, StyleSheet, TouchableOpacity, TextInput, Text, Dimensions, Image, ScrollView, TouchableHighlight, ActivityIndicator } from "react-native";
import buttonBlack from '../icons/buttonBlack.png'
import buttonWhite from '../icons/buttonWhite.png'
import { useNavigation } from "@react-navigation/native";
import ArrowDown from '../icons/angle-down.png'
import Arrow from '../icons/angle-left.png'
import axios from "axios";
import { observer } from "mobx-react-lite";
import store from "../store/store";

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

function EditBiographyDeadUser({ route }) {

    const navigation = useNavigation()
    const biography = route.params.biography
    const id = route.params.id
    const relation = route.params.relation
    const [modal, setModal] = useState(false)
    const [errorModal, setErrorModal] = useState(false)
    const [error, setError] = useState('Для внесения изменений требуется подключение к интернету')
    const [newRelation, setNewRelation] = useState(relation)
    const [loading, setLoading] = useState(false)
    const [newBiography, setNewBiography] = useState(biography)
    const [modalCompleted, setModalCompleted] = useState(false)

    async function changeBiography() {
        try {
            setLoading(true)
            const response = await axios.post('https://memorykeeper-backend-89433124d8be.herokuapp.com/api/changebiography', {id: id, biography: newBiography, relation: newRelation})
            if (response.status === 200) {
                setModalCompleted(true)
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
            setLoading(false)
        }
    }

    function CompleteAction() {
        setModalCompleted(false)
        const prev = !store.callFunction
        store.setCallFunction(prev)
        navigation.navigate('AuthorizedUser')
    }

    return (
        <View style={{flex: 1, backgroundColor: 'black', alignItems: 'center'}}>
            {loading && 
            <Modal transparent={true} visible={loading}>
                <View style={{width: SCREEN_WIDTH * 0.3846, height: SCREEN_HEIGHT * 0.1184, position: 'absolute', top: SCREEN_HEIGHT * 0.438388, left: SCREEN_WIDTH * 0.30769, borderRadius: 20, justifyContent: 'center'}}>
                    <ActivityIndicator size='large' color="#949494"/>
                </View>
            </Modal>
            }
            <View style={styles.header}>
                <Text style={styles.headertext}>Редактировать биографию</Text>
                <TouchableOpacity style={styles.headertopacity} onPress={() => navigation.goBack()}>
                    <Image source={Arrow} style={{width: 14, height: 14}}/>
                </TouchableOpacity>
            </View>
            <Modal visible={errorModal} transparent={true} animationType='slide'>
                <View style={{alignItems: 'center', justifyContent: 'space-evenly', position: 'absolute', bottom: 0, backgroundColor: '#191919', width: SCREEN_WIDTH, height: 220, borderTopRightRadius: 40, borderTopLeftRadius: 40}}>
                    <Text style={{width: 'auto', height: 'auto', textAlign: 'center', color: 'white', fontSize: 20}}>{error}</Text>
                    <TouchableOpacity onPress={() => setErrorModal(false)} style={{backgroundColor: 'white', width: SCREEN_WIDTH * 0.91794872, height: SCREEN_HEIGHT * 0.066350710900, borderRadius: 200, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>Ок</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <Modal visible={modalCompleted} transparent={true} animationType='slide'>
                <View style={{position: 'absolute', backgroundColor: '#191919', width: SCREEN_WIDTH, bottom: 0, height: SCREEN_HEIGHT * 0.2035278154, alignItems: 'center', justifyContent: 'space-between', borderTopRightRadius: 40, borderTopLeftRadius: 40}}>
                    <Text style={{color: 'white', fontWeight: '400', fontSize: 22, marginTop: 20}}>Изменения внесены!</Text>
                    <TouchableOpacity onPress={() => CompleteAction()} style={{width: SCREEN_WIDTH * 0.917948, height: SCREEN_HEIGHT * 0.06635, backgroundColor: 'white', borderRadius: 200, marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: 'black', fontWeight: '500', fontSize: 16}}>Ок</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <View style={{width: SCREEN_WIDTH * 0.91794872, height: SCREEN_HEIGHT * 0.72821846, position: 'absolute', top: SCREEN_HEIGHT * 0.20142, left: SCREEN_WIDTH * 0.0410}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <TouchableHighlight>
                        <View style={{height: 'auto', width: SCREEN_WIDTH * 0.91794872, alignItems: 'center'}}>
                            <View style={{width: SCREEN_WIDTH * 0.91794872, height: 'auto'}}>
                                <TouchableOpacity style={styles.input} onPress={() => setModal(true)}>
                                    <Text style={styles.inputtext}>{newRelation? newRelation :'Кем для вас является?'}</Text>
                                    <Image source={ArrowDown} style={{width: 14, height: 14}}/>
                                </TouchableOpacity>
                            </View>
                            <Modal visible={modal} transparent={true} style={styles.modal} animationType='slide'>
                                <View style={styles.modalview}>
                                    <View style={styles.modalview2}></View>
                                    <View style={styles.modalview3}>
                                        <Text style={styles.modalview3text}>Кем для вас является?</Text>  
                                        <TextInput style={styles.modalview3textinput} placeholder="Выберите свой вариант" placeholderTextColor={"#949494"} onChangeText={(text) => setNewRelation(text)} />                                                                                  
                                    <View style={styles.modalview4}>
                                        <TouchableOpacity style={styles.chooserelative} onPress={() => setNewRelation('Дядя')}><Image source={newRelation === 'Дядя' ? buttonWhite : buttonBlack} style={{ width: 20, height: 20 }}/><Text style={styles.modalview4topacity}>Дядя</Text></TouchableOpacity>
                                        <TouchableOpacity style={styles.chooserelative} onPress={() => setNewRelation('Тетя')}><Image source={newRelation === 'Тетя' ? buttonWhite : buttonBlack} style={{ width: 20, height: 20 }}/><Text style={styles.modalview4topacity}>Тетя</Text></TouchableOpacity>
                                        <TouchableOpacity style={styles.chooserelative} onPress={() => setNewRelation('Мама')}><Image source={newRelation === 'Мама' ? buttonWhite : buttonBlack} style={{ width: 20, height: 20 }}/><Text style={styles.modalview4topacity}>Мама</Text></TouchableOpacity>
                                        <TouchableOpacity style={styles.chooserelative} onPress={() => setNewRelation('Папа')}><Image source={newRelation === 'Папа' ? buttonWhite : buttonBlack} style={{ width: 20, height: 20 }}/><Text style={styles.modalview4topacity}>Папа</Text></TouchableOpacity>
                                        <TouchableOpacity style={styles.chooserelative} onPress={() => setNewRelation('Брат')}><Image source={newRelation === 'Брат' ? buttonWhite : buttonBlack} style={{ width: 20, height: 20 }}/><Text style={styles.modalview4topacity}>Брат</Text></TouchableOpacity>
                                        <TouchableOpacity style={styles.chooserelative} onPress={() => setNewRelation('Сестра')}><Image source={newRelation === 'Сестра' ? buttonWhite : buttonBlack} style={{ width: 20, height: 20 }}/><Text style={styles.modalview4topacity}>Сестра</Text></TouchableOpacity>
                                    </View>
                                        <View style={styles.modalview5}>
                                            <TouchableOpacity style={styles.modalview5topacity} onPress={() => setModal(false)}><Text style={{color: '#0A0A0A', fontWeight: '500', fontSize: 16}}>Добавить</Text></TouchableOpacity>
                                            <TouchableOpacity style={styles.modalview5topacity2} onPress={() => setModal(false)}><Text style={{color: '#949494', fontWeight: '500', fontSize: 16}}>Отмена</Text></TouchableOpacity>
                                        </View>
                                    </View>                 
                                </View>
                            </Modal>
                            <View style={{width: SCREEN_WIDTH * 0.91794872, height: 'auto',  borderWidth: 1, borderColor: '#949494', borderStyle: 'solid', marginTop: 20, borderRadius: 20, marginBottom: 300 }}>
                                <TextInput placeholderTextColor='#949494' placeholder={newBiography.length === 0? 'Биография' : ''} maxLength={1000} keyboardAppearance='dark' onChangeText={(text) => setNewBiography(text)} style={{width: SCREEN_WIDTH * 0.91794872, height: 'auto', fontWeight: '400', fontSize: 16, letterSpacing: -1, color: '#949494', padding: 15}} multiline={true} textBreakStrategy='highQuality'>
                                    {newBiography}
                                </TextInput>
                            </View>
                        </View>
                    </TouchableHighlight>
                </ScrollView>
            </View>
            {biography !== newBiography || relation !== newRelation? <TouchableOpacity onPress={() => changeBiography()} style={{position: 'absolute', top: SCREEN_HEIGHT * 0.480404551, left: SCREEN_WIDTH * 0.041025, marginTop: SCREEN_HEIGHT * 0.4214963119072708, flexDirection: 'row', width: SCREEN_WIDTH * 0.91794872, height: SCREEN_HEIGHT * 0.066350710900, borderRadius: 200, backgroundColor: 'white', paddingHorizontal: 40, paddingVertical: 20, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{width: 122, height: 14, fontWeight: '500', fontSize: 16, lineHeight: 16, color: 'black', textAlign: 'center'}}>Сохранить</Text>
            </TouchableOpacity> : ''}
        </View>
    )
}
const styles = StyleSheet.create({
    headertopacity: {
        width: SCREEN_WIDTH * 0.1076, 
        height: SCREEN_HEIGHT * 0.04976, 
        borderRadius: 200, 
        padding: 14, 
        backgroundColor: '#191919', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    headertext: {
        color: 'white', 
        fontSize: 28, 
        width: SCREEN_WIDTH * 0.7025641, 
        height: 'auto', 
        lineHeight: 28,
        textAlign: 'center', 
        fontWeight: '400'
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
        height: SCREEN_HEIGHT * 0.33649289,
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    input: {
        width: SCREEN_WIDTH * 0.91282051,
        height: SCREEN_HEIGHT * 0.06635071,
        borderRadius: 200,
        backgroundColor: '#0A0A0A',
        borderWidth: 1, borderColor: '#191919', borderStyle: 'solid',
        padding: 15,
        color: 'white',
        fontWeight: '400',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    modal: {
        alignItems: 'center', 
        justifyContent: 'center'
    },
    inputtext: {
        color: '#949494', 
        fontSize: 16, 
        fontWeight: '400', 
        lineHeight: 18, 
        width: 'auto', 
        height: 'auto'
    },
    modalview: {
        width: SCREEN_WIDTH, 
        height: SCREEN_HEIGHT * 0.752369, 
        backgroundColor: "#0A0A0A", 
        borderRadius: 40,  
        alignItems: "center",
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.284360,
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
        height: SCREEN_HEIGHT * 0.509478, 
        marginTop: 10, 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.04739
    },
    modalview3text: {
        color: 'white', 
        fontSize: 26, 
        width: '', 
        height: 'auto', 
        lineHeight: 28, 
        textAlign: 'center'
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
        padding: 15, 
        color: 'white'
    },
    modalview4: {
        // borderColor: 'white', borderWidth: 1, borderStyle: 'solid',
        width: SCREEN_WIDTH * 0.9179, 
        height: SCREEN_HEIGHT * 0.37796209, 
        marginTop: 5, 
        justifyContent: 'space-between'
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
        padding: 10,
        justifyContent: 'space-between'
    },
    modalview4topacity: {
        color: 'white', 
        fontWeight: '500', 
        fontSize: 16, 
        lineHeight: 16
    },
    modalview5: {
        width: SCREEN_WIDTH * 0.9179, 
        height: SCREEN_HEIGHT * 0.06635071, 
        marginTop: 15, 
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
})

export default observer(EditBiographyDeadUser)