import React from "react";
import {
  OnUpdatingEvent,
  RotatableImage,
  RotationDirection,
} from "src/components/RotatableImage";

import styles from "./Game.module.css";

export interface GuessDialProps {
  guess: number;
  onUpdated: (angle: number) => void;
}
/**
 * GuessDial represents the game's guess dial SVG. It restricts its rotation
 * to the top half of a circle.
 */
export const GuessDial = ({ guess, onUpdated }: GuessDialProps) => {
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
      className={styles.chadburnImage}
      style={{
        zIndex: 1,
      }}
      onUpdated={onUpdated}
      onUpdating={restrictToUpperHalf}
      angle={guess}
    />
  );
};
