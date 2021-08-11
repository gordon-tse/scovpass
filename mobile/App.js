import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ArnimaSDK from 'react-native-arnima-sdk';
import {
  AppState,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Splash from './components/splash';
import Create from './components/create_wallet';
import Login from './components/login';
import Wallet from './components/wallet';
import Present from './components/present';
import Passcode from './components/passcode';

const Stack = createStackNavigator();

class App extends Component {
  render() {
     return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: {backgroundColor: 'white'},
          }}>
          {/* <Stack.Screen name="passcode" component={Passcode} /> */}
          <Stack.Screen name="splash" component={Splash} />
          <Stack.Screen name="create" component={Create} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="wallet" component={Wallet} />
          <Stack.Screen name="present" component={Present} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
