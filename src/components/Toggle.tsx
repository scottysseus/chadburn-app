import React from "react";

export interface ToggleProps {
  left: string;
  right: string;

  isLeft: boolean;
  onToggle: (isLeft: boolean) => void;
}

export const Toggle = ({ left, right, isLeft, onToggle }: ToggleProps) => {
  return (
    <>
      <button onClick={() => onToggle(true)} disabled={isLeft}>
        {left}
      </button>
      <button onClick={() => onToggle(false)} disabled={!isLeft}>
        {right}
      </button>
    </>
  );
};
