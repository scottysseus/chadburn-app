// matches e.g. rotate(-90deg) and captures the numeric value (-90 in this case)
const rotateDegreeRegex = /^rotate\(([-]?[0-9]+)deg\)$/;

export const PlayerView = {
  /**
   * get_guess saves the angle of the guess dial as a Cypress alias
   * with the provided name
   * @param alias name of the Cypress alias
   */
  get_guess(alias) {
    cy.get('img[src="assets/guess.svg"]').then(($guessDial) => {
      const transform = $guessDial.css("transform");
      let angle = NaN;

      // if a match was found, match[0] is the full match, and match[1..n] are
      // the capture groups. Our first capture group (match[1]) is the angle in degrees
      const match = transform.match(rotateDegreeRegex);
      if (match.length > 0) {
        angle = match[1];
      } else if (transform == "matrix(1, 0, 0, 1, 0, 0)") {
        angle = 0;
      }

      cy.wrap(angle).as(alias);
    });
  },
};
