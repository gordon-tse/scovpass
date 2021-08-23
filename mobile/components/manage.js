import React, {Component} from 'react';
import {
  AppRegistry,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import ArnimaSDK from 'react-native-arnima-sdk/';
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-community/clipboard';

import Header from './header';

const win = Dimensions.get('window');

class Manage extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.state = {
      wallet: Object,
      useDummy: props.route.params.useDummy,
      qrvalue: String,
    };
  }

  componentDidMount() {
    // this.setState({useDummy: this.props.useDummy});
    this.getWalletInfo();
    this.create2DBarcode();
  }

  getWalletInfo = async () => {
    const wallet = await ArnimaSDK.getWallet();
    this.setState({wallet: wallet});
  };

  create2DBarcode = async () => {
    const url = await ArnimaSDK.createInvitation({}).catch(e => console.log(e));
    this.state.useDummy
      ? this.setState({qrvalue: 'https://dummyInvitation.url'})
      : this.setState({qrvalue: url});
  };

  setClipboard = () => {
    Clipboard.setString(this.state.qrvalue);
  };

  render() {
    return (
      <SafeAreaView style={style.container}>
        <Header />
        <View style={style.subContainer}>
          <Text style={style.subHeading}>Wallet Information</Text>
          <View style={style.row}>
            <Text style={style.key}>Name</Text>
            <Text style={style.value}>{this.state.wallet.label}</Text>
          </View>
          <View style={style.row}>
            <Text style={style.key}>Public Did</Text>
            <Text style={style.value}>{this.state.wallet.publicDid}</Text>
          </View>
          <Text style={style.subHeading}>Receive credentials</Text>
          <View style={style.row}>
            <Text style={style.value}>Show the 2D barcode to an issuer</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <QRCode
              size={300}
              value="https://dummyInvitation.url"
              quietZone={20}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <TouchableHighlight
              style={style.copyButton}
              underlayColor={'#f5f5f5'}
              onPress={() => this.setClipboard()}>
              <Text style={style.copyButtonText}>Copy invitation</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={{alignContent: 'flex-end'}}>
          <TouchableOpacity style={style.button} onPress={() => console.log()}>
            <Text style={style.buttonText}>Check for new credentials</Text>
          </TouchableOpacity>
        </View>
        <View style={style.backButton}>
          <TouchableOpacity onPress={() => this.navigation.navigate('wallet')}>
            <Image
              source={require('../assets/backbutton.png')}
              style={style.settingIcon}
            />
            <Text style={style.backButtonText}>Back To Wallet</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  subContainer: {
    flex: 1,
    padding: 10,
  },

  subHeading: {
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 20,
    fontSize: 20,
    fontWeight: '400',
  },

  row: {
    marginLeft: 10,
    marginTop: 2,
    marginBottom: 2,
    flexDirection: 'row',
  },

  key: {
    flex: 1,
    fontSize: 18,
    fontWeight: '300',
  },

  value: {
    flex: 3,
    fontSize: 18,
    fontWeight: '200',
  },

  copyButton: {
    backgroundColor: '#0f8df0',
    padding: 9,
    borderRadius: 20,
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

  copyButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '300',
  },

  buttonText: {
    fontSize: 18,
    fontWeight: '300',
    color: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
  },

  settingIcon: {
    margin: 10,
    resizeMode: 'contain',
    height: win.height / 40,
    alignSelf: 'center',
  },

  backButton: {
    flex: 0.1,
    alignContent: 'center',
    justifyContent: 'flex-end',
  },

  backButtonText: {
    fontSize: 15,
    fontWeight: '200',
    alignSelf: 'center',
  },
});

AppRegistry.registerComponent('mobile', () => Manage);

export default Manage;
