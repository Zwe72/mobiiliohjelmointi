import { db } from "@/firebaseConfig";
import { onValue, push, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type OstosItem = {
    id: string;
    product: string;
    amount: string;
};

export default function ostoslista2() {
    const [product, setProduct] = useState("");
    const [amount, setAmount] = useState("");
    const [items,setItems] = useState<OstosItem[]>([]);

    useEffect(() => {
        const shoppingListRef = ref(db, "ShoppingList");

        const unsubscribe = onValue(shoppingListRef, (snapshot) => {
          const data = snapshot.val();

          if (data) {
            const list: OstosItem[] = Object.entries(data).map(
              ([id, item]: [string, any]) => ({
                id,
                product: item.product,
                amount: item.amount,
              })
            );

            setItems(list);
          } else {
            setItems([]);
          }
        });

        return () => unsubscribe();
    }, []);

    const addItem = async () => {
        if (product.trim() === "" || amount.trim() === "") {
            return;
        }

        const newItemRef = push(ref(db, "ShoppingList"));

        await set(newItemRef, {
          product: product.trim(),
          amount: amount.trim(),
        });

        setProduct("");
        setAmount("");
    };

    const boughtItem = async (id: string) => {
        await remove(ref(db, `ShoppingList/${id}`));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ostoslista-Firebase</Text>

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
            keyExtractor={(item) => item.id}
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