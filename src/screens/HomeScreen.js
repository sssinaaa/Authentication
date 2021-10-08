import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native';

import {PaginationContext} from '../context/PaginationContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const [token, setToken] = useContext(PaginationContext);
  const [result, setResult] = useState([]);

  const signOut = async () => {
    await AsyncStorage.removeItem('log');
    setToken(null);
  };

  const getDataFromApi = async value => {
    try {
      const response = await fetch(
        `https://www.digikala.com/ajax/autosuggest/?q=${value}`,
      );
      const json = await response.json();
      setResult(json.data.suggestion_products);
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.items}>
        <Image
          source={{uri: item.image}}
          style={{width: 200, height: 200, alignSelf: 'center'}}
        />
        <Text style={{color: '#000', textAlign: 'center', marginVertical: 5}}>
          {item.title}
        </Text>
      </View>
    );
  };

  console.log(result);

  return (
    <View style={{flex: 1}}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        onChangeText={value => getDataFromApi(value)}></TextInput>
      <View style={styles.container}>
        {result.length !== 0 ? (
          <View style={styles.itemsContainer}>
            <FlatList data={result} renderItem={renderItem} horizontal={true} />
          </View>
        ) : (
          <View style={styles.itemsContainer}>
            <Text
              style={{
                color: '#000',
                textAlign: 'center',
                fontSize: 24,
                marginVertical: 120,
              }}>
              Search Something
            </Text>
          </View>
        )}
      </View>

      <TouchableOpacity onPress={signOut} style={styles.buttonPrimary}>
        <Text style={{color: '#fff'}}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 30,
    marginHorizontal: 10,
    marginVertical: 20,
    padding: 10,
  },
  container: {
    backgroundColor: '#ee384e',
    flex: 1 / 2,
  },
  itemsContainer: {
    backgroundColor: '#fff',
    flex: 1,
    marginVertical: 30,
    marginHorizontal: 30,
    borderRadius: 20,
  },
  items: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 10,
    width: 300,
  },
  buttonPrimary: {
    width: 300,
    backgroundColor: '#201e28',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    marginVertical: 10,
    alignSelf: 'center',
  },
});

export default HomeScreen;
