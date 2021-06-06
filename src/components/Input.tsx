import React, { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { addTodoApi } from "../features/todo/TodoSlice";

interface Props {}

export const Input: React.FC<Props> = () => {
  const [input, setInput] = useState("");
  const dispatch = useAppDispatch();
  return (
    <form
      className=" mb-8 sm:mb-10"
      onSubmit={(e) => {
        e.preventDefault();
        if (input !== "") {
          //   dispatch(add_todo(input));
          dispatch(addTodoApi(input));
        }

        setInput("");
      }}
    >
      <div className=" w-3/5 relative mx-auto max-w-lg">
        <input
          className="px-2 py-1 w-full rounded max-w-lg"
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button
          type="submit"
          className=" focus:outline-none absolute right-1 top-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};
