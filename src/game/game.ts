import { SharedState } from "src/store/SharedState";
import { Spectrum, startTurn as turnStateStartTurn, TurnState } from "./turn";

export type Score = Map<string, number>;

export interface GameState {
  // mapping between teams and points
  readonly score: Score;

  // the team whose turn it is
  readonly teamInTurn: string;

  readonly turn: TurnState;
}

export function startGame(spectrum: Spectrum, target: number): GameState {
  return {
    score: new Map<string, number>([
      ["blue", 0],
      ["red", 0],
    ]),
    teamInTurn: "blue",
    turn: turnStateStartTurn(spectrum, target),
  };
}

/**
 * startTurn stars a new turn for the given team.
 * @param state current game state
 * @param teamInTurn the team whose turn is starting
 * @param spectrum the spectrum for this turn
 * @param target the target for this turn
 * @returns updated game state
 */
export function startTurn(
  state: GameState,
  teamInTurn: string,
  spectrum: Spectrum,
  target: number
): GameState {
  return {
    ...state,
    teamInTurn,
    turn: turnStateStartTurn(spectrum, target),
  };
}

/**
 * finishTurn updates the game state with the results of the current turn.
 * It also updates the game state's turn state to prepare for the next turn.
 * TODO calculate the score from the target and guess
 * TODO update the score team
 * TODO determine if the game is finished here
 * TODO Make sure case in which guess === target
 * @param state current state to update
 * @returns the update state
 */
export function finishTurn(state: GameState): GameState {
  const guessScore = getGuessScore(state);

  const newState = { ...state };
  newState.score = new Map<string, number>(state.score);
  if (guessScore === 4) {
    newState.score.set(
      state.teamInTurn,
      (state.score.get(state.teamInTurn) || 0) + guessScore
    );
    newState.score.set(
      getTeamOutOfTurn(state),
      state.score.get(getTeamOutOfTurn(state)) || 0
    );
  } else {
    newState.score.set(
      state.teamInTurn,
      (state.score.get(state.teamInTurn) || 0) + guessScore
    );
    newState.score.set(
      getTeamOutOfTurn(state),
      (state.score.get(getTeamOutOfTurn(state)) || 0) + getRebuttalScore(state)
    );
  }

  return newState;
}

/*
    each target slice is 8 degrees

    example: target is 90°
    target angles:
    points: slices
    4: 86° - 94°
    3: 78° - 86°, 94° - 102°
    2: 70° - 78°, 102° - 110°
  */

export function getGuessScore(state: GameState): number {
  const absDifference = Math.abs(state.turn.guess - state.turn.target);

  if (absDifference < 5) {
    return 4;
  } else if (absDifference < 13) {
    return 3;
  } else if (absDifference <= 25) {
    return 2;
  } else {
    return 0;
  }
}

/**
 *
 * @param state
 * @returns
 */
export function getRebuttalScore(state: GameState): number {
  let correctRebuttal = "";

  if (state.turn.guess < state.turn.target) {
    correctRebuttal = "right";
  } else if (state.turn.guess > state.turn.target) {
    correctRebuttal = "left";
  }

  if (correctRebuttal === state.turn.rebuttal) {
    return 1;
  } else {
    return 0;
  }
}

export function getTeamOutOfTurn(state: GameState): string {
  return state.teamInTurn === "blue" ? "red" : "blue";
}

/**
 * updateTurn performs all other turn state updates on the given game state.
 * @param state GameState to update
 * @param turn the new TurnState for this game
 * @returns the update state
 */
export function updateTurn(state: GameState, turn: TurnState): GameState {
  return { ...state, turn };
}

export function isGameOver(state: SharedState): boolean {
  if (
    (state.game.score.get(state.game.teamInTurn) || 0) >= 10 ||
    (state.game.score.get(getTeamOutOfTurn(state.game)) || 0) >= 10
  ) {
    console.log("teaminturn", state?.game.score.get(state.game.teamInTurn));
    console.log(
      "teamoutturn",
      state?.game.score.get(getTeamOutOfTurn(state.game))
    );
    return true;
  } else {
  }

  return false;
}

export function finishGame(state: GameState): GameState {
  return { ...state };
}
