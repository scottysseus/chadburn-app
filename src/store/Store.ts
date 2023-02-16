import {
  finishTurn,
  getTeamOutOfTurn,
  startGame,
  startTurn,
  updateTurn,
} from "src/game/game";
import {
  getRandomSpectrum,
  getRandomTarget,
  submitGuess,
  submitHint,
  submitRebuttal,
} from "src/game/turn";
import {
  Action,
  ActionTypes,
  InitializeWithCachedState,
  SubmitGuessAction,
  SubmitHintAction,
  SubmitRebuttalAction,
  UpdateGuessAction,
  UpdateHintAction,
  UpdateRebuttalAction,
} from "src/store/actions";
import { SharedState } from "src/store/SharedState";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";

export const YMapKeys = {
  GUESS: "guess",

  STARTED: "started",

  GAME: "game",
  TEAM_IN_TURN: "teamInTurn",
  SCORE: "score",
  TURN: "turn",

  HINT: "hint",
  TARGET: "target",
  SPECTRUM: "spectrum",
  ACTOR: "actor",
  LEFT: "left",
  RIGHT: "right",
  REBUTTAL: "rebuttal",
};

const START_GUESS = 0;

export const SHARED_STATE_YMAP_NAME = "sharedState";

export function getInitialSharedState(): SharedState {
  return {
    started: false,
    guess: START_GUESS,
    game: startGame(getRandomSpectrum(), getRandomTarget()),
  };
}

export function geCachedSharedState(cachedState: SharedState): SharedState {
  return {
    game: cachedState.game,
    started: cachedState.started,
    guess: cachedState.guess,
    hint: cachedState.hint,
    rebuttal: cachedState.rebuttal,
  };
}

export type Listener = () => void;

export interface Store {
  publish<T extends Action>(action: T): void;
  subscribe(listener: Listener): () => void;
  getSnapshot(): SharedState;
}

export class YStore implements Store {
  listeners: Listener[];
  ymap: Y.Map<any>;
  ydoc: Y.Doc;
  cachedSnapshot?: SharedState;

  constructor(ydoc: Y.Doc) {
    this.listeners = [];

    this.ydoc = ydoc;
    this.ymap = this.ydoc.getMap<any>(SHARED_STATE_YMAP_NAME);
    this.transactShareState(getInitialSharedState());
    this.ymap.observeDeep(() => {
      this.updateCachedSnapshot();
      this.emitChange();
    });

    // I feel like this should be done automatically...
    this.publish = this.publish.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.getSnapshot = this.getSnapshot.bind(this);
  }

  publish<T extends Action>(action: T): void {
    let toShare: SharedState = this.getSnapshot();
    switch (action.type) {
      case ActionTypes.UPDATE_HINT:
        const updateHint: UpdateHintAction =
          action as unknown as UpdateHintAction;
        this.ymap.set(YMapKeys.HINT, updateHint.hint);
        break;

      case ActionTypes.UPDATE_GUESS:
        const updateGuess: UpdateGuessAction =
          action as unknown as UpdateGuessAction;
        this.ymap.set(YMapKeys.GUESS, updateGuess.guess);
        break;

      case ActionTypes.UPDATE_REBUTTAL:
        const updateRebuttal: UpdateRebuttalAction =
          action as unknown as UpdateRebuttalAction;
        this.ymap.set(YMapKeys.REBUTTAL, updateRebuttal.rebuttal);
        break;

      case ActionTypes.START_GAME:
        this.ymap.set(YMapKeys.STARTED, true);
        break;

      case ActionTypes.NEW_GAME:
        toShare = getInitialSharedState();
        this.transactShareState(toShare);
        break;

      case ActionTypes.START_TURN:
        toShare = {
          ...toShare,
          guess: START_GUESS,
          hint: undefined,
          rebuttal: undefined,
          game: startTurn(
            toShare.game,
            getTeamOutOfTurn(toShare.game),
            getRandomSpectrum(),
            getRandomTarget()
          ),
        };
        this.transactShareState(toShare);
        break;

      case ActionTypes.START_CATCH_UP_TURN:
        toShare = {
          ...toShare,
          guess: START_GUESS,
          hint: undefined,
          rebuttal: undefined,
          game: startTurn(
            toShare.game,
            toShare.game.teamInTurn,
            getRandomSpectrum(),
            getRandomTarget()
          ),
        };
        this.transactShareState(toShare);
        break;

      case ActionTypes.SUBMIT_HINT:
        const submitHintAction = action as unknown as SubmitHintAction;
        toShare = {
          ...toShare,
          game: updateTurn(
            toShare.game,
            submitHint(toShare.game.turn, submitHintAction.hint)
          ),
        };
        this.transactShareState(toShare);
        break;

      case ActionTypes.SUBMIT_GUESS:
        const submitGuessAction = action as unknown as SubmitGuessAction;
        toShare = {
          ...toShare,
          game: updateTurn(
            toShare.game,
            submitGuess(toShare.game.turn, submitGuessAction.guess)
          ),
        };
        this.transactShareState(toShare);
        break;

      case ActionTypes.SUBMIT_REBUTTAL:
        const submitRebuttalAction = action as unknown as SubmitRebuttalAction;
        toShare = {
          ...toShare,
          game: finishTurn(
            updateTurn(
              toShare.game,
              submitRebuttal(toShare.game.turn, submitRebuttalAction.rebuttal)
            )
          ),
        };
        this.transactShareState(toShare);
        break;

      case ActionTypes.INITIALIZE_WITH_CACHED_STATE:
        const initializeWithCachedStateAction =
          action as unknown as InitializeWithCachedState;
        toShare = geCachedSharedState(initializeWithCachedStateAction.toShare);
        this.transactShareState(toShare);
        break;
    }
  }

  /**
   * Subscribes a listener to changes to the store.
   * @param listener
   * @returns An unsubscribe function for this listener.
   */
  subscribe(listener: Listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  getSnapshot(): SharedState {
    if (!this.cachedSnapshot) {
      this.cachedSnapshot = getInitialSharedState();
    }

    return this.cachedSnapshot;
  }

  private getSharedStateFromY() {
    if (this.ymap.size < 1) {
      return getInitialSharedState();
    }

    const gameState = this.ymap.get(YMapKeys.GAME) as Y.Map<any>;
    const score = gameState.get(YMapKeys.SCORE) as Y.Map<any>;
    const turnState = gameState.get(YMapKeys.TURN) as Y.Map<any>;

    const updatedScore = new Map<string, number>();
    score.forEach((value, key) => {
      updatedScore.set(String(key), Number(value));
    });

    const sharedState: SharedState = {
      started: this.ymap.get(YMapKeys.STARTED),
      hint: this.ymap.get(YMapKeys.HINT),
      guess: this.ymap.get(YMapKeys.GUESS),
      rebuttal: this.ymap.get(YMapKeys.REBUTTAL),
      game: {
        teamInTurn: gameState.get(YMapKeys.TEAM_IN_TURN),
        score: updatedScore,
        turn: {
          actor: turnState.get(YMapKeys.ACTOR),
          spectrum: {
            left: turnState.get(YMapKeys.LEFT),
            right: turnState.get(YMapKeys.RIGHT),
          },
          target: turnState.get(YMapKeys.TARGET),
          hint: turnState.get(YMapKeys.HINT),
          guess: turnState.get(YMapKeys.GUESS),
          rebuttal: turnState.get(YMapKeys.REBUTTAL),
        },
      },
    };

    return sharedState;
  }

  private transactShareState(toShare: SharedState) {
    this.ydoc.transact(() => {
      this.shareState(toShare);
    });
  }

  private shareState(toShare: SharedState) {
    if (this.ymap.size < 1) {
      this.initializeYMap();
    }

    this.ymap.set(YMapKeys.HINT, toShare.hint);
    this.ymap.set(YMapKeys.GUESS, toShare.guess);
    this.ymap.set(YMapKeys.REBUTTAL, toShare.rebuttal);
    this.ymap.set(YMapKeys.STARTED, toShare.started);

    const gameState = this.ymap.get(YMapKeys.GAME) as Y.Map<any>;
    gameState.set(YMapKeys.TEAM_IN_TURN, toShare.game.teamInTurn);

    const score = gameState.get(YMapKeys.SCORE) as Y.Map<any>;
    toShare.game.score.forEach((value, key) => {
      score.set(key, value);
    });

    const turn = gameState.get(YMapKeys.TURN) as Y.Map<any>;
    turn.set(YMapKeys.ACTOR, toShare.game.turn.actor);
    turn.set(YMapKeys.TARGET, toShare.game.turn.target);
    turn.set(YMapKeys.HINT, toShare.game.turn.hint);
    turn.set(YMapKeys.GUESS, toShare.game.turn.guess);

    turn.set(YMapKeys.LEFT, toShare.game.turn.spectrum.left);
    turn.set(YMapKeys.RIGHT, toShare.game.turn.spectrum.right);
    turn.set(YMapKeys.REBUTTAL, toShare.game.turn.rebuttal);
  }

  private initializeYMap() {
    const game = new Y.Map();
    const score = new Y.Map();
    const turn = new Y.Map();

    this.ymap.set(YMapKeys.GAME, game);
    game.set(YMapKeys.SCORE, score);
    game.set(YMapKeys.TURN, turn);
  }

  private updateCachedSnapshot() {
    this.cachedSnapshot = this.getSharedStateFromY();
  }

  private emitChange() {
    this.listeners.forEach((listener) => {
      listener();
    });
  }
}

export class YStoreFactory {
  private ydoc: Y.Doc;
  private provider?: WebrtcProvider;

  constructor({ ydoc, id }: { ydoc?: Y.Doc; id?: string }) {
    if (!ydoc) {
      ydoc = new Y.Doc();

      if (!id) {
        throw "id must be provided if ydoc is undefined";
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore this line - I think Yjs devs effed up the opts object typing
      this.provider = new WebrtcProvider(id, ydoc, {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore SIGNALING_URL is injected at build time, see build.js
        signaling: [SIGNALING_URL],
      });
    }

    this.ydoc = ydoc;
  }

  getStore() {
    return new YStore(this.ydoc);
  }
}
