import React, {useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import RecipeCard from '../components/RecipeCard';

const Home = () => {
  const dinnerRecipes = [
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
  ];

  const dessertRecipes = [
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

  const Section = ({children, title}) => {
    return (
      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle, {color: Colors.white}]}>{title}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Section title={'Top 3 Christmas\nDinner Recipes'} />
      <FlatList
        data={dinnerRecipes}
        renderItem={({ item }) => (
          <RecipeCard recipe={item} />
        )}
        keyExtractor={item => item.id.toString()}
        horizontal={true}
        contentContainerStyle={styles.recipeList}
      />

      <Section title={'Top 3 Christmas\nDessert Recipes'} />
      <FlatList
        data={dessertRecipes}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            key={item.id}
          />
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.recipeList}
        horizontal={true}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 14,
  },
  sectionContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  recipeList: {
    paddingBottom: 14,
  },
});

export default Home;
