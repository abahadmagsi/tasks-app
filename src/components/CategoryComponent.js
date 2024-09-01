import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Fonts} from '../const/Fonts';
import {Colors} from '../const/Color';

const CategoryComponent = ({label}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

export default CategoryComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  text: {
    fontFamily: Fonts.lato400,
    fontSize: 12,
    color: Colors.textColor,
    padding: 10,
  },
});
