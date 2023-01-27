import React from "react";

export interface ToggleProps {
  left: string;
  right: string;

  isLeft: boolean;
  onToggleClick: (isLeft: boolean) => void;
}

export const Toggle = ({ left, right, isLeft, onToggleClick }: ToggleProps) => {
  return (
    <>
      <button onClick={() => onToggleClick(true)} disabled={isLeft}>
        {left}
      </button>
      <button onClick={() => onToggleClick(false)} disabled={!isLeft}>
        {right}
      </button>
    </>
  );
};
