import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchSongs,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSong,
  updateSong,
  deleteSong,
} from "./songSlice";
import { getSongs, addSong as createSong } from "../api/songs";
import type { Song } from "./songSlice.ts";

function* fetchSongsSaga() {
  try {
    const data: Song[] = yield call(getSongs);
    yield put(fetchSongsSuccess(data.items));
  } catch (e: any) {
    yield put(fetchSongsFailure(e.message))
  }
}

function* addSongSaga(action: { type: string, payload: Song }) {
  yield call(createSong, action.payload);
  yield fetchSongsSaga;
}

export default function* rootSaga() {
  yield takeEvery(fetchSongs.type, fetchSongsSaga);
  yield takeEvery(addSong.type, addSongSaga);
}

