import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

const win = Dimensions.get('window');

const Credential = (props) => {
  return (
    <View style={style.container}>
      <View style={style.bannerFrame}>
        <Image
          source={{uri: props.source}}
          style={style.image}
        />
      </View>
      <View style={{flex: 0.2}}></View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 15,
    justifyContent: 'center',
  },

  bannerFrame: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
    padding: 10,
  },

  image: {
    flex: 1,
    resizeMode: 'contain',
    width: null,
    height: null,
    borderRadius: 10,
  },

});

export default Credential;
