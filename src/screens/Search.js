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

// 임시 레시피 데이터
const recipeData = [
  {
    id: '1',
    title: '까르보나라',
    description: '크리미한 파스타 with 베이컨, 파마산 치즈',
    cookTime: '30분',
  },
  {
    id: '2',
    title: '스테이크',
    description: '버터와 허브향이 가득한 립아이 스테이크',
    cookTime: '25분',
  },
  {
    id: '3',
    title: '라따뚜이',
    description: '프랑스식 채소 요리, 허브드프로방스 향이 가득',
    cookTime: '45분',
  },
  {
    id: '4',
    title: '컵케이크',
    description: '부드럽고 달콤한 휘핑크림 컵케이크',
    cookTime: '40분',
  },
];

const Search = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    if (searchText) {
      const filtered = recipeData.filter(recipe => 
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
      <View style={styles.recipeContent}>
        <Text style={styles.recipeTitle}>{item.title}</Text>
        <Text style={styles.recipeDescription}>{item.description}</Text>
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
  recipeDescription: {
    color: '#999',
    fontSize: 14,
    marginBottom: 4,
  },
  cookTime: {
    color: '#666',
    fontSize: 12,
  },
});

export default Search;