import React from "react";
import { Toggle } from "src/components/Toggle";

import styles from "../Game.module.css";

export interface FooterProps {
  isPlayer: boolean;
  onActorToggle: (isPlayer: boolean) => void;
  onNewGameClick: () => void;
}

export const Footer = ({
  isPlayer,
  onActorToggle,
  onNewGameClick,
}: FooterProps) => {
  return (
    <div className={styles.actorToggleContainer}>
      <button onClick={onNewGameClick}>New Game</button>
      <div data-cy="game_toggle_view">
        <Toggle
          left="Player"
          right="Psychic"
          isLeft={isPlayer}
          onToggle={onActorToggle}
        />
      </div>
    </div>
  );
};
