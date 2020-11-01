import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native';

export default function App() {

  const [text, setText] = React.useState('Guess a number between 1-100')
  const [guess, setGuess] = React.useState(0)
  const [answer] = React.useState(Math.floor(Math.random() * 100) +1 )
  let [numOfGuesses, setNumOfGuesses] = React.useState(0)

  const makeGuess = () => {
    if (guess == answer){
      setText('Correct')
      setNumOfGuesses(numOfGuesses+=1)
      Alert.alert('You guessed the number in ' + numOfGuesses + ' guesses')
    } else if(answer > guess){
      setNumOfGuesses(numOfGuesses+=1)
      setText('Your guess ' + guess + ' is too low')
    }else if(answer < guess){
      setNumOfGuesses(numOfGuesses+=1)
      setText('Your guess ' + guess + ' is too high')
    }
  }

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <TextInput
        style={{width:50, borderColor: "black", borderWidth: 1, margin: 15}}
        onChangeText={value => setGuess(value)}
      />
      <Button title="make guess" onPress={makeGuess}/>
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
