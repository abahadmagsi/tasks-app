import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
// import firebase from '../utlis/firebase';
import validateEmail from '../const/validator';
import {Colors} from '../const/Color';
// import Firestore from '../utlis/firestore';
import {Firebase} from '../utlis/index';
import Title from '../components/Title';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import AuthFooterText from '../components/AuthFooterText';

const {SignUp, AddData} = Firebase;

const SignupScreen = ({navigation}) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!data.email || !data.password || !data.name) {
      return ToastAndroid.show('All inputs are required', ToastAndroid.SHORT);
    }
    if (!validateEmail(data.email)) {
      return ToastAndroid.show('Please input valid email.', ToastAndroid.SHORT);
    }
    let mail = data.email.toLowerCase();

    try {
      setLoading(true);
      await SignUp(mail, data.password);
      await AddData({
        email: mail,
        password: data.password,
        name: data.name,
        role: 'user',
      });
      setLoading(false);
    } catch (error) {
      console.log('Error signing up => ', error);
      ToastAndroid.show(error, ToastAndroid.SHORT);
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Title title={'Register'} />
      <View style={styles.inputView}>
        <CustomInput
          label={'Name'}
          placeholder={'Enter your name'}
          value={data.name}
          setValue={e => setData({...data, name: e})}
          keyboardType={'default'}
        />
        <CustomInput
          label={'Email'}
          placeholder={'Enter your email'}
          value={data.email}
          setValue={e => setData({...data, email: e})}
          keyboardType={'email-address'}
        />
        <CustomInput
          label={'Password'}
          placeholder={'******'}
          value={data.password}
          setValue={e => setData({...data, password: e})}
          secureTextEntry={true}
          keyboardType={'default'}
        />
        <CustomButton
          label={'Register'}
          disable={loading}
          onPress={handleSignup}
        />
      </View>
      <AuthFooterText
        upperText={`Already have an account?`}
        innerText={'Login'}
        onPress={() => navigation.navigate('LoginScreen')}
      />
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.themeColor,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  inputView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    // marginTop: 60,
  },
});
