import AuthMain from './components/auth/AuthMain'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs, CardStyleInterpolators } from '@react-navigation/stack';
import { TouchableWithoutFeedback, Keyboard, View, Text, ActivityIndicator } from 'react-native';
import Verification from './components/auth/Verifications';
import AuthCreatepassword from './components/auth/AuthCreatePassword';
import Navbar from './components/navbar/Navbar';
import AddRelative from './components/home/AddRelative';
import Map from './components/maps/Map';
import QrScanner from './components/qrcode/Camera';
import Notifications from './components/notifications/Notifications';
import AddCard from './components/userprofile/AddCard';
import Cards from './components/userprofile/Cards';
import VerifyCard from './components/userprofile/VerifyCard';
import Service from './components/services/Service';
import ServiceDetails from './components/services/ServiceDetails';
import ServiceChoice from './components/services/ServiceChoice';
import EditInfo from './components/userprofile/EditProfile';
import DeadUserProfile from './components/home/DeadUserProfile';
import Gallery from './components/gallery/Gallery';
import GalleryFlatlist from './components/gallery/GalleryFlatlist';
import BannerDescription from './components/home/BannerDescription';
import BannerDescription2 from './components/home/BannerDescription2';
import ChatScreen from './components/chat/Chat';
import DeadUser2 from './components/qrcode/DeadUser2';
import MapAddDeadUser from './components/home/MapAddDeadUser';
import EditBiographyDeadUser from './components/home/EditBiographyDeadUser';
import MapDeadUser from './components/home/MapDeadUser';
import OrderDetails from './components/orders/OrderDetails';
import ServicePay from './components/services/ServicePay';
import ResetPassword from './components/auth/AuthReset';
import ResetVerification from './components/auth/AuthResetVerification';
import ChangePassword from './components/auth/AuthResetPassword';
import Preview from './components/auth/Preview';
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';
import store from './components/store/store';
import { observer } from 'mobx-react-lite';

const Stack = createStackNavigator();

function App() {

  NavigationBar.setBackgroundColorAsync('#0A0A0A')
  NavigationBar.setButtonStyleAsync('light')
  NavigationBar.setBorderColorAsync('#0A0A0A')

  if (store.loading) {
    return (
      <View style={{flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: 'white', fontSize: 30, fontWeight: '500', position: 'absolute', top: '30%'}}>MEMORYKEEPER</Text>
        <ActivityIndicator size="large" color="#949494" style={{position: 'absolute', top: '50%'}}/>
      </View>
    );
  }

  const MyTransition = {
    gestureDirection: 'horizontal',
    transitionSpec: {
      open: TransitionSpecs.TransitionIOSSpec,
      close: TransitionSpecs.TransitionIOSSpec,
    },
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1}}>
            <NavigationContainer>
              <StatusBar style='light'/>
              <Stack.Navigator screenOptions={{headerShown: false, ...MyTransition}}>
                  {store.token === null ? (
                    <>
                    <Stack.Screen name="Preview" component={Preview}/>
                    <Stack.Screen name="Home" component={AuthMain}/>
                    <Stack.Screen name='CreatePassword' component={AuthCreatepassword}/>
                    <Stack.Screen name="Verification" component={Verification}/>
                    <Stack.Screen name='ResetPassword' component={ResetPassword}/>
                    <Stack.Screen name='ResetVerification' component={ResetVerification}/>
                    <Stack.Screen name='ChangePassword' component={ChangePassword}/>
                    </>
                    ) : (
                    <Stack.Screen name="AuthorizedUser" component={Navbar}/>
                  )}
                  <Stack.Screen name='AddRelative' component={AddRelative}/>
                  <Stack.Screen name='Map' component={Map}/>
                  <Stack.Screen name='QrScanner' component={QrScanner} options={{animationEnabled: false}}/>
                  <Stack.Screen name='Notifications' component={Notifications}/>
                  <Stack.Screen name='AddCard' component={AddCard}/>
                  <Stack.Screen name='Cards' component={Cards}/>
                  <Stack.Screen name='VerifyCard' component={VerifyCard}/>
                  <Stack.Screen name='Service' component={Service}/>
                  <Stack.Screen name='ServiceDetails' component={ServiceDetails}/>
                  <Stack.Screen name='ServiceChoice' component={ServiceChoice}/>
                  <Stack.Screen name='EditInfo' component={EditInfo}/>
                  <Stack.Screen name='DeadUserProfile' component={DeadUserProfile}/>
                  <Stack.Screen name='Gallery' component={Gallery}/>
                  <Stack.Screen name='GalleryFlatlist' component={GalleryFlatlist}/>
                  <Stack.Screen name='BannerDescription' component={BannerDescription}/>
                  <Stack.Screen name='BannerDescription2' component={BannerDescription2}/>
                  <Stack.Screen name='Chat' component={ChatScreen}/>
                  <Stack.Screen name='deaduser2' component={DeadUser2}/>
                  <Stack.Screen name='OrderDetails' component={OrderDetails}/>
                  <Stack.Screen name='MapDeadUser' component={MapDeadUser}/>
                  <Stack.Screen name='EditBiographyDeadUser' component={EditBiographyDeadUser}/>
                  <Stack.Screen name='MapAddDeadUser' component={MapAddDeadUser}/>
                  <Stack.Screen name='ServicePay' component={ServicePay}/>
              </Stack.Navigator>
            </NavigationContainer>
        </View>    
      </TouchableWithoutFeedback>
  )
}

export default observer(App)