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

const {SignUp, AddData} = Firebase;

const SignupScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSignup = async () => {
    if (!email || !password || !name) {
      return ToastAndroid.show('All inputs are required', ToastAndroid.SHORT);
    }
    if (!validateEmail(email)) {
      return ToastAndroid.show('Please input valid email.', ToastAndroid.SHORT);
    }
    let mail = email.toLowerCase();

    try {
      setLoading(true);
      await SignUp(email, password);

      await AddData({email: mail, password, name});
      setLoading(false);
    } catch (error) {
      console.log('Error signing up => ', error);
      ToastAndroid.show(error, ToastAndroid.SHORT);
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={e => setName(e)}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={e => setEmail(e)}
          value={email}
          keyboardType="email-address"
          autoCapitalize={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={e => setPassword(e)}
          value={password}
          secureTextEntry={true}
          autoCapitalize={false}
        />
        <TouchableOpacity
          style={[styles.button, loading && {backgroundColor: '#3E9CB9'}]}
          onPress={handleSignup}
          disabled={loading}>
          {loading && (
            <ActivityIndicator
              size={'small'}
              color={'white'}
              style={{right: 20}}
            />
          )}
          <Text style={[styles.buttonText]}>Sign up</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text
          style={{color: 'blue'}}
          onPress={() => navigation.navigate('LoginScreen')}>
          LOGIN
        </Text>
      </Text>
    </View>
  );
};

export default SignupScreen;

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
  button: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: Colors.themeBlueColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    top: 40,
    flexDirection: 'row',
  },
  buttonText: {
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
