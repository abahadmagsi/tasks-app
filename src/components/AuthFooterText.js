import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Fonts} from '../const/Fonts';
import {Colors} from '../const/Color';

const AuthFooterText = ({upperText, innerText, onPress}) => {
  return (
    <Text style={styles.upperText}>
      {upperText}
      <Text style={styles.innerText} onPress={onPress}>{` ${innerText}`}</Text>
    </Text>
  );
};

export default AuthFooterText;

const styles = StyleSheet.create({
  upperText: {
    fontFamily: Fonts.lato400,
    fontSize: 12,
    color: '#979797',
    alignSelf: 'center',
    bottom: 20,
  },
  innerText: {
    color: Colors.textColor,
    fontSize: 13,
  },
});
