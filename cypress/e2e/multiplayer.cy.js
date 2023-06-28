/// <reference types="Cypress" />

import { getInitialSharedState } from "../../src/store/Store";
import { modeCommands, Game } from "../lib/Game";
import {
  getClientForAnotherPlayer,
  getDefaultSignalingUrl,
} from "../lib/Multiplayer";
import { Player } from "../lib/Player";
import { Psychic } from "../lib/Psychic";

describe("multiplayer", () => {
  describe("shares the correct game mode", () => {
    modeCommands.forEach((modeCommand) => {
      it(`shares mode ${modeCommand.mode}`, () => {
        modeCommand.command();

        const otherPlayerAlias = "other-player";

        Game.getId().then((gameId) => {
          const otherPlayer = getClientForAnotherPlayer(
            gameId,
            getDefaultSignalingUrl()
          );

          cy.wrap(otherPlayer).as(otherPlayerAlias);
        });

        Psychic.submitsHint("a hint");

        cy.get(`@${otherPlayerAlias}`).then((otherPlayer) => {
          expect(otherPlayer.getMode()).to.eq(modeCommand.mode);
        });
      });
    });
  });

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

  it("leaves behind its cached state when joining another player's game", () => {
    cy.startNewGame();
    Psychic.submitsHint("a hint");
    Player.setsGuess(11);

    const otherGameId = "otherGame";
    const otherPlayer = getClientForAnotherPlayer(
      otherGameId,
      getDefaultSignalingUrl(),
      getInitialSharedState(),
      true
    );

    const newGuess = 22;
    const newHint = "new hint";
    otherPlayer.startGame();
    otherPlayer.setGuess(newGuess);
    otherPlayer.setSubmittedHint(newHint);
    const spectrum = otherPlayer.getSpectrum();

    cy.visit(`/${otherGameId}`);

    Game.getGuessAngle().should("equal", newGuess);
    Game.getSubmittedHint().should("equal", newHint);
    Game.getSpectrum().should("deep.equal", spectrum);
  });
});
