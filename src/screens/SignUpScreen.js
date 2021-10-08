import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {AuthenticationContext} from '../context/AuthenticationContext';

import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = ({navigation}) => {
  const [user, setUser] = useContext(AuthenticationContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passError, setPassError] = useState('');
  const [userError, setUserError] = useState('');

  const setObjectValue = async value => {
    try {
      const stringValue = JSON.stringify(value);
      await AsyncStorage.setItem('key', stringValue);
    } catch (e) {
      console.log('set error', e);
      // save error
    }
    console.log('value: ', value);
  };

  const onPress = () => {
    let regex = /^[a-zA-z]+$/;
    let isValid = regex.test(username);
    if (!isValid) setUserError('Username must be characters');
    else {
      setUserError('');
      let signUpUser = [
        ...user,
        {
          username: username,
          password: password,
        },
      ];
      setObjectValue(signUpUser);
      setUser(signUpUser);
      console.log('sign up user ', signUpUser);
    }
  };

  const usernameValidator = () => {
    if (username == '') setUserError('Username can not be empty');
    else setUserError('');
  };

  const passwordValidator = () => {
    if (password == '') setPassError('password can not be empty');
    else setPassError('');
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
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            onChangeText={value => setUsername(value)}
            onBlur={usernameValidator}></TextInput>
          <Text style={{color: 'red'}}>{userError}</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            onChangeText={value => setPassword(value)}
            onBlur={passwordValidator}></TextInput>
          <Text style={{color: 'red'}}>{passError}</Text>
          <TouchableOpacity onPress={onPress} style={styles.primaryButton}>
            <Text style={{color: '#fff'}}>Sign Up</Text>
          </TouchableOpacity>
          <Text style={{padding: 10}}>
            Already have an account?{' '}
            <TouchableOpacity onPress={() => navigation.navigate('Sign In')}>
              <Text>Sign In</Text>
            </TouchableOpacity>
          </Text>
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
  primaryButton: {
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
});

export default SignUpScreen;
