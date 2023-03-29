import React from "react";
import "../Game.module.scss";

interface HintProps {
  hint: string | undefined;
  visible: boolean;
}

export const Hint = ({ hint, visible }: HintProps) => {
  return (
    <>
      <div
        data-cy="game_hint"
        className="hintContainer"
        style={{ visibility: visible ? "visible" : "hidden" }}
      >
        {hint ? hint : "The psychic must choose a hint"}
      </div>
    </>
  );
};
