import React, {Component} from 'react';
import {Image, StyleSheet, Dimensions, AppRegistry} from 'react-native';
import ArnimaSDK from 'react-native-arnima-sdk';

const win = Dimensions.get('window');

class Splash extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(async () => {
      const wallet = await ArnimaSDK.getWallet();
      if (!wallet) {
        this.props.navigation.navigate('create');
      } else {
        this.props.navigation.navigate('login');
      }
    }, 2500);
  }

  render() {
    return (
      <Image
        source={require('../assets/scovpass_namelogo.png')}
        style={style.logo}
      />
    );
  }
}

const style = StyleSheet.create({
  logo: {
    flex: 1,
    width: win.width / 1.2,
    height: null,
    resizeMode: 'contain',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent('mobile', () => Splash);

export default Splash;
