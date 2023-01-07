/// <reference types="Cypress" />

import { PlayerView } from "../lib/PlayerView";

describe("guess dial", () => {
  it("can be rotated", () => {
    cy.visit("/");

    cy.get('[data-cy="landing_btn_new_game"]').click();

    PlayerView.get_guess_angle().should("equal", 0);

    PlayerView.get_guess().then(($guessDial) => {
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

    PlayerView.get_guess_angle().should("not.equal", 0);
  });
});
