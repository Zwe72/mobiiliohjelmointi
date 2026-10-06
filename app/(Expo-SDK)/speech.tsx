import * as Speech from 'expo-speech';
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function speech() {

    const [text, setText] = useState('');
    const [language, setLanguage] = useState('fi-FI');

    const speak = () => {
        if (text.trim() === '') return;

        Speech.stop();

        Speech.speak(text, {
            language: language
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.selectedLanguage}>
                valittu kieli: {language === 'fi-FI'
                    ? 'suomi'
                    : language === 'en-US'
                    ? 'English'
                    : 'Svenska'}
            </Text>
            <TextInput
                style={styles.input}
                value={text}
                onChangeText={setText}
                placeholder="Kirjoita teksti..."
            />

            <Button
                title="Suomi"
                onPress={() => setLanguage('fi-FI')}
            />

            <Button
                title="English"
                onPress={() => setLanguage('en-US')}
            />

            <Button
                title="Svenska"
                onPress={() => setLanguage('sv-SE')}
            />

            <Button
                title="puhu"
                onPress={speak}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },

    input: {
        borderWidth: 1,
        borderColor: '#999',
        padding: 10,
        marginBottom: 15,
        minHeight: 100,
        backgroundColor: '#fff',
        color: '#000',
        textAlignVertical: 'top',
    },
    
    selectedLanguage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
},
});