import React from 'react';
import Header from './header';
import Footer from './footer';
import {Text, SafeAreaView, AppRegistry} from 'react-native';

const PresentationResult = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header />
      <SafeAreaView
        style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: '300',
            color: '#0f8df0',
            alignSelf: 'center',
          }}>
          Presentation success!
        </Text>
      </SafeAreaView>
      <Footer />
    </SafeAreaView>
  );
};

AppRegistry.registerComponent('mobile', () => PresentationResult);

export default PresentationResult;
