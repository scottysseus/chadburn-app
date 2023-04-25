import React from "react";
import { Toggle } from "src/components/Toggle";

import "../Game.module.scss";

export interface FooterProps {
  isPlayer: boolean;
  onActorToggle: (isPlayer: boolean) => void;
  onNewGameClick: () => void;
  onNextTurnClick: () => void;
  isTurnOver: boolean;
}

export const Footer = ({
  isPlayer,
  onActorToggle,
  onNewGameClick,
  isTurnOver,
  onNextTurnClick,
}: FooterProps) => {
  return (
    <div className="actorToggleContainer">
      <a onClick={onNewGameClick}>New Game</a>
      {isTurnOver ? (
        <>
          <a data-cy="btn_next_turn" onClick={onNextTurnClick}>
            Next Turn{" "}
          </a>
        </>
      ) : (
        <>
          <Toggle
            left="Player"
            right="Psychic"
            isLeft={isPlayer}
            onToggle={onActorToggle}
          />
        </>
      )}
    </div>
  );
};
