import React, {useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList, Platform, PermissionsAndroid,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import RecipeCard from '../components/RecipeCard';

const Home = () => {
  const dinnerRecipes = [
    {
      id: 1,
      title: 'Spaghetti Carbonara',
      author: 'Ian Fisher',
      image: require('../assets/Spaghetti_Carbonara.png'),
      reviews: '12,897',
      ratingScore: 5,
      cookTime: '30 minutes',
    },
    {
      id: 2,
      title: 'Cast-Iron Steak',
      author: 'Julia Moskin',
      image: require('../assets/Cast-Iron_Steak.png'),
      reviews: '5,556',
      ratingScore: 5,
      cookTime: '1 hour',
    },
    {
      id: 3,
      title: 'Ratatouille',
      author: 'Melissa Clark',
      image: require('../assets/Ratatouille.png'),
      reviews: '3,110',
      ratingScore: 5,
      cookTime: '3 hour',
    },
  ];

  const dessertRecipes = [
    {
      id: 1000,
      title: 'Strawberry Pavlova',
      author: 'Nigella Lawson',
      image: require('../assets/Strawberry_Pavlova.png'),
      reviews: '2,941',
      ratingScore: 5,
      cookTime: '2 hours',
    },
    {
      id: 1001,
      title: 'Peanut Butter Blossoms',
      author: 'the Gerrero family',
      image: require('../assets/Peanut_Butter_Blossoms.png'),
      reviews: '6,913',
      ratingScore: 5,
      cookTime: '35 minutes',
    },
    {
      id: 1002,
      title: 'Magnolia Bakery\'s Cupcakes',
      author: 'Susan Campos',
      image: require('../assets/Magnolia_Bakerys_Cupcakes.png'),
      reviews: '3,139',
      ratingScore: 5,
      cookTime: '45 minutes',
    },
  ];

  // 권한 요청 함수
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
          console.log('마이크 권한 허용됨');
          return true; // 권한 허용
        } else {
          console.log('마이크 권한 거부됨');
          return false; // 권한 거부
        }
      } catch (err) {
        console.warn(err);
        return false; // 오류 발생 시 거부로 간주
      }
    } else {
      console.log('아이폰 마이크 권한 기본 허용됨');
      return true; // iOS의 경우 별도의 처리가 없으므로 기본적으로 허용
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

  const Section = ({children, title}) => {
    return (
      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle, {color: Colors.white}]}>{title}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Section title={'Top 3 Christmas\nDinner Recipes'} />
      <FlatList
        data={dinnerRecipes}
        renderItem={({ item }) => (
          <RecipeCard recipe={item} />
        )}
        keyExtractor={item => item.id.toString()}
        horizontal={true}
        contentContainerStyle={styles.recipeList}
      />

      <Section title={'Top 3 Christmas\nDessert Recipes'} />
      <FlatList
        data={dessertRecipes}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            key={item.id}
          />
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.recipeList}
        horizontal={true}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 14,
  },
  sectionContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  recipeList: {
    paddingBottom: 14,
  },
});

export default Home;
