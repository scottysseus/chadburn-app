import React from "react";

export interface HintFormProps {
  hint: string;
  onHintUpdated: (hint: string) => void;
  onHintSubmitted: () => void;
}

export const HintForm = ({
  hint,
  onHintUpdated,
  onHintSubmitted,
}: HintFormProps) => {
  const onInputChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onHintUpdated(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Provide a hint"
        onChange={onInputChanged}
        value={hint}
      ></input>
      <button disabled={hint === ""} onClick={onHintSubmitted}>
        Submit
      </button>
    </div>
  );
};
