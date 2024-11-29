import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

const ScrapTabIcon = require('../assets/scrap_icon.png');

const recipeImages = {
  '1': require('../assets/recipe/carbonara.png'),
  '2': require('../assets/recipe/steak.png'),
  '3': require('../assets/recipe/ratatouille.png'),
  '4': require('../assets/recipe/cupcake.png'),
};

// 레시피 상세 데이터
const recipesDetailData = {
  '1': {
    title: "까르보나라",
    author: "By Chef Kim",
    time: "30분",
    rating: "5 ★★★★★ (12,891)",
    ingredients: [
      "스파게티 면 400g",
      "베이컨 200g",
      "달걀 2개",
      "파마산 치즈 1컵",
      "페코리노 치즈 1/2컵",
      "후추 약간",
      "올리브오일 2큰술",
      "소금 약간"
    ],
    preparation: [
      "큰 냄비에 물을 끓이고 소금을 넣어 스파게티를 삶습니다.",
      "베이컨을 잘게 썰어 팬에 바삭하게 구워줍니다.",
      "볼에 달걀, 파마산 치즈, 페코리노 치즈를 넣고 잘 섞어줍니다.",
      "삶은 면을 베이컨이 있는 팬에 넣고 달걀 치즈 믹스를 부어 빠르게 섞어줍니다.",
      "후추를 넣고 맛을 조절한 뒤 바로 서빙합니다."
    ]
  },
  '2': {
    title: "스테이크",
    author: "By Chef Park",
    time: "25분",
    rating: "4.8 ★★★★★ (9,234)",
    ingredients: [
      "립아이 스테이크 400g",
      "올리브오일 2큰술",
      "로즈마리 2줄기",
      "마늘 4쪽",
      "버터 30g",
      "소금 1작은술",
      "후추 1/2작은술"
    ],
    preparation: [
      "스테이크를 실온에 30분 정도 두어 해동합니다.",
      "스테이크의 물기를 제거하고 소금, 후추로 밑간합니다.",
      "팬을 강불로 달군 후 올리브오일을 두릅니다.",
      "스테이크를 넣고 한 면당 3-4분씩 구워줍니다.",
      "로즈마리와 마늘, 버터를 넣고 버터를 스테이크 위에 끼얹어가며 1분 더 구워줍니다.",
      "5-10분간 레스팅 후 썰어서 서빙합니다."
    ]
  },
  '3': {
    title: "라따뚜이",
    author: "By Chef Lee",
    time: "45분",
    rating: "4.7 ★★★★★ (7,456)",
    ingredients: [
      "가지 2개",
      "호박 2개",
      "토마토 4개",
      "양파 1개",
      "파프리카 2개",
      "올리브오일 4큰술",
      "마늘 3쪽",
      "허브드프로방스 1작은술",
      "소금, 후추 약간"
    ],
    preparation: [
      "모든 채소를 둥글게 슬라이스합니다.",
      "토마토소스를 만들어 오븐 용기 바닥에 깔아줍니다.",
      "슬라이스한 채소들을 색깔별로 번갈아가며 둥글게 돌려담습니다.",
      "올리브오일을 뿌리고 허브드프로방스, 소금, 후추를 뿌립니다.",
      "180도로 예열된 오븐에서 40분간 구워줍니다.",
      "완성된 라따뚜이를 그릇에 담아 서빙합니다."
    ]
  },
  '4': {
    title: "컵케이크",
    author: "By Chef Yoon",
    time: "40분",
    rating: "4.9 ★★★★★ (6,789)",
    ingredients: [
      "박력분 200g",
      "설탕 180g",
      "달걀 2개",
      "우유 120ml",
      "버터 100g",
      "베이킹파우더 1작은술",
      "바닐라익스트랙 1작은술",
      "휘핑크림 200g",
      "food coloring (선택사항)"
    ],
    preparation: [
      "오븐을 180도로 예열합니다.",
      "버터와 설탕을 크림화할 때까지 섞어줍니다.",
      "달걀을 하나씩 넣어가며 잘 섞어줍니다.",
      "체 친 박력분과 베이킹파우더를 번갈아가며 우유와 함께 섞어줍니다.",
      "바닐라익스트랙을 넣고 잘 섞어줍니다.",
      "컵케이크 틀에 반죽을 채우고 20-25분간 구워줍니다.",
      "식힌 후 휘핑크림으로 데코레이션합니다."
    ]
  }
};

const Recipe = ({ route, navigation }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { recipeId } = route.params || {};
  const recipeData = recipesDetailData[recipeId];

  // useEffect를 사용하여 navigation options 설정
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            setIsBookmarked(!isBookmarked);
            // 여기에 북마크 저장 로직 추가
          }}
          style={{ marginRight: 16 }}
        >
          <Image
            source={ScrapTabIcon}
            style={{
              width: 15,
              height: 22,
              tintColor: isBookmarked ? '#FD802D' : '#878787'
            }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, isBookmarked]);

  if (!recipeData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>레시피를 찾을 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={recipeImages[recipeId]}
        style={styles.recipeImage}
      />
      <View style={styles.recipeHeader}>
        <Text style={styles.title}>{recipeData.title}</Text>
        <Text style={styles.author}>{recipeData.author}</Text>
        <Text style={styles.time}>{recipeData.time}</Text>
        <Text style={styles.rating}>{recipeData.rating}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>재료</Text>
        {recipeData.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.ingredient}>{ingredient}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>조리 방법</Text>
        {recipeData.preparation.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <Text style={styles.stepNumber}>Step {index + 1}</Text>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 0,
  },
  recipeHeader: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    color: '#AAAAAA',
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    color: '#AAAAAA',
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    color: '#AAAAAA',
  },
  section: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  ingredient: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  stepContainer: {
    marginBottom: 16,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  stepText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  recipeImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#121212',
  },
});

export default Recipe;
