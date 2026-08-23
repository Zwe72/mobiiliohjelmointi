import { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';

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
    <View>
      <Text>Laskin</Text>

      <TextInput
        placeholder='Ensimmäinen numero'
        keyboardType='numeric'
        value={number1}
        onChangeText={setNumber1}
      />

      <TextInput
        placeholder='Toinen numero'
        keyboardType='numeric'
        value={number2}
        onChangeText={setNumber2}
      />

      <View>
        <TouchableOpacity
          onPress={() => calculate('+')}
        >
          <Text>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={() => calculate('-')}
        >
          <Text>-</Text>
        </TouchableOpacity>
      </View>

      {error !== '' && <Text>{error}</Text>}

      {result !== null && (
        <Text>Tulos: {result}</Text>
      )}
    </View>
  );
}