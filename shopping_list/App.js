import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const[text, setText] = useState('')
  const [data, setData] = useState([])

  const buttonPressed = () => {
    setData([...data, {key: text}])
    setText('')
  }

  const clear = () => {
    setData([])
    setText('')
  }
  return (
    <View style={styles.container}>
      <TextInput style={{margin:5, width:300, borderColor: 'black', borderWidth: 1}}
          onChangeText={text => setText(text)}
      />
       <View style={{margin:15, flexDirection: 'row',  alignItems: 'center', justifyContent: 'space-around'}}>
         <Button 
            title="add"
            onPress={buttonPressed}
         />
         <Button 
            title="clear"
            onPress={clear}
         />
         <View style={{margin:15, flexDirection: 'column',  alignItems: 'center', justifyContent: 'space-around'}}>
         <Text style={{margin:10}}>Shopping List</Text>
      <FlatList 
        data={data}
        renderItem={({item}) => 
        <Text>{item.key}</Text>}
      />
         </View>
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
