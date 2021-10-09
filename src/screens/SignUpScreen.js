import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';

import {AuthenticationContext} from '../context/AuthenticationContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const validationSchema = yup.object({
  username: yup
    .string()
    .trim()
    .min(3, 'Invalid username')
    .required('Username is required'),
  password: yup
    .string()
    .trim()
    .min(8, 'Password is too short')
    .required('Password is required'),
});

const SignUpScreen = ({navigation}) => {
  const [user, setUser] = useContext(AuthenticationContext);

  const storeUserData = async value => {
    try {
      const stringValue = JSON.stringify(value);
      await AsyncStorage.setItem('key', stringValue);
    } catch (error) {
      console.log(error);
    }
    console.log(value);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.topView}>
        <Text style={{color: '#fff', fontSize: 28}}>Let's get started.</Text>
        <Text style={{color: 'gray', fontSize: 28}}>
          Login to your account.
        </Text>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.bottomView}>
          <View>
            <Formik
              initialValues={{
                username: '',
                password: '',
              }}
              validationSchema={validationSchema}
              onSubmit={(values, actions) => {
                let signUpUser = [...user, values];
                storeUserData(signUpUser);
                setUser(signUpUser);
                actions.resetForm();
              }}>
              {props => (
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your username"
                    onChangeText={props.handleChange('username')}
                    onBlur={props.handleBlur('username')}
                    value={props.values.username}></TextInput>
                  {props.touched.username && props.errors.username ? (
                    <Text>
                      {props.touched.username && props.errors.username}
                    </Text>
                  ) : null}
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    onChangeText={props.handleChange('password')}
                    onBlur={props.handleBlur('password')}
                    value={props.values.password}></TextInput>
                  {props.touched.password && props.errors.password ? (
                    <Text>
                      {props.touched.password && props.errors.password}
                    </Text>
                  ) : null}
                  <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={props.handleSubmit}>
                    <Text style={{color: '#fff'}}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
            <Text style={{padding: 10}}>
              Already have an account?{' '}
              <TouchableOpacity onPress={() => navigation.navigate('Sign In')}>
                <Text>Sign In</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
