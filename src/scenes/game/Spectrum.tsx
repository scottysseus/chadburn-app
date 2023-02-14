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
            style={{
              marginBottom: "-3px",
              marginLeft: "4px",
              marginRight: "5px",
            }}
          />
        </p>
      </div>
    </div>
  );
};
