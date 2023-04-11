import { customAlphabet, urlAlphabet } from "nanoid";
import React from "react";
import { useNavigate } from "react-router";
import { removeFromLocalStorage } from "src/store/localStorage";
import "./Landing.module.scss";

/**
 * generateId generates URL-safe IDs which are 4 characters long.
 * These IDs should uniquely identify each game while being
 * human readable and memorable.
 */
const generateId = customAlphabet(urlAlphabet, 4);

export const Landing = () => {
  const navigate = useNavigate();

  const onClick = () => {
    removeFromLocalStorage();
    navigate(`/${generateId()}`, { replace: true, state: { isNewGame: true } });
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      console.log("full screen");
    }
  };

  return (
    <div className="landingMenuContainer">
      <p id="content1">
        CHADBURN is an online version of the board game WAVELENGTH.
      </p>
      <p id="content2">
        Play with your friends across multiple devices on a shared board.
      </p>
      <button data-cy="landing_btn_new_game" onClick={onClick}>
        New Game
      </button>
    </div>
  );
};
