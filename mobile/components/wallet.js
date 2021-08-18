import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  AppRegistry,
  Alert,
  Text,
} from 'react-native';
import ArnimaSDK from 'react-native-arnima-sdk';
import Swiper from 'react-native-swiper';
import Spinner from 'react-native-loading-spinner-overlay';

import Header from '../components/header';
import Footer from '../components/footer';
import Credential from '../components/credential';
import Option from '../components/option';
import dummyCreds from '../assets/dummyCred';
import {color} from 'react-native-reanimated';

const win = Dimensions.get('window');
const mediatorURL =
  'http://mediator3.test.indiciotech.io:3000?c_i=eyJAdHlwZSI6ICJkaWQ6c292OkJ6Q2JzTlloTXJqSGlxWkRUVUFTSGc7c3BlYy9jb25uZWN0aW9ucy8xLjAvaW52aXRhdGlvbiIsICJAaWQiOiAiYjE5YTM2ZjctZjhiZi00Mjg2LTg4ZjktODM4ZTIyZDI0ZjQxIiwgInJlY2lwaWVudEtleXMiOiBbIkU5VlhKY1pzaGlYcXFMRXd6R3RtUEpCUnBtMjl4dmJMYVpuWktTU0ZOdkE2Il0sICJzZXJ2aWNlRW5kcG9pbnQiOiAiaHR0cDovL21lZGlhdG9yMy50ZXN0LmluZGljaW90ZWNoLmlvOjMwMDAiLCAibGFiZWwiOiAiSW5kaWNpbyBQdWJsaWMgTWVkaWF0b3IifQ==';
const mediatorJSON = {
  '@type': 'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/connections/1.0/invitation',
  '@id': 'b19a36f7-f8bf-4286-88f9-838e22d24f41',
  recipientKeys: ['E9VXJcZshiXqqLEwzGtmPJBRpm29xvbLaZnZKSSFNvA6'],
  serviceEndpoint: 'http://mediator3.test.indiciotech.io:3000',
  label: 'Indicio Public Mediator',
};
const network = 'http://test.bcovrin.vonx.io/genesis';

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
    this.getPool(network).then(genesis => {
      this.connectToMediator(genesis);
    });
    this.retrieveCredentials().then(() => {
      this.setState({loading: false});
    });
  }

  getPool = async network => {
    return fetch(network, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(async res => {
        return await res.text();
      })
      .catch(e => console.log(e));
  };

  connectToMediator = async poolConfig => {
    ArnimaSDK.getWallet().then(async wallet => {
      const walletInfo = {
        myDid: wallet.publicDid,
        verkey: wallet.verKey,
        label: wallet.label,
        firebaseToken: '',
      };
      const mediation = ArnimaSDK.connectWithMediator(
        mediatorJSON.serviceEndpoint,
        'POST',
        JSON.stringify(walletInfo),
        poolConfig,
      ).catch(e => Alert.alert('Service unavailable at the moment'));
    });
  };

  retrieveCredentials = async () => {
    return ArnimaSDK.getAllCredential()
      .then(creds => {
        this.setState({credList: creds});
        var index = 0;
        var loadedList = [];
        // -- dummy creds --
        this.setState({credList: dummyCreds});
        // -- dummy creds --
        this.state.credList.forEach(cred => {
          if (cred.attrs.thumbnail) {
            loadedList.push({key: index++, src: cred.attrs.thumbnail});
          } else {
            loadedList.push({key: index++, src: ''});
          }
        });
        this.setState({thumbnailDisplay: loadedList});
        // console.log(this.state.thumbnailDisplay);
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
      console.log(this.state.thumbnailDisplay);
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
              onIndexChanged={index => (this.state.currentCred = index)}>
              {creds}
            </Swiper>
            <Option />
          </SafeAreaView>
          <Footer />
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
