import React from "react";
import { BsArrowLeftSquare, BsArrowRightSquare } from "react-icons/bs";
import { Spectrum as SpectrumType } from "src/game/turn";
import "../Game.module.scss";

interface SpectrumProps {
  spectrum: SpectrumType;
}

export const Spectrum = ({ spectrum }: SpectrumProps) => {
  return (
    <div className="spectrumContainer">
      <div className="spectrum">
        <BsArrowLeftSquare
          style={{ marginBottom: "-3px", marginRight: "4px" }}
        />
        <p id="one" data-cy="spectrum_left">
          {spectrum.left}
        </p>
        <p id="two" data-cy="spectrum_right">
          {spectrum.right}
        </p>
        <BsArrowRightSquare
          style={{
            marginBottom: "-3px",
            marginLeft: "4px",
            marginRight: "5px",
          }}
        />
      </div>
    </div>
  );
};
