import { GameState } from "src/game/game";
import { Rebuttal, Spectrum } from "src/game/turn";

export enum GameMode {
  NORMAL,
  FREE_PLAY,
}

/**
 * SharedState is meant to be shared across all clients in the
 * same game. It includes the game state as well as 'edit mode' properties.
 */
export interface SharedState {
  hint?: string | undefined;

  // guess is the current position of the guess dial;
  // once the guess is submitted, it is saved to the GameState
  guess: number;
  rebuttal?: Rebuttal | undefined;

  // the current state of the game
  game: GameState;

  started: boolean;

  spectrumHistory: Array<Spectrum>;

  mode: GameMode;
}
