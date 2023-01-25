import React from "react";

export interface ToggleProps {
  left: string;
  right: string;

  isLeft: boolean;
  onToggled: (isLeft: boolean) => void;
}

export const Toggle = ({ left, right, isLeft, onToggled }: ToggleProps) => {
  return (
    <>
      <button onClick={() => onToggled(true)} disabled={isLeft}>
        {left}
      </button>
      <button onClick={() => onToggled(false)} disabled={!isLeft}>
        {right}
      </button>
    </>
  );
};
