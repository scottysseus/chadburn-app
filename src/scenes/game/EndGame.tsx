import React from "react";

export interface EndGameProps {
  victor: string;
}

export const EndGame = ({ victor }: EndGameProps) => {
  return (
    <>
      <p className="endgameText">
        <span style={{ color: victor }}>{victor} team</span> is the winner!
      </p>
    </>
  );
};
