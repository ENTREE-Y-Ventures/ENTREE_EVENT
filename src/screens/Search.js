import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const SearchIcon = require('../assets/search_icon.png');

// 기존 recipeData 제거하고 Home의 데이터 통합
const allRecipes = [
  // Dinner Recipes
  {
    id: 1,
    title: 'Spaghetti Carbonara',
    author: 'Ian Fisher',
    image: require('../assets/Spaghetti_Carbonara.png'),
    reviews: '12,897',
    ratingScore: 5,
    cookTime: '30 minutes',
  },
  {
    id: 2,
    title: 'Cast-Iron Steak',
    author: 'Julia Moskin',
    image: require('../assets/Cast-Iron_Steak.png'),
    reviews: '5,556',
    ratingScore: 5,
    cookTime: '1 hour',
  },
  {
    id: 3,
    title: 'Ratatouille',
    author: 'Melissa Clark',
    image: require('../assets/Ratatouille.png'),
    reviews: '3,110',
    ratingScore: 5,
    cookTime: '3 hour',
  },
  // Dessert Recipes
  {
    id: 1000,
    title: 'Strawberry Pavlova',
    author: 'Nigella Lawson',
    image: require('../assets/Strawberry_Pavlova.png'),
    reviews: '2,941',
    ratingScore: 5,
    cookTime: '2 hours',
  },
  {
    id: 1001,
    title: 'Peanut Butter Blossoms',
    author: 'the Gerrero family',
    image: require('../assets/Peanut_Butter_Blossoms.png'),
    reviews: '6,913',
    ratingScore: 5,
    cookTime: '35 minutes',
  },
  {
    id: 1002,
    title: 'Magnolia Bakery\'s Cupcakes',
    author: 'Susan Campos',
    image: require('../assets/Magnolia_Bakerys_Cupcakes.png'),
    reviews: '3,139',
    ratingScore: 5,
    cookTime: '45 minutes',
  },
];

const Search = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    if (searchText) {
      const filtered = allRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes([]);
    }
  }, [searchText]);

  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.recipeItem}
      onPress={() => navigation.navigate('Recipe', { recipeId: item.id })}
    >
      <Image source={item.image} style={styles.recipeImage} />
      <View style={styles.recipeContent}>
        <Text style={styles.recipeTitle}>{item.title}</Text>
        <Text style={styles.recipeAuthor}>by {item.author}</Text>
        <Text style={styles.cookTime}>{item.cookTime}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Image
          source={SearchIcon}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="오늘의 저녁 메뉴는?"
          placeholderTextColor="#666"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <FlatList
        data={filteredRecipes}
        renderItem={renderRecipeItem}
        keyExtractor={item => item.id}
        style={styles.recipeList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  searchContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: 8,
    marginRight: 8,
    tintColor: '#666',
  },
  searchInput: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
    padding: 8,
  },
  recipeList: {
    flex: 1,
  },
  recipeItem: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    marginBottom: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  recipeContent: {
    flex: 1,
  },
  recipeTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  recipeAuthor: {
    color: '#888',
    fontSize: 14,
    marginBottom: 4,
  },
  cookTime: {
    color: '#666',
    fontSize: 12,
  },
  recipeImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
});

export default Search;
