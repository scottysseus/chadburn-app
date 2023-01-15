import React from "react";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
import styles from "./Landding.module.css";

export const Landing = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/${uuidv4()}`, { replace: true });
  };

  return (
    <div className={styles.landingMenuContainer}>
      <h1>Chadburn</h1>
      <button data-cy="landing_btn_new_game" onClick={onClick}>
        NEW GAME
      </button>
    </div>
  );
};
