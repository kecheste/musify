import { call, put, takeEvery } from "redux-saga/effects";
import {
  setLoading,
  setError,
  fetchSongsSuccess,
  fetchSongSuccess,
  createSongSuccess,
  updateSongSuccess,
  deleteSongSuccess,
} from "./songSlice.ts";
import {
  setStatsLoading,
  setStatsError,
  fetchStatsSuccess,
} from "./statsSlice.ts";
import {
  getSongs,
  addSong,
  getSong,
  updateSong,
  deleteSong,
} from "../api/songs";
import { getStats } from "../api/stats";
import type { Song } from "./songSlice.ts";
import type { Stats } from "./statsSlice.ts";

function* fetchSongsSaga() {
  try {
    yield put(setLoading({ loading: true, operation: "fetch" }));
    const data: Song[] = yield call(getSongs);
    yield put(fetchSongsSuccess(data));
  } catch (e: unknown) {
    if (e instanceof Error) {
      yield put(setError(e.message));
    } else {
      yield put(setError("An unknown error occurred"));
    }
  }
}

function* fetchSongSaga(action: { type: string; payload: string }) {
  try {
    yield put(setLoading({ loading: true, operation: "fetch" }));
    const song: Song = yield call(getSong, action.payload);
    yield put(fetchSongSuccess(song));
  } catch (err: unknown) {
    if (err instanceof Error) {
      yield put(setError(err.message));
    } else {
      yield put(setError("An unknown error occurred"));
    }
  }
}

function* createSongSaga(action: { type: string; payload: Song }) {
  try {
    yield put(setLoading({ loading: true, operation: "create" }));
    const newSong: Song = yield call(addSong, action.payload);
    yield put(createSongSuccess(newSong));
  } catch (err: unknown) {
    if (err instanceof Error) {
      yield put(setError(err.message));
    } else {
      yield put(setError("An unknown error occurred"));
    }
  }
}

function* updateSongSaga(action: { type: string; payload: Song }) {
  try {
    yield put(setLoading({ loading: true, operation: "update" }));
    const updatedSong: Song = yield call(updateSong, action.payload);
    yield put(updateSongSuccess(updatedSong));
  } catch (err: unknown) {
    if (err instanceof Error) {
      yield put(setError(err.message));
    } else {
      yield put(setError("An unknown error occurred"));
    }
  }
}

function* deleteSongSaga(action: { type: string; payload: string }) {
  try {
    yield put(setLoading({ loading: true, operation: "delete" }));
    yield call(deleteSong, action.payload);
    yield put(deleteSongSuccess(action.payload));
  } catch (err: unknown) {
    if (err instanceof Error) {
      yield put(setError(err.message));
    } else {
      yield put(setError("An unknown error occurred"));
    }
  }
}

function* fetchStatsSaga() {
  try {
    yield put(setStatsLoading(true));
    const stats: Stats = yield call(getStats);
    yield put(fetchStatsSuccess(stats));
  } catch (err: unknown) {
    if (err instanceof Error) {
      yield put(setStatsError(err.message));
    } else {
      yield put(setStatsError("An unknown error occurred"));
    }
  }
}

export default function* rootSaga() {
  yield takeEvery("songs/fetchSongs", fetchSongsSaga);
  yield takeEvery("songs/fetchSong", fetchSongSaga);
  yield takeEvery("songs/createSong", createSongSaga);
  yield takeEvery("songs/updateSong", updateSongSaga);
  yield takeEvery("songs/deleteSong", deleteSongSaga);
  yield takeEvery("stats/fetchStats", fetchStatsSaga);
}
