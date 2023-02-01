import { customAlphabet, urlAlphabet } from "nanoid";
import React from "react";
import { useNavigate } from "react-router";
import styles from "./Landing.module.css";

/**
 * generateId generates URL-safe IDs which are 5 characters long.
 * These IDs should uniquely identify each game while being
 * human readable and memorable.
 */
const generateId = customAlphabet(urlAlphabet, 5);

export const Landing = () => {
  const navigate = useNavigate();

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
