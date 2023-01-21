import React from "react";

import styles from "./Toggle.module.css";

export interface ToggleProps {
  left: string;
  right: string;

  isLeft: boolean;
  onToggled: (isLeft: boolean) => void;
}

export const Toggle = ({ left, right, isLeft, onToggled }: ToggleProps) => {
  return (
    <>
      <button
        onClick={() => onToggled(true)}
        className={isLeft ? styles.toggledOn : ""}
      >
        {left}
      </button>
      <button
        onClick={() => onToggled(false)}
        className={!isLeft ? styles.toggledOn : ""}
      >
        {right}
      </button>
    </>
  );
};
