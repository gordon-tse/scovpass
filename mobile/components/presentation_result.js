import React from 'react';
import Header from './header';
import Footer from './footer';
import Clipboard from '@react-native-community/clipboard';
import {
  Text,
  SafeAreaView,
  AppRegistry,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
} from 'react-native';

const win = Dimensions.get('window');

const PresentationResult = () => {
  const PrEx = '2021091321570000242521';
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header />
      <SafeAreaView
        style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
        <Text style={style.success}>Presentation success!</Text>
        <Text style={style.prex}>PrEx ID: {PrEx}</Text>
        <TouchableHighlight
          style={style.copyButton}
          underlayColor={'#f5f5f5'}
          onPress={() => Clipboard.setString(PrEx)}>
          <Text style={style.copyButtonText}>Copy PrEx</Text>
        </TouchableHighlight>
      </SafeAreaView>
      <Footer setting={false} />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  success: {
    fontSize: 22,
    fontWeight: '300',
    color: '#0f8df0',
    alignSelf: 'center',
  },

  prex: {
    margin: 10,
    fontSize: 18,
    fontWeight: '300',
    color: 'grey',
    alignSelf: 'center',
  },

  copyButton: {
    alignSelf: 'center',
    width: win.width / 3,
    backgroundColor: '#0f8df0',
    padding: 9,
    borderRadius: 20,
  },

  copyButtonText: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'white',
    fontWeight: '300',
  },
});

AppRegistry.registerComponent('mobile', () => PresentationResult);

export default PresentationResult;
