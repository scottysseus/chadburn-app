import React from "react";
import styles from "./RebuttalView.module.css";
import { RebuttalToggle } from "../components/RebuttalToggle";
import { GameState } from "src/game/game";

interface RebuttalViewProps {
  guessSubmitted: boolean;
  getTeamOutOfTurn: (state: GameState) => string;
  game: GameState;
  onSubmitRebuttal: () => void;
  setRebuttal: (value: string) => void;
}

export const RebuttalView = ({
  guessSubmitted,
  getTeamOutOfTurn,
  game,
  onSubmitRebuttal,
  setRebuttal,
}: RebuttalViewProps) => {
  return (
    <>
      <div
        className={styles.sideGuessContainer}
        style={{ display: guessSubmitted ? "flex" : "none" }}
      >
        <h3>
          {getTeamOutOfTurn(game)} team, what side of the target you think the{" "}
          {game.teamInTurn} team&apos;s guess is:
        </h3>
        <RebuttalToggle setRebuttal={setRebuttal} />
        <div className={styles.rebuttalSubmitContainer}>
          <button className={styles.hintBtn} onClick={onSubmitRebuttal}>
            SUBMIT
          </button>
        </div>
      </div>
    </>
  );
};
