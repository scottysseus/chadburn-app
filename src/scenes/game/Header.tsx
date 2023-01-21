import React from "react";
import {
  GameState,
  getCorrectRebuttal,
  getGuessScore,
  getRebuttalScore,
  getTeamOutOfTurn,
} from "src/game/game";
import { isTurnOver } from "src/game/turn";
import styles from "./Game.module.css";

import { Score } from "src/game/game";

interface HeaderProps {
  score: Score;
  teamInTurn: string;
  game: GameState;
}

export const Header = ({ score, teamInTurn, game }: HeaderProps) => {
  const isMaximumScore = getGuessScore(game) === 4;
  return (
    <>
      {isTurnOver(game.turn) ? (
        <div className={styles.turnSummary}>
          <h3>
            The {teamInTurn} team scored: {getGuessScore(game)} !
          </h3>
          {isMaximumScore ? (
            <h3>
              And because {teamInTurn} guessed right, {getTeamOutOfTurn(game)}{" "}
              team doesn&apos;t score.
            </h3>
          ) : (
            <h3>
              And because the target was to the {getCorrectRebuttal(game)} of
              the dial, {getTeamOutOfTurn(game)} team scored:
              {getRebuttalScore(game, getCorrectRebuttal(game))} !
            </h3>
          )}
        </div>
      ) : (
        <div className={styles.turnContainer}>
          <p>
            Blue: {score.get("blue")} Red: {score.get("red")}
          </p>

          <p className={styles.turnTracker}>{teamInTurn} team&apos;s turn!</p>
        </div>
      )}
    </>
  );
};
