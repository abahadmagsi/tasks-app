import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../const/Color';
import {Fonts} from '../const/Fonts';

const Title = ({title, titleStyles}) => {
  return <Text style={[styles.titleStyles, titleStyles]}>{title}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  titleStyles: {
    color: Colors.textColor,
    fontFamily: Fonts.lato700,
    fontSize: 32,
    textTransform: 'capitalize',
  },
});
