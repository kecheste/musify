import { createSlice } from "@reduxjs/toolkit";

export interface Song {
  _id?: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  createdAt?: Date;
}

interface SongState {
  list: Song[];
  loading: boolean;
  error?: string;
}

const initialState: SongState = {
  list: [],
  loading: false
}

const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongs: (state) => { state.loading = true; },
    fetchSongsSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    fetchSongsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addSong: (state, action) => {
      state.loading = true;
    },
    updateSong: (state, action) => {
      state.loading = true;
    },
    deleteSong: (state, action) => {
      state.loading = true;
    },
  }
})

export const {
  fetchSongs,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSong,
  updateSong,
  deleteSong
} = songSlice.actions;

export default songSlice.reducer;
