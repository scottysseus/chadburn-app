// matches e.g. rotate(-90deg) and captures the numeric value (-90 in this case)
const rotateDegreeRegex = /^rotate\(([-]?[0-9]+)deg\)$/;
const matrixRegx = /^matrix\(.*\)$/;

/**
 * Copied from source :)
 * Normalizes the degrees to within -90° and 90°.
 * @param degrees degrees to normalize
 * @returns the degrees normalized within -90° and 90°.
 */
function normalizeDegrees(degrees) {
  degrees %= 360;
  if (degrees < 0) {
    degrees += 360;
  }
  if (degrees > 180) {
    degrees -= 360;
  }

  return degrees;
}

function getRotationDegreesFromCssMatrix(cssMatrix) {
  let angle = 0;
  if (cssMatrix !== "none") {
    const values = cssMatrix.split("(")[1].split(")")[0].split(",");
    const a = values[0];
    const b = values[1];
    angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
  }
  return normalizeDegrees(angle < 0 ? angle + 360 : angle);
}

export const PlayerView = {
  get_guess() {
    return cy.get('img[src="assets/guess.svg"]');
  },
  get_guess_angle() {
    return PlayerView.get_guess().then(($guessDial) => {
      const transform = $guessDial.css("transform");
      console.log(transform);
      let angle = NaN;

      if (rotateDegreeRegex.test(transform)) {
        console.log("transform is rotate");
        const match = rotateDegreeRegex.exec(transform);
        angle = match[1];
      } else if (matrixRegx.test(transform)) {
        console.log("transform is matrix");
        const match = matrixRegx.exec(transform);
        angle = getRotationDegreesFromCssMatrix(match[0]);
      }

      console.log(`wrapping angle ${angle}`);
      return cy.wrap(angle);
    });
  },
};
