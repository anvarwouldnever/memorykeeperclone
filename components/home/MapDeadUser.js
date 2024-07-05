import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, Modal, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Pin from '../icons/Frame 73.png';
import Pen from '../icons/pen (2).png';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import store from '../store/store';
import Arrow from '../icons/angle-left (3).png'

const windows = Dimensions.get('window');
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

export default function MapDeadUser({ route }) {
  const [location, setlocation] = useState({
    latitude: route.params.latitude,
    longitude: route.params.longitude,
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
        const response = await axios.post('https://memorykeeper-backend-89433124d8be.herokuapp.com/api/changelocation', {id: route.params.id, location: location})
        if (response.status === 200) {
          setModalCompleted(true)
        } else if(response.status === 500) {
          setError('Произошла непредвиденная ошибка при изменении данных, приносим извинения за причиненные неудобства')
        }
    } catch (error) {
      if (error.request || error.code) {
        setModal(true)
      } else {
        console.log(error)
        setErrorModal(true)
      }
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
                <Text style={{color: 'white', fontWeight: '400', fontSize: 22, marginTop: 20}}>Вы изменили местоположение!</Text>
                <TouchableOpacity onPress={() => CompleteAction()} style={{width: SCREEN_WIDTH * 0.917948, height: SCREEN_HEIGHT * 0.06635, backgroundColor: 'white', borderRadius: 200, marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'black', fontWeight: '500', fontSize: 16}}>Ок</Text>
                </TouchableOpacity>
            </View>
      </Modal>
      <MapView
        style={styles.map}
        region={{
          latitude: route.params.latitude,
          longitude: route.params.longitude,
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
            {route.params.latitude != location.latitude && route.params.longitude != location.longitude? <TouchableOpacity  style={{flexDirection: 'row', width: SCREEN_WIDTH * 0.917948, height: SCREEN_HEIGHT * 0.06635, borderRadius: 200, position: 'absolute', bottom: 20, left: SCREEN_WIDTH * 0.041025, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}} onPress={() => GoBackWithLocation(location)}>
                <Image source={Pen} style={{width: 16, height: 16, marginRight: 7}}/>
                <Text style={{color: 'white', textAlign: 'center', fontWeight: '500', fontSize: 16}}>Изменить</Text>
            </TouchableOpacity> : ''}
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