/// <reference types="Cypress" />

import { Teams } from "../lib/Game";
import { Player } from "../lib/Player";
import { Psychic } from "../lib/Psychic";

describe("free play", () => {
  it("does not display score", () => {
    cy.startFreePlay();

    cy.get("[data-cy='game_header']").should("not.be.visible");
  });

  it("does not display team names in the rebuttal prompt", () => {
    cy.startFreePlay();

    Psychic.submitsHint("a hint");
    Player.submitsGuessForPoints(4);

    cy.get("[data-cy='game_prompt_rebuttal']").should(
      "not.contain.text",
      Teams.BLUE
    );

    cy.get("[data-cy='game_prompt_rebuttal']").should(
      "not.contain.text",
      Teams.RED
    );
  });
});
