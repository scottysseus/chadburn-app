import React, { useEffect, useState } from "react";

import { finishGame, getTeamOutOfTurn } from "src/game/game";
import {
  Action,
  ActionTypes,
  SubmitHintAction,
  SubmitRebuttalAction,
  UpdateGuessAction,
} from "src/store/actions";
import { isGameOver } from "src/game/game";
import { SharedState } from "src/store/SharedState";
import styles from "./Game.module.css";
import { PlayerView } from "./PlayerView";
import { PsychicView } from "./PsychicView";
import { RebuttalView } from "./RebuttalView";
import { Header } from "../components/Header";
import { Hint } from "src/components/Hint";
import { Spectrum } from "src/components/Spectrum";
import { ActorToggle } from "src/components/ActorToggle";
import { NewGameButton } from "src/components/NewGameButton";

interface GameProps {
  sharedState: SharedState;
  publish: <T extends Action>(action: T) => void;
}

export const Game = ({ sharedState, publish }: GameProps) => {
  const [hint, setHint] = useState<string>("");
  const [playerBtn, setPlayerBtn] = useState<boolean>(false);
  const [psychicBtn, setPsychicBtn] = useState<boolean>(false);
  const [rebuttal, setRebuttal] = useState<string>("");
  const [guessSubmitted, setGuessSubmitted] = useState<boolean>(false);
  const [player, setPlayer] = useState<boolean>(true);

  useEffect(() => {
    if (!sharedState.started) {
      publish({ type: ActionTypes.START_GAME });
    }
  }, [sharedState]);

  useEffect(() => {
    const end = isGameOver(sharedState);
    if (end === true) {
      finishGame(sharedState.game);
    }
  }, [sharedState.game.score]);

  const onNewGameClick = () => {
    publish({ type: ActionTypes.NEW_GAME });
  };

  const onUpdateGuess = (guess: number) => {
    const action: UpdateGuessAction = {
      type: ActionTypes.UPDATE_GUESS,
      guess,
    };
    publish(action);
  };

  const onUpdateHint = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setHint(event.target.value);
  };

  const onSubmitHint = () => {
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
    setGuessSubmitted(true);
  };

  const onSubmitRebuttal = () => {
    const action: SubmitRebuttalAction = {
      type: ActionTypes.SUBMIT_REBUTTAL,
      rebuttal: rebuttal,
    };
    publish(action);

    finishTurn();
  };

  const finishTurn = () => {
    setGuessSubmitted(false);
    publish({ type: ActionTypes.START_TURN });
  };

  const disableSubmit =
    sharedState.game.turn.actor === "psychic" ? true : false;

  return (
    <div className={styles.pageContainer} draggable={false}>
      <Header
        score={sharedState.game.score}
        teamInTurn={sharedState.game.teamInTurn}
      />

      <RebuttalView
        guessSubmitted={guessSubmitted}
        getTeamOutOfTurn={getTeamOutOfTurn}
        game={sharedState.game}
        onSubmitRebuttal={onSubmitRebuttal}
        setRebuttal={setRebuttal}
      />

      <Hint
        sharedState={sharedState}
        onSubmitHint={onSubmitHint}
        onUpdateHint={onUpdateHint}
        player={player}
      />

      {player ? (
        <PlayerView
          guess={sharedState.guess}
          onUpdated={onUpdateGuess}
          onGuessSubmit={onGuessSubmit}
          disableSubmit={disableSubmit}
          // target={sharedState.game.turn.target}
        />
      ) : (
        <PsychicView target={sharedState.game.turn.target} />
      )}

      <Spectrum spectrum={sharedState.game.turn.spectrum} />

      <ActorToggle
        onToggleActorView={onToggleActorView}
        playerBtn={playerBtn}
        psychicBtn={psychicBtn}
      />
      <NewGameButton onNewGameClick={onNewGameClick} />
    </div>
  );
};
