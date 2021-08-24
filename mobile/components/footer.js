import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
} from 'react-native';

const win = Dimensions.get('window');

const Footer = props => {
  const navigation = useNavigation();
  return (
    <View style={style.footer}>
      <TouchableOpacity
        onPress={() =>
          props.setting
            ? navigation.navigate('manage', {useDummy: props.useDummy})
            : navigation.navigate('wallet')
        }>
        <Image
          source={
            props.setting
              ? require('../assets/setting.png')
              : require('../assets/backbutton.png')
          }
          style={props.setting ? style.settingIcon : style.backIcon}
        />
        <Text style={style.cation}>
          {props.setting ? 'Manage' : 'Back to wallet'}
        </Text>
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
    justifyContent: 'flex-end',
  },

  settingIcon: {
    resizeMode: 'contain',
    height: win.height / 30,
    alignSelf: 'center',
  },

  backIcon: {
    margin: 10,
    resizeMode: 'contain',
    height: win.height / 45,
    alignSelf: 'center',
  },

  cation: {
    fontSize: 15,
    fontWeight: '200',
    alignSelf: 'center',
  },
});

export default Footer;
