/// <reference types="Cypress" />

import { readFromLocalStorage } from "../../src/store/localStorage";
import { modeCommands, Game } from "../lib/Game";

describe("game", () => {
  modeCommands.forEach((modeCommand) => {
    it(`retains the game mode ${modeCommand.mode}`, () => {
      modeCommand.command();

      Game.startNextGame().then(() => {
        const currentSharedState = readFromLocalStorage();
        expect(currentSharedState.mode).to.eq(modeCommand.mode);
      });
    });
  });
});
