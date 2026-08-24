import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function GuessGame() {
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [guessCount, setGuessCount] = useState(0);
  const [fail, setFail] = useState(false);

  const [randomNumber] = useState(
    Math.floor(Math.random() * 100) + 1
  );

  const makeGuess = () => {
    if (guess.trim() === '') {
      setMessage('Syötä ensin numero.');
      return
    }

    const userGuess = Number(guess);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
      setMessage('Syötä kokonaisluku väliltä 1-100.');
      return
    }

    const newGuessCount = guessCount + 1;
    setGuessCount(newGuessCount);

    if (userGuess < randomNumber) {
      setMessage('Arvaus on liian pieni.');
    } else if ( userGuess > randomNumber) {
      setMessage('Arvaus on liian suuri');
    } else {
      setMessage(
        `Oikein! Arvasit numeron ${randomNumber}. Arvauksia: ${newGuessCount}`
      );
      setFail(true);
    }

    setGuess('');
  };

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Arvauspeli</Text>

      <Text style={styles.instructions}>
        Arvaa numero väliltä 1-100
      </Text>

      <TextInput
      style={styles.input}
      placeholder="Syötä arvaus"
      keyboardType="numeric"
      value={guess}
      onChangeText={setGuess}
      editable={!fail}
      />

      <TouchableOpacity
      style={styles.button}
      onPress={makeGuess}
      disabled={fail}
      >
        <Text style={styles.buttonText}>Make Guess</Text>
      </TouchableOpacity>

      {message !== '' && (
        <Text style={styles.message}>{message}</Text>
      )}

      {fail && (
        <Text style={styles.guessCount}>
          Peli päättyi
        </Text>
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
    marginBottom: 20,
    color: 'black',
  },

  instructions: {
    fontSize: 18,
    marginBottom: 20,
    color: 'black',
  },

  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    marginBottom: 15,
    color: 'black',
    backgroundColor: 'white',
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

  message: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
    color: 'black',
  },

  guessCount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
  },
});
