import React from "react";
import styles from "../scenes/Game.module.css";
import { BsArrowLeftSquare, BsArrowRightSquare } from "react-icons/bs";
import { Spectrum as SpectrumType } from "../game/turn";

interface SpectrumProps {
  spectrum: SpectrumType;
}

export const Spectrum = ({ spectrum }: SpectrumProps) => {
  return (
    <>
      <div className={styles.cardContainer}>
        <p style={{ fontSize: "20px" }}>
          <span>
            <BsArrowLeftSquare
              style={{ marginBottom: "-3px", marginRight: "4px" }}
            />
          </span>
          {spectrum.left}
        </p>
        <p style={{ fontSize: "20px" }}>
          {spectrum.right}
          <BsArrowRightSquare
            style={{ marginBottom: "-3px", marginLeft: "4px" }}
          />
        </p>
      </div>
    </>
  );
};
