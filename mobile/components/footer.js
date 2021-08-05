import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';

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
        <Text style={style.settingCaption}>Manage</Text>
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
    justifyContent: 'flex-end'
  },

  settingIcon: {
    resizeMode: 'contain',
    height: win.height / 30,
    alignSelf: 'center',
  },

  settingCaption: {
    fontSize: 15,
    fontWeight: '200',
    alignSelf: 'center'
  }
});

export default Footer;
