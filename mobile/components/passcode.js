import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  AppRegistry,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ArnimaSDK from 'react-native-arnima-sdk';

import Header from '../components/header';
import Footer from '../components/footer';
import GetVerified from './get_verified';
import Spinner from 'react-native-loading-spinner-overlay';

const win = Dimensions.get('window');
const initState = {
  loading: false,
  verifier: null,
  cred: null,
  passcode: null,
};

class Passcode extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
    this.state = props.route.params;
  }

  componentDidMount = () => {};

  state = {
    loading: Boolean,
    verifier: URL,
    cred: Object,
    passcode: Number,
  };

  authenticate = async () => {
    const wallet = await ArnimaSDK.getWallet();
    const passcode = JSON.parse(wallet.walletCredentials);
    if (passcode.key === this.state.passcode) {
      this.props.navigation.navigate('getverified', {
        verifier: this.state.verifier,
        cred: this.state.cred,
        useDummy: this.props.route.params.useDummy,
      });
    } else {
      Alert.alert('Incorrect passcode');
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
          <Header />
          <SafeAreaView style={style.subcontainer}>
            <Text style={style.instructionText}>
              Confirm as the holder again
            </Text>
            <TextInput
              style={style.input}
              placeholder="your passcode"
              keyboardType="number-pad"
              secureTextEntry={true}
              onChangeText={input => this.setState({passcode: input})}
            />
            <TouchableOpacity
              style={style.button}
              onPress={() => this.authenticate()}>
              <Text style={style.buttonText}>Present to this verifier</Text>
            </TouchableOpacity>
          </SafeAreaView>
          <Footer />
        </SafeAreaView>
      );
    }
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
