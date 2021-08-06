import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  AppRegistry,
} from 'react-native';

import Swiper from 'react-native-swiper';

import Header from '../components/header';
import Footer from '../components/footer';
import Credential from '../components/credential';
import Option from '../components/option';

const win = Dimensions.get('window');

class Wallet extends Component {
  render() {
    return (
      <SafeAreaView style={style.container}>
        <Header style={style.header}></Header>
        <SafeAreaView style={style.subcontainer}>
          <View style={{flex: 0.3}}></View>
          <Swiper style={style.swipeView}>
            <Credential></Credential>
            <Credential></Credential>
          </Swiper>
          <Option></Option>
        </SafeAreaView>
        <Footer />
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

  swipeView: {
    alignContent: 'center',
  },
});

AppRegistry.registerComponent('mobile', () => Wallet);

export default Wallet;
