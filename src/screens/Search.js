import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';


const Search = ({navigation}) => {


  return (
    <View style={styles.container}>
      <Text>Search Screen</Text>
      <Text onPress={() => navigation.navigate('Recipe')}>Go to Recipe</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default Search;
