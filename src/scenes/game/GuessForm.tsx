import React, { useEffect, useState } from "react";

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
  const [localGuess, setLocalGuess] = useState<string>(String(guess));

  useEffect(() => {
    setLocalGuess(String(guess));
  }, [guess]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    let newGuess = event.target.value;

    if (!isGuessInvalid(newGuess)) {
      const newGuessAsNumber = Number(newGuess);
      if (newGuessAsNumber > 90) newGuess = String(90);
      if (newGuessAsNumber < -90) newGuess = String(-90);
      onGuessUpdated(Number(newGuess));
    }

    setLocalGuess(newGuess);
  };

  const isGuessInvalid = (guess: string) => {
    return isNaN(Number(guess)) || guess === "";
  };

  return (
    <>
      <input
        inputMode="decimal"
        type="text"
        value={localGuess}
        onChange={onInputChange}
      />
      <button onClick={onGuessSubmitted} disabled={isGuessInvalid(localGuess)}>
        Submit
      </button>
    </>
  );
};
