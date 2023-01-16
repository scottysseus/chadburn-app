import React from "react";
import {
  GameState,
  getCorrectRebuttal,
  getGuessScore,
  getRebuttalScore,
  getTeamOutOfTurn,
} from "../game/game";
import styles from "../scenes/Game.module.css";
import { isTurnOver } from "src/game/turn";

import { Score } from "../game/game";

interface HeaderProps {
  score: Score;
  teamInTurn: string;
  game: GameState;
}

export const Header = ({ score, teamInTurn, game }: HeaderProps) => {
  const isMaximumScore = getGuessScore(game) === 4;
  return (
    <>
      <div className={styles.pageHeader}>
        <h1>CHADBURN</h1>
      </div>
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
          <h3>
            Blue: {score.get("blue")} Red: {score.get("red")}
          </h3>

          <h3>{teamInTurn} team&apos;s turn!</h3>
        </div>
      )}
    </>
  );
};
