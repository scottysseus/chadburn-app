/// <reference types="Cypress" />

import { modeCommands, Game } from "../lib/Game";
import { Player } from "../lib/Player";
import { Psychic } from "../lib/Psychic";

const moveDial = () => {
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
};

/**
 * Smoke tests for the SVG guess dial. We need to ensure it can be dragged.
 */
describe("guess dial", () => {
  it("can be rotated", () => {
    cy.startNewGame();

    Game.getGuessAngle().should("equal", 0);

    moveDial();

    Game.getGuessAngle().should("not.equal", 0);
  });

  modeCommands.forEach((modeCommand) => {
    it(`cannot be rotated during rebuttal in ${modeCommand.mode}`, () => {
      modeCommand.command();

      Psychic.submitsHint("a hint");
      Player.submitsGuess(0);

      moveDial();

      Game.getGuessAngle().should("eq", 0);
    });
  });

  modeCommands.forEach((modeCommand) => {
    it(`cannot be rotated during turn summary in ${modeCommand.mode}`, () => {
      modeCommand.command();

      Psychic.submitsHint("a hint");
      Player.submitsGuess(0);
      Player.submitsRebuttalWithCorrectness(true);

      moveDial();

      Game.getGuessAngle().should("eq", 0);
    });
  });
});
