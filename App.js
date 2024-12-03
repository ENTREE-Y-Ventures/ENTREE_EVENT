import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {SafeAreaView, StatusBar, StyleSheet, Image, TouchableOpacity, Platform, PermissionsAndroid} from 'react-native';
import Home from './src/screens/Home';
import Scrap from './src/screens/Scrap';
import Search from './src/screens/Search';
import Recipe from './src/screens/Recipe';
import { ScrapProvider } from './src/components/ScrapContext';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

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

  // 마이크 권한 요청 함수
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: '음성 인식 권한',
            message: '이 앱은 음성 인식을 위해 마이크 권한이 필요합니다.',
            buttonNeutral: '나중에',
            buttonNegative: '취소',
            buttonPositive: '확인',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('안드로이드 마이크 권한 허용됨');
          return true;
        } else {
          console.log('안드로이드 마이크 권한 거부됨');
          return false;
        }
      } catch (err) {
        console.warn('안드로이드 권한 요청 중 오류:', err);
        return false;
      }
    } else if (Platform.OS === 'ios') {
      try {
        const microphonePermission = await check(PERMISSIONS.IOS.MICROPHONE);

        if (microphonePermission === RESULTS.DENIED || microphonePermission === RESULTS.LIMITED) {
          const newPermission = await request(PERMISSIONS.IOS.MICROPHONE);
          if (newPermission === RESULTS.GRANTED) {
            console.log('iOS 마이크 권한 허용됨');
            return true;
          } else {
            console.log('iOS 마이크 권한 거부됨');
            return false;
          }
        } else if (microphonePermission === RESULTS.GRANTED) {
          console.log('iOS 마이크 권한 이미 허용됨');
          return true;
        } else {
          console.log('iOS 마이크 권한 상태:', microphonePermission);
          return false;
        }
      } catch (err) {
        console.warn('iOS 권한 요청 중 오류:', err);
        return false;
      }
    } else {
      console.warn('지원되지 않는 플랫폼입니다.');
      return false;
    }
  };

  // 컴포넌트 마운트 시 권한 요청
  useEffect(() => {
    requestPermissions().then((result) => {
      if (result) {
        console.log('마이크 권한 요청 완료:', result);
      } else {
        console.log('마이크 권한 요청 실패 또는 거부');
      }
    });
  }, []);

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

