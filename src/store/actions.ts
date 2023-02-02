import { Rebuttal } from "src/game/turn";
import { SharedState } from "src/store/SharedState";

export enum ActionTypes {
  // game actions
  NEW_GAME = "NEW_GAME",
  START_GAME = "START_GAME",
  START_TURN = "START_TURN",
  START_CATCH_UP_TURN = "START_CATCH_UP_TURN",
  INITIALIZE_WITH_CACHED_STATE = "INITIALIZE_WITH_CACHED_STATE",

  // turn actions
  SUBMIT_GUESS = "SUBMIT_GUESS",
  SUBMIT_HINT = "SUBMIT_HINT",
  SUBMIT_REBUTTAL = "SUBMIT_REBUTTAL",

  // updating un-submitted state
  UPDATE_HINT = "UPDATE_HINT",
  UPDATE_GUESS = "UPDATE_GUESS",
  UPDATE_REBUTTAL = "UPDATE_REBUTTAL",
}

export interface Action {
  type: ActionTypes;
}

export interface UpdateHintAction extends Action {
  type: ActionTypes.UPDATE_HINT;
  hint: string;
}

export interface UpdateGuessAction extends Action {
  type: ActionTypes.UPDATE_GUESS;
  guess: number;
}

export interface UpdateRebuttalAction extends Action {
  type: ActionTypes.UPDATE_REBUTTAL;
  rebuttal: Rebuttal;
}

export interface SubmitHintAction extends Action {
  type: ActionTypes.SUBMIT_HINT;
  hint: string;
}

export interface SubmitGuessAction extends Action {
  type: ActionTypes.SUBMIT_GUESS;
  guess: number;
}

export interface SubmitRebuttalAction extends Action {
  type: ActionTypes.SUBMIT_REBUTTAL;
  rebuttal: Rebuttal;
}

export interface InitializeWithCachedState extends Action {
  type: ActionTypes.INITIALIZE_WITH_CACHED_STATE;
  toShare: SharedState;
}
