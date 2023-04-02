import { Game } from "./Game";

export const Player = {
  setsGuess(guess) {
    Game.enablePlayerView();
    cy.get('[data-cy="game_input_guess"]').clear().type(guess);
  },
  /**
   * Submits a guess that will result in the given points
   * @param {*} points
   */
  submitsGuessForPoints(points) {
    Game.getGuessForPoints(points).then((guessAngle) => {
      Player.submitsGuess(guessAngle);
    });
  },
  /**
   * Submits the given guess angle
   * @param {*} guess
   */
  submitsGuess(guess) {
    Player.setsGuess(guess);
    cy.get('[data-cy="game_btn_submit_guess"]').click();
  },
  /**
   * Submits the rebuttal with the given correctness value, either true or false
   * @param {*} correct
   */
  submitsRebuttalWithCorrectness(correct) {
    let rebuttalFunction = correct
      ? Game.getCorrectRebuttal
      : Game.getIncorrectRebuttal;
    rebuttalFunction().then((rebuttal) => {
      Player.submitsRebuttal(rebuttal);
    });
  },
  /**
   * Submits the correct rebuttal
   */
  submitsCorrectRebuttal() {
    Player.submitsRebuttalWithCorrectness(true);
  },
  /**
   * Submits the incorrect rebuttal
   */
  submitsIncorrectRebuttal() {
    Player.submitsRebuttalWithCorrectness(false);
  },
  /**
   * Submits the given rebuttal, either LEFT or RIGHT
   * @param {*} rebuttal
   */
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
