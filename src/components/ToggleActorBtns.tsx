import React from "react";
import styles from "../scenes/Game.module.css";

interface ToggleActorBtnsProps {
  onToggleActorView: () => void;
  psychicBtn: boolean;
  playerBtn: boolean;
}

export const ToggleActorBtns = ({
  onToggleActorView,
  playerBtn,
  psychicBtn,
}: ToggleActorBtnsProps) => {
  return (
    <>
      <div className={styles.buttomContainer}>
        <button
          style={{
            width: "100px",
            height: "50px",
            fontSize: "15px",
          }}
          onClick={() => onToggleActorView()}
          disabled={playerBtn}
        >
          Player
        </button>
        <button
          style={{
            width: "100px",
            height: "50px",
            fontSize: "15px",
          }}
          onClick={() => onToggleActorView()}
          disabled={psychicBtn}
        >
          Psychic
        </button>
      </div>
    </>
  );
};
