import React, {useContext, useReducer} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {AuthenticationContext} from '../context/AuthenticationContext';
import {PaginationContext} from '../context/PaginationContext';

import AsyncStorage from '@react-native-async-storage/async-storage';

const reducer = (state, action) => {
  switch (action.type) {
    case 'username':
      return {
        ...state,
        username: action.payload,
      };
    case 'password':
      return {
        ...state,
        password: action.payload,
      };
    case 'error':
      return {
        ...state,
        error: action.payload,
      };
  }
};

const initialState = {
  username: '',
  password: '',
  error: '',
};

const SignInScreen = ({navigation}) => {
  const [user] = useContext(AuthenticationContext);
  const [token, setToken] = useContext(PaginationContext);

  const [state, dispatch] = useReducer(reducer, initialState);
  const {username, password, error} = state;

  const onPress = async () => {
    try {
      const userIndex = user.findIndex(e => e.username == username);
      const passIndex = user.findIndex(e => e.password == password);
      if (userIndex > -1) {
        if (passIndex > -1 && passIndex == userIndex) {
          const jsonValue = '1';
          await AsyncStorage.setItem('log', jsonValue);
          await setToken(jsonValue);
        }
      } else {
        dispatch({
          type: 'error',
          payload: 'your username or password is not correct',
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.topView}>
        <Text style={{color: '#fff', fontSize: 28}}>Let's get started.</Text>
        <Text style={{color: 'gray', fontSize: 28}}>
          Login to your account.
        </Text>
      </View>
      <View style={styles.bottomView}>
        <View>
          <Text style={styles.error}>{error}</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            onChangeText={value =>
              dispatch({type: 'username', payload: value})
            }></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={true}
            onChangeText={value =>
              dispatch({type: 'password', payload: value})
            }></TextInput>
          <TouchableOpacity style={styles.buttonPrimary} onPress={onPress}>
            <Text style={{color: '#fff'}}>Sign In</Text>
          </TouchableOpacity>

          <Text style={{padding: 5}}>Don't have an account ?</Text>
          <TouchableOpacity
            style={styles.buttonPrimary}
            onPress={() => navigation.navigate('Sign Up')}>
            <Text style={{color: '#fff'}}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topView: {
    backgroundColor: '#201e28',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomView: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
    bottom: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPrimary: {
    width: 300,
    backgroundColor: '#201e28',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 10,
    borderRadius: 60,
    width: 300,
    padding: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default SignInScreen;
