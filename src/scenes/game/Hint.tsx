import React from "react";
import "../Game.module.scss";

interface HintProps {
  hint: string | undefined;
}

export const Hint = ({ hint }: HintProps) => {
  return (
    <>
      <div data-cy="game_hint" className="hintContainer">
        {hint ? hint : "The psychic must choose a hint"}
      </div>
    </>
  );
};
