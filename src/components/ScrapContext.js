import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScrapContext = createContext();

export const ScrapProvider = ({ children }) => {
    const [scrappedRecipes, setScrappedRecipes] = useState([]);

    // 앱이 시작될 때 저장된 스크랩 데이터 로드
    useEffect(() => {
        loadScrappedRecipes();
    }, []);

    // AsyncStorage에서 스크랩 데이터 로드
    const loadScrappedRecipes = async () => {
        try {
            const savedScraps = await AsyncStorage.getItem('scrappedRecipes');
            if (savedScraps) {
                setScrappedRecipes(JSON.parse(savedScraps));
            }
        } catch (error) {
            console.error('Error loading scrapped recipes:', error);
        }
    };

    // AsyncStorage에 스크랩 데이터 저장
    const saveScrappedRecipes = async (recipes) => {
        try {
            await AsyncStorage.setItem('scrappedRecipes', JSON.stringify(recipes));
        } catch (error) {
            console.error('Error saving scrapped recipes:', error);
        }
    };

    const toggleScrap = async (recipeId) => {
        setScrappedRecipes(prev => {
            const newScraps = prev.includes(recipeId)
                ? prev.filter(id => id !== recipeId)
                : [...prev, recipeId];

            // 상태 변경 후 AsyncStorage에 저장
            saveScrappedRecipes(newScraps);
            return newScraps;
        });
    };

    return (
        <ScrapContext.Provider value={{
            scrappedRecipes,
            toggleScrap,
            isScraped: (id) => scrappedRecipes.includes(id)
        }}>
            {children}
        </ScrapContext.Provider>
    );
};

export const useScrap = () => {
    const context = useContext(ScrapContext);
    if (!context) {
        throw new Error('useScrap must be used within a ScrapProvider');
    }
    return context;
};