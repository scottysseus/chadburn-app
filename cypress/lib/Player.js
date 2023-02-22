import { Game } from "./Game";

export const Player = {
  setsGuessForPoints(points) {
    Game.getGuessForPoints(points).then((guessAngle) => {
      Player.setsGuess(guessAngle);
    });
  },
  setsGuess(guess) {
    Game.enablePlayerView();
    cy.get('[data-cy="game_input_guess"]').clear().type(guess);
    cy.get('[data-cy="game_btn_submit_guess"]').click();
  },
  choosesRebuttalWithCorrectness(correct) {
    let rebuttalFunction = correct
      ? Game.getCorrectRebuttal
      : Game.getIncorrectRebuttal;
    rebuttalFunction().then((rebuttal) => {
      Player.choosesRebuttal(rebuttal);
    });
  },
  choosesCorrectRebuttal() {
    Player.choosesRebuttalWithCorrectness(true);
  },
  choosesIncorrectRebuttal() {
    Player.choosesRebuttalWithCorrectness(false);
  },
  choosesRebuttal(rebuttal) {
    Game.enablePlayerView();
    cy.contains("button", rebuttal).then(($btn) => {
      if (!$btn.is(":disabled")) {
        $btn.trigger("click");
      }
    });
    cy.get('[data-cy="game_btn_submit_rebuttal"]').click();
  },
};
