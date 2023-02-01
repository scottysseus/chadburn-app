/// <reference types="Cypress" />

import { Game, Teams } from "../lib/Game";
import { Player } from "../lib/Player";
import { Psychic } from "../lib/Psychic";

describe("game", () => {
  it("can play a game to 10", () => {
    cy.startNewGame();

    // blue team turn 1
    Psychic.setsHint("a hint");
    Game.getGuessForPoints(4).then((guessAngle) => {
      Player.setsGuess(guessAngle);
    });
    Game.getIncorrectRebuttal().then((rebuttal) => {
      Player.choosesRebuttal(rebuttal);
    });
    Game.getScoreForTeam(Teams.BLUE).should("equal", "4");
    Game.getScoreForTeam(Teams.RED).should("equal", "0");

    // red team turn 1
    Psychic.setsHint("a hint");
    Game.getGuessForPoints(2).then((guessAngle) => {
      Player.setsGuess(guessAngle);
    });
    Game.getCorrectRebuttal().then((rebuttal) => {
      Player.choosesRebuttal(rebuttal);
    });

    Game.getScoreForTeam(Teams.BLUE).should("equal", "5");
    Game.getScoreForTeam(Teams.RED).should("equal", "2");

    // blue team turn 2
    Psychic.setsHint("a hint");
    Game.getGuessForPoints(3).then((guessAngle) => {
      Player.setsGuess(guessAngle);
    });
    Game.getCorrectRebuttal().then((rebuttal) => {
      Player.choosesRebuttal(rebuttal);
    });
    Game.getScoreForTeam(Teams.BLUE).should("equal", "8");
    Game.getScoreForTeam(Teams.RED).should("equal", "3");

    // red team turn 2
    Psychic.setsHint("a hint");
    Game.getGuessForPoints(4).then((guessAngle) => {
      Player.setsGuess(guessAngle);
    });
    Game.getIncorrectRebuttal().then((rebuttal) => {
      Player.choosesRebuttal(rebuttal);
    });

    Game.getScoreForTeam(Teams.BLUE).should("equal", "8");
    Game.getScoreForTeam(Teams.RED).should("equal", "7");

    // red team catch up turn
    Psychic.setsHint("a hint");
    Game.getGuessForPoints(0).then((guessAngle) => {
      Player.setsGuess(guessAngle);
    });
    Game.getCorrectRebuttal().then((rebuttal) => {
      Player.choosesRebuttal(rebuttal);
    });

    Game.getScoreForTeam(Teams.BLUE).should("equal", "9");
    Game.getScoreForTeam(Teams.RED).should("equal", "7");

    // blue team turn 3
    Psychic.setsHint("a hint");
    Game.getGuessForPoints(2).then((guessAngle) => {
      Player.setsGuess(guessAngle);
    });
    Game.getCorrectRebuttal().then((rebuttal) => {
      Player.choosesRebuttal(rebuttal);
    });

    Game.getScoreForTeam(Teams.BLUE).should("equal", "11");
    Game.getScoreForTeam(Teams.RED).should("equal", "8");
  });
});
