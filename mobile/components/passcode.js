import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  AppRegistry,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Swiper from 'react-native-swiper';

import Header from '../components/header';
import Footer from '../components/footer';
import Credential from '../components/credential';
import Option from '../components/option';

const win = Dimensions.get('window');

class Passcode extends Component {
  render() {
    return (
      <SafeAreaView style={style.container}>
        <Header />
        <SafeAreaView style={style.subcontainer}>
          <Text style={style.instructionText}>Confirm as the holder again</Text>
          <TextInput
            style={style.input}
            placeholder="your passcode"
            keyboardType="number-pad"
            secureTextEntry={true}
          />
          <TouchableOpacity
            style={style.button}
            onPress={() => Alert.alert('Routing to be implemented')}>
            <Text style={style.buttonText}>Present to this verifier</Text>
          </TouchableOpacity>
        </SafeAreaView>
        <Footer />
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  subcontainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 15,
    justifyContent: 'flex-end',
    alignContent: 'center',
  },

  instructionText: {
    fontSize: 22,
    fontWeight: '300',
    color: 'grey',
    alignSelf: 'center',
    padding: 10,
  },

  input: {
    width: win.width / 1.2,
    height: 40,
    margin: 5,
    borderWidth: 0.5,
    padding: 10,
    fontSize: 18,
    fontWeight: '200',
    alignSelf: 'center',
    borderColor: 'grey',
  },

  button: {
    width: win.width / 1.2,
    height: 42,
    margin: 10,
    padding: 10,
    alignSelf: 'center',
    backgroundColor: '#0f8df0',
    borderRadius: 5,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: '300',
    color: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent('mobile', () => Passcode);

export default Passcode;
