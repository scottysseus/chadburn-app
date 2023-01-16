import React, { useState } from "react";

export interface ButtonToggleProps {
  leftText: string;
  rightText: string;

  onToggled: (left: boolean) => void;
}

export const ButtonToggle = (props: ButtonToggleProps) => {
  const [left, setLeft] = useState(true);

  const onButtonClick = (leftClicked: boolean) => {
    // do nothing if the already-on button was clicked again
    if (left === leftClicked) {
      return;
    }

    setLeft(leftClicked);
    props.onToggled(leftClicked);
  };
  const onLeftButtonClicked = () => {
    onButtonClick(true);
  };
  const onRightButtonClicked = () => {
    onButtonClick(false);
  };

  return (
    <>
      <button
        onClick={onLeftButtonClicked}
        style={{
          width: "100px",
          height: "50px",
          fontSize: "15px",
          backgroundColor: left ? "green" : "transparent",
          border: left ? "2px solid green" : "",
        }}
      >
        {props.leftText}
      </button>
      <button
        onClick={onRightButtonClicked}
        style={{
          width: "100px",
          height: "50px",
          fontSize: "15px",
          backgroundColor: !left ? "green" : "transparent",
          border: !left ? "2px solid green" : "",
        }}
      >
        {props.rightText}
      </button>
    </>
  );
};
