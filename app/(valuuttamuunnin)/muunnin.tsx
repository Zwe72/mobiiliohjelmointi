import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

type Rates = {
  [key: string]: number;
};

export default function muunnin() {
  const [currency, setCurrency] = useState('usd');
  const [amount, setAmount] = useState('');
  const [rates, setRates] = useState<Rates>({});
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json')
      .then((response) => response.json())
      .then((data) => {
        setRates(data.eur);
      })
      .catch((error) => {
        console.error('Virhe valuuttakurssien haussa:', error);
      });
  }, []);

  const convert = () => {
    const number =  parseFloat(amount);

    if (isNaN(number) || !rates[currency]) {
      return;
    }

    const euros = number / rates[currency];

    setResult(euros);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Valuuttamuunnin</Text>

      <Text style={styles.label}>Valitse valuutta</Text>

      <Picker
      selectedValue={currency}
      onValueChange={(itemValue) => setCurrency(itemValue)}
      style={styles.picker}
      >
        <Picker.Item label="USD - Yhdysvaltain dollari" value="usd" />
        <Picker.Item label="GBP - Englannin punta" value="gbp" />
        <Picker.Item label="SEK - Ruotsin kruunu" value="sek" />
        <Picker.Item label="NOK - Norjan kruunu" value="nok" />
        <Picker.Item label="DKK - Tanskan kruunu" value="dkk" />
        <Picker.Item label="JPY - Japanin jeni" value="jpy" />
      </Picker>

      <Text style={styles.label}>
        Syötä määrä:
      </Text>

      <TextInput
      style={styles.input}
      placeholder='Esim. 100'
      keyboardType='decimal-pad'
      value={amount}
      onChangeText={setAmount}
      />

      <Button title="Convert" onPress={convert} />

      {result !== null && (
        <Text style={styles.result}>
          {amount} {currency.toUpperCase()} = {result.toFixed(2)}
          EUR
        </Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
  },

  picker: {
    width: '100%',
  },

  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    marginBottom: 20,
  },

  result: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 25,
  },
});