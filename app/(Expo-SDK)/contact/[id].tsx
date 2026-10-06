import * as Contacts from 'expo-contacts';
import { useLocalSearchParams } from 'expo-router';
import * as SMS from 'expo-sms';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function ContactDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [contact, setContact] = useState<any>(null);

    useEffect(() => {
        loadContact();
    }, []);

    const loadContact = async () => {
        if (!id) {
            return;
        }

        const details = await Contacts.getContactByIdAsync(id);

        setContact(details);
    };

    if (!contact) {
        return (
            <View style={styles.container}>
                <Text style={styles.loading}>Ladataan...</Text>
            </View>
        );
    }

        const sendSMS = async (phoneNumber: string) => {
            const available = await SMS.isAvailableAsync();
    
            if (available) {
                await SMS.sendSMSAsync([phoneNumber], '');
            }
        };

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{contact.name}</Text>

            <Text style={styles.phoneTitle}>Puhelinnumerot:</Text>

            {contact.phoneNumbers?.map((phone: any, index: number) => (
                <View key={index} style={styles.phoneContainer}>
                    <Text style={styles.phoneText}>
                        {phone.label}: {phone.number}
                    </Text>

                    <Button
                        title="Lähetä SMS"
                        onPress={() => sendSMS(phone.number)}
                    />
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },

    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 25,
    },

    phoneTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 15,
    },

    phoneContainer: {
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#f8f8f8',
    },

    phoneText: {
        fontSize: 16,
        color: '#000',
        marginBottom: 10,
    },

    loading: {
        color: '#000',
        fontSize: 16,
    },
});