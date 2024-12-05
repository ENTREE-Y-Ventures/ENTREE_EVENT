import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useScrap } from '../components/ScrapContext';

const SearchIcon = require('../assets/search_icon.png');
const ScrapTabIcon = require('../assets/scrap_icon.png');

// Home.js의 레시피 데이터를 가져옵니다
const allRecipes = [
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

const Scrap = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const { scrappedRecipes: scrapIds, isScraped, toggleScrap } = useScrap();

  // 스크랩된 레시피만 필터링하고 createdAt 기준으로 정렬
  const scrappedRecipes = allRecipes
    .filter(recipe => isScraped(recipe.id))
    .sort((a, b) => {
      const aScrap = scrapIds.find(scrap => scrap.id === a.id);
      const bScrap = scrapIds.find(scrap => scrap.id === b.id);
      return new Date(bScrap.createdAt) - new Date(aScrap.createdAt);
    });

  const renderRecipeCard = ({ item }) => (
    <TouchableOpacity
      style={styles.recipeCard}
      onPress={() => navigation.navigate('Recipe', { recipeId: item.id })}
    >
      <Image source={item.image} style={styles.recipeImage} />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle}>{item.title}</Text>
        <Text style={styles.chefName}>{item.author}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>★★★★★</Text>
          <Text style={styles.reviews}>{item.reviews}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.cookTime}>{item.cookTime}</Text>
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              toggleScrap(item.id);
            }}
            style={styles.bookmarkButton}
          >
            <Image
              source={ScrapTabIcon}
              style={{
                width: 15,
                height: 22,
                tintColor: isScraped(item.id) ? '#FD802D' : '#878787'
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const filteredRecipes = scrappedRecipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Image source={SearchIcon} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="스크랩한 레시피를 검색해보세요!"
          placeholderTextColor="#666"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <FlatList
        key={'two-column'}
        data={filteredRecipes}
        renderItem={renderRecipeCard}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>스크랩한 레시피가 없습니다.</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 14,
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
  recipeCard: {
    backgroundColor: '#1E1E1E',
    marginBottom: 16,
    overflow: 'hidden',
    width: '48%',
  },
  recipeImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  recipeInfo: {
    padding: 12.1,
  },
  recipeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
    flexWrap: 'wrap',
  },
  chefName: {
    fontSize: 13.5,
    color: '#FFFFFF',
    fontWeight: 400,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    color: '#FFD700',
    fontSize: 12,
    marginRight: 8,
  },
  reviews: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  cookTime: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 4,
  },
  bookmarkButton: {
    padding: 2,
    marginRight: -4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  emptyText: {
    color: '#999999',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Scrap;
