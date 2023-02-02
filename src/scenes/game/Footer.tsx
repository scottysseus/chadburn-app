import React from "react";
import { Toggle } from "src/components/Toggle";

import "../Game.module.scss";

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
    <div className="actorToggleContainer">
      <button onClick={onNewGameClick}>New Game</button>
      <Toggle
        left="Player"
        right="Psychic"
        isLeft={isPlayer}
        onToggle={onActorToggle}
      />
    </div>
  );
};
