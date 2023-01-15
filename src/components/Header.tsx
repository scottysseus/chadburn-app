import React from "react";
import styles from "../scenes/Game.module.css";
import { SharedState } from "src/store/SharedState";

interface HeaderProps {
  sharedState: SharedState;
}

export const Header = ({ sharedState }: HeaderProps) => {
  return (
    <>
      <div className={styles.pageHeader}>
        <h1>CHADBURN</h1>
      </div>

      <div className={styles.turnContainer}>
        <h3>
          Blue: {sharedState.game.score.get("blue")} Red:{" "}
          {sharedState.game.score.get("red")}
        </h3>

        <h3>{sharedState.game.teamInTurn} team&apos;s turn!</h3>
      </div>
    </>
  );
};
