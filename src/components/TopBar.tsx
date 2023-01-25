import React from "react";
import styles from "./TopBar.module.css";

export const TopBar = () => {
  return (
    <div className={styles.topBar}>
      <h1>
        <a href="/">CHADBURN</a>
      </h1>
    </div>
  );
};
