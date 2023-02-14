import { customAlphabet, urlAlphabet } from "nanoid";
import React from "react";
import { useNavigate } from "react-router";
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
    navigate(`/${generateId()}`, { replace: true });
  };

  return (
    <div className="landingMenuContainer">
      <p>
        CHADBURN is an online version of the board game WAVELENGTH. Play with
        your friends across multiple devices on a shared board.
      </p>
      <button data-cy="landing_btn_new_game" onClick={onClick}>
        New Game
      </button>
    </div>
  );
};
