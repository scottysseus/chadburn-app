import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";

/**
 * returns a sensible default URL for the signaling server (used by players to connect to each other)
 * @returns
 */
export function getDefaultSignalingUrl() {
  const baseUrl = new URL(Cypress.config("baseUrl"));

  // if the Cypress baseUrl is localhost, that means the tests are running in a local dev environment
  // in this case, connect to the default local signaling server on port 4444
  if (baseUrl.hostname === "localhost") {
    return "ws://localhost:4444";
  }

  // otherwise, we are probably running the tests in CI, in which case we should connect to the production signaling server
  return "wss://signaling.chadburn.app:443";
}

/**
 * Creates another player.
 * @param {*} gameId
 * @param {*} signalingUrl
 * @returns
 */
export function getClientForAnotherPlayer(gameId, signalingUrl) {
  const ydoc = new Y.Doc();

  const provider = new WebrtcProvider(gameId, ydoc, {
    signaling: [signalingUrl],
  });

  return new MultiplayerClient(ydoc, provider);
}

const SHARED_STATE_YMAP_NAME = "sharedState";

/**
 * MultiplayerClient represents another player.
 * It can be used to perform actions on behalf of another player and query the other player's game state.
 */
export class MultiplayerClient {
  constructor(ydoc, provider) {
    this.ydoc = ydoc;
    this.provider = provider;
    this.ymap = this.ydoc.getMap(SHARED_STATE_YMAP_NAME);
  }

  getSubmittedHint() {
    return this.ymap.get("game")?.get("turn")?.get("hint");
  }

  getGuess() {
    return this.ymap.get("guess");
  }

  setGuess(guess) {
    this.ymap.set("guess", guess);
  }
}
