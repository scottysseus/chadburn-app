import React from "react";
import "./TopBar.module.scss";

/**
 * TODO show copy button only in the game page ??
 */

const onCopyLinkClick = () => {
  navigator.clipboard.writeText(window.location.href);
};

export const TopBar = () => {
  return (
    <>
      <div className="topBar">
        <h1>
          <a href="/" className="typewriter">
            CHADBURN
          </a>
        </h1>
      </div>
      <a onClick={onCopyLinkClick} className="clipboard">
        Copy Link
      </a>
    </>
  );
};
