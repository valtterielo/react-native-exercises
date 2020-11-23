import React, { useState, useEffect } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('shoppinglistdb.db');

export default function App() {

  const [product, setProduct] = useState('')
  const [amount, setAmount] = useState('')
  const [data, setData] = useState([])

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists shoppinglist (id integer primary key not null, product text, amount text);');
    });
    updateList();
  }, []);

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shoppinglist;', [], (_, { rows }) =>
        setData(rows._array)
      );
    });
  }

  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql('delete from shoppinglist where id = ?;', [id]);
      }, null, updateList
    )
  }

  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into shoppinglist (product, amount) values (?, ?);', [product, amount]);
    }, null, updateList
    )
    setProduct('')
    setAmount('')
  }


  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View >
      <View style={styles.container}>
        <TextInput style={{ margin: 5, width: 300, borderColor: 'black', borderWidth: 1 }}
          placeholder="Product"
          onChangeText={product => setProduct(product)}
          value={product}
        />
        <TextInput style={{ margin: 5, width: 300, borderColor: 'black', borderWidth: 1 }}
          placeholder="Amount"
          onChangeText={amount => setAmount(amount)}
          value={amount}
        />
      </View>

      <View style={styles.btn}>
        <Button
          title="Save"
          onPress={saveItem}
        />
      </View>

      <View style={styles.btn} >
        <Text style={{ margin: 10 }}>Shopping List</Text>
        <FlatList
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <View style={styles.listcontainer}><Text style={{ fontSize: 18 }}>{item.product}, {item.amount}</Text>
          <Text style={{ fontSize: 18, color: '#0000ff' }} onPress={() => deleteItem(item.id)}> bought</Text></View>}
          data={data}
          ItemSeparatorComponent={listSeparator} 
        />
      </View>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    marginTop: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
   },
});