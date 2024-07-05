import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import Vector from '../icons/angle-left.png'
import Link from '../icons/link-alt.png'

const windows = Dimensions.get('window')
const SCREEN_WIDTH = windows.width
const SCREEN_HEIGHT = windows.height

export default function QrScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState()
  const navigation = useNavigation()

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  function followTheLink(data) {
    setScanned(false)
    const parsedData = JSON.parse(data)
    navigation.navigate('deaduser2', {parsedData})
  } 

  const handleBarCodeScanned = ({ data }) => {
    if (JSON.parse(data).length === 12) {
      setScanned(true);
      setData(data)
    } else {
      return
    }
  };

  if (hasPermission === null) {
    return  <View style={{flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{color: '#949494', fontSize: 16, fontWeight: '500', width: 'auto', height: 'auto'}}></Text>
          </View>
  }
  if (hasPermission === false) {
    return <View style={{flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{color: '#949494', fontSize: 16, fontWeight: '500', width: 'auto', height: 'auto'}}>Необходимо предоставить разрешение</Text>
          </View>
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        style={StyleSheet.absoluteFillObject}
      />
       <TouchableOpacity style={{width: SCREEN_WIDTH * 0.1076, height: SCREEN_HEIGHT * 0.04976, backgroundColor: 'transparent', position: 'absolute', top: 64, left: 16, borderRadius: 200, borderWidth: 1, borderColor: 'white', borderStyle: 'solid', justifyContent: 'center', alignItems: 'center'}} onPress={() => navigation.navigate('AuthorizedUser')}>
            <Image source={Vector} style={{width: 14, height: 14, tintColor: 'white'}}/>  
      </TouchableOpacity>
      <View style={{width: SCREEN_WIDTH * 0.9179, height: SCREEN_HEIGHT * 0.7180, top: 146, left: 16, position: 'absolute'}}>
        {scanned === true? (
          <TouchableOpacity onPress={() => followTheLink(data)} style={{width: SCREEN_WIDTH * 0.6795, height: 56, top: 275, left: 47, borderRadius: 200, position: 'absolute', backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Image source={Link} style={{width: 16, height: 16}}/> 
              <Text style={{width: 70, height: 16, fontWeight: '500', fontSize: 16, lineHeight: 17 ,textAlign: 'center', marginLeft: 5}}>Открыть</Text>
          </TouchableOpacity>
        ): ''}
        <View style={{borderColor: 'white', borderStyle: 'solid', position: 'absolute', height: 60, width: 60, right: 0, borderRightWidth: 1, borderTopWidth: 1}} />
        <View style={{borderColor: 'white', borderStyle: 'solid', position: 'absolute', height: 60, width: 60, bottom: 0, right: 0, borderRightWidth: 1, borderBottomWidth: 1}} />
        <View style={{borderColor: 'white', borderStyle: 'solid', position: 'absolute', height: 60, width: 60, bottom: 0, borderLeftWidth: 1, borderBottomWidth: 1}} />
        <View style={{borderColor: 'white', borderStyle: 'solid', position: 'absolute', height: 60, width: 60, borderTopWidth: 1, borderLeftWidth: 1}} />
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: 'black',
    alignItems: "center"
  },
});