import * as Contacts from 'expo-contacts';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

export default function contactsandsms() {
    const [contacts, setContacts] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [hasPermission, setHasPermission] = useState(true);

    useEffect(() => {
        loadContacts();
    }, []);

    const loadContacts = async () => {
        const { status } = await Contacts.requestPermissionsAsync();

        if (status !== 'granted') {
            setHasPermission(false);
            return;
        }

       

        const { data } = await Contacts.getContactsAsync({
            fields: [
                Contacts.Fields.Name,
                Contacts.Fields.PhoneNumbers,
            ],
        });

        setContacts(data);
    };

        const filteredContacts = contacts.filter((contact) =>
            contact.name?.toLowerCase().includes(search.toLocaleLowerCase())
        );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Yhteystiedot</Text>

            <TextInput
            style={styles.input}
            placeholder="Hae nimellä..."
            value={search}
            onChangeText={setSearch}
            />

            {!hasPermission ? (
                <Text style={styles.permissionText}>Sovelluksella ei ole lupaa käyttää yhteistietoja.</Text>
            ) : (
                <FlatList
                    data={filteredContacts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() =>
                                router.push({
                                    pathname: '/contact/[id]',
                                    params: { id: String(item.id) },
                                })
                            }
                        >
                            <View style={styles.contact}>
                                <Text style={styles.contactName}>
                                    {item.name}
                                </Text>
                                <Text style={styles.contactPhone}>
                                    {item.phoneNumbers?.[0]?.number}
                                </Text>
                            </View>
                    </Pressable>
                )}
            />
        )}
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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000',
    },

    input: {
        borderWidth: 1,
        borderColor: '#999',
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
        color: '#000',
    },

    contact: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },

    contactName: {
        fontSize: 18,
        color: '#000',
    },

    contactPhone: {
        color: '#555',
        marginTop: 5,
    },

    permissionText: {
        color: '#000',
    },
});