import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import songsReducer from './songSlice.ts';
import statsReducer from './statsSlice.ts';
import rootSaga from "./rootSaga.ts";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = configureStore({
  reducer: {
    songs: songsReducer,
    stats: statsReducer
  },
  middleware: (getDefault) => getDefault().concat(middleware),
})

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

