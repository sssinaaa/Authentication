import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {AuthenticationContext} from '../context/AuthenticationContext';
import {PaginationContext} from '../context/PaginationContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Formik} from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is Required'),
});

const Form = ({navigation}) => {
  const [user] = useContext(AuthenticationContext);
  const [token, setToken] = useContext(PaginationContext);
  const [error, setError] = useState('');

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async values => {
        try {
          const userIndex = user.findIndex(e => e.username == values.username);
          const passIndex = user.findIndex(e => e.password == values.password);
          if (userIndex > -1) {
            if (passIndex > -1 && passIndex == userIndex) {
              const jsonValue = '1';
              await AsyncStorage.setItem('log', jsonValue);
              await setToken(jsonValue);
            }
          } else {
            setError('your username or password is not correct');
          }
        } catch (err) {
          console.log(err);
        }
      }}>
      {({handleChange, handleBlur, handleSubmit, values, touched, errors}) => (
        <View>
          <Text style={styles.error}>{error}</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username}></TextInput>
          {touched.username && errors.username ? (
            <Text>{touched.username && errors.username}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={true}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}></TextInput>
          {touched.password && errors.password ? (
            <Text>{touched.password && errors.password}</Text>
          ) : null}
          <TouchableOpacity style={styles.buttonPrimary} onPress={handleSubmit}>
            <Text style={{color: '#fff'}}>Sign In</Text>
          </TouchableOpacity>
          <Text style={{padding: 5}}>Don't have an account ?</Text>
          <TouchableOpacity
            style={styles.buttonPrimary}
            onPress={() => navigation.navigate('Sign Up')}>
            <Text style={{color: '#fff'}}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
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
    padding: 10,
  },
});

export default Form;
