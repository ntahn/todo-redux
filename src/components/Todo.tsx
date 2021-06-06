import React from "react";
import { useAppDispatch } from "../app/hooks";
import { TodoI } from "../common/model/intefaces";
import { deleteTodoApi, toggleTodoApi } from "../features/todo/TodoSlice";

interface Props extends TodoI {
  display: string;
}

export const Todo: React.FC<Props> = ({ display, id, completed, todo }) => {
  const dispatch = useAppDispatch();
  const cssTodoText: string = " px-2 py-1 bg-white w-full text-left max-w-xl";
  const cssTodoDiv: string = "flex transition mx-auto duration-500 max-w-lg";
  let cssTodoClass: string = completed
    ? `opacity-60 ${cssTodoDiv}`
    : cssTodoDiv;
  if (
    (completed && display === "uncompleted") ||
    (!completed && display === "completed")
  ) {
    cssTodoClass += " hidden";
  }
  return (
    <div className={cssTodoClass}>
      <p className={completed ? `line-through ${cssTodoText}` : cssTodoText}>
        {todo}
      </p>
      <button
        className=" rounded-none focus-within:outline-none w-10  bg-green-400  "
        type="button"
        onClick={() => {
          //   dispatch(toggle_complete_todo(id));
          dispatch(toggleTodoApi({ id, completed, todo }));
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </button>
      <button
        type="button"
        className="rounded-none  focus-within:outline-none w-10  bg-yellow-500 "
        onClick={() => {
          //   dispatch(delete_todo(id));
          dispatch(deleteTodoApi(id));
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
};
