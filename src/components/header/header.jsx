import React from "react";
import styles from "./header.module.css";

const Header = ({ onLogout }) => (
  <header className={styles.header}>
    {/* onLogout이 true로 넘어온다면 Logout 버튼을 보여줌 */}
    {onLogout && (
      <button className={styles.logout} onClick={onLogout}>
        Logout
      </button>
    )}
    <img className={styles.logo} src="/images/logo.png" alt="logo" />
    <h1 className={styles.title}>Business Card Maker</h1>
  </header>
);

export default Header;
