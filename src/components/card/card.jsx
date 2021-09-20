import React from "react";
import styles from "./card.module.css";

const Card = ({ card }) => {
  const DEFAULT_IMG = "/images/default_logo.png";
  const { name, company, theme, title, email, message, fileURL } = card;
  // 프로필 이미지가 없다면(null) 기본 이미지로 대체
  const url = fileURL || DEFAULT_IMG;
  return (
    <li className={`${styles.card} ${getStyles(theme)}`}>
      <img className={styles.avatar} src={url} alt={`${name}_profile_photo`} />
      <div className={styles.info}>
        <h1 className={styles.name}>{name}</h1>
        <p className={styles.company}>{company}</p>
        <p className={styles.title}>{title}</p>
        <p className={styles.email}>{email}</p>
        <p className={styles.message}>{message}</p>
      </div>
    </li>
  );
};

// theme별로 카드의 색상을 정의해주는 함수
function getStyles(theme) {
  switch (theme) {
    case "dark":
      return styles.dark;
    case "light":
      return styles.light;
    case "colorful":
      return styles.colorful;
    default:
      throw new Error(`알수없는 테마입니다.: ${theme}`);
  }
}
export default Card;
