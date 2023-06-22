import React, { useEffect, useState } from "react";
import { TopBar } from "src/components/TopBar";

import {
  getGuessScore,
  getScoreLeader,
  getTeamOutOfTurn,
  isCatchUp,
  isGameOver,
} from "src/game/game";
import {
  isGuessSubmitted,
  isRebuttalSubmitted,
  isTurnOver,
  Rebuttal,
  Rebuttals,
} from "src/game/turn";
import { Chadburn } from "src/scenes/game/Chadburn";
import { EndGame } from "src/scenes/game/EndGame";
import { Footer } from "src/scenes/game/Footer";
import { GuessForm } from "src/scenes/game/GuessForm";
import { Header } from "src/scenes/game/Header";
import { Hint } from "src/scenes/game/Hint";
import { HintForm } from "src/scenes/game/HintForm";
import { RebuttalForm } from "src/scenes/game/RebuttalForm";
import { Spectrum } from "src/scenes/game/Spectrum";
import { Summary } from "src/scenes/game/Summary";
import {
  Action,
  ActionTypes,
  FinishTurnAction,
  SubmitGuessAction,
  SubmitHintAction,
  SubmitRebuttalAction,
  UpdateGuessAction,
  UpdateHintAction,
} from "src/store/actions";
import { GameMode, SharedState } from "src/store/SharedState";
import "../Game.module.scss";

interface GameProps {
  sharedState: SharedState;
  publish: <T extends Action>(action: T) => void;
}

const DEFAULT_REBUTTAL = Rebuttals.LEFT;

export const Game = ({ sharedState, publish }: GameProps) => {
  const [isPlayer, setIsPlayer] = useState<boolean>(true);

  const turnOver = isTurnOver(sharedState.game.turn);

  useEffect(() => {
    if (!sharedState.started) {
      publish({ type: ActionTypes.START_GAME });
    }
  }, [sharedState]);

  const onGuessUpdate = (guess: number) => {
    const action: UpdateGuessAction = {
      type: ActionTypes.UPDATE_GUESS,
      guess,
    };
    publish(action);
  };

  const onHintUpdate = (hint: string) => {
    const action: UpdateHintAction = {
      type: ActionTypes.UPDATE_HINT,
      hint,
    };
    publish(action);
  };

  const onHintSubmit = () => {
    const action: SubmitHintAction = {
      type: ActionTypes.SUBMIT_HINT,
      hint: sharedState.hint || "",
    };
    publish(action);
  };

  const onActorToggle = (isPlayer: boolean) => {
    setIsPlayer(isPlayer);
  };

  const onNewGameClick = () => {
    publish({ type: ActionTypes.NEW_GAME });
  };

  const onGuessSubmit = () => {
    const action: SubmitGuessAction = {
      type: ActionTypes.SUBMIT_GUESS,
      guess: sharedState.guess,
    };
    publish(action);
  };

  const onRebuttalUpdate = (rebuttal: Rebuttal) => {
    publish({ type: ActionTypes.UPDATE_REBUTTAL, rebuttal });
  };

  const onRebuttalSubmit = () => {
    const action: SubmitRebuttalAction = {
      type: ActionTypes.SUBMIT_REBUTTAL,
      rebuttal: sharedState.rebuttal ? sharedState.rebuttal : DEFAULT_REBUTTAL,
    };
    publish(action);
  };

  const finishTurn = () => {
    const action: FinishTurnAction = {
      type: ActionTypes.FINISH_TURN,
    };
    publish(action);
  };

  const onNextTurnClick = () => {
    finishTurn();
    if (getGuessScore(sharedState.game) === 4 && isCatchUp(sharedState.game)) {
      publish({ type: ActionTypes.START_CATCH_UP_TURN });
    } else {
      publish({ type: ActionTypes.START_TURN });
    }
  };

  const gameOver =
    isGameOver(sharedState.game.score) && sharedState.mode === GameMode.NORMAL;

  // we want to disable the chadburn (prevent it from being rotated) when
  // the turn summary is displayed
  let chadburnDisabled = turnOver;

  /**
   * The current action form depends on the current actor, view, and
   * step within the turn. At the start of the turn, for example, it
   * contains the hint form in the psychic view.
   */
  let currentActionFormVisible = !isPlayer;
  let currentActionForm = (
    <HintForm
      hint={sharedState.hint || ""}
      onHintUpdate={onHintUpdate}
      onHintSubmit={onHintSubmit}
    />
  );
  if (gameOver) {
    currentActionFormVisible = false;
  } else if (
    sharedState.game.turn.hint &&
    sharedState.game.turn.guess === undefined
  ) {
    currentActionForm = (
      <GuessForm
        guess={sharedState.guess}
        onGuessUpdate={onGuessUpdate}
        onGuessSubmit={onGuessSubmit}
      />
    );
    currentActionFormVisible = isPlayer;
  } else if (
    isGuessSubmitted(sharedState.game.turn) &&
    !isRebuttalSubmitted(sharedState.game.turn)
  ) {
    // disable the chadburn during the rebuttal
    chadburnDisabled = true;
    currentActionForm = (
      <RebuttalForm
        rebuttal={
          sharedState.rebuttal ? sharedState.rebuttal : DEFAULT_REBUTTAL
        }
        teamInTurn={sharedState.game.teamInTurn}
        otherTeam={getTeamOutOfTurn(sharedState.game)}
        onRebuttalUpdate={onRebuttalUpdate}
        onRebuttalSubmit={onRebuttalSubmit}
        mode={sharedState.mode}
      />
    );
    currentActionFormVisible = isPlayer;
  }

  const leader = getScoreLeader(sharedState.game.score);

  return (
    <>
      <TopBar />
      <div className="gameSceneContainer" draggable={false}>
        <Header
          visible={sharedState.mode === GameMode.NORMAL}
          score={sharedState.game.score}
          teamInTurn={sharedState.game.teamInTurn}
        />

        <Hint visible={!gameOver} hint={sharedState.game.turn.hint} />

        <div className="chadburnContainer">
          {gameOver ? (
            <EndGame victor={leader!} />
          ) : (
            <Chadburn
              guess={sharedState.guess}
              onGuessUpdate={onGuessUpdate}
              showTarget={!isPlayer || turnOver}
              target={sharedState.game.turn.target}
              disabled={chadburnDisabled}
            />
          )}
        </div>

        <Spectrum
          visible={!gameOver}
          spectrum={sharedState.game.turn.spectrum}
        />

        <div
          style={{
            visibility: currentActionFormVisible ? "visible" : "hidden",
          }}
          className="currentActionFormContainer"
        >
          {currentActionForm}
        </div>

        <div
          style={{
            visibility:
              turnOver && sharedState.mode === GameMode.NORMAL
                ? "visible"
                : "hidden",
          }}
          className="summary"
        >
          <Summary isTurnOver={turnOver} state={sharedState} />
        </div>

        <div className="actorToggleContainer">
          <Footer
            isPlayer={isPlayer}
            onActorToggle={onActorToggle}
            onNewGameClick={onNewGameClick}
            isTurnOver={turnOver}
            onNextTurnClick={onNextTurnClick}
          />
        </div>
      </div>
    </>
  );
};
