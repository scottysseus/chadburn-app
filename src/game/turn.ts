import { spectrumData } from "src/data/spectrumData";

export enum Actors {
  Psychic = "psychic",
  Player = "player",
}

export type Actor = Actors.Player | Actors.Psychic;

export enum Rebuttals {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

export type Rebuttal = Rebuttals.LEFT | Rebuttals.RIGHT;

export interface Spectrum {
  left: string;
  right: string;
}

export interface TurnState {
  readonly actor: Actor;
  readonly spectrum: Spectrum;
  readonly target: number;
  hint?: string | undefined;
  guess?: number | undefined;
  rebuttal?: Rebuttal | undefined;
}

function getRandomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

// TODO create unit tests to check which of these two are most opitmal.
export function getRandomSpectrum(spectrumHistory: Array<Spectrum>): Spectrum {
  const spectrumSet = new Set(spectrumData);

  spectrumHistory.map((spectrum) => {
    spectrumSet.has(spectrum) ? spectrumSet.delete(spectrum) : null;
  });

  const currentRandomIndex = getRandomInteger(0, spectrumSet.size);

  return Array.from(spectrumSet)[currentRandomIndex];
}

export function getRandomTarget(): number {
  return getRandomInteger(-90, 90);
}

/**
 *
 * @returns AwaitingHint TurnState
 */
export function startTurn(spectrum: Spectrum, target: number): TurnState {
  return {
    actor: Actors.Psychic,
    spectrum: spectrum,
    target: target,
  };
}

export function submitHint(state: TurnState, hint: string): TurnState {
  return { ...state, actor: Actors.Player, hint: hint };
}

export function submitRebuttal(
  state: TurnState,
  rebuttal: Rebuttal
): TurnState {
  return { ...state, actor: Actors.Player, rebuttal: rebuttal };
}

export function submitGuess(state: TurnState, guess: number): TurnState {
  return { ...state, guess };
}

export const isTurnOver = (turn: TurnState) => {
  return !!turn.rebuttal;
};

export function finishTurn(state: TurnState): TurnState {
  return { ...state };
}

export function isHintSubmitted(state: TurnState): boolean {
  return !!state.hint;
}

export function isGuessSubmitted(state: TurnState): boolean {
  return state.guess !== undefined && !isNaN(state.guess);
}

export function isRebuttalSubmitted(state: TurnState): boolean {
  return !!state.rebuttal;
}
