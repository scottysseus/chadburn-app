import React, { useEffect, useState } from "react";
import { Toggle } from "src/components/Toggle";

import { getTeamOutOfTurn, isGameOver } from "src/game/game";
import {
  isGuessSubmitted,
  isRebuttalSubmitted,
  isTurnOver,
  Rebuttal,
  Rebuttals,
} from "src/game/turn";
import { EndGame } from "src/scenes/EndGame";
import { Header } from "src/scenes/Header";
import { Hint } from "src/scenes/Hint";
import { RebuttalForm } from "src/scenes/RebuttalForm";
import {
  Action,
  ActionTypes,
  SubmitGuessAction,
  SubmitHintAction,
  SubmitRebuttalAction,
  UpdateGuessAction,
  UpdateHintAction,
} from "src/store/actions";
import { SharedState } from "src/store/SharedState";
import { Chadburn } from "./Chadburn";
import styles from "./Game.module.css";
import { GuessForm } from "./GuessForm";
import { HintForm } from "./HintForm";
import { Spectrum } from "./Spectrum";

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

  const onUpdateGuess = (guess: number) => {
    const action: UpdateGuessAction = {
      type: ActionTypes.UPDATE_GUESS,
      guess,
    };
    publish(action);
  };

  const onUpdateHint = (hint: string) => {
    const action: UpdateHintAction = {
      type: ActionTypes.UPDATE_HINT,
      hint,
    };
    publish(action);
  };

  const onSubmitHint = () => {
    const action: SubmitHintAction = {
      type: ActionTypes.SUBMIT_HINT,
      hint: sharedState.hint || "",
    };
    publish(action);
  };

  const onToggleActor = (isPlayer: boolean) => {
    setIsPlayer(isPlayer);
  };

  const onGuessSubmit = () => {
    const action: SubmitGuessAction = {
      type: ActionTypes.SUBMIT_GUESS,
      guess: sharedState.guess,
    };
    publish(action);
  };

  const onRebuttalUpdated = (rebuttal: Rebuttal) => {
    publish({ type: ActionTypes.UPDATE_REBUTTAL, rebuttal });
  };

  const onSubmitRebuttal = () => {
    const action: SubmitRebuttalAction = {
      type: ActionTypes.SUBMIT_REBUTTAL,
      rebuttal: sharedState.rebuttal ? sharedState.rebuttal : DEFAULT_REBUTTAL,
    };
    publish(action);
    finishTurn();
  };

  const finishTurn = () => {
    publish({ type: ActionTypes.START_TURN });
  };

  let currentActionFormVisible = !isPlayer;
  let currentActionForm = (
    <HintForm
      hint={sharedState.hint || ""}
      onHintUpdated={onUpdateHint}
      onHintSubmitted={onSubmitHint}
    />
  );
  if (sharedState.game.turn.hint && sharedState.game.turn.guess === undefined) {
    currentActionForm = (
      <GuessForm
        guess={sharedState.guess}
        onGuessUpdated={onUpdateGuess}
        onGuessSubmitted={onGuessSubmit}
      />
    );
    currentActionFormVisible = isPlayer;
  } else if (
    isGuessSubmitted(sharedState.game.turn) &&
    !isRebuttalSubmitted(sharedState.game.turn)
  ) {
    currentActionForm = (
      <RebuttalForm
        rebuttal={
          sharedState.rebuttal ? sharedState.rebuttal : DEFAULT_REBUTTAL
        }
        teamInTurn={sharedState.game.teamInTurn}
        otherTeam={getTeamOutOfTurn(sharedState.game)}
        onRebuttalUpdated={onRebuttalUpdated}
        onRebuttalSubmitted={onSubmitRebuttal}
      />
    );
    currentActionFormVisible = isPlayer;
  }

  return (
    <div className={styles.gameSceneContainer} draggable={false}>
      <Header
        score={sharedState.game.score}
        teamInTurn={sharedState.game.teamInTurn}
      />

      <Hint hint={sharedState.game.turn.hint} />

      {isGameOver(sharedState) && <EndGame />}

      <Chadburn
        guess={sharedState.guess}
        onGuessUpdated={onUpdateGuess}
        showTarget={!isPlayer || turnOver}
        target={sharedState.game.turn.target}
      />

      <Spectrum spectrum={sharedState.game.turn.spectrum} />

      <div
        style={{ visibility: currentActionFormVisible ? "visible" : "hidden" }}
        className={styles.currentActionFormContainer}
      >
        {currentActionForm}
      </div>

      <div className={styles.actorToggleContainer}>
        <Toggle
          left="Player"
          right="Psychic"
          isLeft={isPlayer}
          onToggled={onToggleActor}
        />
      </div>
    </div>
  );
};
