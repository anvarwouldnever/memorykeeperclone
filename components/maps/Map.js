import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import {PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Pin from '../icons/Frame 73.png'
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import Store from '../store/store';
import MapView from 'react-native-maps'
import Arrow from '../icons/angle-left (3).png'

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

function MapComponent() {
  const [markerCoords, setMarkerCoords] = useState({
    latitude: 41.310755089378624,
    longitude: 69.27987632682043,
  });
  const navigation = useNavigation();

  const handleRegionChange = (region) => {
    setMarkerCoords({
      latitude: region.latitude,
      longitude: region.longitude,
    });
  };

  const GoBackWithLocation = (markerCoords) => {   
    try {
      Store.setLocation(markerCoords)
      console.log(markerCoords)
      navigation.goBack()
    } catch (error) {
      console.log(error)
    }    
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
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
          coordinate={markerCoords}
          draggable={true}
        >
            <Image 
                source={Pin}
                style={{width: 40, height: 40}}
            />
        </Marker>
      </MapView>
            <TouchableOpacity style={{width: SCREEN_WIDTH * 0.1076, height: SCREEN_HEIGHT * 0.04976, position: 'absolute', top: SCREEN_HEIGHT * 0.08412, left: SCREEN_WIDTH * 0.041025, backgroundColor: 'black', borderRadius: 200, justifyContent: 'center', alignItems: 'center'}} onPress={() => navigation.goBack()}>
                <Image source={Arrow} style={{width: 14, height: 14}}/>
            </TouchableOpacity>
            <TouchableOpacity  style={{width: SCREEN_WIDTH * 0.917948, height: SCREEN_HEIGHT * 0.06635, borderRadius: 200, position: 'absolute', bottom: 25, left: SCREEN_WIDTH * 0.041025, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}} onPress={() => GoBackWithLocation(markerCoords)}>
                <Text style={{color: 'white', textAlign: 'center', fontWeight: '500', fontSize: 16}}>Выбрать</Text>
            </TouchableOpacity>
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

export default observer(MapComponent);