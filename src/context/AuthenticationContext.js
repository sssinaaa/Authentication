import React, {createContext, useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthenticationContext = createContext();

const AuthenticationProvider = ({children}) => {
  const [user, setUser] = useState([
    {
      username: 'user',
      password: 'pass',
    },
  ]);
  const [splash, setSplash] = useState(false);

  const getMyObject = async () => {
    try {
      let stringValue = await AsyncStorage.getItem('key');
      let jsonValue = JSON.parse(stringValue);
      if (jsonValue) setUser(jsonValue);
      setSplash(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMyObject();
  }, []);

  return splash ? (
    <AuthenticationContext.Provider value={[user, setUser]}>
      {children}
    </AuthenticationContext.Provider>
  ) : null;
};

export default AuthenticationProvider;
