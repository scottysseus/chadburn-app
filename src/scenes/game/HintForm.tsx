import React from "react";

export interface HintFormProps {
  hint: string;
  onHintUpdate: (hint: string) => void;
  onHintSubmit: () => void;
}

export const HintForm = ({
  hint,
  onHintUpdate,
  onHintSubmit,
}: HintFormProps) => {
  const onInputChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onHintUpdate(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Provide a hint"
        onChange={onInputChanged}
        value={hint}
      ></input>
      <button disabled={hint === ""} onClick={onHintSubmit}>
        Submit
      </button>
    </div>
  );
};
