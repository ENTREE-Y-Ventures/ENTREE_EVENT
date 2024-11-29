import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';


const Home = ({ navigation }) => {


  return (
    <ScrollView style={styles.container}>
      <Text onPress={() => navigation.navigate('Recipe')}>Go to Recipe</Text>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
  },
});

export default Home;
