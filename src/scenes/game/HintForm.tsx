import React, { useState } from "react";

export interface HintFormProps {
  onHintSubmitted: (hint: string) => void;
}

export const HintForm = ({ onHintSubmitted }: HintFormProps) => {
  const [hint, setHint] = useState<string>("");

  const onInputChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setHint(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Provide a hint"
        onChange={onInputChanged}
        value={hint}
      ></input>
      <button onClick={() => onHintSubmitted(hint)}>Submit</button>
    </div>
  );
};
