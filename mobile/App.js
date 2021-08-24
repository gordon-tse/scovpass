import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import ArnimaSDK from 'react-native-arnima-sdk';

import Splash from './components/splash';
import Create from './components/create_wallet';
import Login from './components/login';
import Wallet from './components/wallet';
import Present from './components/present';
import Passcode from './components/passcode';
import PresentationResult from './components/presentation_result';
import GetVerified from './components/get_verified';
import Manage from './components/manage';
import FetchCredential from './components/fetch_credential';

const Stack = createStackNavigator();

class AppStack extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: {backgroundColor: 'white'},
          }}>
          <Stack.Screen name="wallet" component={Wallet} />
          <Stack.Screen name="manage" component={Manage} />
          <Stack.Screen name="fetchcreds" component={FetchCredential} />
          <Stack.Screen name="present" component={Present} />
          <Stack.Screen name="passcode" component={Passcode} />
          <Stack.Screen name="getverified" component={GetVerified} />
          <Stack.Screen name="result" component={PresentationResult} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const AuthNavigator = createSwitchNavigator({
  SplashScreen: Splash,
  LoginScreen: Login,
  CreateWallet: Create,
  Main: AppStack,
});

const App = createAppContainer(AuthNavigator);

export default App;
