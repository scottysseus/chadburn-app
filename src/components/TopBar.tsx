import React from "react";
import "./TopBar.module.scss";

const onCopyLinkClick = () => {
  navigator.clipboard.writeText(window.location.href);
};

export const TopBar = () => {
  return (
    <div className="topBar">
      <h1>
        <a href="/" className="typewriter">
          CHADBURN
        </a>
      </h1>
      <a onClick={onCopyLinkClick}>Copy Link</a>
    </div>
  );
};
