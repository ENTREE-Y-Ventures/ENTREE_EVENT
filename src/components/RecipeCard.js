import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import realm, { addScrap, deleteScrap } from '../../database/RealmDatabase';


const RecipeCard = ({ navigation, recipe }) => {
  const ScrapIcon = require('../assets/scrap_icon.png');
  const [isScrapped, setIsScrapped] = useState(false);


  // 앱 로드 시 데이터베이스 상태를 확인
  useEffect(() => {
    const checkScrapStatus = () => {
      const isAlreadyScrapped = realm
        .objects('Scrap')
        .filtered(`recipeId == ${recipe.id}`).length > 0;
      setIsScrapped(isAlreadyScrapped);
    };

    checkScrapStatus();

    // Realm Listener로 데이터 변경 감지
    const scrapListener = () => {
      checkScrapStatus();
    };

    const scraps = realm.objects('Scrap');
    scraps.addListener(scrapListener);

    return () => {
      scraps.removeListener(scrapListener); // 컴포넌트 언마운트 시 리스너 제거
    };
  }, [recipe.id]);

  // 스크랩 버튼 클릭 이벤트
  const handleScrapToggle = () => {
    if (isScrapped) {
      deleteScrap(recipe.id);
    } else {
      addScrap(recipe); // recipe 객체를 전달
    }
    setIsScrapped(!isScrapped);
  };


  return (
    <TouchableOpacity
      style={styles.recipeCard}
      onPress={() => navigation.navigate('Recipe', { recipeId: recipe.id })}
    >
    {/*<View style={styles.recipeCard}>*/}
      <Image source={recipe.image} style={styles.recipeImage} />
      <View style={styles.recipeContent}>
        <View style={styles.recipeContentContainer}>
          <Text style={styles.recipeTitle}>{recipe.title}</Text>
          <Text style={styles.recipeAuthor}>{recipe.author}</Text>
        </View>
        <View style={styles.recipeRatingContainer}>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingStars}>★★★★★</Text>
            <Text style={styles.ratingReviews}>{recipe.reviews}</Text>
          </View>
          <View style={styles.cookTimeContainer}>
            <Text style={styles.cookTime}>{recipe.cookTime}</Text>
            <TouchableOpacity onPress={handleScrapToggle}>
              <Image
                source={ScrapIcon}
                style={[styles.scrapIcon, { tintColor: isScrapped ? '#FD802D' : '#FFFFFF' }]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    {/*</View>*/}
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  recipeCard: {
    flexDirection: 'column',
    backgroundColor: '#242225',
    width: 165,
    height: 230,
    marginBottom: 14,
    marginRight: 14,
    overflow: 'hidden',
  },
  recipeImage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 165,
    height: 120,
  },
  recipeContent: {
    flex: 1,
    padding: 8,
    justifyContent: 'space-between',
  },
  recipeContentContainer: {
    flexDirection: 'column',
  },
  recipeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  recipeAuthor: {
    fontSize: 13.5,
    color: '#FFFFFF',
    fontWeight: 400,
    marginBottom: 8,
  },
  recipeRatingContainer: {
    // backgroundColor: 'yellow',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 8,
  },
  ratingStars: {
    fontSize: 14,
    color: '#D0A63B',
    marginRight: 4,
  },
  ratingReviews: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  cookTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cookTime: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  scrapIcon: {
    width: 10,
    height: 16,
    // tintColor: '#FD802D',
    marginRight: 2,
  },
});

export default RecipeCard;
