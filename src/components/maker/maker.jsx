import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Editor from "../editor/editor";
import Footer from "../footer/footer";
import Header from "../header/header";
import Preview from "../preview/preview";
import styles from "./maker.module.css";

const Maker = ({ FileInput, authService, cardRepository }) => {
  const historyState = useHistory().state;
  const history = useHistory();
  const [cards, setCards] = useState({});
  const [userId, setUserId] = useState(historyState && historyState.id);

  // prop, state이 변경되어도 이 함수를 한번 호출해서 계속 사용한다는 의미
  // authService 변경되면 다시 호출하도록 설정
  const onLogout = useCallback(() => {
    authService.logout();
  }, [authService]);

  // 로직마다 useEffect를 따로 구현할 수 있다는 것이 장점
  // 마운트, 사용자 변경될 때마다 카드 읽어오기
  useEffect(() => {
    if (!userId) {
      return;
    }

    // 콜백 함수를 두번째 인자로 전달한 것
    const stopSync = cardRepository.syncCards(userId, (cards) => {
      setCards(cards);
    });

    // unmount 됐을 때 불필요한 네트워크 사용을 제어
    return () => {
      stopSync();
    };
  }, [userId, cardRepository]);

  // 로그아웃 상태라면 메인 페이지로 이동
  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        setUserId(user.uid);
        // console.log(`로그인 완료 userID: ${userId}`);
      } else {
        history.push("/");
      }
    });
  }, [authService, userId, history]);

  // 배열 형태로 접근해서 수정/삭제하면 성능이 좋지 않음
  // 따라서 state 자체를 id 값이 key, value가 card인 형태로 만들어서 접근

  // 명함 추가 & 수정 함수
  const createOrUpdateCard = (card) => {
    // const updated = { ...cards };
    // updated[card.id] = card;
    // setCards(updated);
    // 위와 같은 방법을 사용했을 떄 이전의 state가 더 오래된 것을 기준으로 업데이트해서
    // 동기적인 업데이트에 문제가 생길 수도 있음

    // 콜백 함수 형태로 업데이트 가능
    setCards((cards) => {
      const updated = { ...cards };
      // 기존에 없던 key라면 새로 추가가 됨
      updated[card.id] = card;
      return updated;
    });
    cardRepository.saveCard(userId, card);
  };

  // 명함 삭제 함수
  const deleteCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      delete updated[card.id];
      return updated;
    });
    cardRepository.removeCard(userId, card);
  };

  // 컴포넌트 prop을 우선으로 전달..
  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor
          FileInput={FileInput}
          cards={cards}
          addCard={createOrUpdateCard}
          updateCard={createOrUpdateCard}
          deleteCard={deleteCard}
        />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
