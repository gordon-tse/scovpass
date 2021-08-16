import React, {Component} from 'react';
import {View, Image, StyleSheet, Dimensions, AppRegistry} from 'react-native';
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
        this.props.navigation.navigate('CreateWallet');
      } else {
        this.props.navigation.navigate('LoginScreen');
      }
    }, 2000);
  }

  render() {
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'white',
        }}>
        <Image
          source={require('../assets/scovpass_namelogo.png')}
          style={style.logo}
        />
      </View>
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
