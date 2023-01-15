import React from "react";

interface NewGameButtonProps {
  onNewGameClick: () => void;
}

export const NewGameButton = ({ onNewGameClick }: NewGameButtonProps) => {
  return (
    <>
      <button
        style={{
          position: "absolute",
          bottom: "40px",
        }}
        onClick={() => onNewGameClick()}
      >
        New Game
      </button>
    </>
  );
};
