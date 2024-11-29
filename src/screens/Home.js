import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  Image, FlatList,
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const RecipeCard = ({ recipe }) => {
  const ScrapIcon = require('../assets/scrap_icon.png');

  return (
    <View style={styles.recipeCard}>
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
            <Image source={ScrapIcon} style={styles.scrapIcon} />
          </View>
      </View>
      </View>
    </View>
  );
};


const Home = ({navigation}) => {

  const dinnerRecipes = [
    {
      id: '1',
      title: 'Spaghetti Carbonara',
      author: 'Ian Fisher',
      image: require('../assets/Spaghetti_Carbonara.png'),
      reviews: '12,897',
      ratingScore: 5,
      cookTime: '30 minutes',
    },
    {
      id: '2',
      title: 'Cast-Iron Steak',
      author: 'Julia Moskin',
      image: require('../assets/Cast-Iron_Steak.png'),
      reviews: '5,556',
      ratingScore: 5,
      cookTime: '1 hour',
    },
    {
      id: '3',
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
      id: '1',
      title: 'Strawberry Pavlova',
      author: 'Nigella Lawson',
      image: require('../assets/Strawberry_Pavlova.png'),
      reviews: '2,941',
      ratingScore: 5,
      cookTime: '2 hours',
    },
    {
      id: '2',
      title: 'Peanut Butter Blossoms',
      author: 'the Gerrero family',
      image: require('../assets/Peanut_Butter_Blossoms.png'),
      reviews: '6,913',
      ratingScore: 5,
      cookTime: '35 minutes',
    },
    {
      id: '3',
      title: 'Magnolia Bakery\'s Cupcakes',
      author: 'Susan Campos',
      image: require('../assets/Magnolia_Bakerys_Cupcakes.png'),
      reviews: '3,139',
      ratingScore: 5,
      cookTime: '45 minutes',
    },
  ];

  function Section({children, title}) {
    return (
      <View style={styles.sectionContainer}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: Colors.white,
            },
          ]}>
          {title}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/*<Text onPress={() => navigation.navigate('Recipe')}>Go to Recipe</Text>*/}
      <Section title={'Top 3 Christmas\nDinner Recipes'} />
      <FlatList
        data={dinnerRecipes}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.recipeList}
        horizontal={true}
      />

      <Section title={'Top 3 Christmas\nDessert Recipes'} />
      <FlatList
        data={dessertRecipes}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        keyExtractor={(item) => item.id}
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
    // paddingTop: StatusBar.currentHeight || 0,
  },
  sectionContainer: {
    marginTop: 16,
    // paddingHorizontal: 12,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  recipeList: {
    paddingBottom: 14,
    // backgroundColor: 'lightblue',
  },
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
    tintColor: '#FFFFFF',
    marginRight: 2,
  },
});

export default Home;
