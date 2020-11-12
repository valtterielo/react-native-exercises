import React from 'react';
import { StyleSheet, Text, View, Button,TextInput, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const [result, setResult] = React.useState('')
  const [first, setFirst] = React.useState('')
  const [second, setSecond] = React.useState('')
  const [data, setData] = React.useState([])

  const add = () => {
    setResult (first+second)
    setData([...data, {key: first + " + " + second + ' = ' + (first+second) }])
    setFirst('')
    setSecond('')
  }

  const subtract = () => {
    setResult(first-second)
    setData([...data, {key: first + " - " + second + ' = ' +  (first-second)}])
    setFirst('')
    setSecond('')
  }

  
   
  

  return (
    <View style={styles.container}>
    <View >
      <Text style={{padding:10}}>Result: {result}</Text>
      <TextInput style={{margin:5, width:200, borderColor: 'black', borderWidth: 1}}
      placeholder = " Value of First Number"
      value = {first}
      onChangeText={first => setFirst(parseInt(first))}
      />
      <TextInput style={{margin:5, width:200, borderColor: 'black', borderWidth: 1}}
      placeholder = " Value of Second Number"
      value = {second}
      onChangeText={second => setSecond(parseInt(second))}
      />
      </View>
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
        <View style={{width:10}}></View>
        <Button
        title="History"
        onPress={() => navigation.navigate('History', {data: data})}>
        </Button>

      </View>
    </View>
  );
}

function HistoryScreen({route}) {
  const {data} = route.params
  return (
    <View style={styles.container}>
      <FlatList
          data={data}
          renderItem={({item}) => 
            <Text>{item.key}</Text>
          }
         />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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