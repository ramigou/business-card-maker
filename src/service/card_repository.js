import { getDatabase, ref, set, remove, onValue } from "firebase/database";

class CardRepository {
  // 새로 저장하기
  saveCard(userId, card) {
    set(ref(getDatabase(), `${userId}/cards/${card.id}`), card);
  }

  // 지우기
  removeCard(userId, card) {
    remove(ref(getDatabase(), `${userId}/cards/${card.id}`));
  }

  // 업데이트 될 때마다 새로 읽기
  syncCards(userId, onUpdate) {
    const starCountRef = ref(getDatabase(), `${userId}/cards`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      // 데이터가 업데이트 될 때마다 콜백함수가 호출됨
      data && onUpdate(data);
    });
    return () => ref.off();
  }
}

export default CardRepository;
