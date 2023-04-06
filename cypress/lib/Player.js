import { Game } from "./Game";

export const Player = {
  setsGuess(guess) {
    Game.enablePlayerView();
    cy.get('[data-cy="game_input_guess"]').clear().type(guess);
  },
  submitsGuessForPoints(points) {
    Game.getGuessForPoints(points).then((guessAngle) => {
      Player.submitsGuess(guessAngle);
    });
  },
  submitsGuess(guess) {
    Player.setsGuess(guess);
    cy.get('[data-cy="game_btn_submit_guess"]').click();
  },
  submitsRebuttalWithCorrectness(correct) {
    let rebuttalFunction = correct
      ? Game.getCorrectRebuttal
      : Game.getIncorrectRebuttal;
    rebuttalFunction().then((rebuttal) => {
      Player.submitsRebuttal(rebuttal);
    });
  },
  submitsCorrectRebuttal() {
    Player.submitsRebuttalWithCorrectness(true);
  },
  submitsIncorrectRebuttal() {
    Player.submitsRebuttalWithCorrectness(false);
  },
  submitsRebuttal(rebuttal) {
    Game.enablePlayerView();
    cy.contains("button", rebuttal).then(($btn) => {
      if (!$btn.is(":disabled")) {
        $btn.trigger("click");
      }
    });
    cy.get('[data-cy="game_btn_submit_rebuttal"]').click();
  },
};
