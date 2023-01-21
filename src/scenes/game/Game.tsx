import React, { useEffect, useState } from "react";

import { getTeamOutOfTurn, isGameOver } from "src/game/game";
import { isTurnOver } from "src/game/turn";
import { ActorToggle } from "src/scenes/game/ActorToggle";
import { EndGame } from "src/scenes/game/EndGame";
import { Header } from "src/scenes/game/Header";
import { Hint } from "src/scenes/game/Hint";
import { RebuttalView } from "src/scenes/game/RebuttalView";
import {
  Action,
  ActionTypes,
  SubmitHintAction,
  SubmitRebuttalAction,
  UpdateGuessAction,
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

export const Game = ({ sharedState, publish }: GameProps) => {
  const [playerBtn, setPlayerBtn] = useState<boolean>(false);
  const [psychicBtn, setPsychicBtn] = useState<boolean>(false);
  const [rebuttal, setRebuttal] = useState<string>("");
  const [player, setPlayer] = useState<boolean>(true);

  const guessSubmitted = !isNaN(sharedState.game.turn.guess);
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

  const onSubmitHint = (hint: string) => {
    const action: SubmitHintAction = {
      type: ActionTypes.SUBMIT_HINT,
      hint: hint,
    };
    publish(action);
  };

  const onToggleActorView = () => {
    setPlayer(!player);
    player
      ? (setPsychicBtn(true), setPlayerBtn(false))
      : (setPsychicBtn(false), setPlayerBtn(true));
  };

  const onGuessSubmit = () => {
    publish({ type: ActionTypes.SUBMIT_GUESS });
  };

  const onSubmitRebuttal = () => {
    const action: SubmitRebuttalAction = {
      type: ActionTypes.SUBMIT_REBUTTAL,
      rebuttal: rebuttal,
    };
    publish(action);
  };

  const finishTurn = () => {
    publish({ type: ActionTypes.START_TURN });
  };

  let currentActionForm = <HintForm onHintSubmitted={onSubmitHint} />;
  if (sharedState.game.turn.hint) {
    currentActionForm = (
      <GuessForm
        guess={sharedState.guess}
        onGuessUpdated={onUpdateGuess}
        onGuessSubmitted={onGuessSubmit}
      />
    );
  }
  return (
    <div className={styles.gameSceneContainer} draggable={false}>
      <Header
        score={sharedState.game.score}
        teamInTurn={sharedState.game.teamInTurn}
        game={sharedState.game}
      />

      <RebuttalView
        guessSubmitted={guessSubmitted}
        getTeamOutOfTurn={getTeamOutOfTurn}
        game={sharedState.game}
        onSubmitRebuttal={onSubmitRebuttal}
        setRebuttal={setRebuttal}
      />

      <Hint hint={sharedState.game.turn.hint} />

      {isGameOver(sharedState) && <EndGame />}

      <Chadburn
        guess={sharedState.guess}
        onGuessUpdated={onUpdateGuess}
        showTarget={!player || turnOver}
        target={sharedState.game.turn.target}
      />

      <Spectrum spectrum={sharedState.game.turn.spectrum} />

      <div className={styles.currentActionFormContainer}>
        {currentActionForm}
      </div>

      <ActorToggle
        onToggleActorView={onToggleActorView}
        playerBtn={playerBtn}
        psychicBtn={psychicBtn}
        isTurnOver={turnOver}
      />
    </div>
  );
};
