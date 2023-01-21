import React from "react";
import styles from "./Game.module.css";

interface HintProps {
  hint: string;
}

export const Hint = ({ hint }: HintProps) => {
  return (
    <>
      <div className={styles.hintContainer}>
        {hint ? hint : "The psychic must choose a hint"}
      </div>
    </>
  );
};
