import React, {Component} from 'react';
import {AppRegistry, Alert} from 'react-native';
import ArnimaSDK from 'react-native-arnima-sdk';
import {EventRegister} from 'react-native-event-listeners';
import Spinner from 'react-native-loading-spinner-overlay';

const initState = {
  useDummy: false,
  finished: false,
  message: [],
  number: 0,
  loadText: '',
};

const mediatorJSON = {
  '@type': 'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/connections/1.0/invitation',
  '@id': 'b19a36f7-f8bf-4286-88f9-838e22d24f41',
  recipientKeys: ['E9VXJcZshiXqqLEwzGtmPJBRpm29xvbLaZnZKSSFNvA6'],
  serviceEndpoint: 'http://mediator3.test.indiciotech.io:3000',
  label: 'Indicio Public Mediator',
};
const network = 'http://test.bcovrin.vonx.io/genesis';

class FetchCredential extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
    this.state.useDummy = props.route.params.useDummy;
  }

  state = {
    useDummy: Boolean,
    finished: Boolean,
    message: Object,
    number: Number,
    loadText: String,
  };

  componentDidMount() {
    this.setState({
      loadText: 'Retrieving ' + this.state.number + ' credentials',
    });
    this.getPool(network).then(async genesis => {
      this.connectToMediator(genesis);
    });
    this.timeOutCount = setTimeout(() => {
      this.setState({finished: true});
      this.props.navigation.navigate('manage');
    }, 5000);
    this.listner = EventRegister.addEventListener('SDKEvent', received => {
      this.state.message = received;
      this.handleVerificationResponse();
    });
    if (this.state.useDummy) {
      this.mockUpFetching();
    }
  }

  componentWillUnmount() {
    if (this.timeOutCount) {
      clearTimeout(this.timeOutCount);
    }
    EventRegister.removeEventListener(this.listner);
  }

  handleVerificationResponse = () => {
    console.log('handling response from verifier');

    const messageId = new String(this.state.message.messageId);
    const messageType = new String(
      this.state.message.messages.message['@type'],
    );
    console.log(messageId + ': ' + messageType);
    if (messageType.includes('issue-credential')) {
      this.setState({
        number: this.state.number++,
        loadText: 'Retrieving ' + this.state.number + ' credentials',
      });
      ArnimaSDK.acceptCredentialOffer(
        messageId,
        this.state.message.messages,
      ).catch(e => console.log(e));
    } else {
      console.log('Unsupported message received');
    }
  };

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
      ).catch(e => {
        // Alert.alert('Service unavailable at the moment');
        // this.setState({finished: true});
        // this.props.navigation.navigate('wallet');
      });
    });
  };

  mockUpFetching = () => {
    setTimeout(() => {
      EventRegister.emitEvent('SDKEvent', mock_proof_result);
    }, 2000);
  };

  render() {
    return (
      <Spinner
        cancelable={false}
        color="#0f8df0"
        visible={!this.state.finished}
        textContent={this.state.loadText}
        textStyle={{fontSize: 18, fontWeight: '200', color: '#0f8df0'}}
      />
    );
  }
}

AppRegistry.registerComponent('mobile', () => FetchCredential);

export default FetchCredential;

const mock_proof_result = {
  messageId: '001',
  messages: {
    sender_verkey: 'GqDhdigmpk46yfihcFu3xjNUdxYitcZgfnyJ3U4t3AXf',
    recipient_verkey: 'SBNEn54iv2weQmHFrebeJWX7svFS12u9cxL7dPCbzJw',
    message: {
      '@type': 'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/fake/1.0/ack',
      '@id': '677c6af5-b312-47ec-9e9d-6873468fef4d',
      status: 'OK',
      '~thread': {
        thid: '677c6af5-b312-47ec-9e9d-6873468fef4d',
        sender_order: 4,
        received_orders: {'did:sov:abcxyz': 3},
      },
    },
  },
  auto: false,
  thId: '677c6af5-b312-47ec-9e9d-6873468fef4d',
  isProcessed: true,
  connectionId: 'GqDhdigmpk46yfihcFu3xjNUdxYitcZgfnyJ3U4t3AXf',
};
