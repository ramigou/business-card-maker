import React, { memo } from "react";
import styles from "./footer.module.css";

const Footer = memo(() => (
  <footer className={styles.footer}>
    <p className={styles.title}>
      Only passions, great passions, can elevate the soul to great things.
    </p>
  </footer>
));

export default Footer;
