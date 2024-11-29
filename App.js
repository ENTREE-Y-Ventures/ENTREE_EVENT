import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, StatusBar, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Home from './src/screens/Home';
import Scrap from './src/screens/Scrap';
import Search from './src/screens/Search';
import Recipe from './src/screens/Recipe';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabIcon = require('./src/assets/home_icon.png');
const ScrapTabIcon = require('./src/assets/scrap_icon.png');
const SearchTabIcon = require('./src/assets/search_icon.png');

const recipeScreenOptions = ({ navigation }) => ({
  headerTitle: '레시피',
  headerShown: true,
  headerStyle: { backgroundColor: '#121212' },
  headerTintColor: '#fff',
  headerRight: () => (
    <TouchableOpacity
      onPress={() => {
        // 북마크 토글 기능 구현
      }}
      style={{ marginRight: 16 }}
    >
      <Image
        source={ScrapTabIcon}
        style={{
          width: 15,
          height: 22,
          tintColor: '#FD802D'
        }}
      />
    </TouchableOpacity>
  ),
});

// Stack Navigator 정의 (Home을 통해 이동하는 페이지들)
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerTitle: 'En·trée', headerShown: true, headerStyle: { backgroundColor: '#121212' }, headerTintColor: '#fff' }}
      />
      <Stack.Screen
        name="Recipe"
        component={Recipe}
        options={recipeScreenOptions}
      />
    </Stack.Navigator>
  );
};

const ScrapStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Scrap"
        component={Scrap}
        options={{ headerTitle: '스크랩', headerShown: true, headerStyle: { backgroundColor: '#121212' }, headerTintColor: '#fff' }}
      />
      <Stack.Screen
        name="Recipe"
        component={Recipe}
        options={recipeScreenOptions}
      />
    </Stack.Navigator>
  );
};

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ headerTitle: '검색', headerShown: true, headerStyle: { backgroundColor: '#121212' }, headerTintColor: '#fff' }}
      />
      <Stack.Screen
        name="Recipe"
        component={Recipe}
        options={recipeScreenOptions}
      />
    </Stack.Navigator>
  );
};

// Tab Navigator 정의
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#252525', height: 60, borderTopWidth: 0, },
        tabBarLabelStyle: { fontSize: 12 },
        tabBarActiveTintColor: '#FD802D',
        tabBarInactiveTintColor: '#878787',
      }}
    >
      {/* Home Stack Navigator 포함 */}
      <Tab.Screen name="홈" component={HomeStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={HomeTabIcon}
              style={{
                width: 20,
                height: 25,
                marginBottom: 4,
                tintColor: color, // 활성/비활성 색상 적용
              }}
            />
          ),
        }}
      />
      <Tab.Screen name="스크랩" component={ScrapStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={ScrapTabIcon}
              style={{
                width: 15, // 원하는 너비
                height: 22, // 원하는 높이
                marginBottom: 4,
                tintColor: color, // 활성/비활성 색상 적용
              }}
            />
          ),
        }}
      />
      <Tab.Screen name="검색" component={SearchStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={SearchTabIcon}
              style={{
                width: 20, // 원하는 너비
                height: 20, // 원하는 높이
                marginBottom: 4,
                tintColor: color, // 활성/비활성 색상 적용
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// 최상위 네비게이터 정의
export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: StatusBar.currentHeight || 0,
    borderBottomWidth: 0,
  },
});

