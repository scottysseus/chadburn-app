/// <reference types="Cypress" />

import { Game } from "../lib/Game";
import {
  getClientForAnotherPlayer,
  getDefaultSignalingUrl,
} from "../lib/Multiplayer";
import { Psychic } from "../lib/Psychic";

describe("multiplayer", () => {
  it("shares updates between players", () => {
    cy.startNewGame();

    const otherPlayerAlias = "other-player";

    Game.getId().then((gameId) => {
      const otherPlayer = getClientForAnotherPlayer(
        gameId,
        getDefaultSignalingUrl()
      );
      console.log("created other player");
      cy.wrap(otherPlayer).as(otherPlayerAlias);
    });

    const hint = "a hint";
    Psychic.setsHint(hint);
    console.log("set hint");

    /*
    TODO multiplayer is completely broken ATM - updates to the dial, the spectra, etc. - nothing is synchronized currently.
    websocket traffic does not seem to be carrying updates, but I need to look into this more (I could be misreading things)
    It is difficult to make progress with these tests in such a state. 
    The next step is probably to use git bisect or something to identify when all of this shit broke.
    */

    cy.get(`@${otherPlayerAlias}`).then((otherPlayer) => {
      cy.wrap(otherPlayer.getSubmittedHint()).should("equal", hint);
    });
  });
});
