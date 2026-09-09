import { CalculatorContext } from "@/contexts/CalculatorProvider";
import { useContext } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function laskinHistoria() {
    const { history } = useContext(CalculatorContext);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>History</Text>

            <FlatList
                data={history}
                renderItem={({ item }) => (
                    <Text style={styles.historyItem}>
                        {item.number1} {item.operation} {item.number2} = {item.result}
                    </Text>
                )}
                keyExtractor={(_item, index) => index.toString()}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                        Ei vielä historia.
                    </Text>
                }
            />
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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  historyItem: {
    fontSize: 18,
    marginBottom: 10,
    padding: 12,
    backgroundColor: 'lightgray',
    borderRadius: 8,
  },

  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
});