import React from "react";
import { GuessDial } from "src/components/GuessDial";
import styles from "./PlayerView.module.css";
import { UnselectableImage } from "src/components/UnselectableImage";

interface PlayerViewProps {
  guess: number;
  onUpdated: (angle: number) => void;
  onGuessSubmit: () => void;
  disableSubmit: boolean;
  target: number;
  isTurnOver: boolean;
  finishTurn: () => void;
}

export const PlayerView = ({
  guess,
  onUpdated: onGuessUpdated,
  onGuessSubmit,
  disableSubmit,
  target,
  isTurnOver,
  finishTurn,
}: PlayerViewProps) => {
  return (
    <>
      <GuessDial onUpdated={onGuessUpdated} guess={guess} />

      <img
        src="assets/border.svg"
        className={styles.borderImg}
        draggable={false}
      />

      <UnselectableImage
        src="assets/target.svg"
        style={{
          display: isTurnOver ? "flex" : "none",
          width: "50%",
          minWidth: "400px",
          height: "50%",
          position: "absolute",
          zIndex: -1,
          top: "32%",
          transform: `rotate(${target}deg)`,
        }}
      />

      <div className={styles.submitContainer}>
        {isTurnOver ? (
          <button
            className={styles.submitBtn}
            disabled={disableSubmit}
            onClick={() => finishTurn()}
          >
            NEXT TURN
          </button>
        ) : (
          <button
            className={styles.submitBtn}
            disabled={disableSubmit}
            onClick={() => onGuessSubmit()}
          >
            SUBMIT
          </button>
        )}
      </div>
    </>
  );
};
