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
    <>
      <fieldset>
        <legend>Hint</legend>
        <input
          type="text"
          placeholder="Provide a hint"
          onChange={onInputChanged}
          value={hint}
        />
      </fieldset>
      <button disabled={hint === ""} onClick={onHintSubmit}>
        Submit
      </button>
    </>
  );
};
