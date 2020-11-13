import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View, Image } from 'react-native';

export default function App() {

  const [api, setApi] = useState('');
  const [data, setData] = useState([])

  const getData = () => {
    fetch('http://www.recipepuppy.com/api/?i=' + api)
    .then((response) => response.json())
    .then((data) => {
        setData(data)
    })
    .catch((error) => {
      Alert.alert('Error', error)
    })

    setApi('')
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{margin : "10%"}}
        keyExtractor={item => item.href}
        renderItem={({item}) => 
        <View>
          <Text>{item.title}</Text>
          <Image style = {{width: 50, height: 50}} source = {{uri : item.thumbnail}} />
        </View>}
        ItemSeparatorComponent={listSeparator}
        data={data.results}
      />  
    <TextInput
      style={{margin: 10, width: 200, height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => setApi(text)}
      value={api}
    />
    <Button
      title = "search"
      onPress={getData}
    />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
