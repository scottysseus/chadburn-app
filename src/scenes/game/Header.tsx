import React from "react";
import "../Game.module.scss";

import { isGameOver, Score } from "src/game/game";

interface HeaderProps {
  score: Score;
  teamInTurn: string;
}

export const Header = ({ score, teamInTurn }: HeaderProps) => {
  return (
    <div className="header">
      <p>
        Blue: <span data-cy="game_score_blue">{score.get("blue")}</span> Red:{" "}
        <span data-cy="game_score_red">{score.get("red")}</span>
      </p>

      {!isGameOver(score) && (
        <p className="turnTracker">{teamInTurn} team&apos;s turn!</p>
      )}
    </div>
  );
};
