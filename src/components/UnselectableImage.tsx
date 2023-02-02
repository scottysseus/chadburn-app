import React from "react";

import "./UnselectableImage.module.scss";

/**
 * Browsers by default allow images to be dragged around
 * the page for some reason. This styling disables all that shit.
 */

const UnselectableImage = React.forwardRef((props: any, ref) => {
  return (
    <img className={`${props?.className} styledImage`} ref={ref} {...props} />
  );
});

UnselectableImage.displayName = "UnselectableImage";

export { UnselectableImage };
