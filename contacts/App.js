import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {

  const [contacts, setContacts] = useState([])

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync()
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      })
      if (data.length > 0) {
        setContacts(data)
      }
    }
    console.log("test" + contacts)
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          marginTop: 5,
          marginBottom: 5,
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };


  return (
    <View style={styles.container}>

      <View style={styles.itemContainer}>
        <FlatList
          keyExtractor={item => item.id}
          renderItem={({ item }) =>
            <View>
              <Text>{item.name} {item.phoneNumbers[0].number}</Text>
            </View>
          }
          ItemSeparatorComponent={listSeparator}
          data={contacts}
        />

      </View>
      <View style={styles.itemContainer}>
        <Button title="Get Contacts" onPress={getContacts} />
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
    marginTop: 100,
    marginBottom: 50
  },
  
  itemContainer: {
    margin: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
