import React from "react";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
import styles from "./Landing.module.css";

export const Landing = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/${uuidv4()}`, { replace: true });
  };

  return (
    <div className={styles.landingMenuContainer}>
      <button data-cy="landing_btn_new_game" onClick={onClick}>
        New Game
      </button>
      <p>
        CHADBURN is an online version of the board game WAVELENGTH. Play with
        your friends across multiple devices on a shared board.
      </p>
    </div>
  );
};
