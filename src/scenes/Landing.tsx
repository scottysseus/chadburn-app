import { customAlphabet, urlAlphabet } from "nanoid";
import React from "react";
import { useNavigate } from "react-router";
import styles from "./Landing.module.css";

const generateId = customAlphabet(urlAlphabet, 5);

export const Landing = () => {
  const navigate = useNavigate();

  console.log(urlAlphabet);
  const onClick = () => {
    navigate(`/${generateId()}`, { replace: true });
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
