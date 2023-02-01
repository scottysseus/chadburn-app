import { Game } from "./Game";

export const Rebuttals = {
  RIGHT: "Right",
  LEFT: "Left",
};

export const Player = {
  setsGuess(guess) {
    Game.enablePlayerView();
    cy.get('[data-cy="game_input_guess"]').clear().type(guess);
    cy.get('[data-cy="game_btn_submit_guess"]').click();
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
