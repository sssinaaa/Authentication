import React, {createContext, useEffect, useState, useReducer} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthenticationContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'signInUsername':
      return {
        ...state,
        username: action.payload,
      };
    case 'signInPassword':
      return {
        ...state,
        password: action.payload,
      };
    case 'error':
      return {
        ...state,
        error: action.payload,
      };
    case 'setUser':
      return {
        ...state,
        user: action.payload,
      };
  }
};

const initialState = {
  username: '',
  password: '',
  error: '',
  user: [
    {
      username: 'user',
      password: 'pass',
    },
  ],
};

const AuthenticationProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getMyObject = async () => {
    try {
      let stringValue = await AsyncStorage.getItem('key');
      let jsonValue = JSON.parse(stringValue);
      if (jsonValue) dispatch({type: 'setUser', payload: jsonValue});
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMyObject();
  }, []);

  return (
    <AuthenticationContext.Provider value={[state, dispatch]}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
