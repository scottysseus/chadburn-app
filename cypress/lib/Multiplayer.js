import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";
import { ActionTypes } from "../../src/store/actions";
import { YStoreFactory } from "../../src/store/Store";

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
export function getClientForAnotherPlayer(
  gameId,
  signalingUrl,
  initialState,
  isNewGame = false
) {
  const ydoc = new Y.Doc();

  const provider = new WebrtcProvider(gameId, ydoc, {
    signaling: [signalingUrl],
  });

  const factory = new YStoreFactory({ ydoc, id: gameId });
  const store = factory.getStore(initialState, isNewGame);

  return new MultiplayerClient(store, ydoc, provider);
}

/**
 * MultiplayerClient represents another player.
 * It can be used to perform actions on behalf of another player and query the other player's game state.
 */
export class MultiplayerClient {
  /**
   * Constructs a MultiplayerClient object, which represents an in-process
   * second player.
   * The gameId it's a second player of is determined by the YStore, which is injected.
   */
  constructor(store, ydoc, provider) {
    this.store = store;

    // keep these around so they aren't garbage collected
    // maybe I am being paranoid
    this.ydoc = ydoc;
    this.provider = provider;
  }

  startGame() {
    return this.store.publish({ type: ActionTypes.START_GAME });
  }

  getSubmittedHint() {
    return this.store.getSnapshot().game.turn.hint;
  }

  getGuess() {
    return this.store.getSnapshot().guess;
  }

  getSpectrum() {
    return this.store.getSnapshot().game.turn.spectrum;
  }

  getMode() {
    return this.store.getSnapshot().mode;
  }

  setGuess(guess) {
    this.store.publish({ type: ActionTypes.UPDATE_GUESS, guess });
  }

  setSubmittedHint(hint) {
    this.store.publish({ type: ActionTypes.SUBMIT_HINT, hint });
  }

  setSubmittedGuess(guess) {
    this.store.publish({
      type: ActionTypes.SUBMIT_GUESS,
      guess: guess,
    });
  }

  setSubmittedRebuttal(rebuttal) {
    this.store.publish({
      type: ActionTypes.SUBMIT_REBUTTAL,
      rebuttal,
    });
  }

  finishTurn() {
    this.store.publish({
      type: ActionTypes.FINISH_TURN,
    });
  }

  startTurn() {
    this.store.publish({ type: ActionTypes.START_TURN });
  }
}
