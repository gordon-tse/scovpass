import React from 'react';
import {
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const win = Dimensions.get('window');

const Create_wallet = () => {
  // const text = React.useState(null);
  // const number = React.useState(null);

  return (
    <SafeAreaView style={style.container}>
      <Image
        source={require('../assets/scovpass_namelogo.png')}
        style={style.frontLogo}
      />
      <SafeAreaView style={style.inputSection}>
        <Text style={style.loginText}>Create your own wallet</Text>
        <TextInput style={style.input} placeholder="set your wallet name" />
        <TextInput
          style={style.input}
          placeholder="set your passcode"
          keyboardType="number-pad"
          secureTextEntry={true}
        />
        <TextInput
          style={style.input}
          placeholder="type your passcode once again"
          keyboardType="number-pad"
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={style.button}
          onPress={() => Alert.alert('Routing to be implemented')}>
          <Text style={style.buttonText}>Start receiving passes</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  frontLogo: {
    flex: 3,
    width: win.width / 1.2,
    height: null,
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  inputSection: {
    flex: 2,
    alignContent: 'center',
    justifyContent: 'center',
    padding: 15,
  },

  loginText: {
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

export default Create_wallet;
