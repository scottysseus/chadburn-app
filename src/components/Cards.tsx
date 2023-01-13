import React from "react";
import styles from "../scenes/Game.module.css";
import { BsArrowLeftSquare, BsArrowRightSquare } from "react-icons/bs";

interface CardsProps {
  sharedState: any;
}

export const Cards = ({ sharedState }: CardsProps) => {
  return (
    <>
      <div className={styles.cardContainer}>
        <p style={{ fontSize: "20px" }}>
          <span>
            <BsArrowLeftSquare
              style={{ marginBottom: "-3px", marginRight: "4px" }}
            />
          </span>
          {sharedState.game.turn.spectrum.left}
        </p>
        <p style={{ fontSize: "20px" }}>
          {sharedState.game.turn.spectrum.right}
          <BsArrowRightSquare
            style={{ marginBottom: "-3px", marginLeft: "4px" }}
          />
        </p>
      </div>
    </>
  );
};
