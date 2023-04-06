/// <reference types="Cypress" />

import { Game } from "../lib/Game";
import {
  getClientForAnotherPlayer,
  getDefaultSignalingUrl,
} from "../lib/Multiplayer";
import { Player } from "../lib/Player";
import { Psychic } from "../lib/Psychic";

describe("multiplayer", () => {
  it("shares hint submissions with other players", () => {
    cy.startNewGame();

    const otherPlayerAlias = "other-player";

    Game.getId().then((gameId) => {
      const otherPlayer = getClientForAnotherPlayer(
        gameId,
        getDefaultSignalingUrl()
      );

      cy.wrap(otherPlayer).as(otherPlayerAlias);
    });

    const hint = "a hint";
    Psychic.submitsHint(hint);

    cy.get(`@${otherPlayerAlias}`).then((otherPlayer) => {
      cy.wrap(otherPlayer.getSubmittedHint()).should("equal", hint);
    });
  });

  it("shares guess dial updates with other players", () => {
    cy.startNewGame();

    const otherPlayerAlias = "other-player";

    Game.getId().then((gameId) => {
      const otherPlayer = getClientForAnotherPlayer(
        gameId,
        getDefaultSignalingUrl()
      );

      cy.wrap(otherPlayer).as(otherPlayerAlias);
    });

    Psychic.submitsHint("a hint");

    const guess = 88;
    Player.setsGuess(guess);

    cy.get(`@${otherPlayerAlias}`).then((otherPlayer) => {
      cy.wrap(otherPlayer.getGuess()).should("equal", guess);
    });
  });

  it("receives guess dial updates from other players", () => {
    cy.startNewGame();

    const otherPlayerAlias = "other-player";

    Game.getId().then((gameId) => {
      const otherPlayer = getClientForAnotherPlayer(
        gameId,
        getDefaultSignalingUrl()
      );

      cy.wrap(otherPlayer).as(otherPlayerAlias);
    });

    Psychic.submitsHint("a hint");

    const guess = 88;

    cy.get(`@${otherPlayerAlias}`).then((otherPlayer) => {
      otherPlayer.setGuess(guess);
    });

    Game.getGuessAngle().should("equal", guess);
  });

  /*
  TODO enable this test when we fix the multiplayer cache overwriting issue
  it("leaves behind its cached state when joining another player's game", () => {
    cy.startNewGame();
    Psychic.submitsHint("a hint");
    Player.setsGuess(11);

    const otherGameId = "otherGame";
    const otherPlayer = getClientForAnotherPlayer(
      otherGameId,
      getDefaultSignalingUrl()
    );

    const newGuess = 22;
    const newHint = "new hint";
    otherPlayer.setGuess(newGuess);
    otherPlayer.setSubmittedHint(newHint);

    cy.visit(`/${otherGameId}`);

    Game.getGuessAngle().should("equal", newGuess);
    Game.getSubmittedHint().should("equal", newHint);
  });
  */
});