import React from "react";
import styles from "../Game.module.css";

import { Score } from "src/game/game";

interface HeaderProps {
  score: Score;
  teamInTurn: string;
}

export const Header = ({ score, teamInTurn }: HeaderProps) => {
  return (
    <div className={styles.header}>
      <p>
        Blue: <span data-cy="game_score_blue">{score.get("blue")}</span> Red:{" "}
        <span data-cy="game_score_red">{score.get("red")}</span>
      </p>

      <p className={styles.turnTracker}>{teamInTurn} team&apos;s turn!</p>
    </div>
  );
};
