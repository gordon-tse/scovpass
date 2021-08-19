import React, {Component} from 'react';
import {
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Alert,
  TextInput,
  TouchableOpacity,
  AppRegistry,
  BackHandler,
} from 'react-native';
import ArnimaSDK from 'react-native-arnima-sdk';
import Spinner from 'react-native-loading-spinner-overlay';

const win = Dimensions.get('window');

const initState = {
  name: null,
  passcode1: null,
  passcode2: null,
  loading: false,
};

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
    this.createWallet = this.createWallet.bind(this);
  }

  state = {
    name: String,
    passcode1: Number,
    passcode2: Number,
    loading: Boolean,
  };

  setEntryState = (entry, input) => {
    if (entry == 'name') {
      this.state.name = input;
    } else if (entry == 'init') {
      this.state.passcode1 = input;
    } else if ((entry = 'confirm')) {
      this.state.passcode2 = input;
    }
  };

  matchedPasscode = () => {
    return this.state.passcode1 == this.state.passcode2;
  };

  createWallet = async () => {
    if (this.state.name && this.state.passcode1) {
      if (this.matchedPasscode()) {
        this.setState({loading: true});
        let wallet = await ArnimaSDK.createWallet(
          {id: this.state.name},
          {key: this.state.passcode1},
          this.state.name,
        ).then(this.setState({load: false}));
        console.log(wallet);
        this.props.navigation.navigate('Main');
      } else {
        Alert.alert('Passcodes do not match');
      }
    } else {
      Alert.alert('Please set a name and a passcode');
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <Spinner
          cancelable={false}
          color="#0f8df0"
          visible={this.state.loading}
        />
      );
    } else {
      return (
        <SafeAreaView style={style.container}>
          <Image
            source={require('../assets/scovpass_namelogo.png')}
            style={style.frontLogo}
          />
          <SafeAreaView style={style.inputSection}>
            <Text style={style.loginText}>Create your own wallet</Text>
            <TextInput
              style={style.input}
              placeholder="set your wallet name"
              autoCapitalize="characters"
              onChangeText={input => this.setEntryState('name', input)}
            />
            <TextInput
              style={style.input}
              placeholder="set your passcode"
              keyboardType="number-pad"
              secureTextEntry={true}
              onChangeText={input => this.setEntryState('init', input)}
            />
            <TextInput
              style={style.input}
              placeholder="type your passcode once again"
              keyboardType="number-pad"
              secureTextEntry={true}
              onChangeText={input => this.setEntryState('check', input)}
            />
            <TouchableOpacity
              style={style.button}
              onPress={() => {
                this.createWallet();
              }}>
              <Text style={style.buttonText}>Start receiving passes</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </SafeAreaView>
      );
    }
  }
}

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
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

  warningText: {
    fontSize: 12,
    fontWeight: '300',
    color: 'red',
    alignSelf: 'center',
  },
});

AppRegistry.registerComponent('mobile', () => Create);

export default Create;
