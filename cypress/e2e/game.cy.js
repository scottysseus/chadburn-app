/// <reference types="Cypress" />

import { Game, Teams } from "../lib/Game";
import { Player } from "../lib/Player";
import { Psychic } from "../lib/Psychic";

describe("game", () => {
  it("can play a game to 10", () => {
    cy.startNewGame();

    // blue team turn 1
    Psychic.setsHint("a hint");
    Player.setsGuessForPoints(4);
    Player.choosesIncorrectRebuttal();
    Game.getScoreForTeam(Teams.BLUE).should("equal", "4");
    Game.getScoreForTeam(Teams.RED).should("equal", "0");

    // red team turn 1
    Psychic.setsHint("a hint");
    Player.setsGuessForPoints(2);
    Player.choosesCorrectRebuttal();

    Game.getScoreForTeam(Teams.BLUE).should("equal", "5");
    Game.getScoreForTeam(Teams.RED).should("equal", "2");

    // blue team turn 2
    Psychic.setsHint("a hint");
    Player.setsGuessForPoints(3);
    Player.choosesCorrectRebuttal();
    Game.getScoreForTeam(Teams.BLUE).should("equal", "8");
    Game.getScoreForTeam(Teams.RED).should("equal", "3");

    // red team turn 2
    Psychic.setsHint("a hint");
    Player.setsGuessForPoints(4);
    Player.choosesIncorrectRebuttal();

    Game.getScoreForTeam(Teams.BLUE).should("equal", "8");
    Game.getScoreForTeam(Teams.RED).should("equal", "7");

    // red team catch up turn
    Psychic.setsHint("a hint");
    Player.setsGuessForPoints(0);
    Player.choosesCorrectRebuttal();

    Game.getScoreForTeam(Teams.BLUE).should("equal", "9");
    Game.getScoreForTeam(Teams.RED).should("equal", "7");

    // blue team turn 3
    Psychic.setsHint("a hint");
    Player.setsGuessForPoints(2);
    Player.choosesCorrectRebuttal();

    Game.getScoreForTeam(Teams.BLUE).should("equal", "11");
    Game.getScoreForTeam(Teams.RED).should("equal", "8");
  });

  it("persists the current game state between page refreshes", () => {
    cy.startNewGame();

    const hint = "a hint";
    const guess = 25;
    Psychic.setsHint(hint);
    Player.setsGuess(guess);

    const oldSpectrumAlias = "old-spectrum";
    Game.getSpectrum().as(oldSpectrumAlias);

    // refresh the page
    cy.reload();

    // assert that the hint, guess, and spectrum have not changed
    // after refreshing the page.
    Game.getSpectrum().then((spectrum) => {
      cy.get(`@${oldSpectrumAlias}`).should("to.deep.equal", spectrum);
    });
    Game.getSubmittedHint().should("equal", hint);
    Game.getGuessAngle().should("equal", guess);
  });
});
