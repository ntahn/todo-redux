import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { animated, Transition } from "react-spring";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { RootState } from "./app/store";
import { Input } from "./components/Input";
import { Select } from "./components/Select";
import { Todo } from "./components/Todo";
import { fetchTodoApi } from "./features/todo/TodoSlice";

function App() {
  const [display, setDisplay] = useState("all");
  const todoState = useAppSelector((state: RootState) => state.todo.todoList);
  const todoStatus = useAppSelector((state: RootState) => state.todo.status);
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function fetchTodoAPI() {
      try {
        const actionResult = await dispatch(fetchTodoApi());
        const result = unwrapResult(actionResult);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchTodoAPI();
  }, []);
  return (
    <div className=" font-app-font m-0 min-h-screen py-10 bg-gradient-to-b sm:text-lg from-yellow-300 to-red-300 text-center px-auto">
      <h1 className=" font-extrabold text-4xl mb-6 sm:text-5xl sm:mb-8 md:mb-10">
        My Todo App
      </h1>
      <div>{todoStatus !== "idle" ? todoStatus : "app is working!"}</div>
      <Input />
      <Select setDisplay={setDisplay} />

      <div className="space-y-2 w-3/5 mx-auto">
        <Transition
          items={todoState}
          keys={(item: { id: string; todo: string; completed: boolean }) =>
            item.id
          }
          from={{
            opacity: 0,
            x: -100,
          }}
          enter={{
            opacity: 1,
            x: 0,
          }}
          leave={{
            opacity: 0,
            x: 100,
          }}
        >
          {(style, item) => (
            <animated.div style={style}>
              <Todo
                display={display}
                key={item.id}
                id={item.id}
                todo={item.todo}
                completed={item.completed}
              />
            </animated.div>
          )}
        </Transition>
      </div>
    </div>
  );
}

export default App;
