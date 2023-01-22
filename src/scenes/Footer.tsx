import React from "react";
import { Toggle } from "src/components/Toggle";

import styles from "./Game.module.css";

export interface FooterProps {
  isPlayer: boolean;
  onActorToggled: (isPlayer: boolean) => void;
  onNewGameClicked: () => void;
}

export const Footer = ({
  isPlayer,
  onActorToggled,
  onNewGameClicked,
}: FooterProps) => {
  return (
    <div className={styles.actorToggleContainer}>
      <button onClick={onNewGameClicked}>New Game</button>
      <Toggle
        left="Player"
        right="Psychic"
        isLeft={isPlayer}
        onToggled={onActorToggled}
      />
    </div>
  );
};
