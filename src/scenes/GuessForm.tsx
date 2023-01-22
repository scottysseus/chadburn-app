import React from "react";

export interface GuessFormProps {
  guess: number;
  onGuessUpdated: (guess: number) => void;
  onGuessSubmitted: () => void;
}

export const GuessForm = ({
  guess,
  onGuessUpdated,
  onGuessSubmitted,
}: GuessFormProps) => {
  const onInputChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onGuessUpdated(Number(event.target.value));
  };

  return (
    <>
      <input type="number" value={guess} onChange={onInputChanged} />
      <button onClick={onGuessSubmitted}>Submit</button>
    </>
  );
};
