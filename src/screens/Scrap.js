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
    title: '베이컨 까르보나라',
    author: '서현마미',
    image: require('../assets/Spaghetti_Carbonara.png'),
    reviews: '12,897',
    ratingScore: 5,
    cookTime: '35분',
  },
  {
    id: 2,
    title: '포도소스 스테이크',
    author: '줄리아의 레시피',
    image: require('../assets/Cast-Iron_Steak.png'),
    reviews: '5,556',
    ratingScore: 5,
    cookTime: '1시간',
  },
  {
    id: 3,
    title: '라따뚜이',
    author: '요리왕',
    image: require('../assets/Ratatouille.png'),
    reviews: '3,110',
    ratingScore: 5,
    cookTime: '3시간',
  },
  {
    id: 1000,
    title: '스트로베리 파블로바',
    author: '이깡',
    image: require('../assets/Strawberry_Pavlova.png'),
    reviews: '2,941',
    ratingScore: 5,
    cookTime: '2시간',
  },
  {
    id: 1001,
    title: '피넛버터 카라멜 쿠키',
    author: '요알남',
    image: require('../assets/Peanut_Butter_Blossoms.png'),
    reviews: '6,913',
    ratingScore: 5,
    cookTime: '35분',
  },
  {
    id: 1002,
    title: '마놀라의 펜케이크',
    author: '수잔',
    image: require('../assets/Magnolia_Bakerys_Cupcakes.png'),
    reviews: '3,139',
    ratingScore: 5,
    cookTime: '45분',
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
