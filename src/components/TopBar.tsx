import React from "react";
import "./TopBar.module.scss";

const onCopyLinkClick = () => {
  navigator.clipboard.writeText(window.location.href);
};

export const TopBar = () => {
  return (
    <>
      <div className="title">
        <h1>
          <a href="/">CHADBURN</a>
        </h1>
        <button onClick={onCopyLinkClick} className="clipboard">
          Copy Link
        </button>
      </div>
    </>
  );
};
