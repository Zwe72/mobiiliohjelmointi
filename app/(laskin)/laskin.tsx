import { Calculation, CalculatorContext } from '@/contexts/CalculatorProvider';
import { Link } from 'expo-router';
import { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Calculator() {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const { setHistory } = useContext(CalculatorContext);

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
      const sum = num1 + num2;
      setResult(sum);
      
      setHistory((prevHistory: Calculation[]) => [
        ...prevHistory,
        {
          number1: num1,
          number2: num2,
          operation: "+",
          result: sum,
        }
      ]);
  } else {
    const diff = num1 - num2;
    setResult(diff);

    setHistory((prevHistory: Calculation[]) => [
      ...prevHistory,
      {
          number1: num1,
          number2: num2,
          operation: "-",
          result: diff,
        },
    ]);
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

      <Link href="/(laskin)/laskinHistoria" style={styles.historyButton}>
        <Text style={styles.historyButtonText}>Historia</Text>
      </Link>

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

  historyButton: {
    backgroundColor: 'lightgray',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 30,
  },

  historyButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});