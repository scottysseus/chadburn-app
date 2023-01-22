import React from "react";
import { Toggle } from "src/components/Toggle";
import { Rebuttal, Rebuttals } from "src/game/turn";

interface RebuttalViewProps {
  rebuttal: Rebuttal;
  teamInTurn: string;
  otherTeam: string;

  onRebuttalUpdated: (rebuttal: Rebuttal) => void;
  onRebuttalSubmitted: () => void;
}

export const RebuttalForm = ({
  rebuttal,
  onRebuttalUpdated,
  onRebuttalSubmitted,
}: RebuttalViewProps) => {
  return (
    <>
      <Toggle
        left="Left"
        right="Right"
        isLeft={rebuttal === Rebuttals.LEFT}
        onToggled={(isLeft) =>
          onRebuttalUpdated(isLeft ? Rebuttals.LEFT : Rebuttals.RIGHT)
        }
      />

      <button onClick={onRebuttalSubmitted}>Submit</button>
    </>
  );
};
