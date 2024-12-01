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

// // Realm 데이터베이스 설정 (Migration 추가)
// const realm = new Realm({
//   schema: [ScrapSchema],
//   schemaVersion: 1, // 스키마 버전 숫자를 변경할 때마다 증가
//   migration: (oldRealm, newRealm) => {
//     const oldObjects = oldRealm.objects('Scrap');
//     const newObjects = newRealm.objects('Scrap');
//
//     // 새 속성에 기본값 추가
//     for (let i = 0; i < oldObjects.length; i++) {
//       newObjects[i].title = oldObjects[i].title || '';
//       newObjects[i].author = oldObjects[i].author || '';
//       newObjects[i].cookTime = oldObjects[i].cookTime || '';
//       newObjects[i].image = oldObjects[i].image || '';
//     }
//   },
// });

// // Realm 데이터베이스 설정
const realm = new Realm({ schema: [ScrapSchema] });

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
export function addScrap(recipe) {
  try {
    realm.write(() => {
      const newScrapId = realm.objects('Scrap').length + 1; // 새로운 ID 생성
      const resolvedImage = Image.resolveAssetSource(recipe.image).uri; // 이미지 경로 변환
      realm.create('Scrap', {
        id: newScrapId,
        recipeId: recipe.id,
        title: recipe.title,
        author: recipe.author,
        cookTime: recipe.cookTime,
        image: resolvedImage, // 이미지 경로를 문자열로 저장
        createdAt: new Date(),
      });
    });
    console.log(`Scrap added: ${recipe.title}`);
  } catch (error) {
    console.error('Error adding scrap:', error);
  }
}

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
export function getAllScraps() {
  try {
    const scraps = realm.objects('Scrap');
    const scrapList = scraps.map(scrap => ({
      id: scrap.recipeId,
      title: scrap.title,
      author: scrap.author,
      cookTime: scrap.cookTime,
      image: scrap.image,
      createdAt: scrap.createdAt,
    }));
    return scrapList;
  } catch (error) {
    console.error('Error fetching scraps:', error);
    return [];
  }
}

/**
 * 특정 레시피 스크랩 여부 확인
 * @param {int} recipeId - 확인할 레시피 ID
 * @returns {boolean} - 스크랩 여부
 */
export function isScrapped(recipeId) {
  const scraps = realm.objects('Scrap').filtered(`recipeId == ${recipeId}`);
  return scraps.length > 0;
}
