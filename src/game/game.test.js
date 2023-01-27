import {
  finishTurn,
  getTeamOutOfTurn,
  startGame,
  updateTurn,
} from "src/game/game";
import {
  Rebuttals,
  submitGuess,
  submitHint,
  submitRebuttal,
} from "src/game/turn";

describe("game state machine", () => {
  describe("computes the correct score at the end of a turn", () => {
    const turnTable = [
      /* target, guess, rebuttal, expected turn team score, expected other team score */

      // if the guess matches the target, the turn team should receive 4 points
      // and the rebuttal should be skipped.
      [0, 0, null, 4, 0],

      // if the guess is close enough to the target, the turn team still receives
      // 4 points and the rebuttal should be skipped.
      [0, 2, null, 4, 0],
      [10, 0, Rebuttals.RIGHT, 3, 1],
      [10, 0, Rebuttals.LEFT, 3, 0],
    ];

    it.each(turnTable)(
      "target: %d, guess: %d, rebuttal: %s",
      (
        target,
        guess,
        rebuttal,
        expectedTurnTeamScore,
        expectedOtherTeamScore
      ) => {
        let game = startGame({ left: "left", right: "right" }, target);
        game = updateTurn(game, submitHint(game.turn, "hint :)"));
        game = updateTurn(game, submitGuess(game.turn, guess));

        if (target !== guess) {
          game = updateTurn(game, submitRebuttal(game.turn, rebuttal));
        }

        game = finishTurn(game);

        expect(game.score.get(game.teamInTurn)).toBe(expectedTurnTeamScore);
        expect(game.score.get(getTeamOutOfTurn(game))).toBe(
          expectedOtherTeamScore
        );
      }
    );
  });
});
