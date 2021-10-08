import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {PaginationContext} from '../context/PaginationContext';

import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SplashScreen from '../screens/SplashScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Router = () => {
  const [token, setToken] = useContext(PaginationContext);
  const [isLoading, setIsLoading] = useState(true);

  const Stack = createNativeStackNavigator();

  const getStatus = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('log');
      let token = JSON.parse(jsonValue);
      setToken(token);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    getStatus();
  }, []);

  console.log(token);

  if (token !== '1' && isLoading) {
    return <SplashScreen />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {token == '1' ? (
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
          ) : (
            <>
              <Stack.Screen
                name="Sign In"
                component={SignInScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Sign Up"
                component={SignUpScreen}
                options={{headerShown: false}}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};
export default Router;
