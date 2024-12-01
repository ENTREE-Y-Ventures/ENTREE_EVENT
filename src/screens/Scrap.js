import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import realm, {deleteScrap, getAllScraps, logRealmData} from '../../database/RealmDatabase';

const SearchIcon = require('../assets/search_icon.png');
const ScrapTabIcon = require('../assets/scrap_icon.png');


const Scrap = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [scrappedRecipes, setScrappedRecipes] = useState([]);

  // 스크랩 데이터를 로드하는 함수
  const loadScrappedRecipes = () => {
    const scraps = getAllScraps(); // Realm에서 모든 스크랩 데이터 로드
    const formattedScraps = scraps.map((scrap) => ({
      id: scrap.id,
      title: scrap.title,
      author: scrap.author,
      cookTime: scrap.cookTime,
      image: { uri: scrap.image },
    }));
    setScrappedRecipes(formattedScraps);
  };

  useEffect(() => {
    // 처음 로드 시 데이터 로드
    loadScrappedRecipes();
    logRealmData(); // 데이터베이스 상태 로그 출력

    // Realm Listener로 데이터 변경 감지
    const scraps = realm.objects('Scrap');
    const scrapListener = () => {
      loadScrappedRecipes(); // 데이터 변경 시 새로 로드
    };
    scraps.addListener(scrapListener);

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      scraps.removeListener(scrapListener);
    };
  }, []);


  const handleDeleteScrap = (recipeId) => {
    deleteScrap(recipeId); // 스크랩 삭제
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5-rating);
  };

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
          {/*<Text style={styles.rating}>{renderStars(item.rating)} </Text>*/}
          <Text style={styles.rating}>★★★★★</Text>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.cookTime}>{item.cookTime}</Text>
          <TouchableOpacity
            onPress={() => {
              handleDeleteScrap(item.id); // 삭제 후 갱신
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
        data={scrappedRecipes.filter(recipe => recipe.title.toLowerCase().includes(searchText.toLowerCase()))}
        renderItem={renderRecipeCard}
        keyExtractor={item => item.id}
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
