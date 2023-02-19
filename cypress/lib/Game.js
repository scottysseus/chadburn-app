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
  getTargetImage() {
    return cy.get('img[src="assets/target.svg"]');
  },
  getTargetAngle() {
    return Game.getTargetImage().then(($targetImage) => {
      const transform = $targetImage.css("transform");
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
  getIncorrectRebuttal() {
    return Game.getCorrectRebuttal().then((rebuttal) => {
      if (rebuttal === Rebuttals.LEFT) {
        return cy.wrap(Rebuttals.RIGHT);
      }
      return cy.wrap(Rebuttals.LEFT);
    });
  },
  getScoreForTeam(team) {
    return cy.get(`[data-cy="game_score_${team}"]`).then(($scoreSpan) => {
      return cy.wrap($scoreSpan.text());
    });
  },
};
