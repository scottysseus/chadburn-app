import { finishTurn, startGame, updateTurn } from "./game";
import { submitGuess, submitHint } from "./turn";

describe("game state machine", () => {
  it("computes the correct score at the end of a turn", () => {
    // the guess matches the target, so the team-in-turn should be
    // awarded 4 points, and we should skip the rebuttal
    let game = startGame({ left: "left", right: "right" }, 0);
    game = updateTurn(game, submitHint(game.turn, "hint :)"));
    game = updateTurn(game, submitGuess(game.turn, 0));

    game = finishTurn(game);

    expect(game.score.get(game.teamInTurn)).toBe(4);
  });
});
