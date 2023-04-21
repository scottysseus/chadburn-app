import React from "react";
import {
  getCorrectRebuttal,
  getGuessScore,
  getRebuttalScore,
} from "src/game/game";
import { SharedState } from "src/store/SharedState";
import "../Game.module.scss";
import { HiOutlineArrowUp } from "react-icons/hi";

interface SummaryProps {
  isTurnOver: boolean;
  state: SharedState;
}

export const Summary = ({ isTurnOver, state }: SummaryProps) => {
  return (
    <div
      style={{ visibility: isTurnOver ? "visible" : "hidden" }}
      className="summary"
    >
      {isTurnOver ? (
        state.game.teamInTurn === "blue" ? (
          <>
            <p>
              <span style={{ color: "blue" }}>
                Blue Team:{" "}
                {(state.game.score.get("blue") || 0) +
                  getGuessScore(state.game)}{" "}
              </span>
              <HiOutlineArrowUp /> {getGuessScore(state.game)}
            </p>
            <p>
              <span style={{ color: "red" }}>
                Red Team:{" "}
                {(state.game.score.get("red") || 0) +
                  getRebuttalScore(
                    state.game,
                    getCorrectRebuttal(state.game)
                  )}{" "}
              </span>
              <HiOutlineArrowUp />{" "}
              {getRebuttalScore(state.game, getCorrectRebuttal(state.game))}
            </p>
          </>
        ) : (
          <>
            <p>
              <span style={{ color: "blue" }}>
                Blue Team:{" "}
                {(state.game.score.get("blue") || 0) +
                  getRebuttalScore(
                    state.game,
                    getCorrectRebuttal(state.game)
                  )}{" "}
              </span>
              <HiOutlineArrowUp />{" "}
              {getRebuttalScore(state.game, getCorrectRebuttal(state.game))}
            </p>
            <p>
              <span style={{ color: "red" }}>
                Red Team:{" "}
                {(state.game.score.get("red") || 0) + getGuessScore(state.game)}{" "}
              </span>
              <HiOutlineArrowUp /> {getGuessScore(state.game)}
            </p>
          </>
        )
      ) : (
        <></>
      )}
    </div>
  );
};
