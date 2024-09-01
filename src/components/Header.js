import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../const/Color';
import {Fonts} from '../const/Fonts';
import {Firebase} from '../utlis';

const {SignOut} = Firebase;

const Header = () => {
  return (
    <View style={styles.container}>
      <Icon name="menu" size={30} color={Colors.textColor} />
      <Text style={styles.headerTitle}>Home</Text>
      <Text style={styles.circleText} onPress={SignOut}>
        Logout
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontFamily: Fonts.lato400,
    fontSize: 20,
    color: Colors.textColor,
  },
  circleText: {
    // width: 42,
    // height: 42,
    borderRadius: 100,
    backgroundColor: Colors.primaryColor,
    color: Colors.textColor,
    alignSelf: 'center',
    padding: 10,
    paddingHorizontal: 15,
  },
});
