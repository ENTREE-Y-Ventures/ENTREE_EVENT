import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, StatusBar, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Home from './src/screens/Home';
import Scrap from './src/screens/Scrap';
import Search from './src/screens/Search';
import Recipe from './src/screens/Recipe';
import { ScrapProvider } from './src/components/ScrapContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabIcon = require('./src/assets/home_icon.png');
const ScrapTabIcon = require('./src/assets/scrap_icon.png');
const SearchTabIcon = require('./src/assets/search_icon.png');

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeScreen"
      component={Home}
      options={{
        headerTitle: 'En·trée',
        headerStyle: { backgroundColor: '#121212' },
        headerTintColor: '#fff',
      }}
    />
    <Stack.Screen
      name="Recipe"
      component={Recipe}
      options={{
        headerTitle: '레시피',
        headerStyle: { backgroundColor: '#121212' },
        headerTintColor: '#fff',
      }}
    />
  </Stack.Navigator>
);

const ScrapStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ScrapScreen"
      component={Scrap}
      options={{
        headerTitle: '스크랩',
        headerStyle: { backgroundColor: '#121212' },
        headerTintColor: '#fff',
      }}
    />
    <Stack.Screen
      name="Recipe"
      component={Recipe}
      options={{
        headerTitle: '레시피',
        headerStyle: { backgroundColor: '#121212' },
        headerTintColor: '#fff',
      }}
    />
  </Stack.Navigator>
);

const SearchStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="SearchScreen"
      component={Search}
      options={{
        headerTitle: '검색',
        headerStyle: { backgroundColor: '#121212' },
        headerTintColor: '#fff',
      }}
    />
    <Stack.Screen
      name="Recipe"
      component={Recipe}
      options={{
        headerTitle: '레시피',
        headerStyle: { backgroundColor: '#121212' },
        headerTintColor: '#fff',
      }}
    />
  </Stack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        backgroundColor: '#252525',
        height: 60,
        borderTopWidth: 0,
      },
      tabBarLabelStyle: {
        fontSize: 12,
      },
      tabBarActiveTintColor: '#FD802D',
      tabBarInactiveTintColor: '#878787',
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="홈"
      component={HomeStack}
      options={{
        tabBarIcon: ({ color }) => (
          <Image
            source={HomeTabIcon}
            style={{
              width: 20,
              height: 25,
              marginBottom: 4,
              tintColor: color,
            }}
          />
        ),
      }}
    />
    <Tab.Screen
      name="스크랩"
      component={ScrapStack}
      options={{
        tabBarIcon: ({ color }) => (
          <Image
            source={ScrapTabIcon}
            style={{
              width: 15,
              height: 22,
              marginBottom: 4,
              tintColor: color,
            }}
          />
        ),
      }}
    />
    <Tab.Screen
      name="검색"
      component={SearchStack}
      options={{
        tabBarIcon: ({ color }) => (
          <Image
            source={SearchTabIcon}
            style={{
              width: 20,
              height: 20,
              marginBottom: 4,
              tintColor: color,
            }}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

const App = () => {
  return (
    <SafeAreaProvider style={styles.safeArea}>
      <ScrapProvider>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </ScrapProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
});

export default App;

