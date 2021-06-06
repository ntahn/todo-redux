import React from "react";

interface Props {
  setDisplay: React.Dispatch<React.SetStateAction<string>>;
}

export const Select: React.FC<Props> = ({ setDisplay }) => {
  return (
    <div className="mb-2 sm:mb-4 max-w-lg text-right w-3/5 mx-auto">
      <select
        name="display"
        id="select"
        className="px-2 py-1 focus:outline-none"
        onChange={(e) => {
          setDisplay(e.target.value);
        }}
      >
        <option value="all" defaultChecked>
          all
        </option>
        <option value="completed">completed</option>
        <option value="uncompleted">uncompleted</option>
      </select>
    </div>
  );
};
