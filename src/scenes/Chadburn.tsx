import React from "react";
import { UnselectableImage } from "src/components/UnselectableImage";
import styles from "./Game.module.css";
import { GuessDial } from "./GuessDial";

export interface ChadburnProps {
  guess: number;
  onGuessUpdated: (angle: number) => void;

  showTarget: boolean;
  target: number;
}

export const Chadburn = ({
  guess,
  onGuessUpdated,
  showTarget,
  target,
}: ChadburnProps) => {
  return (
    <div className={styles.chadburn}>
      <GuessDial guess={guess} onUpdated={onGuessUpdated} />
      {showTarget && (
        <UnselectableImage
          src="assets/target.svg"
          className={styles.chadburnImage}
          style={{
            zIndex: 0,
            transform: `rotate(${target}deg)`,
          }}
        />
      )}
      <UnselectableImage
        src="assets/border.svg"
        className={styles.chadburnImage}
        style={{ zIndex: 0 }}
      />
    </div>
  );
};
