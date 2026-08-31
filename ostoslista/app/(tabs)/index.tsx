import { 
  Text, 
  StyleSheet, 
  View, 
  TextInput, 
  TouchableOpacity,
  FlatList
} from 'react-native';

import { useState } from 'react';

export default function ShoppingList() {
  const [item, setItem] = useState('');
  const [shoppingList, setShoppingList] = useState<string[]>([]);

  const addItem = () => {
    if(item.trim() === '') {
      return;
    }

    setShoppingList(prevList => [
      ...prevList,
      item.trim(),
    ]);

    setItem('');
  };

  const clearList = () => {
    setShoppingList([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ostoslista</Text>

      <TextInput
      style={styles.input}
      placeholder='Kirjoita ostos'
      value={item}
      onChangeText={setItem}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={addItem}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={clearList}
        >
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.listTitle}>Ostokset</Text>

      <FlatList
        data={shoppingList}
        renderItem={({ item }) => (
          <Text style={styles.listItem}>{item}</Text>
        )}
        keyExtractor={(_item, index) => index.toString()}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 30,
    color: 'black',
  },

  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    color: 'black',
    backgroundColor: 'white',
    marginBottom: 15,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 25,
  },

  button: {
    backgroundColor: 'lightgray',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },

  listTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },

  listItem: {
    fontSize: 18,
    paddingVertical: 10,
    color: 'black',
  },
});