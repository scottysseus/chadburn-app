import { Game } from "./Game";

export const Psychic = {
  setsHint(hint) {
    Game.enablePsychicView();
    cy.get('[data-cy="game_input_hint"]').type(hint);
    cy.get('[data-cy="game_btn_submit_hint"]').click();
  },
};
