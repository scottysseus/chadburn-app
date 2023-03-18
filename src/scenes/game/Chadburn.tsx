import React from "react";
import { GuessDial } from "src/components/GuessDial";
import { UnselectableImage } from "src/components/UnselectableImage";
import "../Game.module.scss";

export interface ChadburnProps {
  guess: number;
  onGuessUpdate: (angle: number) => void;

  showTarget: boolean;
  target: number;
}

/**
 * Chadburn encapsulates the graphical parts of the game display: the guess dial,
 * the target overlay, and the border image.
 *
 * The target can optionally be hidden e.g. for the player view.
 */
export const Chadburn = ({
  guess,
  onGuessUpdate,
  showTarget,
  target,
}: ChadburnProps) => {
  return (
    <>
      <GuessDial guess={guess} onUpdate={onGuessUpdate} />

      <UnselectableImage
        src="assets/target.svg"
        className="chadburnImage"
        style={{
          zIndex: 0,
          transform: `rotate(${target}deg)`,
          visibility: showTarget ? "visible" : "hidden",
        }}
      />
      <UnselectableImage
        src="assets/border.svg"
        className="chadburnImage"
        style={{ zIndex: 0 }}
      />
    </>
  );
};
