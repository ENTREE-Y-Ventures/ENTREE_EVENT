import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useScrap } from '../components/ScrapContext';
import Feather from 'react-native-vector-icons/Feather';
import Voice from '@react-native-voice/voice';

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
    title: "베이컨 까르보나라",
    author: "서현마미",
    time: "35분",
    rating: "5 ★★★★★ (12,897)",
    ingredients: [
      "스파게티 면 400g",
      "베이컨 200g",
      "달걀 2개",
      "양파 1/2개",
      "파마산 치즈 1컵",
      "페코리노 치즈 1/2컵",
      "올리브오일 2큰술",
      "파슬리 3꼬집"
    ],
    preparation: [
      "베이컨은 적당한 크기로 잘라서 준비하고, 양파는 얇게 슬라이스한다. 달걀은 노른자만 따로 분리해서 준비하고, 생파슬리가 있다면 잘게 다진다.",
      "냄비에 1L의 물과 10g의 소금을 넣어서 팔팔 끓이다가 준비한 스파게티면을 넣고 8분~10분 동안 삶는다. 다 삶아지면 체에 밭쳐서 물기를 빼준다",
      "달군 팬에 올리브유를 둘러주고, 베이컨과 양파를 볶으며 익힌다. 양파가 투명하게 익으면 생크림과 우유를 넣어서 같이 끓인다.",
      "소스가 끓으면 면을 넣고 섞는다. 살짝 되직해지면 불을 끄고 달걀 노른자를 넣고 재빨리 저어서 뭉친 게 없도록 한다.",
      "준비한 파마산 치즈가루와 파슬리를 넣고 섞어준 후, 그대로 그릇에 담는다."
    ]
  },
  '2': {
    title: "포도소스 스테이크",
    author: "줄리아의 레시피",
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
    title: "라따뚜이",
    author: "요리왕",
    time: "3시간",
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
    title: "스트로베리 파블로바",
    author: "이깡",
    time: "2시간",
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
    title: "피넛버터 카라멜 쿠키",
    author: "요알남",
    time: "35분",
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
    title: "마놀라의 펜케이크",
    author: "수잔",
    time: "45분",
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

// 카르보나라 레시피의 단계별 아이콘
const carbonaraStepIcons = {
  '1': {
    1: [
      require('../assets/carbonara/베이컨.png'),
      require('../assets/carbonara/양파.png'),
      require('../assets/carbonara/계란.png'),
      require('../assets/carbonara/파슬리.png'),
    ],
    2: [
      require('../assets/carbonara/면.png'),
    ],
    3: [
      require('../assets/carbonara/올리브유.png'),
      require('../assets/carbonara/베이컨.png'),
      require('../assets/carbonara/양파.png'),
      require('../assets/carbonara/생크림.png'),
      require('../assets/carbonara/우유.png'),
    ],
    4: [
      require('../assets/carbonara/계란.png'),
    ],
    5: [
      require('../assets/carbonara/치즈.png'),
      require('../assets/carbonara/파슬리.png'),
    ],
  }
};

// 재료 아이콘 매핑 추가
const ingredientIcons = {
  '스파게티': require('../assets/carbonara/면.png'),
  '베이컨': require('../assets/carbonara/베이컨.png'),
  '올리브오일': require('../assets/carbonara/올리브유.png'),
  '달걀': require('../assets/carbonara/계란.png'),
  '양파': require('../assets/carbonara/양파.png'),
  '파마산': require('../assets/carbonara/치즈.png'),
  '페코리노': require('../assets/carbonara/치즈.png'),
  '파슬리': require('../assets/carbonara/파슬리.png'),
};

// 재료 아이콘별 쿠팡 링크 매핑 수정
const ingredientLinks = {
  '베이컨': 'https://www.coupang.com/vp/products/7863433926?itemId=21463922944&vendorItemId=88518342003',
  '스파게티': 'https://www.coupang.com/vp/products/6444836231?itemId=19492096&vendorItemId=85320856065&pickType=COU_PICK&q=%EC%8A%A4%ED%8C%8C%EA%B2%8C%ED%8B%B0%EB%A9%B4&itemsCount=35&searchId=7e9ff04d6d4747a286c907475cf8484e&rank=1&searchRank=1&isAddedCart=',
  '올리브오일': 'https://www.coupang.com/vp/products/5148727355?itemId=23666716119&vendorItemId=77367783821&q=%EC%98%AC%EB%A6%AC%EB%B8%8C%EC%98%A4%EC%9D%BC&itemsCount=36&searchId=f421abc4466a4a6caa9c41803006a150&rank=3&searchRank=3&isAddedCart=',
  '달걀': 'https://www.coupang.com/vp/products/1160574750?itemId=2137165485&vendorItemId=70135597923&q=%EB%8B%AC%EA%B1%80&itemsCount=36&searchId=764b87bc741a47229393206bcc46a39e&rank=6&searchRank=6&isAddedCart=',
  '양파': 'https://www.coupang.com/vp/products/1074470755?itemId=2573048645&vendorItemId=70565380605&pickType=COU_PICK&q=%EC%96%91%ED%8C%8C&itemsCount=36&searchId=9177476ca7e6461f9ac5c8955105e9f4&rank=0&searchRank=0&isAddedCart=',
  '파마산': 'https://www.coupang.com/vp/products/6793410516?itemId=4839780&vendorItemId=3000580066&q=%ED%8C%8C%EB%A7%88%EC%82%B0&itemsCount=36&searchId=3982a6d318514c8c8a4427c10340669b&rank=0&searchRank=0&isAddedCart=',
  '페코리노': 'https://www.coupang.com/vp/products/1119361454?itemId=2084835786&vendorItemId=70083851046&pickType=COU_PICK&q=%ED%8E%98%EC%BD%94%EB%A6%AC%EB%85%B8&itemsCount=36&searchId=c9a34dbd40304ba38e8ac04965a24abc&rank=0&searchRank=0&isAddedCart=',
  '파슬리': 'https://www.coupang.com/vp/products/8167360545?itemId=15183051084&vendorItemId=3000058950&q=%ED%8C%8C%EC%8A%AC%EB%A6%AC&itemsCount=36&searchId=cb7cb257816542229e4017a11480caa3&rank=1&searchRank=1',
};

const Recipe = ({ route, navigation }) => {
  const { recipeId } = route.params || {};
  
  // 디버깅 로그 추가
  console.log('Route Params:', route.params);
  console.log('Recipe ID from params:', recipeId);
  
  const { isScraped, toggleScrap } = useScrap();
  const isBookmarked = isScraped(recipeId);

  const [activeTab, setActiveTab] = useState('조리 방법');
  const [currentStep, setCurrentStep] = useState(0);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults; //음성 인식 리스너

    const startVoiceRecognition = () => {
      console.log("탭 포커스됨");
      if (activeTab === '단계별 조리') {
        startListening(); // 음성 인식 시작
        console.log("음성 인식 시작");
      }
    };

    const stopVoiceRecognition = () => {
      console.log("탭 포커스 해제됨");
      stopListening(); // 음성 인식 중지
      console.log("음성 인식 종료");
    };

    // 네비게이션 이벤트 등록
    const focusListener = navigation.addListener('focus', startVoiceRecognition);
    const blurListener = navigation.addListener('blur', stopVoiceRecognition);

    return () => {
      // 이벤트 리스너 정리
      focusListener();
      blurListener();
    };
  }, [navigation, activeTab]);

  // 음성 인식 상태 확인용 코드
  useEffect(() => {
    console.log("isListening 상태:", isListening);
  }, [isListening]);

  const startListening = async () => {
    try {
      console.log("음성 인식 시작 호출");
      setIsListening(true);
      await Voice.start('ko-KR'); // 한국어로 음성 인식 시작
    } catch (error) {
      console.error(error);
    }
  };

  const stopListening = async () => {
    try {
      setIsListening(false);
      await Voice.stop(); // 음성 인식 중지
    } catch (error) {
      console.error(error);
    }
  };

  const onSpeechResults = (event) => {
    const speech = event.value[0]?.toLowerCase();

    if (speech.includes('다음')) {
      handleNextStep();
    } else if (speech.includes('이전')) {
      handlePreviousStep();
    }
  };

  const handleNextStep = () => {
    if (currentStep < recipeData.preparation.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => toggleScrap(recipeId)}
          style={{ marginRight: 16, padding: 8 }}
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
  }, [navigation, isBookmarked, recipeId]);

  const recipeData = recipesDetailData[recipeId];

  if (!recipeData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>레시피를 찾을 수 없습니다.</Text>
      </View>
    );
  }

  // Recipe 컴포넌트 내부에서 링크 처리 함수 추가
  const handleIconPress = (ingredientKey) => {
    const link = ingredientLinks[ingredientKey];
    if (link) {
      Linking.openURL(link);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
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

        <View style={[styles.section, { marginBottom: 20 }]}>
          <Text style={styles.sectionTitle}>재료</Text>
          <View style={styles.ingredientsContainer}>
            <View style={styles.divider} />
            {recipeData.ingredients.map((ingredient, index) => {
              const [name, amount] = ingredient.split(' ').reduce((acc, part) => {
                if (/[0-9]/.test(part)) {
                  acc[1] = (acc[1] ? acc[1] + ' ' : '') + part;
                } else {
                  acc[0] = (acc[0] ? acc[0] + ' ' : '') + part;
                }
                return acc;
              }, ['', '']);

              return (
                <View key={index} style={styles.ingredientRow}>
                  <View style={styles.ingredientContent}>
                    {Object.entries(ingredientIcons).map(([key, icon]) => {
                      if (name.includes(key)) {
                        return (
                          <TouchableOpacity
                            key={key}
                            onPress={() => handleIconPress(key)}
                          >
                            <Image
                              source={icon}
                              style={[styles.ingredientIcon, styles.clickableIcon]}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        );
                      }
                      return null;
                    })}
                    <Text style={styles.ingredientName}>{name}</Text>
                    <Text style={styles.ingredientAmount}>{amount}</Text>
                  </View>
                  {index < recipeData.ingredients.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.tabSection}>
            <TouchableOpacity onPress={() => setActiveTab('조리 방법')}>
              {/*<Text style={styles.tabSectionTitle}>조리 방법</Text>*/}
              <Text
                style={[
                  styles.tabSectionTitle,
                  activeTab === '조리 방법' && styles.activeTab,
                ]}
              >
                조리 방법
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab('단계별 조리')}>
              {/*<Text style={styles.tabSectionTitle}>단계별 조리</Text>*/}
              <Text
                style={[
                  styles.tabSectionTitle,
                  activeTab === '단계별 조리' && styles.activeTab,
                ]}
              >
                단계별 조리
              </Text>
            </TouchableOpacity>
          </View>
          {activeTab === '조리 방법' ? (
            recipeData.preparation.map((step, index) => (
              <View 
                key={index} 
                style={[
                  styles.stepContainer,
                  index === recipeData.preparation.length - 1 && { marginBottom: 80 }  // 마지막 스텝에만 마진 추가
                ]}
              >
                <Text style={styles.stepNumber}>Step {index + 1}</Text>
                
                {(recipeId === 1 || recipeId === '1') && carbonaraStepIcons['1'][index + 1] && (
                  <View style={styles.iconsContainer}>
                    {carbonaraStepIcons['1'][index + 1].map((icon, iconIndex) => {
                      return Object.entries(ingredientIcons).map(([key, iconSrc]) => {
                        if (icon === iconSrc) {
                          return (
                            <TouchableOpacity
                              key={`step-${index}-icon-${iconIndex}-${key}`}
                              onPress={() => handleIconPress(key)}
                            >
                              <Image
                                source={icon}
                                style={[styles.stepIcon, styles.clickableIcon]}
                                resizeMode="contain"
                              />
                            </TouchableOpacity>
                          );
                        }
                        return null;
                      }).filter(Boolean);
                    })}
                  </View>
                )}
                
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))
          ) : (
            <View style={styles.voiceStepContainer}>
              <Text style={styles.stepNumber}>Step {currentStep + 1}</Text>
              
              {(recipeId === 1 || recipeId === '1') && carbonaraStepIcons['1'][currentStep + 1] && (
                <View style={styles.iconsContainer}>
                  {carbonaraStepIcons['1'][currentStep + 1].map((icon, index) => {
                    return Object.entries(ingredientIcons).map(([key, iconSrc]) => {
                      if (icon === iconSrc) {
                        return (
                          <TouchableOpacity
                            key={`current-step-${currentStep}-icon-${index}-${key}`}
                            onPress={() => handleIconPress(key)}
                          >
                            <Image
                              source={icon}
                              style={[styles.stepIcon, styles.clickableIcon]}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        );
                      }
                      return null;
                    }).filter(Boolean);
                  })}
                </View>
              )}

              <Text style={styles.stepText}>
                {recipeData.preparation[currentStep]}
              </Text>

              <View style={styles.navigationButtons}>
                <TouchableOpacity
                  onPress={handlePreviousStep}
                  disabled={currentStep === 0}
                  style={[
                    styles.navButton,
                    currentStep === 0 && styles.disabledButton,
                  ]}
                >
                  <Text style={styles.navButtonText}>이전</Text>
                  {/*<Feather name="chevron-left" size={24} style={styles.navButtonText} />*/}
                </TouchableOpacity>

                {/* 듣는 중 메시지 */}
                {isListening && (
                  <View style={styles.listeningStatus}>
                    <Text style={styles.listeningText}>듣는 중...</Text>
                  </View>
                )}

                <TouchableOpacity
                  onPress={handleNextStep}
                  disabled={currentStep === recipeData.preparation.length - 1}
                  style={[
                    styles.navButton,
                    currentStep === recipeData.preparation.length - 1 &&
                    styles.disabledButton,
                  ]}
                >
                  <Text style={styles.navButtonText}>다음</Text>
                  {/*<Feather name="chevron-right" size={24} style={styles.navButtonText} />*/}
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {activeTab === '조리 방법' && (
        <TouchableOpacity
          style={styles.cookButton}
          onPress={() => navigation.navigate('CookingSteps', {
            recipeId: recipeId,
            recipeData: recipeData
          })}
        >
          <Text style={styles.cookButtonText}>요리하기</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContainer: {
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
  tabSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabSectionTitle: {
    backgroundColor: '#242225',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: '#FD802D',
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
    backgroundColor: '#242225',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  voiceStepContainer: {
    marginBottom: 16,
    backgroundColor: '#242225',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
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
    marginTop: 4,
  },
  recipeImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#121212',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  navButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FD802D',
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#555555',
  },
  navButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  listeningStatus: {
    marginHorizontal: 16,
    alignItems: 'center',
  },
  listeningText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  cookButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#242225',
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#878787',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cookButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
    gap: 12,
    padding: 4,
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2A2A2A',
    resizeMode: 'contain',
  },
  ingredientsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    position: 'relative',
  },
  ingredientRow: {
    width: '45%',
    marginBottom: 16,
    position: 'relative',
  },
  ingredientContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 16,
    width: 1,
    backgroundColor: '#333333',
  },
  ingredientIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  ingredientName: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
  },
  ingredientAmount: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 8,
  },
  clickableIcon: {
    opacity: 1,
    transform: [{scale: 1}],
    // 터치 가능함을 나타내는 시각적 효과를 추가할 수 있습니다
  },
});

export default Recipe;
