import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  AppRegistry,
  TouchableOpacity,
  Text,
} from 'react-native';

import Header from '../components/header';
import Footer from '../components/footer';
import QRCodeScanner from 'react-native-qrcode-scanner';

const win = Dimensions.get('window');
const dummyInvitation = 'https://dummyinvitation.com';

class Present extends Component {
  constructor(props) {
    super(props);
    this.onSuccess = this.onSuccess.bind(this);
  }

  state = {
    invitation: URL,
    cred: Object,
  };

  // For overriding with dummy
  componentDidMount = () => {
    if (this.props.route.params.useDummy) {
      setTimeout(() => {
        this.onSuccess(dummyInvitation);
      }, 1500);
    }
  };

  onSuccess = invitation => {
    this.props.navigation.navigate('passcode', {
      verifier: invitation,
      cred: this.props.route.params.cred,
      useDummy: this.props.route.params.useDummy,
    });
  };

  render() {
    return (
      <SafeAreaView style={style.container}>
        <Header style={style.header}></Header>
        <SafeAreaView style={style.subcontainer}>
          <QRCodeScanner
            onRead={this.onSuccess}
            fadeIn={true}
            topContent={
              <Text style={style.topText}>
                Scan a QR code to connect with a verifier
              </Text>
            }
          />
          <TouchableOpacity
            style={style.cancelButton}
            onPress={() => this.props.navigation.goBack()}>
            <Text style={style.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </SafeAreaView>
        <Footer setting={false} />
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
    justifyContent: 'center',
  },

  header: {
    width: win.width / 1.2,
    height: null,
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  cancelButton: {
    margin: 15,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },

  cancelButtonText: {
    fontSize: 20,
    fontWeight: '300',
    color: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
  },

  topText: {
    fontSize: 18,
    fontWeight: '300',
    padding: 15,
    color: 'grey',
  },
});

AppRegistry.registerComponent('mobile', () => Present);

export default Present;
