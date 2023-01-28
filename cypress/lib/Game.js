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

export const Game = {
  enablePsychicView() {
    return cy.contains("button", "Psychic").then(($btn) => {
      if (!$btn.is(":disabled")) {
        $btn.trigger("click");
      }
    });
  },
  enablePlayerView() {
    return cy.contains("button", "Player").then(($btn) => {
      if (!$btn.is(":disabled")) {
        $btn.trigger("click");
      }
    });
  },
  getGuessDial() {
    return cy.get('img[src="assets/guess.svg"]');
  },
  getGuessAngle() {
    return Game.getGuessDial().then(($guessDial) => {
      const transform = $guessDial.css("transform");
      let angle = NaN;

      if (rotateDegreeRegex.test(transform)) {
        const match = rotateDegreeRegex.exec(transform);
        angle = match[1];
      } else if (matrixRegx.test(transform)) {
        const match = matrixRegx.exec(transform);
        angle = getRotationDegreesFromCssMatrix(match[0]);
      }

      return cy.wrap(angle);
    });
  },
};
