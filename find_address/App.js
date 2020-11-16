import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {

  const [text, setText] = useState('')
  const [lat, setLat] = useState(60.200692)
  const [lon, setLon] = useState(24.934302)

  //api was down so this was coded expecting the result to be in the form "lat,lon"
  const search = () => {
    fetch('apihere' + text)
      .then((res) => res.json())
      .then((data) => {
        const coords = data.split(',')
        setLat(coords[0])
        setLon(coords[1])
      })
    setText("")
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: lat,
          longitude: lon,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        }}>
        <Marker
          coordinate={{
            latitude: lat,
            longitude: lon
          }}
        />
      </MapView>
      <TextInput
        style={{ margin: 5, height: 30, width: 400, borderColor: 'black', borderWidth: 1, backgroundColor: 'white' }}
        onChangeText={text => setText(text)}
        value={text}
      />
      <Button title="Show" onPress={search} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 15

  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
