import React from "react";
import { useNavigate } from "react-router";
import { ButtonToggle } from "src/components/ButtonToggle";
import { v4 as uuidv4 } from "uuid";

export const Landing = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/${uuidv4()}`, { replace: true });
  };

  return (
    <>
      <button data-cy="landing_btn_new_game" onClick={onClick}>
        New Game
      </button>
      <ButtonToggle
        leftText="left"
        rightText="right"
        onToggled={(left: boolean) => {
          return;
        }}
      />
    </>
  );
};
