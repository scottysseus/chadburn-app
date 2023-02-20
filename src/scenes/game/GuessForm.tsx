import React, { useEffect, useState } from "react";

export interface GuessFormProps {
  guess: number;
  onGuessUpdate: (guess: number) => void;
  onGuessSubmit: () => void;
}

export const GuessForm = ({
  guess,
  onGuessUpdate,
  onGuessSubmit,
}: GuessFormProps) => {
  const [localGuess, setLocalGuess] = useState<string>(String(guess));

  useEffect(() => {
    setLocalGuess(String(guess));
  }, [guess]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    let newGuess = event.target.value;

    /**
     * Only propagate the update upward if it is a valid number.
     * Otherwise, keep the update local to allow the user to fix it.
     *
     * e.g. if they type '-', don't propagate NaN upward. Let the user
     * finish typing '-10'.
     */
    if (!isGuessInvalid(newGuess)) {
      const newGuessAsNumber = Number(newGuess);
      if (newGuessAsNumber > 90) newGuess = String(90);
      if (newGuessAsNumber < -90) newGuess = String(-90);
      onGuessUpdate(Number(newGuess));
    }

    setLocalGuess(newGuess);
  };

  const isGuessInvalid = (guess: string) => {
    return isNaN(Number(guess)) || guess === "";
  };

  /**
   * Use input with type="text" because built-in number inputs suck.
   * Their validation happens too early, so they don't allow the user to
   * 'finish their thought'.
   *
   * The main issue is, users cannot fully clear (using backspace) the text box, making entering negative
   * numbers difficult.
   */
  return (
    <>
      <input
        data-cy="game_input_guess"
        type="text"
        value={localGuess}
        onChange={onInputChange}
        style={{
          lineHeight: "20px",
        }}
      />
      <button
        data-cy="game_btn_submit_guess"
        onClick={onGuessSubmit}
        disabled={isGuessInvalid(localGuess)}
      >
        Submit
      </button>
    </>
  );
};
