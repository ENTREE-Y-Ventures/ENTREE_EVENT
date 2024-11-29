import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';


const Recipe = ({navigation}) => {


  return (
    <View style={styles.container}>
      <Text>Recipe Page</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});

export default Recipe;
