import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';


const Home = ({navigation}) => {
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
        <Text
          style={[
            styles.sectionDescription,
            {
              color: Colors.light,
            },
          ]}>
          {children}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text onPress={() => navigation.navigate('Recipe')}>Go to Recipe</Text>
      <Section title="Step Oneee">
        Edit App.js to change this
        screen and then come back to see your edits.
      </Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    // paddingTop: StatusBar.currentHeight || 0,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
});

export default Home;
