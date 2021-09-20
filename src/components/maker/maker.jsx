import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Editor from "../editor/editor";
import Footer from "../footer/footer";
import Header from "../header/header";
import Preview from "../preview/preview";
import styles from "./maker.module.css";

const Maker = ({ FileInput, authService }) => {
  const [cards, setCards] = useState({
    1: {
      id: "1",
      name: "Jimin",
      company: "Hive",
      theme: "dark",
      title: "software engineer",
      email: "jimin@gmail.com",
      message: "hello~",
      fileURL: null
    },
    2: {
      id: "2",
      name: "RM",
      company: "Hive",
      theme: "light",
      title: "software engineer",
      email: "RM@gmail.com",
      message: "hello~",
      fileURL: null
    },
    3: {
      id: "3",
      name: "JungKook",
      company: "Hive",
      theme: "colorful",
      title: "software engineer",
      email: "jk@gmail.com",
      message: "BTS",
      fileURL: "jk.png"
    }
  });
  const history = useHistory();

  const onLogout = () => {
    authService.logout();
  };

  // 로그아웃 상태라면 메인 페이지로 이동
  useEffect(() => {
    authService.onAuthChange((user) => {
      if (!user) {
        history.push("/");
      }
    });
  });

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
  };

  // 명함 삭제 함수
  const deleteCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      delete updated[card.id];
      return updated;
    });
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
