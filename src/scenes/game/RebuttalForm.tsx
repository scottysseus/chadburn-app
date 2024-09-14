import React from "react";
import { Toggle } from "src/components/Toggle";
import { Rebuttal, Rebuttals } from "src/game/turn";
import { GameMode } from "src/store/SharedState";

interface RebuttalViewProps {
  rebuttal: Rebuttal;
  teamInTurn: string;
  otherTeam: string;

  mode: GameMode;

  onRebuttalUpdate: (rebuttal: Rebuttal) => void;
  onRebuttalSubmit: () => void;
}

/**
 * Gets the rebuttal prompt based on the game mode.
 * For normal matches, we want to include team names to make the instructions
 * more clear. For free play games, we want to omit team information.
 */
const getPrompt = (teamInTurn: string, otherTeam: string, mode: GameMode) => {
  if (mode === GameMode.NORMAL) {
    return (
      <>
        <span style={{ color: otherTeam }}>{otherTeam} team</span>, does the
        target lie to the left or the right of{" "}
        <span style={{ color: teamInTurn }}>{teamInTurn} team&apos;s</span>{" "}
        guess?
      </>
    );
  }

  return <>Does the target lie to the left or the right of the guess?</>;
};

export const RebuttalForm = ({
  rebuttal,
  teamInTurn,
  otherTeam,
  onRebuttalUpdate,
  onRebuttalSubmit,
  mode = GameMode.NORMAL,
}: RebuttalViewProps) => {
  return (
    <div>
      <p data-cy="game_prompt_rebuttal" className="formDescription">
        {getPrompt(teamInTurn, otherTeam, mode)}
      </p>
      <div className="formInput">
        <Toggle
          left="Left"
          right="Right"
          isLeft={rebuttal === Rebuttals.LEFT}
          onToggle={(isLeft) =>
            onRebuttalUpdate(isLeft ? Rebuttals.LEFT : Rebuttals.RIGHT)
          }
        />

        <button data-cy="game_btn_submit_rebuttal" onClick={onRebuttalSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};
