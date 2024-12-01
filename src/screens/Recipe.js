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
  '1': require('../assets/Spaghetti_Carbonara.png'),
  '2': require('../assets/Cast-Iron_Steak.png'),
  '3': require('../assets/Ratatouille.png'),
  '1000': require('../assets/Strawberry_Pavlova.png'),
  '1001': require('../assets/Peanut_Butter_Blossoms.png'),
  '1002': require('../assets/Magnolia_Bakerys_Cupcakes.png'),
};

// 레시피 상세 데이터
const recipesDetailData = {
  '1': {
    title: "Spaghetti Carbonara",
    author: "By Ian Fisher",
    time: "30 minutes",
    rating: "5 ★★★★★ (12,897)",
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
    title: "Cast-Iron Steak",
    author: "By Julia Moskin",
    time: "1 hour",
    rating: "5 ★★★★★ (5,556)",
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
      "로즈마리와 마늘, 버터를 넣고 버터를 스테이크 위에 끼얹어가며 1분 더 구워줍니다."
    ]
  },
  '3': {
    title: "Ratatouille",
    author: "By Melissa Clark",
    time: "3 hour",
    rating: "5 ★★★★★ (3,110)",
    ingredients: [
      "가지 2개",
      "호박 2개",
      "토마토 4개",
      "양파 1개",
      "파프리카 2개",
      "올리브오일 4큰술",
      "마늘 3쪽",
      "허브드프로방스 1작은술"
    ],
    preparation: [
      "모든 채소를 둥글게 슬라이스합니다.",
      "토마토소스를 만들어 오븐 용기 바닥에 깔아줍니다.",
      "슬라이스한 채소들을 색깔별로 번갈아가며 둥글게 돌려담습니다.",
      "올리브오일을 뿌리고 허브드프로방스, 소금, 후추를 뿌립니다.",
      "180도로 예열된 오븐에서 40분간 구워줍니다."
    ]
  },
  '1000': {
    title: "Strawberry Pavlova",
    author: "By Nigella Lawson",
    time: "2 hours",
    rating: "5 ★★★★★ (2,941)",
    ingredients: [
      "달걀 흰자 4개",
      "설탕 250g",
      "옥수수전분 2큰술",
      "식초 1작은술",
      "바닐라 익스트랙트 1작은술",
      "생크림 500ml",
      "신선한 딸기 500g"
    ],
    preparation: [
      "오븐을 120°C로 예열합니다.",
      "달걀 흰자를 단단한 거품이 될 때까지 휘핑합니다.",
      "설탕을 조금씩 넣어가며 계속 휘핑합니다.",
      "마지막으로 전분, 식초, 바닐라를 넣고 섞어줍니다.",
      "베이킹 시트 위에 원형으로 펴 바릅니다.",
      "1시간 30분 동안 굽습니다."
    ]
  },
  '1001': {
    title: "Peanut Butter Blossoms",
    author: "By the Gerrero family",
    time: "35 minutes",
    rating: "5 ★★★★★ (6,913)",
    ingredients: [
      "땅콩버터 1컵",
      "버터 1/2컵",
      "설탕 3/4컵",
      "달걀 1개",
      "바닐라 익스트랙트 1작은술",
      "밀가루 1과 1/2컵",
      "초콜릿 키스 24개"
    ],
    preparation: [
      "오븐을 175°C로 예열합니다.",
      "땅콩버터와 버터를 크림화합니다.",
      "설탕을 넣고 섞은 후 달걀과 바닐라를 넣어 섞습니다.",
      "밀가루를 넣고 반죽을 만듭니다.",
      "작은 공 모양으로 만들어 굽습니다.",
      "구운 직후 초콜릿 키스를 가운데 눌러 넣습니다."
    ]
  },
  '1002': {
    title: "Magnolia Bakery's Cupcakes",
    author: "By Susan Campos",
    time: "45 minutes",
    rating: "5 ★★★★★ (3,139)",
    ingredients: [
      "밀가루 1과 1/2컵",
      "베이킹파우더 1과 1/2작은술",
      "소금 1/4작은술",
      "버터 1/2컵",
      "설탕 1컵",
      "달걀 2개",
      "바닐라 익스트랙트 1/2작은술",
      "우유 1/2컵"
    ],
    preparation: [
      "오븐을 180°C로 예열합니다.",
      "건조 재료를 체에 내려 섞어둡니다.",
      "버터와 설탕을 크림화합니다.",
      "달걀을 하나씩 넣어가며 섞습니다.",
      "건조 재료와 우유를 번갈아가며 섞습니다.",
      "컵케이크 틀에 나누어 담아 20-25분간 굽습니다."
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
