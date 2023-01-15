import React from "react";
import styles from "./RebuttalView.module.css";
import { RebuttalBtns } from "../components/RebuttalBtns";
import { SharedState } from "src/store/SharedState";
import { GameState } from "src/game/game";

interface RebuttalViewProps {
  guessSubmitted: boolean;
  getTeamOutOfTurn: (state: GameState) => string;
  sharedState: SharedState;
  onSubmitRebuttal: () => void;
  setRebuttal: (value: string) => void;
}

export const RebuttalView = ({
  guessSubmitted,
  getTeamOutOfTurn,
  sharedState,
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
          {getTeamOutOfTurn(sharedState.game)} team, what side of the target you
          think the {sharedState.game.teamInTurn} team&apos;s guess is:
        </h3>
        <RebuttalBtns setRebuttal={setRebuttal} />
        <div className={styles.rebuttalSubmitContainer}>
          <button className={styles.hintBtn} onClick={onSubmitRebuttal}>
            SUBMIT
          </button>
        </div>
      </div>
    </>
  );
};
