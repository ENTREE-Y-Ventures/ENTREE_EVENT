import React, { memo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useScrap } from '../components/ScrapContext';

const ScrapTabIcon = require('../assets/scrap_icon.png');

const RecipeCard = memo(({ recipe }) => {
  const navigation = useNavigation();
  const { isScraped, toggleScrap } = useScrap();
  const isBookmarked = isScraped(recipe.id);

  const handleScrapPress = (e) => {
    e.stopPropagation();
    toggleScrap(recipe.id);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Recipe', { recipeId: recipe.id })}
      >
        <Image source={recipe.image} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Recipe', { recipeId: recipe.id })}
        >
          <View style={styles.textContent}>
            <Text style={styles.title}>{recipe.title}</Text>
            <Text style={styles.author}>{recipe.author}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>★★★★★</Text>
              <Text style={styles.reviews}>{recipe.reviews}</Text>
            </View>
            <View style={styles.timeBookmarkContainer}>
              <Text style={styles.cookTime}>{recipe.cookTime}</Text>
              <TouchableOpacity
                onPress={handleScrapPress}
                style={styles.bookmarkButton}
              >
                <Image
                  source={ScrapTabIcon}
                  style={{
                    width: 15,
                    height: 22,
                    tintColor: isBookmarked ? '#FD802D' : '#878787'
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    backgroundColor: '#242225',
    width: 165,
    minHeight: 200,
    marginBottom: 14,
    marginRight: 14,
    overflow: 'hidden',
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 165,
    height: 120,
  },
  infoContainer: {
    flex: 1,
    padding: 8,
    justifyContent: 'space-between',
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
    flexWrap: 'wrap',
  },
  author: {
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
  timeBookmarkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 4,
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
  bookmarkButton: {
    padding: 2,
    marginRight: -4,
  },
});

export default RecipeCard;
