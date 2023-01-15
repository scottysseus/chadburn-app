import React from "react";

interface NewGameBtnProps {
  onNewGameClick: () => void;
}

export const NewGameBtn = ({ onNewGameClick }: NewGameBtnProps) => {
  return (
    <>
      {" "}
      <div>
        <button
          style={{
            position: "absolute",
            bottom: "40px",
          }}
          onClick={() => onNewGameClick()}
        >
          New Game
        </button>
      </div>
    </>
  );
};
