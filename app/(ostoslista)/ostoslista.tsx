import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type OstosItem = {
    id: number;
    product: string;
    amount: string;
};

export default function ostoslista() {
    const db = useSQLiteContext();

    const [product, setProduct] = useState("");
    const [amount, setAmount] = useState("");
    const [items,setItems] = useState<OstosItem[]>([]);

    const loadItems = async() => {
        const result = await db.getAllAsync<OstosItem>(
            "SELECT * FROM ostoslista ORDER BY id DESC"
        );

        setItems(result);
    };

    useEffect(() => {
        loadItems();
    }, []);

    const addItem = async () => {
        if (product.trim() === "" || amount.trim() === "") {
            return;
        }

        await db.runAsync(
            "INSERT INTO ostoslista (product, amount) VALUES (?, ?)",
            product.trim(),
            amount.trim()
        );

        setProduct("");
        setAmount("");

        await loadItems();
    };

    const boughtItem = async (id: number) => {
        await db.runAsync(
            "DELETE FROM ostoslista WHERE id = ?",
            id
        );

        await loadItems();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ostoslista</Text>

            <TextInput
            style={styles.input}
            placeholder="Tuote"
            value={product}
            onChangeText={setProduct}
            />

            <TextInput
            style={styles.input}
            placeholder="Määrä"
            value={amount}
            onChangeText={setAmount}
            />

            <TouchableOpacity style={styles.button} onPress={addItem}>
                <Text style={styles.buttonText}>Lisää</Text>
            </TouchableOpacity>

            <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.item}>
                    <View>
                        <Text style={styles.product}>{item.product}</Text>
                        <Text style={styles.amount}>{item.amount}</Text>
                    </View>

                    <TouchableOpacity onPress={() => boughtItem(item.id)}>
                        <Text style={styles.bought}>bought</Text>
                    </TouchableOpacity>
                </View>
            )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "white",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
  },

  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    marginBottom: 10,
    color: "black",
  },

  button: {
    backgroundColor: "lightgray",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  product: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },

  amount: {
    fontSize: 16,
    color: "gray",
    marginTop: 4,
  },

  bought: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});