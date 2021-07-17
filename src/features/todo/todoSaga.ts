import { takeEvery, call, put } from "@redux-saga/core/effects";
import {
  addSaga as add_saga,
  addSagaFailed,
  addSagaSuccess,
} from "./TodoSlice";
import api from "./../../api";
import { PayloadAction } from "@reduxjs/toolkit";
import { SagaReturnType } from "redux-saga/effects";

export function* todoSaga() {
  console.log("todo Saga");
  yield takeEvery(add_saga.type, addSaga);
}

const addTodoApi = (newTodo: { todo: string; completed: boolean }) => {
  return api.post("/todo", newTodo);
};

type AddTodoResultType = SagaReturnType<typeof addTodoApi>;

function* addSaga(action: PayloadAction<string>) {
  console.log("Adding Saga");
  const newTodo = {
    todo: action.payload,
    completed: false,
  };
  try {
    const result: AddTodoResultType = yield call(addTodoApi, newTodo);
    console.log(result.data.id);
    yield put(addSagaSuccess({ ...newTodo, id: result.data.id }));
  } catch (error) {
    yield put(addSagaFailed(error.response.data));
  }
}
