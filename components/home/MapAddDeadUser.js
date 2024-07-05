import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, Modal, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Pin from '../icons/Frame 73.png'
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import store from '../store/store';
import axios from 'axios';
import Arrow from '../icons/angle-left (3).png'

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

function MapAddDeadUser({ route }) {
  const [location, setlocation] = useState({
    latitude: 41.310755089378624,
    longitude: 69.27987632682043,
  });
  const [modal, setModal] = useState(false)
  const [error, setError] = useState('Для внесения изменений требуется подключение к интернету')
  const navigation = useNavigation();
  const [modalCompleted, setModalCompleted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleRegionChange = (region) => {
    setlocation({
      latitude: region.latitude,
      longitude: region.longitude,
    });
  };

const GoBackWithLocation = async() => {   
    try {
        setLoading(true)
        await axios.post('https://memorykeeper-backend-89433124d8be.herokuapp.com/api/changelocation', {id: route.params.id, location: location})
        setModalCompleted(true)
    } catch (error) {
      console.log(error)
    } finally {
        setLoading(false)
    }
}

function CompleteAction() {
    const prev = !store.callFunction
    store.setCallFunction(prev)
    setModalCompleted(false)
    navigation.navigate('AuthorizedUser')
}

  return (
    <View style={styles.container}>
      <Modal visible={modal} transparent={true} animationType='slide'>
                <View style={{alignItems: 'center', justifyContent: 'space-evenly', position: 'absolute', bottom: 0, backgroundColor: '#191919', width: SCREEN_WIDTH, height: 220, borderTopRightRadius: 40, borderTopLeftRadius: 40}}>
                    <Text style={{width: 358, height: 'auto', textAlign: 'center', color: 'white', fontSize: 20}}>{error}</Text>
                    <TouchableOpacity onPress={() => setModal(false)} style={{backgroundColor: 'white', width: 358, height: 56, borderRadius: 200, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>Ок</Text>
                    </TouchableOpacity>
                </View>
      </Modal>
      <Modal visible={modalCompleted} transparent={true} animationType='slide'>
            <View style={{position: 'absolute', backgroundColor: '#191919', width: SCREEN_WIDTH, bottom: 0, height: SCREEN_HEIGHT * 0.2035278154, alignItems: 'center', justifyContent: 'space-between', borderTopRightRadius: 40, borderTopLeftRadius: 40}}>
                <Text style={{color: 'white', fontWeight: '400', fontSize: 22, marginTop: 20}}>Вы добавили местоположение!</Text>
                <TouchableOpacity onPress={() => CompleteAction()} style={{width: SCREEN_WIDTH * 0.917948, height: SCREEN_HEIGHT * 0.06635, backgroundColor: 'white', borderRadius: 200, marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'black', fontWeight: '500', fontSize: 16}}>Ок</Text>
                </TouchableOpacity>
            </View>
      </Modal>
      <MapView
        style={styles.map}
        region={{
          latitude: 41.310755089378624,
          longitude: 69.27987632682043,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onRegionChange={handleRegionChange}
      >
        <Marker
          coordinate={location}
          draggable={true}
        >
            <Image 
                source={Pin}
                style={{width: 40, height: 40}}
            />
        </Marker>
      </MapView>
            <TouchableOpacity style={{width: SCREEN_WIDTH * 0.1076, height: SCREEN_HEIGHT * 0.04976, position: 'absolute', top: SCREEN_HEIGHT * 0.08412, left: SCREEN_WIDTH * 0.041025, backgroundColor: 'black', borderRadius: 200, justifyContent: 'center', alignItems: 'center'}} onPress={() => navigation.goBack()}>
            <Image style={{width: 14, height: 14}} source={Arrow}/>
            </TouchableOpacity>
            <TouchableOpacity  style={{width: SCREEN_WIDTH * 0.917948, height: SCREEN_HEIGHT * 0.06635, borderRadius: 200, position: 'absolute', top: SCREEN_HEIGHT * 0.886255, left: SCREEN_WIDTH * 0.041025, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}} onPress={() => GoBackWithLocation(location)}>
                <Text style={{color: 'white', textAlign: 'center', fontWeight: '500', fontSize: 16}}>Выбрать</Text>
            </TouchableOpacity>
            {loading && <ActivityIndicator size='large' color="#949494" style={{position: 'absolute', top: '50%', left: '45%'}}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    color: 'gray'
  },
});

export default observer(MapAddDeadUser);