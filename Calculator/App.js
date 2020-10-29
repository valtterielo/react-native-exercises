import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

export default function App() {

  const [result, setResult] = React.useState("")
  const [first, setFirst] = React.useState(0)
  const [second, setSecond] = React.useState(0)

  const add = () => {
    setResult (first+second)
  }

  const subtract = () => {
    setResult(first - second)
  }



  return (
    <View style={styles.container}>
      <Text style={{padding:10}}>Result: {result}</Text>
      <TextInput style={{margin:5, width:200, borderColor: 'black', borderWidth: 1}}
      placeholder = " Value of First Number"
      onChangeText={first => setFirst(parseInt(first))}
      />
      <TextInput style={{margin:5, width:200, borderColor: 'black', borderWidth: 1}}
      placeholder = " Value of Second Number"
      onChangeText={second => setSecond(parseInt(second))}
      />
      <View style={{flexDirection: 'row',  alignItems: 'center', justifyContent: 'space-around'}}>
        <Button
        title="+"
        onPress={add}>
        </Button>
        <View style={{width:10}}></View>
        <Button
        title="-"
        onPress={subtract}>
        </Button>
      </View>
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
