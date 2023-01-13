import React, { useState } from "react";

interface RebuttalBtnsProps {
  setRebuttal: any;
}

export const RebuttalBtns = ({ setRebuttal }: RebuttalBtnsProps) => {
  const [leftRebuttalBtn, setLeftRebuttalBtn] = useState<boolean>(false);
  const [rightRebuttalBtn, setRightRebuttalBtn] = useState<boolean>(false);

  const onToggleRebuttalBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    (event.target as HTMLButtonElement).id === "left"
      ? (setLeftRebuttalBtn(true),
        setRightRebuttalBtn(false),
        setRebuttal("left"))
      : (setLeftRebuttalBtn(false),
        setRightRebuttalBtn(true),
        setRebuttal("right"));
  };

  return (
    <>
      <div>
        <button
          id="left"
          style={{
            width: "100px",
            height: "50px",
            fontSize: "15px",
            backgroundColor: leftRebuttalBtn ? "green" : "transparent",
            border: leftRebuttalBtn ? "2px solid green" : "",
          }}
          onClick={onToggleRebuttalBtn}
        >
          LEFT
        </button>
        <button
          id="right"
          style={{
            width: "100px",
            height: "50px",
            fontSize: "15px",
            backgroundColor: rightRebuttalBtn ? "green" : "transparent",
            border: rightRebuttalBtn ? "2px solid green" : "",
          }}
          onClick={onToggleRebuttalBtn}
        >
          RIGHT
        </button>
      </div>
    </>
  );
};
