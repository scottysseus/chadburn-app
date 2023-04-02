import React from "react";
import { Toggle } from "src/components/Toggle";
import { Rebuttal, Rebuttals } from "src/game/turn";

interface RebuttalViewProps {
  rebuttal: Rebuttal;
  teamInTurn: string;
  otherTeam: string;

  onRebuttalUpdate: (rebuttal: Rebuttal) => void;
  onRebuttalSubmit: () => void;
}

export const RebuttalForm = ({
  rebuttal,
  teamInTurn,
  otherTeam,
  onRebuttalUpdate,
  onRebuttalSubmit,
}: RebuttalViewProps) => {
  return (
    <div>
      <p className="formDescription">
        <span style={{ color: otherTeam }}>{otherTeam} team</span>, does the
        hint lie to the left or the right of{" "}
        <span style={{ color: teamInTurn }}>{teamInTurn} team&apos;s</span>{" "}
        guess?
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

        <button
          data-cy="game_btn_submit_rebuttal"
          onClick={onRebuttalSubmit}
          style={{ marginLeft: "20px" }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
