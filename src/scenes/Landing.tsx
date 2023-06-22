import { customAlphabet, urlAlphabet } from "nanoid";
import React from "react";
import { useNavigate } from "react-router";
import { removeFromLocalStorage } from "src/store/localStorage";
import { GameMode } from "src/store/SharedState";
import "./Landing.module.scss";

/**
 * generateId generates URL-safe IDs which are 4 characters long.
 * These IDs should uniquely identify each game while being
 * human readable and memorable.
 */
const generateId = customAlphabet(urlAlphabet, 4);

export const Landing = () => {
  const navigate = useNavigate();

  const startNewGame = (mode: GameMode) => {
    removeFromLocalStorage();
    navigate(`/${generateId()}`, {
      replace: true,
      state: { isNewGame: true, mode },
    });
  };

  const onStartMatchClick = () => {
    startNewGame(GameMode.NORMAL);
  };

  const onFreePlayClick = () => {
    startNewGame(GameMode.FREE_PLAY);
  };

  return (
    <>
      <div className="topBar">
        <h1>
          <a href="/" className="typewriter">
            CHADBURN
          </a>
        </h1>
      </div>
      <div className="landingMenuContainer">
        <p id="content1">
          CHADBURN is an online version of the board game WAVELENGTH
        </p>
        <p id="content2">
          Play with your friends across multiple devices on a shared board
        </p>
        <form>
          <button data-cy="landing_btn_new_game" onClick={onStartMatchClick}>
            Start Match
          </button>
          <button data-cy="landing_btn_free_play" onClick={onFreePlayClick}>
            Free Play
          </button>
        </form>
      </div>
    </>
  );
};
