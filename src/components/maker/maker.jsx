import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Editor from "../editor/editor";
import Footer from "../footer/footer";
import Header from "../header/header";
import Preview from "../preview/preview";
import styles from "./maker.module.css";

const Maker = ({ authService }) => {
  const [cards, setCards] = useState([
    {
      id: "1",
      name: "Jimin",
      company: "Hive",
      theme: "dark",
      title: "software engineer",
      email: "jimin@gmail.com",
      message: "hello~",
      fileURL: null
    },
    {
      id: "2",
      name: "RM",
      company: "Hive",
      theme: "light",
      title: "software engineer",
      email: "RM@gmail.com",
      message: "hello~",
      fileURL: null
    },
    {
      id: "3",
      name: "JungKook",
      company: "Hive",
      theme: "colorful",
      title: "software engineer",
      email: "jk@gmail.com",
      message: "BTS",
      fileURL: "jk.png"
    }
  ]);
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

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor cards={cards} />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
