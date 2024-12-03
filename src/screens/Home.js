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
  ];

  const dessertRecipes = [
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
