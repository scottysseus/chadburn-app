import React from "react";
import styles from "../scenes/Game.module.css";
import { SharedState } from "src/store/SharedState";

interface HintProps {
  player: boolean;
  sharedState: SharedState;
  onUpdateHint: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitHint: () => void;
}

export const Hint = ({
  player,
  sharedState,
  onSubmitHint,
  onUpdateHint,
}: HintProps) => {
  return (
    <>
      <div className={styles.hintContainer}>
        {player ? (
          sharedState.game.turn.hint ? (
            <h2>{sharedState.game.turn.hint}</h2>
          ) : (
            <h2>The Psychic has not chosen a hint yet!</h2>
          )
        ) : sharedState.game.turn.hint ? (
          <h2>The submitted hint is : {sharedState.game.turn.hint} !</h2>
        ) : (
          <>
            <input
              type="text"
              onChange={onUpdateHint}
              style={{
                width: "400px",
                height: "34px",
                zIndex: "4",
              }}
              placeholder="Provide hint"
              id="hint"
            />
            <button className={styles.hintBtn} onClick={() => onSubmitHint()}>
              SUBMIT
            </button>
          </>
        )}
      </div>
    </>
  );
};
