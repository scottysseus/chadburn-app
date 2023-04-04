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

    Game.getGuessAngle().should("equal", 88);
  });
});
