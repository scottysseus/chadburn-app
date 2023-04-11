/// <reference types="Cypress" />

import { Game } from "../lib/Game";

/**
 * Smoke tests for the SVG guess dial. We need to ensure it can be dragged.
 */
describe("guess dial", () => {
  it("can be rotated", () => {
    cy.startNewGame();

    Game.getGuessAngle().should("equal", 0);

    Game.getGuessDial().then(($guessDial) => {
      const offset = $guessDial.offset();

      const downX = $guessDial.width() / 2 + offset.left;
      const downY = $guessDial.height() / 4 + offset.top;

      cy.wrap($guessDial)
        .trigger("mousedown", { clientX: downX, clientY: downY, which: 1 })
        .trigger("mousemove", {
          clientX: downX - 10,
          clientY: downY,
          which: 1,
        })
        .trigger("mouseup");
    });

    Game.getGuessAngle().should("not.equal", 0);
  });
});
