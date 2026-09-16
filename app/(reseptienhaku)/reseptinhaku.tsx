import { useState } from "react";
import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export default function reseptinHaku() {
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const searchRecipes = async () => {
    if (!ingredient.trim()) {
      return;
    }

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );

      const data = await response.json();

      setRecipes(data.meals || []);
    } catch (error) {
      console.error('Virhe haussa:', error)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reseptien haku</Text>

      <TextInput
      style={styles.input}
      placeholder="Syötä raaka-aine"
      value={ingredient}
      onChangeText={setIngredient}
      />

      <Button title="Hae reseptit" onPress={searchRecipes} />

      <FlatList
      data={recipes}
      keyExtractor={(item) => item.idMeal}
      renderItem={({ item }) => (
        <View style={styles.recipe}>
          <Text style={styles.recipeTitle}>{item.strMeal}</Text>

          <Image
          source={{ uri: item.strMealThumb }}
          style={styles.image}
          />
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
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    marginBottom: 10,
  },

  recipe: {
    marginTop: 20,
  },

  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  image: {
    width: 250,
    height: 150,
    resizeMode: 'cover',
  },
});