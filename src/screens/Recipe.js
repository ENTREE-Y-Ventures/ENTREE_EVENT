import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';


const Recipe = ({navigation}) => {


  return (
    <ScrollView style={styles.container}>
      <Text>Recipe Page</Text>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Recipe;
