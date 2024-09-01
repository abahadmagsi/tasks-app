import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors} from '../const/Color';
import {Fonts} from '../const/Fonts';

const CustomButton = ({label, onPress, disable}) => {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, disable && styles.disableButtonStyles]}
      onPress={onPress}
      disabled={disable}>
      <Text style={[styles.buttonText, disable && styles.disableTextStyles]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    width: '90%',
    backgroundColor: Colors.primaryColor,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 40,
  },
  buttonText: {
    fontFamily: Fonts.lato400,
    fontSize: 16,
    color: Colors.textColor,
  },
  disableButtonStyles: {
    backgroundColor: Colors.inactivePrimaryColor,
  },
  disableTextStyles: {
    color: Colors.textColor,
  },
});
