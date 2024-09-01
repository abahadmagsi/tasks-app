import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import EmptyImage from './../assets/images/homeImage.png';
import {Fonts} from '../const/Fonts';
import {Colors} from '../const/Color';

const EmptyHomeScreenComponent = () => {
  return (
    <View style={styles.container}>
      <Image source={EmptyImage} style={styles.imageStyles} />
      <Text style={styles.text}>You don't have any todo!</Text>
    </View>
  );
};

export default EmptyHomeScreenComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyles: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },
  text: {
    fontFamily: Fonts.lato400,
    fontSize: 20,
    color: Colors.textColor,
    top: -100,
  },
});
