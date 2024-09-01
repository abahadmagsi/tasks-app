import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import auth from '@react-native-firebase/auth';
import React, {createContext, useState, useEffect} from 'react';

export const AuthContext = createContext();

const Stack = createNativeStackNavigator();

const AppStackNavigation = () => {
  const [user, setUser] = useState(null);

  function onAuthStateChanged(user) {
    setUser(user);
  }

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(onAuthStateChanged);
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{user}}>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{headerShown: false}}>
        {!user ? (
          <Stack.Group>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
          </Stack.Group>
        ) : (
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
};

export default AppStackNavigation;
