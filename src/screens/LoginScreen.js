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
import validateEmail from '../const/validator';
import {Firebase} from '../utlis';
import {Colors} from '../const/Color';
import Title from '../components/Title';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import AuthFooterText from '../components/AuthFooterText';

const {SignIn} = Firebase;

const LoginScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    if (!data.email || !data.password) {
      return ToastAndroid.show('All inputs are required', ToastAndroid.SHORT);
    }
    if (!validateEmail(data.email)) {
      return ToastAndroid.show('Please input valid email.', ToastAndroid.SHORT);
    }
    try {
      setLoading(true);
      await SignIn(data.email, data.password);
      setLoading(false);
    } catch (error) {
      console.log('Error logging in => ', error);
      ToastAndroid.show(error, ToastAndroid.SHORT);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Title title={'Login'} />
      <View style={styles.inputView}>
        <CustomInput
          label={'Email'}
          placeholder={'Enter your email'}
          value={data.email}
          setValue={e => setData({...data, email: e})}
          keyboardType="email-address"
        />
        <CustomInput
          label={'Password'}
          placeholder={'********'}
          value={data.password}
          setValue={e => setData({...data, password: e})}
          keyboardType="default"
          secureTextEntry={true}
        />
        <CustomButton label={'Login'} disable={loading} onPress={handleLogin} />
      </View>
      <AuthFooterText
        upperText={`Don't have an account?`}
        innerText={'Register'}
        onPress={() => navigation.navigate('SignupScreen')}
      />
    </View>
  );
};

export default LoginScreen;

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
