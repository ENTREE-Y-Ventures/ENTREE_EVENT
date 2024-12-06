import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, StatusBar, StyleSheet, Image, TouchableOpacity, Platform, PermissionsAndroid } from 'react-native';
import Home from './src/screens/Home';
import Scrap from './src/screens/Scrap';
import Search from './src/screens/Search';
import Recipe from './src/screens/Recipe';
import CookingSteps from './src/screens/CookingSteps';
import { ScrapProvider } from './src/components/ScrapContext';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

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
        tabBarStyle: { display: 'none' }
      }}
    />
    <Stack.Screen
      name="CookingSteps"
      component={CookingSteps}
      options={{
        title: '조리순서',
        headerStyle: {
          backgroundColor: '#121212',
        },
        headerTintColor: '#FFFFFF',
        tabBarStyle: { display: 'none' }
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
        tabBarStyle: { display: 'none' }
      }}
    />
    <Stack.Screen
      name="CookingSteps"
      component={CookingSteps}
      options={{
        title: '조리순서',
        headerStyle: {
          backgroundColor: '#121212',
        },
        headerTintColor: '#FFFFFF',
        tabBarStyle: { display: 'none' }
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
        tabBarStyle: { display: 'none' }
      }}
    />
    <Stack.Screen
      name="CookingSteps"
      component={CookingSteps}
      options={{
        title: '조리순서',
        headerStyle: {
          backgroundColor: '#121212',
        },
        headerTintColor: '#FFFFFF',
        tabBarStyle: { display: 'none' }
      }}
    />
  </Stack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route, navigation }) => ({
      tabBarStyle: {
        backgroundColor: '#252525',
        height: 60,
        borderTopWidth: 0,
        display: (() => {
          const routeState = navigation.getState();
          const currentRoute = routeState.routes[routeState.index];
          const isRecipeOrCookingSteps = currentRoute.state?.routes?.slice(-1)[0]?.name === 'Recipe' || 
                                       currentRoute.state?.routes?.slice(-1)[0]?.name === 'CookingSteps';
          return isRecipeOrCookingSteps ? 'none' : 'flex';
        })(),
      },
      tabBarLabelStyle: {
        fontSize: 12,
      },
      tabBarActiveTintColor: '#FD802D',
      tabBarInactiveTintColor: '#878787',
      headerShown: false,
    })}
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
  const requestMicrophonePermission = async () => {
    if (Platform.OS === 'ios') {
      try {
        // iOS 마이크 권한 확인 및 요청
        const microphonePermission = await check(PERMISSIONS.IOS.MICROPHONE);

        if (microphonePermission === RESULTS.DENIED) {
          console.log('iOS 마이크 권한 없음, 요청 중...');
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
        console.warn('iOS 마이크 권한 요청 중 오류:', err);
        return false;
      }
    } else if (Platform.OS === 'android' && Platform.Version >= 23) {
      try {
        // Android 마이크 권한 요청
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: '마이크 권한 요청',
            message: '이 앱은 음성 인식을 위해 마이크 권한이 필요합니다.',
            buttonNeutral: '나중에 묻기',
            buttonNegative: '거부',
            buttonPositive: '허용',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Android 마이크 권한 허용됨');
          return true;
        } else {
          console.log('Android 마이크 권한 거부됨');
          return false;
        }
      } catch (err) {
        console.warn('Android 마이크 권한 요청 중 오류:', err);
        return false;
      }
    } else {
      console.log('마이크 권한이 필요 없는 플랫폼 또는 버전');
      return true; // iOS < 10 또는 Android < 6.0
    }
  };



  // const requestMicrophonePermission = async () => {
  //   if (Platform.OS === 'ios') {
  //     let microphonePermission = await check(
  //       PERMISSIONS.IOS.MICROPHONE,
  //     );
  //
  //     if (microphonePermission === RESULTS.DENIED) {
  //       const newPermission = await request(
  //         PERMISSIONS.IOS.MICROPHONE,
  //       );
  //       return newPermission === RESULTS.GRANTED;
  //     }
  //
  //     return microphonePermission === RESULTS.GRANTED;
  //   } else if (Platform.OS === 'android' && Platform.Version >= 23) {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  //         {
  //           title: '위치 서비스 권한',
  //           message:
  //             '이 앱은 음성 인식을 위해 마이크 권한이 필요합니다.',
  //           buttonNeutral: '나중에 묻기',
  //           buttonNegative: '거부',
  //           buttonPositive: '허용',
  //         },
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         console.log('안드로이드 마이크 권한 획득');
  //       } else {
  //         console.log('안드로이드 마이크 권한 거부');
  //       }
  //       return granted === PermissionsAndroid.RESULTS.GRANTED;
  //     } catch (err) {
  //       console.warn(err);
  //       return false;
  //     }
  //   } else {
  //     return true;
  //   }
  // };

  // 컴포넌트 마운트 시 권한 요청
  useEffect(() => {
    requestMicrophonePermission().then((result) => {
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

