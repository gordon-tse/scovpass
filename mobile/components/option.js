import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  Alert,
} from 'react-native';

const win = Dimensions.get('window');

const Option = () => {
  const navigation = useNavigation();

  return (
    <View style={style.optionsFrame}>
      <TouchableHighlight
        style={style.optionButton}
        underlayColor={'#f5f5f5'}
        onPress={() => Alert.alert('To be implemented')}>
        <Text style={style.buttonText}>Show details</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={style.optionButton}
        underlayColor={'#f5f5f5'}
        onPress={() => Alert.alert('To be implemented')}>
        <Text style={style.buttonText}>Contact the issuer</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={style.optionButton}
        underlayColor={'#f5f5f5'}
        onPress={() => Alert.alert('To be implemented')}>
        <Text style={style.buttonText}>Delete</Text>
      </TouchableHighlight>
      <TouchableOpacity
        style={style.presentButton}
        // onPress={() => Alert.alert('Routing to be implemented')}>
        onPress={() =>  navigation.navigate('present') }>
        <Text style={style.presentButtonText}>Present</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  optionsFrame: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 15
  },

  optionButton: {
    padding: 5,
    borderRadius: 50,
  },

  buttonText: {
    fontSize: 18,
    color: 'grey',
    fontWeight: '200',
  },

  presentButton: {
    marginTop: 20,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#32cd32',
    borderRadius: 5,
  },

  presentButtonText: {
    fontSize: 20,
    fontWeight: '300',
    color: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
  },

});

export default Option;
