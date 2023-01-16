import React from "react";
import styles from "../scenes/Game.module.css";
import { isTurnOver, TurnState } from "../game/turn";

interface ActorToggleProps {
  onToggleActorView: () => void;
  psychicBtn: boolean;
  playerBtn: boolean;
  turn: TurnState;
}

export const ActorToggle = ({
  onToggleActorView,
  playerBtn,
  psychicBtn,
  turn,
}: ActorToggleProps) => {
  return (
    <>
      <div
        className={styles.buttomContainer}
        style={{ display: isTurnOver(turn) ? "none" : "flex" }}
      >
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
