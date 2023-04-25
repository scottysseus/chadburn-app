import React from "react";
import { getTeamScore } from "src/game/game";
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
        <>
          <p>
            <span style={{ color: "blue" }}>
              Blue Team: {getTeamScore(state.game, "blue")}{" "}
            </span>
            <HiOutlineArrowUp />{" "}
            {getTeamScore(state.game, "blue") -
              (state.game.score.get("blue") || 0)}
          </p>
          <p>
            <span style={{ color: "red" }}>
              Red Team: {getTeamScore(state.game, "red")}{" "}
            </span>
            <HiOutlineArrowUp />{" "}
            {getTeamScore(state.game, "red") -
              (state.game.score.get("red") || 0)}
          </p>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
