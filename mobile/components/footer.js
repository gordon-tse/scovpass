import React from 'react';
import {Image, StyleSheet, Dimensions, View, TouchableOpacity, Alert} from 'react-native';

const win = Dimensions.get('window');

const Footer = () => {
  return (
    <View style={style.footer}>
      <TouchableOpacity
        onPress={() => Alert.alert('Routing to be implemented')}>
        <Image
          source={require('../assets/setting.png')}
          style={style.settingIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  footer: {
    flex: 0.1,
    padding: 5,
    flexDirection: 'column',
    alignContent: 'center',
  },

  settingIcon: {
    resizeMode: 'contain',
    height: win.height / 20,
    alignSelf: 'center',
  },
});

export default Footer;
