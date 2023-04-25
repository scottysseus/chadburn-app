import {
  Rebuttal,
  Rebuttals,
  Spectrum,
  startTurn as turnStateStartTurn,
  TurnState,
} from "src/game/turn";

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
 * @param state current state to update
 * @returns the update state
 */
export function finishTurn(state: GameState): GameState {
  const newState = { ...state };
  newState.score = new Map<string, number>(state.score);

  newState.score.set(state.teamInTurn, getTeamScore(state, state.teamInTurn));
  newState.score.set(
    getTeamOutOfTurn(state),
    getTeamScore(state, getTeamOutOfTurn(state))
  );

  return newState;
}

export function getTeamScore(state: GameState, team: string): number {
  const guessScore = getGuessScore(state);

  if (guessScore === 4) {
    if (team === state.teamInTurn) {
      return (state.score.get(state.teamInTurn) || 0) + guessScore;
    } else {
      return state.score.get(getTeamOutOfTurn(state)) || 0;
    }
  } else {
    if (team === state.teamInTurn) {
      return (state.score.get(state.teamInTurn) || 0) + guessScore;
    } else {
      return (
        (state.score.get(getTeamOutOfTurn(state)) || 0) +
        getRebuttalScore(state, getCorrectRebuttal(state))
      );
    }
  }
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
  if (state.turn.guess === undefined) {
    throw "guess undefined";
  }

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
export function getCorrectRebuttal(state: GameState): Rebuttal {
  if (state.turn.guess === undefined) {
    throw "guess undefined";
  }

  if (state.turn.guess < state.turn.target) {
    return Rebuttals.RIGHT;
  }
  return Rebuttals.LEFT;
}

export function getRebuttalScore(
  state: GameState,
  correctRebuttal: Rebuttal
): number {
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

export const isCatchUp = (state: GameState): boolean => {
  if (
    (state.score.get(state.teamInTurn) || 0) <
    (state.score.get(getTeamOutOfTurn(state)) || 0)
  ) {
    return true;
  }
  return false;
};

export function isGameOver(score: Score): boolean {
  for (const key of score.keys()) {
    if ((score.get(key) || 0) >= 10) {
      return true;
    }
  }
  return false;
}

export function getScoreLeader(score: Score): string | undefined {
  let highScore = 0;
  let leader = undefined;

  score.forEach((score, team) => {
    if (score > highScore) {
      highScore = score;
      leader = team;
    }
  });

  return leader;
}
