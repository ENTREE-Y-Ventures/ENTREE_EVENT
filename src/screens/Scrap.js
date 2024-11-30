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

const SearchIcon = require('../assets/search_icon.png');
const ScrapTabIcon = require('../assets/scrap_icon.png');

// 임시 스크랩 데이터
const scrappedRecipes = [
  {
    id: '1',
    title: '까르보나라',
    chef: 'Ian Fisher',
    cookTime: '30 minutes',
    rating: 5,
    reviews: 12897,
    imageUrl: require('../assets/recipe/carbonara.png'),
  },
  {
    id: '3',
    title: '라따뚜이',
    chef: 'Melissa Clark',
    cookTime: '3 hours',
    rating: 5,
    reviews: 3112,
    imageUrl: require('../assets/recipe/ratatouille.png'),
  },
  {
    id: '4',
    title: '컵케이크',
    chef: 'Nigella Lawson',
    cookTime: '2 hours',
    rating: 5,
    reviews: 2941,
    imageUrl: require('../assets/recipe/cupcake.png'),
  },
];

const Scrap = ({navigation}) => {
  const [searchText, setSearchText] = useState('');

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5-rating);
  };

  const renderRecipeCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.recipeCard}
      onPress={() => navigation.navigate('Recipe', { recipeId: item.id })}
    >
      <Image source={item.imageUrl} style={styles.recipeImage} />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle}>{item.title}</Text>
        <Text style={styles.chefName}>{item.chef}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{renderStars(item.rating)} </Text>
          <Text style={styles.reviews}>{item.reviews.toLocaleString()}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.cookTime}>{item.cookTime}</Text>
          <TouchableOpacity
            onPress={() => {
              // 북마크 토글 기능 구현
            }}
          >
            <Image
              source={ScrapTabIcon}
              style={styles.bookmarkIcon}
            />
          </TouchableOpacity>
        </View>
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
          placeholder="스크랩한 레시피를 검색해보세요!"
          placeholderTextColor="#666"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <FlatList
        key={'two-column'}
        data={scrappedRecipes}
        renderItem={renderRecipeCard}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
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
  recipeCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
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
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  chefName: {
    color: '#999999',
    fontSize: 12,
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    color: '#FFB800',
    fontSize: 14,
    marginRight: 6,
  },
  reviews: {
    color: '#999999',
    fontSize: 12,
  },
  cookTime: {
    color: '#999999',
    fontSize: 12,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  bookmarkIcon: {
    width: 15,
    height: 22,
    tintColor: '#FD802D',
  },
});

export default Scrap;
