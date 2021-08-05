import React from 'react';
import {Image, StyleSheet, Dimensions} from 'react-native';

const win = Dimensions.get('window');

const Header = () => {
  return (
    <Image
      source={require('../assets/scovpass_namelogo.png')}
      style={style.header}
    />
  );
};

const style = StyleSheet.create({
  header: {
    flex: 0.1,
    width: win.width / 1.2,
    height: null,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

export default Header;
