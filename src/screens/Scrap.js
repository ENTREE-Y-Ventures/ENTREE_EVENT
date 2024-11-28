import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';


const Scrap = ({navigation}) => {


  return (
    <View style={styles.container}>
      <Text>Scrap Screen</Text>
      <Text onPress={() => navigation.navigate('Recipe')}>Go to Recipe</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default Scrap;
