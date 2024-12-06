import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    Image,
    Platform,
    StatusBar,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// 임시 이미지 데이터 (실제 구현 시 각 레시피의 단계별 이미지로 교체 필요)
const stepImages = {
    '1': [
        require('../assets/carbonara_step1.jpg'),
        require('../assets/carbonara_step2.jpg'),
        require('../assets/carbonara_step3.jpg'),
        require('../assets/carbonara_step4.jpg'),
        require('../assets/carbonara_step5.jpg'),
    ],
    // 다른 레시피의 이미지들도 여기에 추가
};

// 카르보나라 레시피의 단계별 아이콘 추가
const carbonaraStepIcons = {
  '1': {
    1: [
      require('../assets/carbonara/베이컨.png'),
      require('../assets/carbonara/양파.png'),
      require('../assets/carbonara/파슬리.png'),
    ],
    2: [
      require('../assets/carbonara/면.png'),
      require('../assets/carbonara/올리브유.png'),
    ],
    3: [
      require('../assets/carbonara/베이컨.png'),
      require('../assets/carbonara/양파.png'),
      require('../assets/carbonara/생크림.png'),
      require('../assets/carbonara/우유.png'),
    ],
    4: [
      require('../assets/carbonara/면.png'),
      require('../assets/carbonara/계란.png'),
    ],
    5: [
      require('../assets/carbonara/치즈.png'),
      require('../assets/carbonara/파슬리.png'),
    ],
  }
};

const CookingSteps = ({ route }) => {
    const { recipeId, recipeData } = route.params;
    const [activeSlide, setActiveSlide] = useState(0);
    const stepsScrollViewRef = useRef(null);
    const [stepLayouts, setStepLayouts] = useState([]);

    // 스크롤 위치 계산 및 실행
    useEffect(() => {
        if (stepsScrollViewRef.current && stepLayouts[activeSlide]) {
            const statusBarHeight = Platform.OS === 'ios' ? 47 : StatusBar.currentHeight || 0;
            const headerHeight = Platform.OS === 'ios' ? 44 : 56;
            const sliderHeight = 300;
            const topOffset = statusBarHeight + headerHeight + sliderHeight - 300;

            stepsScrollViewRef.current.scrollTo({
                y: stepLayouts[activeSlide].y - topOffset,
                animated: true,
            });
        }
    }, [activeSlide, stepLayouts]);

    const handleStepLayout = (index, event) => {
        const { y, height } = event.nativeEvent.layout;
        setStepLayouts(prev => {
            const newLayouts = [...prev];
            newLayouts[index] = { y, height };
            return newLayouts;
        });
    };

    const handleSlideChange = (event) => {
        const slide = Math.floor(
            event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width
        );
        if (activeSlide !== slide) {
            setActiveSlide(slide);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.sliderContainer}>
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleSlideChange}
                    scrollEventThrottle={16}
                >
                    {stepImages[recipeId]?.map((image, index) => (
                        <Image
                            key={index}
                            source={image}
                            style={styles.sliderImage}
                            resizeMode="cover"
                        />
                    ))}
                </ScrollView>
                <View style={styles.pagination}>
                    {stepImages[recipeId]?.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.paginationDot,
                                index === activeSlide && styles.paginationDotActive,
                            ]}
                        />
                    ))}
                </View>
            </View>
            <ScrollView
                ref={stepsScrollViewRef}
                style={styles.stepsContainer}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {recipeData.preparation.map((step, index) => (
                    <View
                        key={index}
                        style={[
                            styles.stepWrapper,
                            index === activeSlide && styles.activeStepWrapper
                        ]}
                        onLayout={(event) => handleStepLayout(index, event)}
                    >
                        <Text style={styles.stepTime}>
                            {index === 0 ? "6:45" : 
                             index === 1 ? "16:27" : 
                             index === 2 ? "25:15" :
                             index === 3 ? "31:20" : "34:18"}
                        </Text>
                        {index !== recipeData.preparation.length - 1 && (
                            <View style={styles.timelineDot} />
                        )}
                        <View
                            style={[
                                styles.stepContainer,
                                index === activeSlide && styles.activeStepContainer
                            ]}
                        >
                            <Text style={[
                                styles.stepNumber,
                                index === activeSlide && styles.activeStepNumber
                            ]}>
                                Step {index + 1}
                            </Text>
                            
                            {/* 아이콘 추가 */}
                            {(recipeId === 1 || recipeId === '1') && carbonaraStepIcons['1'][index + 1] && (
                                <View style={styles.iconsContainer}>
                                    {carbonaraStepIcons['1'][index + 1].map((icon, iconIndex) => (
                                        <Image
                                            key={iconIndex}
                                            source={icon}
                                            style={styles.stepIcon}
                                            resizeMode="contain"
                                        />
                                    ))}
                                </View>
                            )}

                            <Text style={[
                                styles.stepText,
                                index === activeSlide && styles.activeStepText
                            ]}>
                                {step}
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
            
            {/* 문의 아이콘 추가 */}
            <Image 
                source={require('../assets/문의아이콘.png')}
                style={styles.inquiryIcon}
                resizeMode="contain"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    sliderContainer: {
        height: 300,
        backgroundColor: '#242225',
    },
    sliderImage: {
        width: width,
        height: 300,
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 16,
        alignSelf: 'center',
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FFFFFF50',
        marginHorizontal: 4,
    },
    paginationDotActive: {
        backgroundColor: '#FFFFFF',
    },
    stepsContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingTop: 24,
        paddingBottom: Platform.OS === 'android' ? 150 : 200, // 안드로이드는 하단 여백 조정
    },
    stepWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 32,
        paddingHorizontal: 16,
        position: 'relative',
    },
    activeStepWrapper: {
        // 활성 스텝의 wrapper에 대한 스타일
    },
    stepTime: {
        width: 45,
        fontSize: 14,
        color: '#878787',
        marginRight: 15,
        marginTop: 20,
        position: 'relative',
    },
    stepContainer: {
        flex: 1,
        backgroundColor: '#242225',
        borderRadius: 12,
        padding: 16,
        opacity: 0.5,
        transform: [{ scale: 0.98 }],
    },
    activeStepContainer: {
        opacity: 1,
        transform: [{ scale: 1 }],
    },
    stepNumber: {
        fontSize: 20,
        fontWeight: '600',
        color: '#FFFFFF80',
        marginBottom: 12,
    },
    activeStepNumber: {
        color: '#FFFFFF',
    },
    stepText: {
        fontSize: 13,
        color: '#FFFFFF80',
        lineHeight: 20,
        marginTop: 2,
    },
    activeStepText: {
        color: '#FFFFFF',
    },
    timelineDot: {
        position: 'absolute',
        left: 37,
        top: 45,
        bottom: -45,
        width: 1,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#878787',
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 4,
        marginBottom: 4,
        gap: 12,
        padding: 2,
    },
    stepIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#2A2A2A',
        resizeMode: 'contain',
    },
    inquiryIcon: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 50,
        height: 50,
        zIndex: 999,
    },
});

export default CookingSteps;
