import React from "react";
import {
  OnUpdatingEvent,
  RotatableImage,
  RotationDirection,
} from "src/components/RotatableImage";

import "../scenes/Game.module.scss";

export interface GuessDialProps {
  guess: number;
  onUpdate: (angle: number) => void;

  // set to true to disable interaction with the guess dial
  disabled: boolean;
}
/**
 * GuessDial represents the game's guess dial SVG. It restricts its rotation
 * to the top half of a circle.
 */
export const GuessDial = ({
  guess,
  onUpdate,
  disabled = false,
}: GuessDialProps) => {
  // Restrict the rotation angle to -90° < θ < 90°, the top half of a circle
  // (keeping in mind that CSS transforms work clockwise
  // instead of the conventional counter-clockwise).
  const restrictToUpperHalf = (event: OnUpdatingEvent) => {
    let newAngle = event.angle;

    if (
      event.rotationDirection === RotationDirection.CLOCKWISE &&
      (newAngle > 90 || newAngle < -90)
    ) {
      newAngle = 90;
    } else if (
      event.rotationDirection === RotationDirection.COUNTERCLOCKWISE &&
      (newAngle < -90 || newAngle > 90)
    ) {
      newAngle = -90;
    }

    return newAngle;
  };

  return (
    <RotatableImage
      src="assets/guess.svg"
      className="chadburnImage"
      style={{
        zIndex: 1,
      }}
      onUpdate={onUpdate}
      onBeforeUpdate={restrictToUpperHalf}
      angle={guess}
      disabled={disabled}
    />
  );
};
