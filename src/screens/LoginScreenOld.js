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

const {SignIn} = Firebase;

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      return ToastAndroid.show('All inputs are required', ToastAndroid.SHORT);
    }
    if (!validateEmail(email)) {
      return ToastAndroid.show('Please input valid email.', ToastAndroid.SHORT);
    }
    try {
      setLoading(true);
      await SignIn(email, password);
      setLoading(false);
    } catch (error) {
      console.log('Error logging in => ', error);
      ToastAndroid.show(error, ToastAndroid.SHORT);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={e => setEmail(e)}
          value={email}
          autoCapitalize={false}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry={true}
          onChangeText={e => setPassword(e)}
          value={password}
          autoCapitalize={false}
        />
        <Text style={styles.forgotPasswordStyles}>Forgot Password?</Text>
        <TouchableOpacity
          style={[styles.loginButton, loading && {backgroundColor: '#3E9CB9'}]}
          onPress={handleLogin}
          disabled={loading}>
          {loading && (
            <ActivityIndicator
              size={'small'}
              color={'white'}
              style={{right: 20}}
            />
          )}
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footerText}>
        Dont't have an account?{' '}
        <Text
          style={{color: 'blue'}}
          onPress={() => navigation.navigate('SignupScreen')}>
          SIGNUP
        </Text>
      </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F6EE',
    paddingHorizontal: 30,
  },
  title: {
    alignSelf: 'center',
    fontSize: 32,
    fontWeight: '700',
    color: 'black',
    paddingTop: 30,
  },
  input: {
    width: '100%',
    marginVertical: 20,
    borderRadius: 10,
    borderBottomWidth: 1,
    backgroundColor: 'white',
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    paddingHorizontal: 10,
  },
  forgotPasswordStyles: {
    alignSelf: 'flex-end',
    top: -10,
    fontSize: 16,
    fontWeight: '500',
    color: 'grey',
  },
  loginButton: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    top: 40,
    flexDirection: 'row',
  },
  loginButtonText: {
    color: 'white',
    paddingVertical: 10,
    fontSize: 22,
    fontWeight: '800',
  },
  footerText: {
    fontSize: 22,
    fontWeight: '700',
    color: 'gray',
    bottom: 30,
    alignSelf: 'center',
  },
});
