import { Game } from "./Game";

export const Psychic = {
  submitsHint(hint) {
    Game.enablePsychicView();
    cy.get('[data-cy="game_input_hint"]').clear().type(hint);
    cy.get('[data-cy="game_btn_submit_hint"]').click();
  },
};
