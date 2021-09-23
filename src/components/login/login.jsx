import React, { useEffect } from "react";
import { useHistory } from "react-router";
import Footer from "../footer/footer";
import Header from "../header/header";
import styles from "./login.module.css";

const Login = ({ authService }) => {
  // maker 페이지로 이동하면서 로그인한 사용자의 유니크한 uid 정보를 같이 보냄
  const history = useHistory();
  const goToMaker = (userID) => {
    history.push({
      pathname: "/maker",
      state: { id: userID }
    });
  };

  const onLogin = (event) => {
    authService
      .login(event.currentTarget.textContent) // 버튼 누른 곳의 text 가져오기
      .then((data) => goToMaker(data.user.uid)); // 로그인 성공 후 객체를 data로 받고 그 안의 uid 추출
  };

  // componentDidMount, componentDidUpdate와 동일한 역할
  // 로그인 상태라면 uid goToMaker 함수 인자로 넘겨줌
  useEffect(() => {
    authService.onAuthChange((user) => {
      user && goToMaker(user.uid);
    });
  });

  return (
    <section className={styles.login}>
      <Header />
      <section>
        <h1 className={styles.msg}>Login</h1>
        <ul className={styles.list}>
          <li className={styles.item}>
            <button className={styles.button} onClick={onLogin}>
              Google
            </button>
          </li>
          <li className={styles.item}>
            <button className={styles.button} onClick={onLogin}>
              Github
            </button>
          </li>
        </ul>
      </section>
      <Footer />
    </section>
  );
};

export default Login;
