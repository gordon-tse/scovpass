import React, {Component} from 'react';
import {Alert, AppRegistry} from 'react-native';
import ArnimaSDK from 'react-native-arnima-sdk';
import {EventRegister} from 'react-native-event-listeners';

import Spinner from 'react-native-loading-spinner-overlay';

const initState = {
  useDummy: false,
  credential: {},
  connectionId: '',
  messages: {},
  hasFinished: false,
};

let timeOutCount = null;

class GetVerified extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
    this.initiatePresentation = this.initiatePresentation.bind(this);
  }

  state = {
    useDummy: Boolean,
    connectionId: String,
    credential: Object,
    message: Object,
    finished: Boolean,
  };

  componentDidMount = () => {
    timeOutCount = setTimeout(
      () => this.errorHandling('Connection error'),
      10000,
    );
    this.state.useDummy = this.props.route.params.useDummy;
    this.initiatePresentation(
      this.props.route.params.verifier,
      this.props.route.params.cred,
    );
  };

  handleVerificationResponse = () => {
    console.log('handling response from verifier');

    const messageId = new String(this.state.message.messageId);
    const messageType = new String(
      this.state.message.messages.message['@type'],
    );
    console.log(messageId + ': ' + messageType);
    if (messageType.includes('request-presentation')) {
      this.sendCredential(
        messageId,
        this.state.message.messages,
        this.state.credential,
      );
    } else if (
      messageType.includes('present-proof') &&
      messageType.includes('ack')
    ) {
      this.receivedPresentationAck();
    } else {
      console.log('Unsupported message received');
    }
  };

  // Accept invitation shown in a 2D barcode
  initiatePresentation = (invitation, credential) => {
    this.listener = EventRegister.addEventListener('SDKEvent', received => {
      this.state.message = received;
      this.handleVerificationResponse();
    });

    // Use scanned invitation to connect to a verification service
    const connection = this.connectToVerifier(invitation);
    if (!connection && !this.state.useDummy) {
      this.errorHandling('Connection fail');
    } else {
      this.getVerificationConnectionID(connection);
    }

    // Aries RFC 0037: Present Proof Protocol
    this.proposePresentation(credential);
    // Use mockup message in useDummy setting (receive proof request)
    if (this.state.useDummy) {
      setTimeout(
        () => this.mockUpEvent(mock_request_presentation_message),
        1500,
      );
    }
  };

  connectToVerifier = async url => {
    return await ArnimaSDK.acceptInvitation({}, url).catch(e =>
      this.state.useDummy
        ? console.log(e + ' Bypassed alert in useDummy mode')
        : this.errorHandling('Invalid invitation'),
    );
  };

  getVerificationConnectionID = async connection => {
    ArnimaSDK.getConnection()
      .then(list => {
        if (this.state.useDummy) {
          return (this.state.connectionId =
            'GqDhdigmpk46yfihcFu3xjNUdxYitcZgfnyJ3U4t3AXf');
        }
        if (!list) {
          this.errorHandling('Connection not found');
        } else {
          const parsedList = JSON.parse(list);
          this.setState({connectionId: parsedList[0].connectionId});
        }
      })
      .catch(e => console.log(e));
  };

  proposePresentation = async credential => {
    const mock_presentation_proposal = {
      '@type': 'https://didcomm.org/present-proof/1.0/presentation-preview',
      attributes: [
        {
          name: 'first_name',
          cred_def_id: credential.cred_def_id,
        },
        {
          name: 'last_name',
          cred_def_id: credential.cred_def_id,
        },
      ],
      predicates: [],
    };
    return await ArnimaSDK.sendProposePresentation(
      this.state.connectionId,
      mock_presentation_proposal,
    ).catch(() => {
      if (!this.state.useDummy)
        this.errorHandling('Propose presentation failed');
    });
  };

  sendCredential = async (messageId, inboundMessage, credential) => {
    const sent = await ArnimaSDK.sendProof(
      messageId,
      inboundMessage,
      false,
      credential,
    ).catch(e => console.log(e));
    if (!sent && !this.state.useDummy)
      this.errorHandling('Send credential failed');
    if (this.state.useDummy) {
      // Use mockup message in useDummy setting (receive proof verification result)
      setTimeout(() => this.mockUpEvent(mock_proof_result), 1500);
    }
  };

  receivedPresentationAck = () => {
    if (this.state.message.messages.message['status'] === 'OK') {
      console.log('Presenation success');
    } else {
      this.errorHandling('Presentation failed');
    }
    EventRegister.removeEventListener(this.listener);
    this.setState({finished: true});
    clearTimeout(timeOutCount);
    this.props.navigation.navigate('result');
    // setTimeout(() => this.props.navigation.navigate('wallet'), 2000);
  };

  errorHandling = message => {
    Alert.alert(message);
    EventRegister.removeEventListener(this.listener);
    clearTimeout(timeOutCount);
    this.setState({finished: true});
    return this.props.navigation.navigate('wallet');
  };

  mockUpEvent = message => {
    EventRegister.emitEvent('SDKEvent', message);
  };

  render() {
    return (
      <Spinner
        cancelable={false}
        color="#0f8df0"
        visible={!this.state.finished}
        textContent="Verifying"
        textStyle={{fontSize: 18, fontWeight: '200', color: '#0f8df0'}}
      />
    );
  }
}

AppRegistry.registerComponent('mobile', () => GetVerified);

export default GetVerified;

const mock_request_presentation_message = {
  messageId: '001',
  messages: {
    sender_verkey: 'SBNEn54iv2weQmHFrebeJWX7svFS12u9cxL7dPCbzJw',
    recipient_verkey: 'GqDhdigmpk46yfihcFu3xjNUdxYitcZgfnyJ3U4t3AXf',
    message: {
      '@type':
        'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/present-proof/1.0/request-presentation',
      '@id': '677c6af5-b312-47ec-9e9d-6873468fef4d',
      comment: 'Present your UK vaccination certificate',
      'request_presentations~attach': [
        {
          '@id': 'libindy-request-presentation-0',
          'mime-type': 'application/json',
          data: {
            base64: '<mock blob object>',
          },
        },
      ],
    },
  },
  auto: false,
  thId: '677c6af5-b312-47ec-9e9d-6873468fef4d',
  isProcessed: true,
  connectionId: 'GqDhdigmpk46yfihcFu3xjNUdxYitcZgfnyJ3U4t3AXf',
};

const mock_proof_result = {
  messageId: '001',
  messages: {
    sender_verkey: 'GqDhdigmpk46yfihcFu3xjNUdxYitcZgfnyJ3U4t3AXf',
    recipient_verkey: 'SBNEn54iv2weQmHFrebeJWX7svFS12u9cxL7dPCbzJw',
    message: {
      '@type': 'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/present-proof/1.0/ack',
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
