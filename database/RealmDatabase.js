import Realm from 'realm';
import { Image } from 'react-native';

// Scrap 스키마 정의
const ScrapSchema = {
  name: 'Scrap',
  properties: {
    id: 'int',           // 스크랩 ID
    recipeId: 'int',      // 레시피 ID
    title: 'string',      // 제목
    author: 'string',     // 작성자
    cookTime: 'string',   // 요리 시간
    image: 'string',      // 이미지 경로
    createdAt: 'date',    // 생성 날짜
  },
  primaryKey: 'id',
};

// Realm 데이터베이스 설정
const realm = new Realm({
  schema: [ScrapSchema],
  schemaVersion: 1, // 스키마 버전을 1로 증가
  migration: (oldRealm, newRealm) => {
    // 이전 버전의 스크랩 데이터를 가져옴
    const oldScraps = oldRealm.objects('Scrap');
    const newScraps = newRealm.objects('Scrap');

    // createdAt이 없는 데이터에 대해 현재 시간 설정
    for (let i = 0; i < oldScraps.length; i++) {
      if (!newScraps[i].createdAt) {
        newScraps[i].createdAt = new Date();
      }
    }
  }
});

export default realm;

// Realm 데이터 로그 출력 함수
export function logRealmData() {
  const scraps = realm.objects('Scrap');
  console.log('Scrap Data:', JSON.stringify(scraps, null, 2));
}

/**
 * 스크랩 데이터 추가
 * @param {int} recipe - 스크랩할 레시피 ID
 */
export const addScrap = (recipe) => {
  try {
    realm.write(() => {
      const newScrap = {
        id: recipe.id,
        title: recipe.title,
        author: recipe.author,
        cookTime: recipe.cookTime,
        image: recipe.image.toString(),
        createdAt: new Date(),
      };
      console.log('Adding new scrap with data:', newScrap); // 추가되는 데이터 확인
      realm.create('Scrap', newScrap);
    });
  } catch (error) {
    console.error('Error adding scrap:', error);
  }
};

/**
 * 스크랩 데이터 삭제
 * @param {int} recipeId - 삭제할 레시피 ID
 */
export function deleteScrap(recipeId) {
  try {
    realm.write(() => {
      const scrapToDelete = realm.objects('Scrap').filtered(`recipeId == ${recipeId}`);
      if (scrapToDelete.length > 0) {
        realm.delete(scrapToDelete);
        console.log(`Scrap deleted for recipeId: ${recipeId}`);
      } else {
        console.log(`No scrap found for recipeId: ${recipeId}`);
      }
    });
  } catch (error) {
    console.error('Error deleting scrap:', error);
  }
}

/**
 * 모든 스크랩 데이터 조회
 * @returns {Array} - 스크랩된 레시피 데이터 배열
 */
export const getAllScraps = () => {
  const allScraps = realm.objects('Scrap');
  console.log('All scraps before sorting:', 
    allScraps.map(s => ({
      id: s.id,
      title: s.title,
      createdAt: s.createdAt
    }))
  );
  
  const sortedScraps = allScraps.sorted('createdAt', true);
  console.log('Scraps after sorting:', 
    sortedScraps.map(s => ({
      id: s.id,
      title: s.title,
      createdAt: s.createdAt
    }))
  );
  
  return sortedScraps;
};

/**
 * 특정 레시피 스크랩 여부 확인
 * @param {int} recipeId - 확인할 레시피 ID
 * @returns {boolean} - 스크랩 여부
 */
export function isScrapped(recipeId) {
  const scraps = realm.objects('Scrap').filtered(`recipeId == ${recipeId}`);
  return scraps.length > 0;
}

// 현재 저장된 모든 데이터 확인을 위한 함수 추가
export const checkAllData = () => {
  const scraps = realm.objects('Scrap');
  console.log('Current database state:', 
    scraps.map(s => ({
      id: s.id,
      title: s.title,
      createdAt: s.createdAt,
      createdAtType: typeof s.createdAt
    }))
  );
};
