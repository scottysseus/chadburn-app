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
        <span style={{ color: "blue" }}>
          Blue: <span data-cy="game_score_blue">{score.get("blue")}</span>
        </span>{" "}
        <span style={{ color: "red" }}>
          Red: <span data-cy="game_score_red">{score.get("red")}</span>
        </span>
      </p>
      {!isGameOver(score) && (
        <p className="turnTracker" style={{ color: teamInTurn }}>
          {teamInTurn} team&apos;s turn!
        </p>
      )}
    </div>
  );
};
