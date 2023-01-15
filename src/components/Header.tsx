import React from "react";
import styles from "../scenes/Game.module.css";

import { Score } from "../game/game";

interface HeaderProps {
  score: Score;
  teamInTurn: string;
}

export const Header = ({ score, teamInTurn }: HeaderProps) => {
  return (
    <>
      <div className={styles.pageHeader}>
        <h1>CHADBURN</h1>
      </div>

      <div className={styles.turnContainer}>
        <h3>
          Blue: {score.get("blue")} Red: {score.get("red")}
        </h3>

        <h3>{teamInTurn} team&apos;s turn!</h3>
      </div>
    </>
  );
};
