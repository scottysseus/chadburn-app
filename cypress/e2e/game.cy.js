/// <reference types="Cypress" />

import { Player, Rebuttals } from "../lib/Player";
import { Psychic } from "../lib/Psychic";

describe("game", () => {
  it("can play a game to 10", () => {
    cy.startNewGame();
    Psychic.setsHint("a hint");
    Player.setsGuess(50);
    Player.choosesRebuttal(Rebuttals.LEFT);
  });
});
