import React, {Component} from 'react';
import {View, SafeAreaView, StyleSheet, AppRegistry} from 'react-native';
import ArnimaSDK from 'react-native-arnima-sdk';
import Swiper from 'react-native-swiper';
import Spinner from 'react-native-loading-spinner-overlay';

import Header from '../components/header';
import Footer from '../components/footer';
import Credential from '../components/credential';
import Option from '../components/option';
import dummyCreds from '../assets/dummyCred';

const useDummy = true;

const initState = {
  loading: true,
  credList: [],
  thumbnailDisplay: [],
  currentCred: 0,
};

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }

  state = {
    loading: Boolean,
    credList: Array,
    thumbnailDisplay: Array,
    currentCred: Number,
  };

  componentDidMount() {
    this.retrieveCredentials().then(() => this.setState({loading: false}));
  }

  retrieveCredentials = async () => {
    return ArnimaSDK.getAllCredential({})
      .then(creds => {
        var index = 0;
        var loadedList = [];
        this.setState({credList: creds});

        // -- dummy creds --
        if (useDummy) {
          this.setState({credList: dummyCreds});
        }
        // -- dummy creds --
        this.state.credList.forEach(cred => {
          if (cred.attrs.thumbnail) {
            loadedList.push({key: index++, src: cred.attrs.thumbnail});
          } else {
            loadedList.push({key: index++, src: null});
          }
        });
        this.setState({thumbnailDisplay: loadedList});
      })
      .catch(e => console.log(e));
  };

  render() {
    if (this.state.loading) {
      return (
        <Spinner
          cancelable={false}
          color="#0f8df0"
          visible={this.state.loading}
        />
      );
    } else {
      const creds = this.state.thumbnailDisplay.map(cred => {
        return <Credential key={cred.key} source={cred.src} />;
      });

      return (
        <SafeAreaView style={style.container}>
          <Header />
          <SafeAreaView style={style.subcontainer}>
            <View style={{flex: 0.3}}></View>
            <Swiper
              style={style.swipeView}
              onIndexChanged={index => this.setState({currentCred: index})}>
              {creds}
            </Swiper>
            <Option
              cred={this.state.credList[this.state.currentCred]}
              useDummy={useDummy}
            />
          </SafeAreaView>
          <Footer setting={true} useDummy={useDummy} />
        </SafeAreaView>
      );
    }
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

  swipeView: {
    alignContent: 'center',
  },
});

AppRegistry.registerComponent('mobile', () => Wallet);

export default Wallet;
