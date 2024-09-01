import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {Fonts} from '../const/Fonts';
import {Colors} from '../const/Color';

const CustomInput = ({
  label,
  placeholder,
  value,
  setValue,
  keyboardType,
  secureTextEntry,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        style={styles.inputStyles}
        placeholderTextColor={Colors.inactiveTextColor}
        value={value}
        onChangeText={e => setValue(e)}
        autoCapitalize={false}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginVertical: 15,
  },
  label: {
    fontFamily: Fonts.lato400,
    color: Colors.textColor,
    fontSize: 16,
    marginBottom: 10,
  },
  inputStyles: {
    width: '100%',
    backgroundColor: Colors.inputColor,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    paddingHorizontal: 20,
    borderRadius: 4,
    color: Colors.textColor,
    fontFamily: Fonts.lato400,
    fontSize: 16,
  },
});
