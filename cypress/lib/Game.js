// matches e.g. rotate(-90deg) and captures the numeric value (-90 in this case)
const rotateDegreeRegex = /^rotate\(([-]?[0-9]+)deg\)$/;
const matrixRegx = /^matrix\(.*\)$/;

export const Teams = {
  BLUE: "blue",
  RED: "red",
};

export const Rebuttals = {
  RIGHT: "Right",
  LEFT: "Left",
};

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

/**
 * Gets the rotation angle in degrees from a CSS transform matrix.
 * @param {*} cssMatrix the value of the CSS transform property as a matrix
 * @returns the rotation angle in degrees
 */
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

/**
 * gets the rotation angle in degrees of the given element using the element's CSS transform property.
 * @param {*} $element Cypress element to get the rotation angle of
 * @returns
 */
export function getAngleOfElement($element) {
  const transform = $element.css("transform");
  let angle = NaN;

  if (rotateDegreeRegex.test(transform)) {
    const match = rotateDegreeRegex.exec(transform);
    angle = match[1];
  } else if (matrixRegx.test(transform)) {
    const match = matrixRegx.exec(transform);
    angle = getRotationDegreesFromCssMatrix(match[0]);
  }

  return angle;
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
  /**
   * @returns the angle of the guess, taken from the SVG's CSS transform property
   */
  getGuessAngle() {
    return Game.getGuessDial().pipe(getAngleOfElement);
  },
  getTargetImage() {
    return cy.get('img[src="assets/target.svg"]');
  },
  /**
   * @returns the angle of the target, taken from the SVG's CSS transform property
   */
  getTargetAngle() {
    return Game.getTargetImage().pipe(getAngleOfElement);
  },
  getSubmittedHint() {
    return cy.get('[data-cy="game_hint"]').then(($hint) => {
      return cy.wrap($hint.text());
    });
  },
  getSpectrum() {
    return cy.get('[data-cy="spectrum_left"]').then(($spectrumLeft) => {
      cy.get('[data-cy="spectrum_right"]').then(($spectrumRight) => {
        return cy.wrap({
          left: $spectrumLeft.text(),
          right: $spectrumRight.text(),
        });
      });
    });
  },
  /**
   * Returns a guess that will result in the desired points
   * @param {*} desiredPoints
   * @returns
   */
  getGuessForPoints(desiredPoints) {
    return Game.getTargetAngle().then((targetAngle) => {
      let multiplier = -1;
      if (targetAngle < 0) {
        multiplier = 1;
      }

      let offset = 0;
      if (desiredPoints === 3) {
        offset = 8;
      } else if (desiredPoints === 2) {
        offset = 16;
      } else if (desiredPoints === 1) {
        offset = 24;
      } else if (desiredPoints === 0) {
        offset = 30;
      }

      return cy.wrap(targetAngle + offset * multiplier);
    });
  },
  /**
   * returns the correct rebuttal value to give the rebutting team a point
   * @returns
   */
  getCorrectRebuttal() {
    return Game.getTargetAngle().then((targetAngle) => {
      return Game.getGuessAngle().then((guessAngle) => {
        let rebuttal = Rebuttals.LEFT;
        if (guessAngle < targetAngle) {
          rebuttal = Rebuttals.RIGHT;
        }
        return cy.wrap(rebuttal);
      });
    });
  },
  /**
   * returns the incorrect rebuttal
   * @returns
   */
  getIncorrectRebuttal() {
    return Game.getCorrectRebuttal().then((rebuttal) => {
      if (rebuttal === Rebuttals.LEFT) {
        return cy.wrap(Rebuttals.RIGHT);
      }
      return cy.wrap(Rebuttals.LEFT);
    });
  },
  /**
   * returns the current score for the given team
   * @param {*} team
   * @returns
   */
  getScoreForTeam(team) {
    return cy.get(`[data-cy="game_score_${team}"]`).then(($scoreSpan) => {
      return cy.wrap($scoreSpan.text());
    });
  },
  getId() {
    return cy.location().then((location) => {
      return cy.wrap(location.pathname.slice(1));
    });
  },

  startNextTurn() {
    return cy.get(`[data-cy="btn_next_turn"]`).click();
  },
};
