import React from "react";
import { BsArrowLeftSquare, BsArrowRightSquare } from "react-icons/bs";
import { Spectrum as SpectrumType } from "src/game/turn";
import styles from "./Game.module.css";

interface SpectrumProps {
  spectrum: SpectrumType;
}

export const Spectrum = ({ spectrum }: SpectrumProps) => {
  return (
    <div className={styles.spectrumContainer}>
      <div className={styles.spectrum}>
        <p>
          <span>
            <BsArrowLeftSquare
              style={{ marginBottom: "-3px", marginRight: "4px" }}
            />
          </span>
          {spectrum.left}
        </p>
        <p>
          {spectrum.right}
          <BsArrowRightSquare
            style={{ marginBottom: "-3px", marginLeft: "4px" }}
          />
        </p>
      </div>
    </div>
  );
};
