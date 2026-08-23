import { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Calculator() {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const calculate = (operation: '+' | '-') => {
    if (number1.trim() === '' || number2.trim() === '') {
      setError('Syötä molempien kentille numero.');
      setResult(null);
      return;
    }

    const num1 = Number(number1);
    const num2 = Number(number2);

    if (isNaN(num1) || isNaN(num2)) {
      setError('Syötä vain numero.');
      setResult(null);
      return;
    }

    setError('');

    if (operation === '+') {
      setResult(num1 + num2);
    } else {
      setResult(num1 - num2);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Laskin</Text>

      <TextInput
      style={styles.input}
      placeholder='Ensimmäinen numero'
      keyboardType='numeric'
      value={number1}
      onChangeText={setNumber1}
      />

      <TextInput
      style={styles.input}
      placeholder='Toinen numero'
      keyboardType='numeric'
      value={number2}
      onChangeText={setNumber2}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
        style={styles.button}
        onPress={() => calculate('+')}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.button}
        onPress={() => calculate('-')}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>

      {error !== '' && (
        <Text style={styles.error}>{error}</Text>
      )}

      {result !== null && (
        <Text style={styles.result}>Tulos: {result}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 18,
  },

  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 10,
  },

  button: {
    backgroundColor: 'lightgray',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },

  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  result: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 25,
  },

  error: {
    color: 'red',
    marginTop: 15,
  },
});