import React from "react";
import { GuessDial } from "src/components/GuessDial";
import { UnselectableImage } from "src/components/UnselectableImage";
import "../Game.module.scss";

export interface ChadburnProps {
  guess: number;
  onGuessUpdate: (angle: number) => void;

  showTarget: boolean;
  target: number;

  disabled: boolean;
}

/**
 * Chadburn encapsulates the graphical parts of the game display: the guess dial,
 * the target overlay, and the border image. Disabling it prevents players from
 * moving the guess dial.
 *
 * The target can optionally be hidden e.g. for the player view.
 */
export const Chadburn = ({
  guess,
  onGuessUpdate,
  showTarget,
  target,
  disabled,
}: ChadburnProps) => {
  return (
    <>
      <GuessDial guess={guess} onUpdate={onGuessUpdate} disabled={disabled} />
      <div
        style={{
          height: "153px",
          width: "100%",
          position: "absolute",
          overflow: "hidden",
        }}
      >
        <UnselectableImage
          src="assets/target.svg"
          className="chadburnImage"
          style={{
            zIndex: 0,
            transform: `rotate(${target}deg)`,
            visibility: showTarget ? "visible" : "hidden",
          }}
        />
      </div>
      <UnselectableImage
        src="assets/border.svg"
        className="chadburnImage"
        style={{ zIndex: 0 }}
      />
    </>
  );
};
